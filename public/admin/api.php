<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Pragma: no-cache');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function loadAdminConfig(): array
{
    $documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
    $candidates = array_filter([
        getenv('ALEXANDRA_ADMIN_CONFIG') ?: null,
        $documentRoot !== '' ? dirname($documentRoot) . '/private/alexandra-admin.php' : null,
        $documentRoot !== '' ? dirname($documentRoot) . '/private/admin-config.php' : null,
        dirname(__DIR__) . '/private/admin-config.php',
    ]);

    foreach ($candidates as $candidate) {
        if (is_string($candidate) && is_file($candidate) && is_readable($candidate)) {
            $config = require $candidate;
            if (is_array($config)) {
                return [$config, $candidate];
            }
        }
    }

    respond([
        'ok' => false,
        'code' => 'ADMIN_NOT_CONFIGURED',
        'message' => 'Админка ещё не подключена к серверной конфигурации.',
    ], 503);
}

function readJsonBody(): array
{
    $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($length > 131072) {
        respond(['ok' => false, 'message' => 'Запрос слишком большой.'], 413);
    }

    $raw = file_get_contents('php://input');
    if (!is_string($raw) || $raw === '') {
        return [];
    }

    try {
        $decoded = json_decode($raw, true, 64, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(['ok' => false, 'message' => 'Некорректный формат запроса.'], 400);
    }

    if (!is_array($decoded)) {
        respond(['ok' => false, 'message' => 'Некорректный формат запроса.'], 400);
    }
    return $decoded;
}

function requirePost(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        header('Allow: POST');
        respond(['ok' => false, 'message' => 'Метод не поддерживается.'], 405);
    }
}

function isAuthenticated(): bool
{
    return ($_SESSION['authenticated'] ?? false) === true;
}

function requireAuthentication(): void
{
    if (!isAuthenticated()) {
        respond(['ok' => false, 'message' => 'Сессия завершена. Войдите снова.'], 401);
    }
}

function requireCsrf(): void
{
    $provided = (string) ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    $expected = (string) ($_SESSION['csrf'] ?? '');
    if ($provided === '' || $expected === '' || !hash_equals($expected, $provided)) {
        respond(['ok' => false, 'message' => 'Проверка безопасности не пройдена. Обновите страницу.'], 403);
    }
}

function verifyPassword(string $password, array $passwordConfig): bool
{
    if (($passwordConfig['algo'] ?? '') !== 'pbkdf2-sha256') {
        return false;
    }
    $salt = (string) ($passwordConfig['salt'] ?? '');
    $iterations = (int) ($passwordConfig['iterations'] ?? 0);
    $expected = (string) ($passwordConfig['hash'] ?? '');
    if ($salt === '' || $iterations < 100000 || $expected === '') {
        return false;
    }
    $actual = hash_pbkdf2('sha256', $password, $salt, $iterations, 64, false);
    return hash_equals($expected, $actual);
}

function rateLimitPath(string $secret): string
{
    $address = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $fingerprint = hash_hmac('sha256', $address, $secret);
    return rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'alexandra-admin-' . $fingerprint . '.json';
}

function currentAttempts(string $path): array
{
    if (!is_file($path)) return [];
    $raw = file_get_contents($path);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($decoded)) return [];
    $cutoff = time() - 900;
    return array_values(array_filter($decoded, static fn ($stamp): bool => is_int($stamp) && $stamp >= $cutoff));
}

function registerFailedAttempt(string $path, array $attempts): void
{
    $attempts[] = time();
    file_put_contents($path, json_encode($attempts), LOCK_EX);
    @chmod($path, 0600);
}

function audit(string $privateDirectory, string $action): void
{
    if (!is_dir($privateDirectory)) @mkdir($privateDirectory, 0700, true);
    @file_put_contents($privateDirectory . '/admin-actions.log', gmdate('c') . "\t" . $action . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function readContent(string $contentFile): array
{
    $raw = @file_get_contents($contentFile);
    if (!is_string($raw)) respond(['ok' => false, 'message' => 'Файл текстов недоступен.'], 500);
    try {
        $decoded = json_decode($raw, true, 64, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(['ok' => false, 'message' => 'Файл текстов повреждён.'], 500);
    }
    if (!is_array($decoded)) respond(['ok' => false, 'message' => 'Файл текстов повреждён.'], 500);
    return $decoded;
}

function validateContent(mixed $value, mixed $template, string $path = 'content'): void
{
    if (is_string($template)) {
        if (!is_string($value)) throw new RuntimeException($path . ' must be text');
        $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
        if ($length < 1 || $length > 2500) throw new RuntimeException($path . ' has invalid length');
        return;
    }
    if (!is_array($template) || !is_array($value) || array_keys($value) !== array_keys($template)) {
        throw new RuntimeException($path . ' has invalid structure');
    }
    foreach ($template as $key => $templateValue) {
        validateContent($value[$key], $templateValue, $path . '.' . (string) $key);
    }
}

function saveContent(string $contentFile, array $content, string $privateDirectory): void
{
    $contentDirectory = dirname($contentFile);
    $backupDirectory = $privateDirectory . '/backups';
    if (!is_dir($backupDirectory) && !mkdir($backupDirectory, 0700, true) && !is_dir($backupDirectory)) {
        throw new RuntimeException('Cannot create backup directory');
    }
    $backupFile = $backupDirectory . '/site-' . gmdate('Ymd-His') . '.json';
    if (is_file($contentFile)) {
        @copy($contentFile, $backupFile);
        @chmod($backupFile, 0600);
    }
    $encoded = json_encode($content, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if (!is_string($encoded)) throw new RuntimeException('Cannot encode content');
    $temporary = tempnam($contentDirectory, '.site-content-');
    if (!is_string($temporary)) throw new RuntimeException('Cannot create temporary file');
    try {
        if (file_put_contents($temporary, $encoded . PHP_EOL, LOCK_EX) === false) throw new RuntimeException('Cannot write content');
        @chmod($temporary, 0640);
        if (!rename($temporary, $contentFile)) throw new RuntimeException('Cannot replace content');
    } finally {
        if (is_file($temporary)) @unlink($temporary);
    }
    $backups = glob($backupDirectory . '/site-*.json') ?: [];
    rsort($backups, SORT_STRING);
    foreach (array_slice($backups, 10) as $oldBackup) @unlink($oldBackup);
}

[$config, $configPath] = loadAdminConfig();
$privateDirectory = dirname($configPath);
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
session_name((string) ($config['session_name'] ?? 'alexandra_admin'));
session_set_cookie_params(['lifetime' => 0, 'path' => '/admin/', 'secure' => $isHttps, 'httponly' => true, 'samesite' => 'Strict']);
ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
session_start();

$sessionTtl = max(600, (int) ($config['session_ttl'] ?? 1800));
if (isAuthenticated() && isset($_SESSION['last_activity']) && time() - (int) $_SESSION['last_activity'] > $sessionTtl) {
    $_SESSION = [];
    session_destroy();
    respond(['ok' => false, 'message' => 'Сессия завершена. Войдите снова.'], 401);
}
if (isAuthenticated()) $_SESSION['last_activity'] = time();

$contentFile = dirname(__DIR__) . '/content/site.json';
$action = (string) ($_GET['action'] ?? 'session');

try {
    if ($action === 'session') {
        respond(['ok' => true, 'authenticated' => isAuthenticated(), 'csrf' => isAuthenticated() ? (string) ($_SESSION['csrf'] ?? '') : '']);
    }
    if ($action === 'login') {
        requirePost();
        $body = readJsonBody();
        $ratePath = rateLimitPath((string) ($config['rate_limit_secret'] ?? 'change-me'));
        $attempts = currentAttempts($ratePath);
        if (count($attempts) >= 5) respond(['ok' => false, 'message' => 'Слишком много попыток. Повторите вход через 15 минут.'], 429);
        $username = (string) ($body['username'] ?? '');
        $password = (string) ($body['password'] ?? '');
        $validUser = hash_equals((string) ($config['username'] ?? ''), $username);
        $validPassword = verifyPassword($password, (array) ($config['password'] ?? []));
        if (!$validUser || !$validPassword) {
            registerFailedAttempt($ratePath, $attempts);
            usleep(350000);
            respond(['ok' => false, 'message' => 'Неверный логин или пароль.'], 401);
        }
        @unlink($ratePath);
        session_regenerate_id(true);
        $_SESSION['authenticated'] = true;
        $_SESSION['last_activity'] = time();
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        audit($privateDirectory, 'login_success');
        respond(['ok' => true, 'csrf' => $_SESSION['csrf']]);
    }
    if ($action === 'content') {
        requireAuthentication();
        if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
        respond(['ok' => true, 'content' => readContent($contentFile), 'csrf' => $_SESSION['csrf']]);
    }
    if ($action === 'save') {
        requirePost();
        requireAuthentication();
        requireCsrf();
        $body = readJsonBody();
        $nextContent = $body['content'] ?? null;
        $currentContent = readContent($contentFile);
        validateContent($nextContent, $currentContent);
        saveContent($contentFile, $nextContent, $privateDirectory);
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        audit($privateDirectory, 'content_saved');
        respond(['ok' => true, 'content' => $nextContent, 'csrf' => $_SESSION['csrf']]);
    }
    if ($action === 'logout') {
        requirePost();
        requireAuthentication();
        requireCsrf();
        audit($privateDirectory, 'logout');
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
        }
        session_destroy();
        respond(['ok' => true]);
    }
    respond(['ok' => false, 'message' => 'Неизвестное действие.'], 404);
} catch (Throwable) {
    respond(['ok' => false, 'message' => 'Не удалось выполнить операцию. Попробуйте ещё раз.'], 500);
}

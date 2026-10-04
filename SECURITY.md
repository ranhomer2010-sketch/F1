# Security and production checklist

The GitHub Pages deployment is a review build. The protected text editor becomes operational only after the project is placed on Reg.ru hosting with PHP and HTTPS.

## Implemented controls

- Local fonts, images and scripts; no analytics or booking forms.
- Yandex reviews are loaded only after an unchecked opt-in and a separate button press.
- Content Security Policy, HTTPS redirect, HSTS, clickjacking protection, strict referrer and permissions policies.
- Admin authentication is server-side. Passwords are checked with PBKDF2-SHA256; the browser never receives a secret or hash.
- The admin API refuses non-HTTPS production requests and rejects configurations stored under the public document root.
- Secure, HTTP-only, SameSite=Strict session cookie, 30-minute inactivity expiry and session-ID rotation after login.
- CSRF token on save and logout, persistent per-address five-attempt/15-minute login throttling, generic authentication errors.
- Exact content-shape validation, length limits, atomic writes and ten rolling backups.
- Admin, logs, backups and configuration are excluded from search indexing and direct HTTP access.

## Reg.ru deployment

1. Use hosting and storage physically located in the Russian Federation and enable HTTPS before opening the site to visitors.
2. Upload the generated `dist/client/` directory as the public document root.
3. Place the private configuration at `../private/admin-config.php` relative to that public root. The API rejects a configuration inside `public_html`. Never place it in Git or a downloadable directory.
4. Give PHP write access only to `public/content/site.json` and the private backup/log directory. Other project files should be read-only to the web-server user.
5. Confirm that Apache permits `.htaccess`, `mod_headers`, `mod_rewrite`, `mod_expires` and compression modules.
6. Open `/admin/`, sign in, change one harmless text, save it and verify that the public page updates.
7. Verify response headers with the browser network panel and confirm that no request to Yandex occurs before explicit consent.
8. Before production indexing, replace the current preview `noindex` directive with the approved SEO policy.

## Operational rules

- Change the admin password after handing the site to its final owner and whenever access may have been shared.
- Keep encrypted hosting backups and test restoration periodically.
- Review access logs for repeated failures without storing more visitor data than necessary.
- Reassess the privacy notice and Roskomnadzor notification requirement before adding forms, analytics, CRM, online payments or any other personal-data processing.

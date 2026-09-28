const consentScript = [
  "(() => {",
  "  const root = document.querySelector('[data-yandex-reviews]');",
  "  if (!root) return;",
  "  const checkbox = root.querySelector('[data-reviews-consent]');",
  "  const button = root.querySelector('[data-reviews-load]');",
  "  const consentView = root.querySelector('[data-reviews-consent-view]');",
  "  const frameSlot = root.querySelector('[data-reviews-frame]');",
  "  const status = root.querySelector('[data-reviews-status]');",
  "  if (!checkbox || !button || !consentView || !frameSlot) return;",
  "  checkbox.addEventListener('change', () => {",
  "    button.disabled = !checkbox.checked;",
  "  });",
  "  button.addEventListener('click', () => {",
  "    if (!checkbox.checked || root.dataset.loaded === 'true') return;",
  "    const iframe = document.createElement('iframe');",
  "    iframe.className = 'reviews-iframe';",
  "    iframe.src = root.dataset.widgetUrl;",
  "    iframe.title = 'Отзывы о студии на Яндекс Картах';",
  "    iframe.loading = 'lazy';",
  "    iframe.referrerPolicy = 'strict-origin-when-cross-origin';",
  "    iframe.setAttribute('allow', 'fullscreen');",
  "    root.dataset.loaded = 'true';",
  "    consentView.hidden = true;",
  "    frameSlot.hidden = false;",
  "    frameSlot.append(iframe);",
  "    if (status) status.textContent = 'Отзывы загружены с Яндекс Карт.';",
  "  });",
  "})();",
].join("\n");

type YandexReviewsProps = {
  organizationUrl: string;
  widgetUrl: string;
};

export function YandexReviews({
  organizationUrl,
  widgetUrl,
}: YandexReviewsProps) {
  return (
    <section className="section reviews" id="reviews">
      <div className="reviews-intro">
        <span className="section-kicker">Отзывы гостей</span>
        <h2>Впечатления — напрямую с Яндекс Карт</h2>
        <p>
          Виджет загружается только по вашему решению. До согласия браузер не
          обращается к сервисам Яндекса.
        </p>
        <a
          className="reviews-direct-link"
          href={organizationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть карточку на Яндекс Картах
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div
        className="reviews-panel"
        data-yandex-reviews
        data-widget-url={widgetUrl}
      >
        <div className="reviews-consent" data-reviews-consent-view>
          <span className="reviews-lock" aria-hidden="true">
            Я
          </span>
          <p className="reviews-status">Внешний виджет отключён</p>
          <h3>Показать отзывы?</h3>
          <p>
            После подтверждения загрузится содержимое Яндекс Карт. Сервис может
            получить технические данные браузера и использовать файлы cookies.
          </p>

          <label className="reviews-check">
            <input type="checkbox" data-reviews-consent />
            <span>
              Я разрешаю загрузить отзывы с Яндекс Карт на этой странице.
            </span>
          </label>

          <button className="reviews-load" type="button" data-reviews-load disabled>
            Показать отзывы
          </button>

          <small>
            Подробнее в{" "}
            <a
              href="https://yandex.ru/legal/cookies_policy/ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              политике использования cookies Яндекса
            </a>
            .
          </small>
        </div>

        <div className="reviews-frame" data-reviews-frame hidden />
        <p className="sr-only" aria-live="polite" data-reviews-status />
      </div>

      <script
        data-external-consent
        dangerouslySetInnerHTML={{ __html: consentScript }}
      />
    </section>
  );
}

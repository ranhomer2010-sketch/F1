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
        <span className="section-kicker" data-content="reviews.kicker">Отзывы гостей</span>
        <h2 data-content="reviews.title">Впечатления — напрямую с Яндекс Карт</h2>
        <p data-content="reviews.lead">
          Виджет загружается только по вашему решению. До согласия браузер не
          обращается к сервисам Яндекса.
        </p>
        <a
          className="reviews-direct-link"
          href={organizationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span data-content="reviews.direct_cta">Открыть карточку на Яндекс Картах</span>
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
          <p className="reviews-status" data-content="reviews.status">Внешний виджет отключён</p>
          <h3 data-content="reviews.consent_title">Показать отзывы?</h3>
          <p data-content="reviews.consent_text">
            После подтверждения загрузится содержимое Яндекс Карт. Сервис может
            получить технические данные браузера и использовать файлы cookies.
          </p>

          <label className="reviews-check">
            <input type="checkbox" data-reviews-consent />
            <span data-content="reviews.consent_label">
              Я разрешаю загрузить отзывы с Яндекс Карт на этой странице.
            </span>
          </label>

          <button className="reviews-load" type="button" data-reviews-load disabled>
            <span data-content="reviews.load_cta">Показать отзывы</span>
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

      <script src="./js/yandex-reviews.js" defer data-external-consent />
    </section>
  );
}

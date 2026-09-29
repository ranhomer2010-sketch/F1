import { YandexReviews } from "@/components/yandex-reviews";

const services = [
  {
    name: "Классический массаж",
    description:
      "Когда хочется снять общую скованность, вернуть мышцам тонус и почувствовать больше лёгкости в движении.",
    duration: "60 мин",
    price: "3 000 ₽",
  },
  {
    name: "Массаж спины",
    description:
      "Когда устали шея, плечи, спина или поясница — акцент на зонах, где накопилось напряжение.",
    duration: "40-60 мин",
    price: "2 500-3 000 ₽",
  },
  {
    name: "Расслабляющий массаж",
    description:
      "Чтобы замедлиться, восстановиться после стресса и настроиться на более спокойный отдых.",
    duration: "60 мин",
    price: "3 000 ₽",
  },
  {
    name: "SPA-программы",
    description:
      "Для ощущения лёгкости, ухода за телом и глубокого расслабления. Состав программы обсудим до визита.",
    duration: "по программе",
    price: "от 3 000 ₽",
  },
];

const visitSteps = [
  {
    number: "01",
    title: "Обсуждаем запрос",
    text: "В переписке или по голосовой связи уточняем самочувствие, пожелания и важные особенности.",
  },
  {
    number: "02",
    title: "Определяем задачу",
    text: "Согласуем желаемый результат, вид массажа, длительность, интенсивность и удобное время визита.",
  },
  {
    number: "03",
    title: "Проводим сеанс",
    text: "Подбираем масла и техники под ваш запрос, работаем в комфортном для вас темпе.",
  },
  {
    number: "04",
    title: "Возвращаемся в ритм",
    text: "Завершаем бережно: с тишиной, водой и временем спокойно собраться после сеанса.",
  },
];

const included = [
  "Консультация перед сеансом",
  "Программа с учётом вашего запроса",
  "Профессиональные масла и уходовые средства",
  "Чистый текстиль, пледы и вода",
  "Рекомендации после сеанса",
];

const faqs = [
  {
    question: "Чем этот массаж отличается от обычного расслабляющего?",
    answer:
      "Здесь нет одной схемы для всех. Перед записью мы обсуждаем ваш запрос, а во время сеанса Александра адаптирует технику и интенсивность по вашим ощущениям.",
  },
  {
    question: "Будет ли больно?",
    answer:
      "Нет. Работа проходит в зоне комфорта: давление может быть интенсивным, но не должно становиться острой болью. В любой момент можно попросить изменить технику или силу воздействия.",
  },
  {
    question: "Сколько сеансов понадобится?",
    answer:
      "Это зависит от вашего запроса и того, как давно появилось напряжение. После первой встречи Александра предложит реалистичный ритм без обещаний универсального курса.",
  },
  {
    question: "Как подготовиться к сеансу?",
    answer:
      "Не планируйте плотную еду за 1-1,5 часа и не употребляйте алкоголь в день визита. Желательно оставить после сеанса 20-30 минут без спешки. Брать с собой ничего не нужно.",
  },
  {
    question: "Что взять с собой?",
    answer:
      "Ничего специального. Полотенца, пледы, профессиональные масла и вода уже подготовлены. Особые пожелания по средствам можно заранее обсудить в переписке.",
  },
  {
    question: "Можно ли прийти с острой болью?",
    answer:
      "При сильной или острой боли сначала обратитесь к врачу. Массаж не заменяет медицинскую помощь. О температуре, воспалении, беременности, приёме лекарств и других особенностях важно сообщить до записи.",
  },
  {
    question: "Можно ли перенести запись?",
    answer:
      "Да. Пожалуйста, предупредите не менее чем за 24 часа. Если опаздываете, напишите заранее: иногда продолжительность сеанса придётся сократить или перенести встречу.",
  },
];

const telegramUrl = "https://t.me/sandra_massage";
const maxUrl = "https://clck.ru/3W4EN5";
const yandexOrganizationUrl =
  "https://yandex.ru/maps/org/studiya_massazha_i_spa/181183854833/?ll=39.010751%2C45.062210&z=14";
const yandexReviewsWidgetUrl =
  "https://yandex.ru/maps-reviews-widget/181183854833?comments";
const routeUrl = yandexOrganizationUrl;

const TelegramIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
    <path
      fill="currentColor"
      d="M21.7 3.5 18.5 19c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.4-.1-.6-.6-.2L6 12.8l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20.2 2.6c.9-.3 1.7.2 1.5.9Z"
    />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M7 17 17 7M8 7h9v9"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    />
  </svg>
);

const ArrowDownIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M12 5v14m-5-5 5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    />
  </svg>
);

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14">
    <path
      d="m6.5 12.5 3.5 3.5 7.5-8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const PlusIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M12 5v14M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const LocationIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ClockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 7v5l3.5 2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const MonogramIcon = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 160 160"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      className="monogram-stem"
      d="M35 128 78 30c1-3 5-3 6 0l42 98"
      pathLength="1"
    />
    <path
      className="monogram-crossbar"
      d="M54 92c20-9 41-11 62-5"
      pathLength="1"
    />
  </svg>
);

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Массажный кабинет Александры",
    description:
      "Массаж в Краснодаре для снятия мышечного напряжения, глубокого расслабления и ощущения лёгкости. Александра, 12 лет практики.",
    telephone: "+79883879887",
    email: "sandra.massage.krd@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Краснодар",
      streetAddress: "ул. Зиповская, 36",
      addressCountry: "RU",
    },
    openingHours: "Mo-Su 10:00-21:00",
    priceRange: "2500-3000 RUB",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a className="skip-link" href="#content">
        Перейти к содержанию
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Александра, на главную">
          <span className="brand-mark" aria-hidden="true">
            <MonogramIcon />
          </span>
          <span className="brand-copy">
            <strong>Александра</strong>
            <small>массаж в Краснодаре</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#about">О мастере</a>
          <a href="#space">Кабинет</a>
          <a href="#reviews">Отзывы</a>
          <a href="#faq">Вопросы</a>
        </nav>

        <a
          className="button button-small"
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
          <span data-content="common.book">Записаться</span>
        </a>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>
              <span className="hero-title-primary" data-content="hero.title_primary">
                Легче телу.
              </span>
              <span className="hero-title-accent" data-content="hero.title_accent">
                Спокойнее вам.
              </span>
            </h1>
            <p className="hero-lead" data-content="hero.lead">
              Массажные программы для снятия мышечного напряжения, глубокого
              расслабления и восстановления после нагрузки и стресса.
            </p>
            <div className="hero-meta" aria-label="Адрес и время работы">
              <span>
                <LocationIcon />
                <span data-content="hero.address">Зиповская, 36</span>
              </span>
              <span>
                <ClockIcon />
                <span data-content="hero.hours">Ежедневно 10:00-21:00</span>
              </span>
            </div>
            <div className="hero-actions">
              <a
                className="button"
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
                <span data-content="hero.primary_cta">Подобрать программу</span>
                <ArrowUpRightIcon />
              </a>
              <a className="text-link" href="#services">
                <span data-content="hero.secondary_cta">Посмотреть услуги</span>
                <ArrowDownIcon />
              </a>
            </div>
            <p className="hero-note" data-content="hero.note">
              Ответим в Telegram и уточним, какого результата вы хотите.
            </p>
          </div>

          <aside className="hero-visual" aria-label="Александра проводит сеанс массажа">
            <div className="hero-portrait-frame">
              <img
                className="hero-image"
                src="./images/hero-main.webp"
                alt="Александра проводит сеанс массажа в уютном кабинете"
                width="941"
                height="1672"
                fetchPriority="high"
              />
            </div>
            <div className="hero-photo-top" aria-hidden="true">
              <span data-content="hero.badge_primary">Под ваш запрос</span>
              <span data-content="hero.badge_secondary">Краснодар</span>
            </div>
            <div className="hero-photo-caption">
              <p>
                <strong data-content="hero.experience_value">12 лет</strong>
                <span data-content="hero.experience_label">практики</span>
              </p>
              <span data-content="hero.format_note">
                Один мастер и один посетитель — без потока
              </span>
            </div>
          </aside>
        </section>

        <section className="quick-facts" aria-label="Краткая информация">
          <div>
            <span className="fact-number">01</span>
            <p>
              <strong data-content="facts.0.title">Снять напряжение</strong>
              <span data-content="facts.0.subtitle">в мышцах после нагрузки и долгого дня</span>
            </p>
          </div>
          <div>
            <span className="fact-number">02</span>
            <p>
              <strong data-content="facts.1.title">Глубоко расслабиться</strong>
              <span data-content="facts.1.subtitle">дать телу и мыслям время на восстановление</span>
            </p>
          </div>
          <div>
            <span className="fact-number">03</span>
            <p>
              <strong data-content="facts.2.title">Почувствовать лёгкость</strong>
              <span data-content="facts.2.subtitle">после расслабляющих и SPA-программ</span>
            </p>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-heading">
            <h2 data-content="services_intro.title">Выберите результат, который нужен сейчас</h2>
            <p data-content="services_intro.text">
              Расскажите, что беспокоит и как хотите чувствовать себя после сеанса.
              Подходящую программу, цену и длительность согласуем до визита.
            </p>
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row" key={service.name}>
                <span className="service-index">0{index + 1}</span>
                <div className="service-copy">
                  <h3 data-content={`services.${index}.name`}>{service.name}</h3>
                  <p data-content={`services.${index}.description`}>{service.description}</p>
                  <a
                    className="service-cta"
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Обсудить программу: ${service.name}`}
                  >
                    Обсудить программу
                    <ArrowUpRightIcon />
                  </a>
                </div>
                <span className="service-duration" data-content={`services.${index}.duration`}>
                  {service.duration}
                </span>
                <strong className="service-price" data-content={`services.${index}.price`}>
                  {service.price}
                </strong>
              </article>
            ))}
          </div>

          <p className="service-footnote">
            <strong data-content="services_intro.footnote_title">Не уверены в выборе?</strong>{" "}
            <span data-content="services_intro.footnote_text">
              Опишите желаемый результат мастеру — перед записью уточним детали и подберём программу.
            </span>
          </p>
        </section>

        <section className="section approach" id="about">
          <div className="approach-poster">
            <img
              src="./images/photo-01-room.webp"
              alt="Подготовленный массажный кабинет с мягким тёплым светом"
              width="941"
              height="1672"
              loading="lazy"
            />
            <span className="approach-poster-caption" data-content="about.experience">
              12 лет практики
            </span>
            <p data-content="about.poster_title">Массаж в камерной атмосфере.</p>
            <div className="approach-poster-meta">
              <span data-content="about.poster_tag_1">Без потока</span>
              <span data-content="about.poster_tag_2">По записи</span>
              <span data-content="about.poster_tag_3">В диалоге</span>
            </div>
          </div>
          <div className="approach-copy">
            <h2 data-content="about.title">Меня выбирают</h2>
            <p className="large-copy" data-content="about.intro">
              Когда тело устало от нагрузки, шея и спина остаются напряжёнными,
              а мыслям трудно замедлиться. Цель сеанса — вернуть ощущение лёгкости,
              спокойствия и свободы движения.
            </p>
            <p className="approach-detail" data-content="about.detail">
              За 12 лет практики я убедилась: качество работы начинается с
              внимательной консультации. Поэтому до записи мы обсуждаем
              самочувствие и пожелания, а во время сеанса остаёмся в диалоге.
            </p>
            <blockquote>
              <p data-content="about.quote">
                Мне важно не просто проработать напряжённую зону, а вернуть вам
                ощущение лёгкости и внутреннего покоя.
              </p>
              <footer data-content="about.quote_author">Александра, мастер массажа</footer>
            </blockquote>
          </div>
        </section>

        <section className="section visit">
          <div className="visit-intro">
            <h2 data-content="visit.title">Как записаться</h2>
            <p data-content="visit.lead">От первого сообщения до спокойного завершения визита — четыре понятных шага.</p>
            <div className="visit-progress" aria-hidden="true">
              <span>01</span>
              <i />
              <span>04</span>
            </div>
            <figure className="visit-photo">
              <img
                src="./images/photo-02-table.webp"
                alt="Массажный стол у окна в тёплом кабинете"
                width="941"
                height="1672"
                loading="lazy"
              />
              <figcaption data-content="visit.photo_caption">
                Кабинет готовится к каждому визиту
              </figcaption>
            </figure>
          </div>
          <div className="visit-steps">
            {visitSteps.map((step, index) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3 data-content={`visit.steps.${index}.title`}>{step.title}</h3>
                <p data-content={`visit.steps.${index}.text`}>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section included">
          <div className="included-copy">
            <h2 data-content="included.title">Вам остаётся только прийти</h2>
            <ul>
              {included.map((item, index) => (
                <li key={item}>
                  <span className="included-check">
                    <CheckIcon />
                  </span>
                  <span className="included-label" data-content={`included.items.${index}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="included-aside">
            <img
              src="./images/photo-06-details.webp"
              alt="Чистые полотенца и свечи, подготовленные к сеансу"
              width="1122"
              height="1402"
              loading="lazy"
            />
            <div className="included-aside-caption">
              <p data-content="included.image_title">Всё готово к вашему визиту.</p>
              <span data-content="included.image_text">
                Полотенца, пледы, масла, вода и время спокойно собраться после сеанса.
              </span>
            </div>
          </div>
        </section>

        <section className="section space" id="space">
          <div className="section-heading space-heading">
            <h2 data-content="space.title">Тихое место, где можно выдохнуть</h2>
            <p data-content="space.lead">
              Чисто, тепло и без посторонних во время вашего визита.
            </p>
          </div>
          <div className="space-gallery" aria-label="Фотографии кабинета">
            <figure>
              <img
                src="./images/photo-03-room-v2.webp"
                alt="Массажный кабинет с подготовленным столом и тёплым освещением"
                width="941"
                height="1672"
                loading="lazy"
              />
              <figcaption data-content="space.gallery_caption_1">Тёплый свет</figcaption>
            </figure>
            <figure>
              <img
                src="./images/photo-04-room.webp"
                alt="Просторный массажный стол в камерном кабинете"
                width="941"
                height="1672"
                loading="lazy"
              />
              <figcaption data-content="space.gallery_caption_2">Только один посетитель</figcaption>
            </figure>
            <figure>
              <img
                src="./images/photo-05-lounge.webp"
                alt="Зона отдыха у окна с пледом и мягким вечерним светом"
                width="941"
                height="1672"
                loading="lazy"
              />
              <figcaption data-content="space.gallery_caption_3">Время выдохнуть</figcaption>
            </figure>
          </div>
          <div className="space-grid">
            <article>
              <strong data-content="space.facts.0.title">Чисто</strong>
              <p data-content="space.facts.0.text">
                Одноразовые материалы и свежий текстиль для каждого визита.
              </p>
            </article>
            <article>
              <strong data-content="space.facts.1.title">Тепло</strong>
              <p data-content="space.facts.1.text">
                Спокойная атмосфера и время, чтобы прийти в себя после сеанса.
              </p>
            </article>
            <article>
              <strong data-content="space.facts.2.title">Парковка</strong>
              <p data-content="space.facts.2.text">
                Рядом с домом есть парковка. Детали можно уточнить перед визитом.
              </p>
            </article>
            <article className="space-address">
              <span data-content="space.city">Краснодар</span>
              <strong data-content="space.address">ул. Зиповская, 36</strong>
              <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                <span data-content="space.route_cta">Построить маршрут</span>
                <ArrowUpRightIcon />
              </a>
            </article>
          </div>
        </section>

        <YandexReviews
          organizationUrl={yandexOrganizationUrl}
          widgetUrl={yandexReviewsWidgetUrl}
        />

        <section className="section faq" id="faq">
          <div className="section-heading compact">
            <h2 data-content="faq.title">Частые вопросы</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span data-content={`faq.items.${index}.question`}>{faq.question}</span>
                  <span className="faq-plus" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <p data-content={`faq.items.${index}.answer`}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <h2 data-content="contact.title">Расскажите, как вы себя чувствуете</h2>
            <p data-content="contact.lead">
              В Telegram или MAX обсудим запрос, подберём услугу и согласуем
              удобное время. Без формы, звонков от администратора и рассылок.
            </p>
            <div className="contact-actions">
              <a
                className="button button-dark"
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
                <span data-content="contact.telegram_cta">Написать в Telegram</span>
                <ArrowUpRightIcon />
              </a>
              <a
                className="button button-secondary"
                href={maxUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-content="contact.max_cta">Написать в MAX</span>
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
          <address className="contact-details">
            <div>
              <span data-content="contact.address_label">Адрес</span>
              <strong data-content="contact.address">Краснодар, ул. Зиповская, 36</strong>
              <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                <span data-content="contact.route_cta">Построить маршрут</span>
                <ArrowUpRightIcon />
              </a>
            </div>
            <div>
              <span data-content="contact.hours_label">Время работы</span>
              <strong data-content="contact.hours">Ежедневно, 10:00-21:00</strong>
              <small data-content="contact.hours_note">по предварительной записи</small>
            </div>
            <div>
              <span data-content="contact.contacts_label">Контакты</span>
              <a className="contact-primary" href="tel:+79883879887" data-content="contact.phone">
                8 (988) 387-98-87
              </a>
              <a
                className="contact-secondary"
                href="mailto:sandra.massage.krd@gmail.com"
                data-content="contact.email"
              >
                sandra.massage.krd@gmail.com
              </a>
              <a
                className="contact-secondary"
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-content="contact.telegram"
              >
                Telegram: @sandra_massage
              </a>
              <a
                className="contact-secondary"
                href={maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-content="contact.max"
              >
                MAX: написать мастеру
              </a>
            </div>
          </address>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            <MonogramIcon />
          </span>
          <p>
            <strong data-content="footer.brand">Александра</strong>
            <span data-content="footer.subtitle">массаж в Краснодаре</span>
          </p>
        </div>
        <p className="footer-note" data-content="footer.medical">
          Услуги не являются медицинскими. При наличии противопоказаний нужна
          консультация врача.
        </p>
        <p className="footer-data" data-content="footer.privacy">
          Сайт не использует формы и аналитику. Яндекс-виджет и связанные с ним
          cookies загружаются только после вашего отдельного согласия.
        </p>
      </footer>

      <a
        className="mobile-booking"
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TelegramIcon />
        <span data-content="common.book">Записаться</span>
      </a>

      <script src="./js/site-content.js" defer data-site-content />
    </>
  );
}

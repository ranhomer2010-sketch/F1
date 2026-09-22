const services = [
  {
    name: "Классический массаж",
    description: "Проработка основных мышечных групп для тонуса и восстановления.",
    duration: "60 мин",
    price: "3 000 ₽",
  },
  {
    name: "Массаж спины",
    description: "Внимание к шейно-воротниковой зоне, спине и пояснице.",
    duration: "40-60 мин",
    price: "2 500-3 000 ₽",
  },
  {
    name: "Расслабляющий массаж",
    description: "Мягкий ритм, который помогает снизить напряжение и замедлиться.",
    duration: "60 мин",
    price: "3 000 ₽",
  },
  {
    name: "SPA-программы",
    description: "Уходовые ритуалы для тела. Состав программы подберём в переписке.",
    duration: "по программе",
    price: "от 3 000 ₽",
  },
];

const visitSteps = [
  {
    number: "01",
    title: "Знакомимся",
    text: "Перед записью коротко обсуждаем самочувствие, пожелания и ограничения.",
  },
  {
    number: "02",
    title: "Выбираем формат",
    text: "Определяем подходящий вид массажа, длительность и интенсивность.",
  },
  {
    number: "03",
    title: "Проводим сеанс",
    text: "Работаем в комфортном темпе и сверяемся с вашими ощущениями.",
  },
  {
    number: "04",
    title: "Не торопимся",
    text: "После массажа оставляем несколько минут, чтобы спокойно собраться.",
  },
];

const included = [
  "Предварительная консультация",
  "Индивидуально подобранная техника",
  "Одноразовые материалы и чистый текстиль",
  "Душ до или после сеанса",
  "Вода и время на отдых",
];

const faqs = [
  {
    question: "Как понять, какой массаж мне нужен?",
    answer:
      "Не обязательно выбирать самостоятельно. Напишите, что вас беспокоит и какого результата хочется. Перед записью уточним детали и предложим подходящий формат.",
  },
  {
    question: "Как подготовиться к сеансу?",
    answer:
      "В день визита лучше не планировать плотный приём пищи прямо перед массажем. Возьмите удобную одежду, а всё необходимое для процедуры уже есть в кабинете.",
  },
  {
    question: "Можно ли перенести запись?",
    answer:
      "Да. Пожалуйста, предупредите не менее чем за 24 часа, чтобы мы успели подобрать другое удобное время.",
  },
  {
    question: "Есть ли противопоказания?",
    answer:
      "Да, как и у любой телесной практики. При остром недомогании, температуре, воспалениях или сомнениях сначала проконсультируйтесь с врачом и обязательно сообщите мастеру о состоянии здоровья.",
  },
];

const telegramUrl = "https://t.me/sandra_massage";
const routeUrl =
  "https://yandex.ru/maps/?text=Краснодар%2C%20ул.%20Зиповская%2C%2036";

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
    description: "Персональный массаж в Краснодаре по предварительной записи.",
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
          <a href="#approach">Подход</a>
          <a href="#space">Кабинет</a>
          <a href="#faq">Вопросы</a>
        </nav>

        <a
          className="button button-small"
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
          Записаться
        </a>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>
              Персональный массаж.
              <span>В вашем ритме.</span>
            </h1>
            <p className="hero-lead">
              Сначала разберёмся, что нужно именно вам. Затем подберём технику,
              интенсивность и продолжительность сеанса.
            </p>
            <div className="hero-meta" aria-label="Адрес и время работы">
              <span>
                <LocationIcon />
                Зиповская, 36
              </span>
              <span>
                <ClockIcon />
                Ежедневно 10:00-21:00
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
                Написать мастеру
                <ArrowUpRightIcon />
              </a>
              <a className="text-link" href="#services">
                Посмотреть услуги <ArrowDownIcon />
              </a>
            </div>
            <p className="hero-note">Ответим в Telegram и поможем выбрать формат.</p>
          </div>

          <aside className="hero-visual" aria-label="Индивидуальный формат массажа">
            <MonogramIcon className="hero-monogram" />
            <div className="hero-poster-top">
              <span>Индивидуальный формат</span>
              <span>Краснодар</span>
            </div>
            <div className="hero-poster-time">
              <strong>1:1</strong>
              <span>один мастер и один посетитель — без потока</span>
            </div>
            <div className="hero-poster-bottom">
              <p>Спокойно. Понятно. В комфортном для вас темпе.</p>
              <span className="surfer">для вас</span>
            </div>
          </aside>
        </section>

        <section className="quick-facts" aria-label="Краткая информация">
          <div>
            <span className="fact-number">01</span>
            <p>
              <strong>Зиповская, 36</strong>
              <span>Краснодар</span>
            </p>
          </div>
          <div>
            <span className="fact-number">02</span>
            <p>
              <strong>Ежедневно 10:00-21:00</strong>
              <span>по предварительной записи</span>
            </p>
          </div>
          <div>
            <span className="fact-number">03</span>
            <p>
              <strong>Спокойный частный формат</strong>
              <span>без потока посетителей</span>
            </p>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-heading">
            <h2>Понятный выбор без лишних обещаний</h2>
            <p>
              Итоговый формат определим после короткой консультации. Цена и
              длительность фиксируются до визита.
            </p>
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row" key={service.name}>
                <span className="service-index">0{index + 1}</span>
                <div className="service-copy">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <a
                    className="service-cta"
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Уточнить формат: ${service.name}`}
                  >
                    Уточнить формат
                    <ArrowUpRightIcon />
                  </a>
                </div>
                <span className="service-duration">{service.duration}</span>
                <strong className="service-price">{service.price}</strong>
              </article>
            ))}
          </div>

          <p className="service-footnote">
            <strong>Не уверены в выборе?</strong> Опишите задачу мастеру, перед
            записью уточним детали и подберём формат.
          </p>
        </section>

        <section className="section approach" id="approach">
          <div className="approach-poster" aria-label="Принципы индивидуального подхода">
            <span className="approach-poster-caption">Перед каждым сеансом</span>
            <p>Сначала — понять, что нужно именно вам.</p>
            <div className="approach-poster-meta">
              <span>Самочувствие</span>
              <span>Пожелания</span>
              <span>Интенсивность</span>
            </div>
          </div>
          <div className="approach-copy">
            <h2>Не сеанс по шаблону, а работа с вашим запросом</h2>
            <p className="large-copy">
              Состояние меняется от дня к дню. Поэтому перед каждым визитом мы
              коротко сверяемся: где есть напряжение, какая нагрузка была в
              последнее время и что хочется получить от массажа сегодня.
            </p>
            <blockquote>
              <p>
                Важно, чтобы вам было спокойно, понятно и комфортно на каждом
                этапе.
              </p>
              <footer>Александра, мастер массажа</footer>
            </blockquote>
          </div>
        </section>

        <section className="section visit">
          <div className="visit-intro">
            <h2>Как всё проходит</h2>
            <p>От первого сообщения до спокойного завершения визита.</p>
            <div className="visit-progress" aria-hidden="true">
              <span>01</span>
              <i />
              <span>04</span>
            </div>
          </div>
          <div className="visit-steps">
            {visitSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section included">
          <div className="included-copy">
            <h2>Вам остаётся только прийти</h2>
            <ul>
              {included.map((item) => (
                <li key={item}>
                  <span>
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="included-aside" aria-label="Атмосфера кабинета">
            <p>Всё готово к вашему визиту.</p>
            <span>Вода, душ, чистый текстиль и время спокойно собраться после сеанса.</span>
          </div>
        </section>

        <section className="section space" id="space">
          <div className="section-heading space-heading">
            <h2>Тихое место, где можно выдохнуть</h2>
            <p>
              Чисто, тепло и без посторонних во время вашего визита.
            </p>
          </div>
          <div className="space-grid">
            <article>
              <strong>Чисто</strong>
              <p>Одноразовые материалы и свежий текстиль для каждого визита.</p>
            </article>
            <article>
              <strong>Тепло</strong>
              <p>Спокойная атмосфера и время, чтобы прийти в себя после сеанса.</p>
            </article>
            <article>
              <strong>Приватно</strong>
              <p>Частный формат без потока посетителей и посторонних.</p>
            </article>
            <article className="space-address">
              <span>Краснодар</span>
              <strong>ул. Зиповская, 36</strong>
              <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                Построить маршрут <ArrowUpRightIcon />
              </a>
            </article>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section-heading compact">
            <h2>Частые вопросы</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="faq-plus" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <h2>Расскажите, как вы себя чувствуете</h2>
            <p>
              В Telegram уточним запрос, подберём услугу и согласуем удобное
              время. Без формы, звонков от администратора и рассылок.
            </p>
            <a
              className="button button-dark"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon />
              Написать в Telegram
              <ArrowUpRightIcon />
            </a>
          </div>
          <address className="contact-details">
            <div>
              <span>Адрес</span>
              <strong>Краснодар, ул. Зиповская, 36</strong>
              <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                Построить маршрут <ArrowUpRightIcon />
              </a>
            </div>
            <div>
              <span>Время работы</span>
              <strong>Ежедневно, 10:00-21:00</strong>
              <small>по предварительной записи</small>
            </div>
            <div>
              <span>Контакты</span>
              <a href="tel:+79883879887">8 (988) 387-98-87</a>
              <a href="mailto:sandra.massage.krd@gmail.com">
                sandra.massage.krd@gmail.com
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
            <strong>Александра</strong>
            <span>массаж в Краснодаре</span>
          </p>
        </div>
        <p className="footer-note">
          Услуги не являются медицинскими. При наличии противопоказаний нужна
          консультация врача.
        </p>
        <p className="footer-data">
          Сайт не использует формы, cookies и системы аналитики.
        </p>
      </footer>

      <a
        className="mobile-booking"
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TelegramIcon />
        Записаться
      </a>
    </>
  );
}

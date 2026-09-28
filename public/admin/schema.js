(() => {
  const field = (path, label, type = "text") => ({ path, label, type });
  const serviceFields = Array.from({ length: 4 }, (_, index) => {
    const number = index + 1;
    return [
      field(`services.${index}.name`, `Услуга ${number}: название`),
      field(`services.${index}.description`, `Услуга ${number}: описание`, "textarea"),
      field(`services.${index}.duration`, `Услуга ${number}: длительность`),
      field(`services.${index}.price`, `Услуга ${number}: цена`),
    ];
  }).flat();

  const visitFields = Array.from({ length: 4 }, (_, index) => [
    field(`visit.steps.${index}.title`, `Шаг ${index + 1}: заголовок`),
    field(`visit.steps.${index}.text`, `Шаг ${index + 1}: описание`, "textarea"),
  ]).flat();

  const includedFields = Array.from({ length: 5 }, (_, index) =>
    field(`included.items.${index}`, `Пункт ${index + 1}`),
  );

  const spaceFactFields = Array.from({ length: 3 }, (_, index) => [
    field(`space.facts.${index}.title`, `Преимущество ${index + 1}: заголовок`),
    field(`space.facts.${index}.text`, `Преимущество ${index + 1}: описание`, "textarea"),
  ]).flat();

  const faqFields = Array.from({ length: 7 }, (_, index) => [
    field(`faq.items.${index}.question`, `Вопрос ${index + 1}`),
    field(`faq.items.${index}.answer`, `Ответ ${index + 1}`, "textarea"),
  ]).flat();

  window.ADMIN_SCHEMA = [
    {
      title: "Главный экран",
      description: "Основной оффер, подписи и кнопки первого экрана.",
      fields: [
        field("hero.title_primary", "Главный заголовок"),
        field("hero.title_accent", "Акцентная строка"),
        field("hero.lead", "Описание", "textarea"),
        field("hero.address", "Короткий адрес"),
        field("hero.hours", "Время работы"),
        field("hero.primary_cta", "Основная кнопка"),
        field("hero.secondary_cta", "Вторая кнопка"),
        field("hero.note", "Подпись под кнопками", "textarea"),
        field("hero.badge_primary", "Метка над фото"),
        field("hero.badge_secondary", "Город над фото"),
        field("hero.experience_value", "Опыт: значение"),
        field("hero.experience_label", "Опыт: подпись"),
        field("hero.format_note", "Подпись формата", "textarea"),
      ],
    },
    {
      title: "Краткие факты",
      description: "Три строки сразу после первого экрана.",
      fields: Array.from({ length: 3 }, (_, index) => [
        field(`facts.${index}.title`, `Факт ${index + 1}: заголовок`),
        field(`facts.${index}.subtitle`, `Факт ${index + 1}: подпись`),
      ]).flat(),
    },
    {
      title: "Услуги",
      description: "Заголовки, описания, длительность и цены.",
      fields: [
        field("services_intro.title", "Заголовок раздела"),
        field("services_intro.text", "Вводный текст", "textarea"),
        ...serviceFields,
        field("services_intro.footnote_title", "Подсказка: заголовок"),
        field("services_intro.footnote_text", "Подсказка: текст", "textarea"),
      ],
    },
    {
      title: "О мастере",
      description: "Позиционирование и личный текст Александры.",
      fields: [
        field("about.experience", "Подпись опыта"),
        field("about.poster_title", "Текст на фотографии", "textarea"),
        field("about.poster_tag_1", "Метка 1"),
        field("about.poster_tag_2", "Метка 2"),
        field("about.poster_tag_3", "Метка 3"),
        field("about.title", "Заголовок"),
        field("about.intro", "Первый абзац", "textarea"),
        field("about.detail", "Второй абзац", "textarea"),
        field("about.quote", "Цитата", "textarea"),
        field("about.quote_author", "Подпись цитаты"),
      ],
    },
    {
      title: "Как всё проходит",
      description: "Вступление и четыре шага визита.",
      fields: [
        field("visit.title", "Заголовок"),
        field("visit.lead", "Описание", "textarea"),
        field("visit.photo_caption", "Подпись фотографии"),
        ...visitFields,
      ],
    },
    {
      title: "Что входит",
      description: "Подготовка кабинета и перечень включённого.",
      fields: [
        field("included.title", "Заголовок"),
        ...includedFields,
        field("included.image_title", "Заголовок на фотографии"),
        field("included.image_text", "Подпись на фотографии", "textarea"),
      ],
    },
    {
      title: "Кабинет",
      description: "Атмосфера, преимущества и адрес.",
      fields: [
        field("space.title", "Заголовок"),
        field("space.lead", "Описание", "textarea"),
        field("space.gallery_caption_1", "Подпись фото 1"),
        field("space.gallery_caption_2", "Подпись фото 2"),
        field("space.gallery_caption_3", "Подпись фото 3"),
        ...spaceFactFields,
        field("space.city", "Город"),
        field("space.address", "Адрес"),
        field("space.route_cta", "Кнопка маршрута"),
      ],
    },
    {
      title: "Отзывы",
      description: "Тексты перед загрузкой виджета Яндекс Карт.",
      fields: [
        field("reviews.kicker", "Надзаголовок"),
        field("reviews.title", "Заголовок"),
        field("reviews.lead", "Описание", "textarea"),
        field("reviews.direct_cta", "Ссылка на карточку"),
        field("reviews.status", "Статус виджета"),
        field("reviews.consent_title", "Заголовок согласия"),
        field("reviews.consent_text", "Описание согласия", "textarea"),
        field("reviews.consent_label", "Текст галочки", "textarea"),
        field("reviews.load_cta", "Кнопка загрузки"),
      ],
    },
    {
      title: "Частые вопросы",
      description: "Семь вопросов и ответов.",
      fields: [field("faq.title", "Заголовок раздела"), ...faqFields],
    },
    {
      title: "Контакты",
      description: "Финальный призыв, адрес, график и контакты.",
      fields: [
        field("contact.title", "Заголовок"),
        field("contact.lead", "Описание", "textarea"),
        field("contact.telegram_cta", "Кнопка Telegram"),
        field("contact.max_cta", "Кнопка MAX"),
        field("contact.address_label", "Подпись адреса"),
        field("contact.address", "Адрес"),
        field("contact.route_cta", "Кнопка маршрута"),
        field("contact.hours_label", "Подпись графика"),
        field("contact.hours", "График"),
        field("contact.hours_note", "Примечание к графику"),
        field("contact.contacts_label", "Подпись контактов"),
        field("contact.phone", "Телефон"),
        field("contact.email", "Email"),
        field("contact.telegram", "Подпись Telegram"),
        field("contact.max", "Подпись MAX"),
      ],
    },
    {
      title: "Подвал",
      description: "Название и обязательные пояснения внизу сайта.",
      fields: [
        field("footer.brand", "Название"),
        field("footer.subtitle", "Подпись"),
        field("footer.medical", "Медицинское предупреждение", "textarea"),
        field("footer.privacy", "Пояснение о данных", "textarea"),
      ],
    },
  ];
})();

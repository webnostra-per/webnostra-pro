/**
 * Источники лидов. Используются в submitForm как leadSource.
 * При добавлении новой страницы — добавить сюда.
 * Используется для:
 *   - Telegram-header: "🔥 Новый лид — {label}"
 *   - Meta Pixel content_category
 *   - Яндекс.Метрика цель
 */
export const LEAD_SOURCE_LABELS: Record<string, string> = {
  'homepage': 'главная',
  'about': 'О нас',
  'contacts': 'Контакты',
  'cta-section': 'CTA-блок',
  'footer': 'Футер',
  'header-popup': 'Попап из шапки',

  // Услуги
  'services': 'Услуги (хаб)',
  'meta-ads': 'Meta Ads',
  'yandex-direct': 'Яндекс Директ',
  'google-ads': 'Google Ads',
  'vk-ads': 'VK Ads',
  'creatives': 'Креативы',
  'analytics': 'Аналитика',
  'sales-support': 'Поддержка отдела продаж',

  // Недвижимость
  'real-estate': 'Недвижимость (хаб)',
  'thailand': 'Таиланд',
  'dubai': 'Дубай',
  'bali': 'Бали',
  'north-cyprus': 'Северный Кипр',
  'turkey': 'Турция',
  'georgia': 'Грузия',
  'russia': 'Россия',

  // Районы Пхукета
  'thailand_rawai': 'Пхукет: Раваи',
  'thailand_bang_tao': 'Пхукет: Банг Тао',
  'thailand_kata': 'Пхукет: Ката',
  'thailand_patong': 'Пхукет: Патонг',
  'thailand_chalong': 'Пхукет: Чалонг',

  // Отрасли
  'industries': 'Отрасли (хаб)',
  'industry-real-estate': 'Отрасль: недвижимость',
  'industry-ecommerce': 'Отрасль: e-commerce',
  'industry-edtech': 'Отрасль: инфобизнес',
  'industry-tourism': 'Отрасль: туризм',
  'industry-medical': 'Отрасль: медицина',
  'industry-b2b': 'Отрасль: B2B',

  // Кейсы и блог
  'cases': 'Кейсы (хаб)',
  'case': 'Страница кейса',
  'portfolio': 'Портфолио (хаб)',
  'blog': 'Блог',

  // Длинные ключи со страниц услуг (для различения источника лида)
  'services_hub': 'Услуги (хаб, длинный ключ)',
  'services_meta_ads': 'Услуга: Meta Ads',
  'services_yandex_direct': 'Услуга: Яндекс Директ',
  'services_google_ads': 'Услуга: Google Ads',
  'services_vk_ads': 'Услуга: VK Ads',
  'services_creatives': 'Услуга: Креативы',
  'services_analytics': 'Услуга: Аналитика',
  'services_sales_support': 'Услуга: Поддержка отдела продаж',
};

/**
 * Человекочитаемые названия рынков для payload.
 */
export const MARKET_LABELS: Record<string, string> = {
  'RU': 'Русский',
  'EN': 'Английский',
  'MIX': 'Микс',
  'PL': 'Другой',
};

/**
 * Ограничения на бэкап лидов в localStorage.
 */
export const BACKUP_MAX_LEADS = 200;
export const BACKUP_STORAGE_KEY = 'wn_leads_backup';
export const UTM_SESSION_KEY = 'wn_utm';

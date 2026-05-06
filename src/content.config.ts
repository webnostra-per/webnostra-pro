import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// ═══════════════════════════════════════════════════════════
// КЕЙСЫ — основной контентный формат
// ═══════════════════════════════════════════════════════════
const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    // Идентификация
    title: z.string(),                      // "Premium Villas Phuket"
    client: z.string(),                     // "Premium Villas"
    slug: z.string().optional(),            // если не задан — берётся из имени файла
    published: z.boolean().default(true),   // можно скрыть кейс от публикации
    featured: z.boolean().default(false),   // показывать на главной в CasesFeatured

    // Классификация — для фильтрации и перелинковки
    industry: z.enum([
      'real-estate',
      'e-commerce',
      'edtech',
      'tourism',
      'medical',
      'auto',
      'fitness',
      'franchise',
      'legal',
      'b2b',
      'kids',
      'other',
    ]),
    channels: z.array(z.enum([
      'meta-ads',
      'yandex-direct',
      'google-ads',
      'vk-ads',
      'telegram-ads',
      'yandex-business',
      'avito',
    ])),
    geo: z.string(),                        // "Пхукет, Таиланд" / "Москва" / "Дубай"
    geoSlug: z.string().optional(),         // thailand / russia / dubai — для связи с real-estate
    period: z.string(),                     // "Октябрь 2024 - Февраль 2025" / "6 месяцев"

    // Оффер и описание
    shortDescription: z.string(),           // одна строка для карточки
    problem: z.string(),                    // текст проблемы
    solution: z.string(),                   // текст решения
    insight: z.string().optional(),         // дополнительный инсайт из кейса

    // Метрики — ключевое. Массив пар {value, label} для гибкости
    metrics: z.array(z.object({
      value: z.string(),                    // "$58,514" / "1,721" / "450%"
      label: z.string(),                    // "потрачено" / "квал. лидов" / "ROI"
      highlight: z.boolean().default(false), // выделить золотым
    })),

    // Хедлайн-метрика для карточки в сетке (одна главная цифра)
    headlineValue: z.string(),              // "$3.2M"
    headlineLabel: z.string(),              // "pipeline за 4 месяца"

    // SEO
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: z.string().optional(),       // путь к кастомной OG-картинке
    }).optional(),

    // Дата публикации — для сортировки в списке кейсов
    publishedAt: z.coerce.date(),
  }),
});

// ═══════════════════════════════════════════════════════════
// БЛОГ — пока пустой, но архитектура готова
// ═══════════════════════════════════════════════════════════
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Магош Альшанский'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
  }),
});

// ═══════════════════════════════════════════════════════════
// УСЛУГИ — 6 каналов из JSON
// ═══════════════════════════════════════════════════════════
const services = defineCollection({
  loader: file('./src/content/services.json'),
  schema: z.object({
    id: z.string(),                         // "meta-ads"
    title: z.string(),                      // "Meta Ads"
    titleFull: z.string(),                  // "Реклама в Facebook и Instagram Ads"
    order: z.number(),                      // порядок в сетке
    shortDescription: z.string(),
    icon: z.string().optional(),            // название иконки или эмодзи
    highlight: z.boolean().default(false),  // flagship-канал
    keywords: z.array(z.string()).default([]),
    bestFor: z.array(z.string()).default([]), // ["недвижимость", "e-commerce"]
  }),
});

// ═══════════════════════════════════════════════════════════
// ГЕОГРАФИЯ — 6 стран для real-estate
// ═══════════════════════════════════════════════════════════
const geos = defineCollection({
  loader: file('./src/content/geos.json'),
  schema: z.object({
    id: z.string(),                         // "thailand"
    title: z.string(),                      // "Таиланд"
    titleCase: z.string(),                  // "Реклама недвижимости в Таиланде"
    order: z.number(),
    flag: z.string().optional(),            // "🇹🇭"
    languages: z.array(z.string()),         // ["Русский", "English", "ไทย"]
    markets: z.array(z.string()),           // ["Пхукет", "Паттайя", "Бангкок"]
    casesCount: z.number(),                 // сколько есть кейсов по этой стране
    highlight: z.boolean().default(false),  // флагманский рынок
    shortDescription: z.string(),
  }),
});

// ═══════════════════════════════════════════════════════════
// ОТРАСЛИ — для industries hub
// ═══════════════════════════════════════════════════════════
const industries = defineCollection({
  loader: file('./src/content/industries.json'),
  schema: z.object({
    id: z.string(),                         // "real-estate"
    title: z.string(),                      // "Недвижимость"
    titleCase: z.string(),                  // "Реклама для застройщиков и агентств"
    order: z.number(),
    shortDescription: z.string(),
    casesCount: z.number(),
    highlight: z.boolean().default(false),  // флагманская отрасль
    keyMetric: z.string().optional(),       // "$2.8M бюджетов / 200+ проектов"
  }),
});

// ═══════════════════════════════════════════════════════════
// КОМАНДА
// ═══════════════════════════════════════════════════════════
const team = defineCollection({
  loader: file('./src/content/team.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    roleFull: z.string().optional(),
    avatar: z.string(),                     // инициал или путь к фото
    authorUrl: z.string().optional(),       // ссылка на /authors/<id>/ если есть профиль
    isFounder: z.boolean().default(false),
    order: z.number(),
    bio: z.string().optional(),
    tags: z.array(z.string()).default([]),
    social: z.object({
      telegram: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(),
  }),
});

// ═══════════════════════════════════════════════════════════
// FAQ — пул вопросов с тегами, чтобы выбирать нужные под страницу
// ═══════════════════════════════════════════════════════════
const faq = defineCollection({
  loader: file('./src/content/faq.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    // Теги: какие страницы показывают этот вопрос, плюс технические теги темы
    // Оставлено свободным z.string() чтобы не править схему при добавлении новых ниш/тем
    tags: z.array(z.string()),
    order: z.number().optional(),
  }),
});

// ═══════════════════════════════════════════════════════════
// CURRENT STATUS — живая метка «сейчас в работе»
// ═══════════════════════════════════════════════════════════
const currentStatus = defineCollection({
  loader: file('./src/content/current-status.json'),
  schema: z.object({
    id: z.literal('current'),
    clients: z.number(),
    budget: z.string(),                     // "$224K" — строкой, чтобы форматирование оставалось
    period: z.string(),                     // "в этом месяце"
    updatedAt: z.coerce.date(),
  }),
});

// ═══════════════════════════════════════════════════════════

export const collections = {
  cases,
  blog,
  services,
  geos,
  industries,
  team,
  faq,
  currentStatus,
};

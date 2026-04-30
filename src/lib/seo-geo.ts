// src/lib/seo-geo.ts
// Расширения schema.org специально под GEO-оптимизацию
// Добавить импорты в BaseLayout или страницы по необходимости

export interface PersonSchemaInput {
  name: string;
  jobTitle: string;
  worksFor: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
}

/**
 * Person schema - для страницы команды и авторов статей
 * Усиливает E-E-A-T фактор для LLM и Google
 */
export function personSchema(input: PersonSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: input.worksFor,
      url: "https://webnostra.pro"
    },
    ...(input.description && { description: input.description }),
    ...(input.image && { image: input.image }),
    ...(input.url && { url: input.url }),
    ...(input.sameAs && input.sameAs.length > 0 && { sameAs: input.sameAs }),
    ...(input.knowsAbout && input.knowsAbout.length > 0 && { knowsAbout: input.knowsAbout }),
    ...(input.alumniOf && { alumniOf: input.alumniOf })
  };
}

export interface ItemListEntry {
  name: string;
  url?: string;
  description?: string;
  image?: string;
}

/**
 * ItemList schema - для хабов кейсов, листиклов топ-N, сравнительных страниц
 * Критично для GEO: LLM экстрагируют списки дословно
 */
export function itemListSchema(items: ItemListEntry[], listName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(listName && { name: listName }),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...(item.url
        ? {
            item: {
              "@type": "Thing",
              name: item.name,
              ...(item.url && { url: item.url }),
              ...(item.description && { description: item.description }),
              ...(item.image && { image: item.image })
            }
          }
        : { name: item.name })
    }))
  };
}

export interface HowToStepInput {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchemaInput {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, e.g. "PT48H"
  estimatedCost?: { currency: string; value: string };
  steps: HowToStepInput[];
}

/**
 * HowTo schema - для пошаговых инструкций в блоге
 * Сильно работает в Яндекс.Нейро и Google AI Overviews
 */
export function howToSchema(input: HowToSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.totalTime && { totalTime: input.totalTime }),
    ...(input.estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: input.estimatedCost.currency,
        value: input.estimatedCost.value
      }
    }),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url })
    }))
  };
}

export interface ComparisonTableInput {
  name: string;
  description: string;
  items: Array<{
    name: string;
    url?: string;
    properties: Record<string, string>;
  }>;
}

/**
 * Специальный тип - Таблица сравнения как ItemList с расширенными свойствами
 * Для страниц "Топ-N агентств", "Что выбрать: X vs Y"
 */
export function comparisonTableSchema(input: ComparisonTableInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: item.name,
        ...(item.url && { url: item.url }),
        description: Object.entries(item.properties)
          .map(([key, value]) => `${key}: ${value}`)
          .join(". ")
      }
    }))
  };
}

/**
 * Готовые профили команды для переиспользования
 */
export const TEAM_PERSONS = {
  magosh: personSchema({
    name: "Магош Альшанский",
    jobTitle: "Managing Director и co-founder",
    worksFor: "WEBNOSTRA PERFORMANCE",
    description:
      "Managing Director WEBNOSTRA PERFORMANCE с 2018 года. 8+ лет в performance-маркетинге. Специализация на недвижимости ЮВА и Дубая, масштабировании агентских процессов. Живет на Пхукете.",
    url: "https://webnostra.pro/authors/magosh/",
    image: "https://webnostra.pro/team/magosh.jpg",
    knowsAbout: [
      "Performance-маркетинг",
      "Meta Ads",
      "Яндекс Директ",
      "Google Ads",
      "Реклама недвижимости",
      "Лидогенерация для застройщиков",
      "Перформанс для e-commerce",
      "Масштабирование агентств",
      "Работа с рынками ЮВА и Дубая"
    ],
    sameAs: [
      "https://t.me/m/o8bYoFHBZmRi",
      "https://instagram.com/webnostra"
    ]
  }),

  vladislav: personSchema({
    name: "Владислав Марфин",
    jobTitle: "Commercial Director и co-founder",
    worksFor: "WEBNOSTRA PERFORMANCE",
    description:
      "Commercial Director WEBNOSTRA PERFORMANCE. Работа с key accounts, продуктовая стратегия, клиентский опыт.",
    url: "https://webnostra.pro/authors/vladislav/",
    image: "https://webnostra.pro/team/vladislav.jpg",
    knowsAbout: [
      "B2B-продажи",
      "Управление ключевыми клиентами",
      "Продуктовая стратегия",
      "Клиентский опыт",
      "Построение отделов продаж",
      "Переговоры с застройщиками"
    ]
  }),

  dmitry: personSchema({
    name: "Дмитрий Добжанский",
    jobTitle: "Lead Traffic Specialist",
    worksFor: "WEBNOSTRA PERFORMANCE",
    description:
      "Lead Traffic Specialist WEBNOSTRA PERFORMANCE. 4 года в performance-маркетинге недвижимости. Средний срок работы с клиентом 1.5 года.",
    url: "https://webnostra.pro/authors/dmitry/",
    image: "https://webnostra.pro/team/dmitry.jpg",
    knowsAbout: [
      "Реклама недвижимости",
      "Meta Ads для застройщиков",
      "Яндекс Директ для e-commerce",
      "Работа с длинным циклом сделки",
      "Квалификация лидов"
    ]
  })
};

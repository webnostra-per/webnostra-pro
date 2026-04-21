# WEBNOSTRA PERFORMANCE — SEO-сайт

Performance-маркетинговое агентство. Сайт на Astro 5.17, деплой на Netlify.

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать env-файл и заполнить (для Netlify это настраивается в UI)
cp .env.example .env

# 3. Запустить dev-сервер
npm run dev
# → http://localhost:4321

# 4. Билд для продакшна
npm run build

# 5. Превью продакшн-билда локально
npm run preview
```

## Структура проекта

```
src/
├── content.config.ts         # Zod-схемы всех collections
├── content/
│   ├── cases/                # Кейсы в MDX (добавляй новые .mdx здесь)
│   ├── blog/                 # Блог в MDX (пока пусто)
│   ├── team.json             # Команда
│   ├── services.json         # 6 каналов
│   ├── geos.json             # 6 стран недвижимости
│   ├── industries.json       # Отрасли
│   ├── faq.json              # Пул FAQ с тегами
│   └── current-status.json   # Живая метка «в работе: N клиентов»
│
├── layouts/                  # Базовые layout-обёртки
├── components/               # Переиспользуемые UI-компоненты
├── lib/                      # Бизнес-логика (формы, SEO-хелперы)
├── styles/global.css         # Токены + базовая типографика
└── pages/                    # Маршруты (файловая система = URL)
```

## Добавление нового кейса

1. Создать файл `src/content/cases/<slug>.mdx`
2. Заполнить фронтматтер (см. `src/content.config.ts` для полной схемы)
3. Написать тело кейса (опционально)
4. Сайт пересоберётся автоматически при деплое

Минимальный пример:

```mdx
---
title: "Premium Villas Phuket"
client: "Premium Villas"
industry: "real-estate"
channels: ["meta-ads", "google-ads"]
geo: "Пхукет, Таиланд"
geoSlug: "thailand"
period: "6 месяцев"
shortDescription: "7 сделок по $450K через VR-туры и онлайн-встречи"
problem: "Цикл сделки 3-6 месяцев..."
solution: "Создали интерактивный каталог..."
metrics:
  - { value: "89", label: "квал. лидов", highlight: false }
  - { value: "7", label: "сделок", highlight: true }
  - { value: "$450K", label: "ср. чек", highlight: false }
  - { value: "$3.2M", label: "pipeline", highlight: true }
headlineValue: "$3.2M"
headlineLabel: "pipeline за 4 месяца"
featured: true
publishedAt: 2025-02-01
---

Опциональный текст кейса — если нужен длинный разбор.
```

## Деплой на Netlify

1. Залить репо на GitHub
2. В Netlify: **Add new site → Import an existing project** → выбрать репо
3. Build settings подхватятся автоматически из `netlify.toml`
4. В **Site Settings → Environment Variables** добавить все переменные из `.env.example`
5. Привязать домен `webnostra.pro` в **Domain Management**

## Аналитика и формы

- **Лиды** уходят в Albato webhook + Telegram-бот параллельно, с локальным бекапом в `localStorage`
- **Meta Pixel** отслеживает `Lead` event
- **Яндекс.Метрика** отслеживает цель `lead`
- Утилиты консоли браузера: `wnGetAllLeads()`, `wnGetFailedLeads()`, `wnExportLeadsCsv()`

## Контакты

- Email: ceo@webnostra.pro
- Telegram: https://t.me/m/o8bYoFHBZmRi
- Канал: https://t.me/+uiQBTcL9yw9mOGVi
- Instagram: https://instagram.com/webnostra

# WEBNOSTRA PERFORMANCE - состояние проекта

**Дата:** 21.04.2026
**Актуальная версия:** v2.15 (Сессия 5 - подготовка к деплою, финальная вычитка)
**Статус:** билд проходит (47 страниц, ~13-18с), в прод НЕ задеплоено
**Следующая задача:** Сессия 5 финалка - юрист на privacy/offer + env в Netlify + Сессия 6 деплой

Этот файл - живой state проекта. Общие инструкции по бренду/стилю - в PROJECT-INSTRUCTIONS.md. Справочник компонентов - в COMPONENTS-REFERENCE.md (обязательно читать перед работой).

---

## Критически важное

### Имена
- **Магош Альшанский** - Managing Director, co-founder. НЕ Магомет Апаев, НЕ Магош Апаев.
- **Владислав Марфин** - Commercial Director, co-founder.
- **Дмитрий Добжанский** - Lead Traffic Specialist, ведет недвижимость.
- **Марат** - Head of AI (WEBNOSTRA AI), автоматизации.

### Бренд-правила
- WEBNOSTRA PERFORMANCE всегда CAPS (кроме слова "performance" как индустриального термина).
- 0 em-dashes (—), 0 en-dashes (–), только обычные тире (-).
- 0 буквы "ё", только "е".

### Ключевые цифры
- $3M+ освоено в 2025 году
- 200+ проектов
- 15+ специалистов
- x5 средний ROI
- 8+ лет опыта, с 2018

---

## Что сделано по сессиям

### Сессия 1 (готово)
Архитектура + главная + 11 MDX-кейсов + миграция легаси в public/.

### Сессия 2 (готово, v2.10)
7 страниц услуг + хаб /services/.

### Сессия 3 (готово, v2.11)
7 страниц стран недвижимости + хаб /real-estate/ + 6 новых MDX-кейсов + FAQ +18 вопросов + фикс меню.

### Сессия 4 (готово, v2.12)
7 страниц отраслей + хаб /industries/ + /about/ + /contacts/ + /privacy/ + /offer/ + Service schema на 7 услугах + LocalBusiness schema на /contacts/ + FAQ расширен +28 вопросов (82 → 110).

### Сессия 4.5 (готово, v2.14) - UX-правки форм
- Глобальный попап LeadPopup для страниц без CtaSection
- Чекбокс согласия с политикой 152-ФЗ во всех формах
- Унификация якорей #form → #form-final

### Сессия 5 (готово, v2.15) - подготовка к деплою

**Блок А - Визуальные ассеты:**
- `public/favicon.ico` (3.7К, multi-size 16/32/48)
- `public/apple-touch-icon.png` (5.5К, 180×180)
- `public/og-default.jpg` (70К, 1200×630, брендовый стиль)
- В BaseHead добавлен `<link rel="icon" type="image/x-icon">` как fallback для Яндекса

**Блок Б - Верификация поисковиков:**
- В `BaseHead.astro` добавлен условный рендер meta-тегов `google-site-verification` и `yandex-verification`
- Рендерятся только если заданы env `PUBLIC_GSC_VERIFICATION` и `PUBLIC_YANDEX_VERIFICATION`
- В `.env` добавлены закомментированные плейсхолдеры (Магош заполнит после получения кодов)

**Блок В - Netlify-конфигурация:**
- `netlify.toml` переписан с полным набором security headers
- Добавлен HSTS (`max-age=31536000; includeSubDomains; preload`)
- Добавлен CSP с точным whitelist доменов:
  - Яндекс.Метрика: `mc.yandex.ru`, `mc.yandex.com`, `yastatic.net`
  - Meta Pixel: `connect.facebook.net`, `www.facebook.com`
  - Google Fonts: `fonts.googleapis.com`, `fonts.gstatic.com`
  - Albato: `h.albato.ru`
  - Telegram Bot API: `api.telegram.org`
- Добавлен `interest-cohort=()` в Permissions-Policy (блокирует FLoC)
- Cache-headers для favicon/og/apple-touch (неделя)
- Сохранены все существующие redirects и edge-function для `/phuket-*`

**Блок Г - Финальная вычитка:**
Автоматическая проверка показала 298 em-dash + 58 ё + 9 неизвестных leadSource + 13 en-dash. Все исправлено:
- `LeadForm.astro`: em-dash в метке "Рынок - опционально" (один фикс убрал ~90 отображаемых вхождений на всех страницах)
- 12 MDX-кейсов: 107 замен (em-dash → -, ё → е) в контенте и frontmatter
- 5 .astro-страниц (404, portfolio/index, portfolio/[slug], real-estate/russia, services/creatives): точечные замены с защитой JSDoc/CSS/script комментариев
- 2 файла с en-dash (index.astro, premium-villas-phuket.mdx): 13 замен интервалов типа "30–50%" → "30-50%"
- `constants.ts`: добавлены 9 недостающих leadSource (portfolio, services_hub, services_meta_ads, services_yandex_direct, services_google_ads, services_vk_ads, services_creatives, services_analytics, services_sales_support)

**Финальная автопроверка v2.15 (по всем 47 Astro-страницам):**
- em-dash в контенте: 0
- en-dash в контенте: 0
- ё в контенте: 0
- undefined в HTML: 0
- wrong brand case (Webnostra): 0
- href=#form (устаревший якорь): 0
- Битые внутренние ссылки: 0 (проверено 140 HTML включая легаси)
- Все leadSource зарегистрированы в LEAD_SOURCE_LABELS

**Билд v2.15:** 47 страниц, 13.39с, ошибок нет. Все ассеты в dist/. Sitemap корректен.

---

## Текущее состояние

### Структура Astro-страниц (47 всего)
- `/` - главная
- `/404/` - ошибка (sticky=false, попап в шапке работает)
- `/portfolio/` - хаб Astro-кейсов (17 MDX)
- `/portfolio/<slug>/` - 17 MDX-кейсов (есть Cta-блок через CtaSection)
- `/services/` - хаб услуг
- `/services/<slug>/` - 7 страниц услуг (все с CtaSection id=form-final)
- `/real-estate/` - хаб недвижимости
- `/real-estate/<country>/` - 7 стран
- `/industries/` - хаб отраслей
- `/industries/<slug>/` - 6 отраслей
- `/about/`, `/contacts/` - с CtaSection
- `/privacy/`, `/offer/` - sticky=false, попап в шапке работает

### Визуальные ассеты в public/
- `favicon.ico` - multi-size 16/32/48
- `favicon.svg` - векторный (для современных браузеров)
- `apple-touch-icon.png` - 180×180
- `og-default.jpg` - 1200×630 для соцсетей

### Легаси в public/ (не тронуто)
- `/cases/*` - 58 HTML-кейсов
- `/ai/*`, `/performance/*`, `/files/*`, `/team/*` - как было

### FAQ состояние
110 записей с тегами: real-estate (23), analytics (12), meta-ads (10), yandex-direct (10), vk-ads (10), creatives (10), general (9), google-ads (9), pricing (8), sales-support (8), home (7), timeline (7), infrastructure (6), e-commerce (4), edtech (4), tourism (4), medical (4), b2b (4), industries (2), about (3), contacts (3), russia (дополнительный после Сессии 3), и другие.

### MDX-кейсы по industry
- real-estate: 9, e-commerce: 2 (luding, toytrick), edtech: 2 (beyond-taylor, algoritmika), tourism: 2 (phuket-excursions, kmv-sanatoria), medical: 1 (stomatology-spb), kids: 1 (tropicano), b2b: 0 (все inline).

---

## Открытые вопросы / блокеры деплоя

1. **Privacy и Offer - юридический review (БЛОКЕР деплоя).**
   Написаны на типовой базе 152-ФЗ. Перед деплоем показать юристу Магоша. Даты редакций в доках: 21 апреля 2026.

2. **Env-переменные верификации заполнить перед деплоем:**
   - `PUBLIC_GSC_VERIFICATION` - взять в Google Search Console → Settings → Ownership verification → HTML tag
   - `PUBLIC_YANDEX_VERIFICATION` - взять в Яндекс.Вебмастер → Настройки → Права доступа → Мета-тег
   - Переменные добавить и в `.env` локально, и в Netlify → Site Settings → Environment Variables

3. **Featured-кейсы на главной** - остались прежние 11. Стоит ли поднять какой-то из новых 6 (country-houses с 20 продажами/мес, phuket-developer с $8 за лид)? Магош не решил.

4. **Beyond Taylor "80 продаж"** в `/services/sales-support/` - из Сессии 2. Цифры нет в PDF, Магош пока не подтвердил.

5. **CSP может потребовать тюнинга после деплоя.** Если какой-то инлайн-скрипт Astro сломается, смотреть браузерную консоль → добавить нужный хост в директиву. Наиболее вероятный кандидат - какой-нибудь дополнительный домен YM или Meta Pixel.

---

## Следующая задача: Сессия 6 - деплой в прод

### Что сделать Магошу ПЕРЕД деплоем

1. Показать юристу `src/pages/privacy.astro` и `src/pages/offer.astro`. Внести правки.
2. Получить коды верификации в GSC и Яндекс.Вебмастере, положить в `.env`:
   ```
   PUBLIC_GSC_VERIFICATION=<код>
   PUBLIC_YANDEX_VERIFICATION=<код>
   ```
3. В Netlify → Site Settings → Environment Variables добавить ВСЕ переменные из `.env`, включая новые `PUBLIC_GSC_VERIFICATION` и `PUBLIC_YANDEX_VERIFICATION`.
4. Сделать резервную копию текущего `webnostra-strategy` (актуальный прод) - на случай отката.
5. Протестировать локально: `npm run build && npm run preview`.
6. Запушить в `webnostra-pro` на github: `git add -A && git commit -m "v2.15 ready for production" && git push`.

### Что будет делать Сессия 6

1. Деплой `webnostra-pro` в Netlify (preview-URL типа `*.netlify.app`).
2. Проверка preview: все страницы, формы, аналитика, попап, мобильная версия.
3. Проверка security headers через securityheaders.com (ожидаем A+).
4. Переключение DNS `webnostra.pro` на новый репо (делает Магош).
5. После переключения:
   - Верификация в GSC (должна пройти мгновенно т.к. мета-тег уже в HTML).
   - Верификация в Яндекс.Вебмастере.
   - Отправка sitemap в обе панели: `https://webnostra.pro/sitemap-index.xml`.
   - Опционально: Google Analytics 4 (в дополнение к Я.Метрике).
6. Постдеплой-мониторинг первую неделю:
   - Формы работают (тестовый лид с каждой страницы).
   - Лиды приходят в Telegram + Albato + localStorage.
   - Метрика и Pixel собирают события.
   - CSP не ломает скриптов (проверить консоль на ошибках).

### Что обязательно перед Сессией 6

1. Прочитать `COMPONENTS-REFERENCE.md`.
2. Запустить `npm run build` - убедиться что билд работает.
3. Получить от Магоша юридическое подтверждение privacy и offer.
4. Получить коды верификации GSC и Яндекс.

---

## Переменные окружения (в .env)

```
PUBLIC_ALBATO_WEBHOOK=https://h.albato.ru/wh/38/1lfbu2f/vsiGktuenA0Cylhee_lGrBN2mSA4JXQNtW3Dtj6D4Ps/
PUBLIC_TG_BOT_TOKEN=8736522279:AAEt7FLqxE2AFheHE2ftOsqqmXxiAQT9Qpw
PUBLIC_TG_CHAT_ID=-1002474936647
PUBLIC_YM_ID=96858541
PUBLIC_META_PIXEL_ID=1399100830794020
PUBLIC_CONTACT_EMAIL=ceo@webnostra.pro
PUBLIC_CONTACT_TELEGRAM=https://t.me/m/o8bYoFHBZmRi
PUBLIC_CONTACT_WHATSAPP=https://wa.me/77066671426
PUBLIC_CONTACT_INSTAGRAM=https://instagram.com/webnostra
PUBLIC_CONTACT_TG_CHANNEL=https://t.me/+uiQBTcL9yw9mOGVi
PUBLIC_SITE_URL=https://webnostra.pro

# Будет заполнено перед деплоем
PUBLIC_GSC_VERIFICATION=<получить в Search Console>
PUBLIC_YANDEX_VERIFICATION=<получить в Яндекс.Вебмастере>
```

---

## Локальная инфраструктура

- Папка: `~/Desktop/webnostra-pro/`
- Dev URL: `http://localhost:4321` (или 4322)
- Git repo: `webnostra-pro` на github
- Домен webnostra.pro пока указывает на старый репо `webnostra-strategy`

## Быстрые команды

```bash
# Запуск локально
cd ~/Desktop/webnostra-pro && npm run dev

# Обновление из архива v2.15
cd ~/Desktop/webnostra-pro
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
unzip -q ~/Downloads/webnostra-pro-v2_15.zip -d /tmp/new
mv /tmp/new/webnostra-pro/* .
mv /tmp/new/webnostra-pro/.* . 2>/dev/null
rm -rf /tmp/new node_modules package-lock.json
npm install && npm run dev

# Билд
npm run build

# Деплой (когда все готово)
git add -A && git commit -m "v2.15 - production ready" && git push origin main
```

---

## Типовые ошибки прошлых сессий (не повторять)

1. **Не передавать лишние пропсы компонентам.** COMPONENTS-REFERENCE.md - единственный источник правды по пропсам.

2. **Проверять схему коллекции ДО записи данных.** Если схема enum или required - JSON упадет на билде.

3. **Меню и футер подтягивают services/geos/industries из коллекций.** Добавил в JSON - автоматически в меню. Не нужно вручную в Navigation/Footer.

4. **TOC id = section id.** Всегда проверяй что id в toc-массиве равны id на секциях.

5. **Шаблон страницы:** HeroLeaf -> Toc -> секции -> Faq -> CtaSection id="form-final". Этот паттерн работает для страны, услуги, отрасли.

6. **Все inline-кейсы должны быть из PDF.** Не выдумывать цифры.

7. **featured: true на MDX-кейсах** - поднимает их на главную. Не ставить просто так.

8. **FAQ теги** - если добавляешь новую страницу с <Faq tag="xxx" />, в faq.json должны быть вопросы с этим тегом.

9. **Билд занимает ~10-17 сек** на локале. Прогоняй перед каждым сохранением архива - это ловит 95% проблем.

10. **Пропс BaseLayout - `canonicalPath`, не `canonical`.** Старые страницы услуг передают `canonical` - он игнорируется, работает fallback на Astro.url.pathname.

11. **Env-переменные в страницах** - через `import.meta.env.PUBLIC_*`. Проверять что в собранном HTML нет `undefined`.

12. **Schema.org помимо Organization** передавать через пропс `structuredData={schema}` в BaseLayout. Organization добавляется автоматически, остальное объединяется через `allSchemas` в BaseLayout.

13. **Якоря CTA = #form-final.** НЕ `#form` (был старый inconsistent якорь, в v2.14 унифицированы). Если якоря нет на странице - умный handler в BaseLayout откроет попап `LeadPopup`.

14. **LeadPopup монтируется ОДИН раз в BaseLayout.** Не надо добавлять на страницы отдельно. Открытие через `data-open-lead-popup` атрибут или `window.openLeadPopup()`.

15. **При упаковке архива - НЕ делать `mv` внутри webnostra-pro.** Если нужно переименовать папку - делать извне через `cd ..` и затем `mv`. Иначе получается вложенная подпапка и потом можно её случайно удалить вместе с правками (история v2.13 → v2.14).

16. **Бренд-правила проверять автоматически.** В Сессии 5 найдено 298 em-dash + 58 ё в собранном HTML из-за того что при создании страниц иногда прокрадывались. Перед упаковкой версии прогонять полный скан dist/ на em-dash/en-dash/ё/брендовое написание.

17. **leadSource должен быть в LEAD_SOURCE_LABELS.** Если на странице `leadSource="custom_key"`, и этого ключа нет в `src/lib/constants.ts`, лид в Telegram придет с сырым ключом без красивого заголовка. В Сессии 5 нашли 9 таких несовпадений, добавили в constants.

---

## Security headers после деплоя (проверить)

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Content-Security-Policy` с whitelist YM/Pixel/Albato/Telegram/Fonts

Ожидаемый рейтинг на securityheaders.com: **A** или **A+**.

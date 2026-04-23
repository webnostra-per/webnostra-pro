# WEBNOSTRA PERFORMANCE - состояние проекта

**Дата:** 24.04.2026
**Актуальная версия:** v2.25 (Сессия 15.2 закрыта, в патче zip к деплою)
**Статус:** билд чистый, 103 страницы, 23 сек, на webnostra.pro (после push)
**Следующая задача:** не определена - на выбор: блог-кластер "Инфобиз", технические хвосты, "Туризм/медицина", локальное SEO

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
- 0 em-dashes (-), только обычные тире (-).
- 0 буквы "е", только "е".

### Ключевые цифры
- $3M+ освоено в 2025 году
- 200+ проектов
- 15+ специалистов
- x5 средний ROI
- 8+ лет опыта, с 2018

### Контакты (новое в v2.19.1)
- Email: ceo@webnostra.pro
- Телефон: +66 96 792 14 86 (виден в футере, на /contacts/, в /privacy/)
- Telegram, WhatsApp, Instagram, TG-канал

---

## Что сделано по сессиям

### Сессии 1-7 (v2.10 - v2.16)
Архитектура, 47 страниц, прод-деплой, PageSpeed, Article schema, чекбокс 152-ФЗ.

### Сессия 8 (готово, v2.17) - 6 medical-кейсов
+6 MDX по стоматологии (Прага, Алматы, Астана, Дубай, Минск, СПб).

### Сессия 9 (готово, v2.18) - GEO-фундамент
- llms.txt + llms-full.txt + robots.txt для AI-crawlers
- Компоненты QuickAnswer, LastUpdated, AuthorByline в /src/components/seo/
- /authors/magosh/ с Person schema
- TEAM_PERSONS в src/lib/seo-geo.ts (Магош, Владислав, Дмитрий, Марат)

### Сессия 10 (готово, v2.19.2) - GEO-развертывание + блог + телефон

**1. QuickAnswer + LastUpdated на 25 страницах:**
- 7 услуг, 7 стран недвижимости, 6 отраслей, 4 хаба
- Компоненты переписаны с собственной section.container.narrow оберткой - встают по ширине контента (960px)

**2. AuthorByline на 26 страницах через 2 template:**
- /portfolio/[slug].astro - на все 23 MDX-кейса
- /blog/[slug].astro - на все 3 листикла

**3. ItemList schema:**
- /portfolio/ - 23 кейса в JSON-LD
- /blog/ - 3 статьи

**4. Блог /blog/ - 3 пилотных листикла:**
- top-10-agentstv-nedvizhimosti-phuket (1,800 слов)
- meta-ads-vs-yandex-direct-dlya-nedvizhimosti (1,900 слов)
- kak-vybrat-performance-agentstvo (2,100 слов)

**5. Блог-инфраструктура:**
- /src/pages/blog/index.astro и [slug].astro
- /src/content/blog/ с 3 MDX
- "Блог" в Navigation (desktop + mobile) и Footer
- astro.config.mjs снят filter скрывавший /blog/ из sitemap

**6. Телефон +66 96 792 14 86:**
- Footer всех страниц первой строкой в "Контакты"
- /contacts/ отдельная карточка "Телефон" + telephone в LocalBusiness schema
- /privacy/ раздел 12 список с email и телефоном
- Через env: PUBLIC_CONTACT_PHONE=+66967921486, PUBLIC_CONTACT_PHONE_DISPLAY=+66 96 792 14 86

**7. Удалена публичная стоимость наших услуг:**
- Секции <section id="pricing"> на всех 7 страницах услуг (там были конкретные цены $1,500-$5,000 абонент)
- Пункты TOC "Сколько это стоит" / "Как это оплачивается"
- "Модель работы: Абонемент с fee + %" в QA на /services/ - заменено на "Средний срок работы с клиентом: 1.5 года"
- "Входит в абонентскую плату" в meta-description sales-support
- "Абонентское сопровождение" в QA sales-support - заменено на "длительное сопровождение"
- В листикле top-10-agentstv-phuket убран наш минимум $5,000/мес, в таблице "WEBNOSTRA - По согласованию"

**Что сохранено (это не наша стоимость):**
- Чеки сделок клиентов ($80K-450K и т.д.)
- CPL метрики в кейсах
- Минимальные рекламные бюджеты в QA - это бюджет клиента на рекламу, а не наша цена
- /offer/ юридический текст про стоимость услуг

**Известные проблемы Сессии 10 (решены, в уроки):**

1. Скрипт массовой вставки QuickAnswer через String.replace(regex, str) с $N в данных - в JS символ `$` + цифра воспринимается как regex backreference. Любое value с $1, $2... ($15K, $250K, $8,000) ломало замену - вставлялся лишний HeroLeaf. 10 файлов починены вручную.

2. astro.config.mjs sitemap filter содержал `!page.includes('/blog/')` с Сессии 1 - забыли снять при добавлении блога. Сделали отдельный коммит.

3. QuickAnswer и LastUpdated изначально вставлялись напрямую в main без контейнера - растягивались на весь экран. Переписаны с собственной оберткой `section > div.container.narrow > aside.quick-answer`.

### Сессия 11 (готово, v2.20) - блог-кластер "Недвижимость ЮВА"

**7 экспертных статей в /blog/** (общий объем ~12,200 слов):

Первая волна (приоритет, максимум наших кейсов с цифрами):
- phuket-vs-pattaya-dlya-zastroyshchika (2,213 слов) - гибрид трех принципов сравнения: аудитория, каналы, unit-экономика. Опора на кейсы Premium Villas, NextPoint, Phuket Developer, IBG Property
- russkie-investory-dubai-shemy-oplaty (2,075 слов) - три схемы оплаты: крипта (USDT), счет в ОАЭ через 3-ю юрисдикцию, наличные и смешанные. Опора на кейс Dubai Real Estate (12 сделок, $450K ср. чек)
- sezonnost-reklamy-nedvizhimosti-yua (1,910 слов) - сезонные паттерны Пхукета, Бали, Вьетнама. Календарь CPL по месяцам, распределение годового бюджета, синхронизация с отделом продаж

Вторая волна (страновые гайды):
- leasehold-na-bali-kak-rabotaet (1,530 слов) - юридика leasehold, цены, юридические риски, аудитория
- vnzh-severnyy-kipr-cherez-nedvizhimost (1,415 слов) - программа ВНЖ ТРСК через недвижимость от $80K, Turkish Title vs Exchange Title
- grazhdanstvo-turcii-cherez-nedvizhimost (1,557 слов) - CBI Турции за $400K, процедура, сегменты аудитории
- gruziya-dlya-relokantov-nedvizhimost (1,513 слов) - Тбилиси vs Батуми, ВНЖ через недвижимость или ИП, налоги

**Обновлен public/llms-full.txt** - в раздел "Блог и экспертные материалы" добавлены 7 новых URL с описаниями.

**Структура существующих файлов блога НЕ менялась:**
- /src/pages/blog/index.astro сам сортирует по publishedAt, новые статьи автоматически становятся первыми
- /src/pages/blog/[slug].astro сам рендерит HeroLeaf, AuthorByline, LastUpdated, CtaSection
- Схема blog в src/content.config.ts без изменений

**Что не делали в этой сессии (осознанно):**
- Не меняли шаблоны блога
- Не трогали Navigation (Блог уже в меню с Сессии 10)
- Не создавали новых компонентов (статьи написаны на чистом MDX + markdown-таблицы)

**Уроки из Сессии 11:**

1. При написании MDX-статей блога не нужно импортировать компоненты - чистый MDX достаточен, template оборачивает в AuthorByline/HeroLeaf автоматически. Таблицы через обычный markdown рендерятся корректно через стили в [slug].astro.

2. wc -w на русскоязычных MDX считает слова некорректно (разбивает по-другому). Правильный способ - Python с regex по \w с UNICODE-флагом.

3. Страновые статьи могут быть короче (1400-1600 слов) если у команды меньше своих кейсов по этой стране - заполнять "водой" до 2000+ не имеет смысла, LLM ценят плотность инфы больше объема.

4. Гибридный формат сравнения (3 плоскости: аудитория+каналы+юнит-экономика) дает ~2200 слов органично, без натяжки.

### Сессия 13 (готово, v2.21) - блог-кластер "E-commerce"

**7 экспертных статей в /blog/** (общий объем 11,305 слов). Формат: TL;DR-таблица после вводного абзаца + блоки "Что это дает вам" через markdown-blockquotes.

Первая волна (приоритет, опора на сильнейшие кейсы):
- luding-vitrina-alkogolya-210m (1,891 слов) - флагманский кейс: витринная модель для регулируемых ниш. Опора на LUDING ($47M бюджета, 210M выручки, 36,500 заказов)
- roas-vs-cpo-dlya-ecommerce (2,064 слов) - фундаментальная статья про метрики e-com. ROAS, CPO, ДРР, Adjusted ROAS, нормативы по нишам. Опора на ToyTrick, LUDING, АНПАК, SamoilovART
- konkurirovat-s-wildberries-ozon (1,838 слов) - стратегия для малого e-com против маркетплейсов. 6 стратегий дифференциации. Опора на ToyTrick, АНПАК, Phone Parts, магазин напольных покрытий

Вторая волна (инструментальные и специализированные):
- retargeting-broshennyh-korzin-2026 (1,421 слов) - практика ретаргетинга с воронками на 14-60 дней. Опора на SamoilovART (30-дневная воронка)
- meta-ads-dlya-ecom-usa (1,342 слов) - специфика американского e-com (CPM $15-40, юридика LLC/Stripe). Опора на SamoilovART
- zapusk-ecommerce-s-nulya-6-mesyacev (1,348 слов) - таймлайн запуска нового e-com проекта, реалистичные бюджеты
- b2b-dlya-sellerov-marketplaces (1,401 слов) - B2B-рынок вокруг WB/Ozon. Опора на АНПАК (1,700 лидов, 45К ср. чек)

**Обновлен public/llms-full.txt** - 17 blog-URL всего (3 пилотных + 7 Сессии 11 + 7 Сессии 13).

**Что не делали в этой сессии (осознанно):**
- Не писали кластер для инфобиза - отложено на Сессию 14 (или позже)
- Не создавали новые Astro-компоненты - усиление через markdown-blockquotes работает и проще
- Не обновляли Navigation и меню - блог уже там с Сессии 10

**Уроки из Сессии 13:**

1. Формат с TL;DR-таблицей в начале хорошо работает для GEO-цитирования - LLM быстро находят структурированную выжимку и цитируют ее. Markdown-blockquotes с жирным первым словом ("Что это дает вам.") рендерятся через готовые стили [slug].astro без доработок.

2. Для кластера, где много чисел по разным кейсам, имеет смысл делать статью-фундамент с таксономией метрик (как roas-vs-cpo). Она становится точкой опоры, на которую ссылаются все остальные статьи кластера.

3. Страновые статьи (Сессия 11) и специализированные (Сессия 13 - ретаргетинг, США, запуск) часто получаются короче флагманских (1,300-1,500 слов против 1,900-2,100). Это нормально - флагманы требуют развернутой экспертизы, а специализированные должны быть плотнее.

4. При переносе патча в проект не забывать что CHAT-CONTEXT.md может быть устаревшим в локальной копии Магоша. Обновленный CHAT-CONTEXT всегда включать в патч явно, чтобы перезаписать.

### Сессия 12 (готово, v2.22) - фавикон для поисковых систем

Точечная правка без формального плана сессии - Магош попросил "чтобы в поисковых системах был фавикон".

**Проблема:** существующий фавикон не удовлетворял требованиям Google/Яндекса для показа в SERP:
- SVG отрисовывал букву W через `<text>` с зависимостью от шрифта Unbounded (у бота Google его нет)
- ICO только 16/32/48 (минимум Google = 48, но рекомендуется >=192)
- Нет отдельных PNG для 192/512 которые предпочитают поисковики
- Нет web-манифеста и theme-color

**Решение - 8 файлов:**

- `favicon.svg` переписан: векторная W через `<path>`, не зависит от шрифта
- `favicon.ico` пересобран с 4 размерами (16, 32, 48, 64)
- Добавлены PNG: 48x48, 96x96, 192x192, 512x512
- `apple-touch-icon.png` (180x180) перерисован с нового SVG
- Новый `site.webmanifest` для PWA и Android
- `BaseHead.astro` обновлен - подключены все иконки, манифест, theme-color

**Уроки из Сессии 12:**

1. Минимум для Google Search - 48x48 PNG. Рекомендуется 192x192 и 512x512 для показа в SERP.
2. SVG с `<text>` ненадежно - бот может не иметь нужного шрифта. Лучше векторный `<path>`.
3. После деплоя фавикон в выдаче появляется через 2-4 недели (Google) и 1-2 месяца (Яндекс). Ускорить через Request Indexing в GSC и переобход в Яндекс.Вебмастере.
4. Проверить кеш Google можно на https://www.google.com/s2/favicons?domain=webnostra.pro&sz=128

### Сессия 14 (готово, v2.23) - рубрикатор, реквизиты, команда, иконки "Проблем"

Небольшой сборный релиз из 4 задач по запросу Магоша:

**1. Рубрикатор (теги/фильтры) на /portfolio/ и /blog/**

Добавлен клиентский JS-фильтр без пересборки страницы.

- `CasesGrid.astro`: новый пропс `showFilters=true`. Автоматически агрегирует все industry с количеством кейсов, выводит таб-панель с "Все (23), Недвижимость (9), Медицина (7), E-commerce (2)...". Клик на таб фильтрует через CSS display:none.
- `blog/index.astro`: аналогичный фильтр по первому тегу статьи. Распределение: Все (17), Недвижимость (9), E-commerce (7), Выбор агентства (1).
- `portfolio/index.astro`: включен showFilters={true} в вызове CasesGrid.
- Функция `slugifyTag()` для приведения "E-commerce" и "Недвижимость" к data-tag атрибутам.

**2. Иконки в блоке "Проблемы" на главной**

Был один восклицательный знак на все 6 карточек - заменен на 6 персональных SVG:

- budget (монета со стрелками) - "Льется бюджет"
- leads (воронка) - "Конверсия в квал 3-5%"
- analytics (лупа с крестом) - "Нет видимости что работает"
- niche (звезда) - "Агентство не понимает нишу"
- cycle (часы) - "Долгий цикл - нет прогрева"
- slow (секундомер) - "Медленный запуск"

Иконки подбираются автоматически по ключевым словам в title через функцию `detectIcon()`. Плюс освежен hover: градиентная полоса снизу (красная), карточка чуть поднимается, иконка становится ярче.

**3. Владислав - обновление команды**

В `team.json`:
- Новое bio: "Построил с нуля 40+ отделов продаж - от малого бизнеса до крупных федеральных компаний"
- Обновлены tags: "Отделы продаж, Переговоры, Онбординг, Скрипты продаж, Стратегия"
- Добавлены stats: "40+ отделов продаж / 8+ лет / 200+ клиентов / 24/7 на связи"

**4. Страница реквизитов /requisites/**

Новая страница с двумя юрлицами:

- **Россия:** ИП Марфин Владислав Алексеевич (ОГРНИП 323508100010519, счет в Банке Точка)
- **Казахстан:** ИП Добжанский Дмитрий Викторович (БИН 050726551955, счет в Kaspi Bank)

Моноширинный шрифт для чисел, user-select: all для удобного копирования. Флаги стран как SVG-мини. Ссылка на страницу добавлена в футер после "Оферта".

**Уроки из Сессии 14:**

1. Клиентские JS-фильтры (без пересборки) - оптимально для рубрикатора. Отфильтрованные карточки просто скрываются через `display:none`, SEO не страдает - все карточки в HTML, все ссылки индексируются.
2. Автоопределение иконки по ключевым словам title работает если title описательный и предсказуемый. Для новых items лучше явно задавать `icon="budget"` в пропсах.
3. `mkdir -p` с bash-expansion типа `{pages,components/sections,content}` может создать литеральную папку со скобками если expand не прошел. Всегда проверять `find` после создания структуры.
4. Реквизиты ИП (БИК, номера счетов) лучше рендерить моноширинным шрифтом в surface-блоке - читаемость выше, и выделение одним кликом через user-select: all.

---

### Сессия 15.1 (готово, v2.24) - 14 новых MDX-кейсов из PDF (часть 1 из 2)

Добавление недостающих кейсов из 5 PDF в /portfolio/ - всего в PDF было 31 неиспользованный кейс, разбили на 2 патча. Часть 1 закрывает e-commerce, tourism и featured-добивку для других ниш на главной.

**Контекст задачи.** До Сессии 15 в /portfolio/ было 23 MDX-кейса, при том что в 5 PDF (Real Estate, E-com, Tourism, Edu, Other) лежало ~50 кейсов. Сильнее всего страдали e-commerce (только 2 кейса при флагмане LUDING) и tourism (2 кейса). На главной CasesFeatured с limitPerTab=3 показывал по 2 карточки в этих вкладках вместо 3.

**Что сделано (14 новых MDX в src/content/cases/):**

E-commerce (+7):
- anpak.mdx ⭐ - АНПАК упаковка для селлеров, 1,700 B2B-лидов, 45К₽ ср. чек
- samoilov-art.mdx - Star Wars шлемы США, $12К прибыли с $2К бюджета
- phone-parts.mdx - запчасти телефонов Москва, 1,537 заявок через 2 канала
- flooring-moscow.mdx - напольные покрытия против Леруа, 624 заявки по 357₽
- bali-bikes.mdx - распродажа байков в low-season, 10/10 продано
- dubai-furniture-rental.mdx - аренда мебели для экспатов Дубай, 35% конверсия
- niche-ecom-startup.mdx - запуск стартапа с нуля, 892 заказа за 6 мес

Tourism (+5):
- yacht-phuket.mdx ⭐ - аренда премиум-яхт, ROI 320%, ср. чек $4,200
- kz-travel.mdx - турагентство Казахстан, заявки по $5
- pirogov-sanatorium.mdx - санаторий Одесса в кризис, 1,241 заявка
- yug-tour.mdx - турагентство юга России, ROI 450%
- kmv-booking-service.mdx - бронирование путевок КМВ, 5,926 броней, 33% конверсия

Другие ниши (+2 featured):
- auto-import-georgia.mdx ⭐ - параллельный импорт авто после санкций, 67 сделок, $18К чек
- fitness-club-spb.mdx ⭐ - открытие фитнес-клуба, 678 членов за 3 месяца

**Состояние featured после Сессии 15.1 (что показывает CasesFeatured на главной):**

| Вкладка | Кейсы (топ-3 по publishedAt) |
|---------|-------------------------------|
| Недвижимость (5⭐) | premium-villas, good-karma, ibg-property |
| E-commerce (3⭐) | luding, anpak ⭐, toytrick |
| Инфобизнес (2⭐) | beyond-taylor, algoritmika - **остается дефицит** |
| Туризм (3⭐) | kmv-sanatoria, phuket-excursions, yacht-phuket ⭐ |
| Медицина (3⭐) | prague-clinic, almaty-clinics, stomatology-spb |
| Другие ниши (3⭐) | auto-import ⭐, fitness-club ⭐, tropicano |

**Что НЕ сделано в этой сессии (запланировано в Сессию 15.2):**
- 5 кейсов инфобиз: серия вебинаров Beyond Taylor, онлайн-школа Telegram (28K подписчиков), Beauty School (1,521 заявка), Aifluent (AI-маркетинг), языковая школа, школа сомелье. Один из них пометить ⭐ для добивки edtech-вкладки на главной до 3.
- 4 кейса недвижимость: Лариса (брокер VK), Маритоль (B2B фасады), БаниПроф (1.25М₽/мес), Московское АН (444 заявки)
- 8 кейсов разных ниш: Kids Franchise (КЗ), стоматология СПб - имплантация, автошкола Краснодар, маркировка товаров B2B, банкротство физлиц, франшиза вендингов (ЯД), франшиза вендингов (VK)

**Решения по архитектуре в этой сессии:**

1. industries.json casesCount НЕ обновляли - проверка показала что это поле используется только в geos.json (компонент Geography), а в industries.json оно справочное и содержит маркетинговые цифры с учетом легаси-кейсов в /cases/. Менять при добавлении MDX не нужно.

2. На главной не пришлось трогать `<CasesFeatured limitPerTab={3} />` - логика уже автоматическая: берет featured кейсы каждой ниши, сортирует по publishedAt desc, режет до 3. Значит достаточно правильных дат и featured-флагов в новых MDX.

3. Использовали короткий формат MDX-кейсов (frontmatter полный + 1-2 коротких раздела markdown - "Контекст" и "Что сработало"). Этого хватает для индексации, ItemList schema, ссылочного веса. Расширенный формат (как у LUDING на ~150 строк) оставили для флагманских featured-кейсов которые уже были.

**Уроки Сессии 15.1:**

1. При добавлении большого количества MDX через create_file - всегда сразу запускать билд после копирования в src/content/cases/. Один битый frontmatter (отсутствует required-поле, неверный enum в industry/channels) ломает всю Astro-collection. В этой сессии все 14 файлов прошли с первого раза - помогло использование luding.mdx и phuket-excursions.mdx как эталонных шаблонов.

2. Логика CasesFeatured автоматическая - сортировка по publishedAt. Это значит что чтобы новый кейс показался на главной выше старого, его дата должна быть свежее. У anpak (2025-02-20) дата свежее toytrick (2023-12-15) поэтому он встал на 2-ю позицию в e-com-вкладке (между luding 2025-11 и toytrick 2023-12).

3. Новые e-com кейсы попадают и в "Другие кейсы в нише" внизу страниц других e-com кейсов автоматически через CasesGrid и фильтр по industry. Перекрестная перелинковка работает без правок.

4. node_modules в архиве с macOS не работают на linux-сервере - при первом билде Rollup пытался загрузить @rollup/rollup-darwin-arm64 которого нет. Решение: rm -rf node_modules && npm install заново.

---

### Сессия 15.2 (готово, v2.25) - 16 новых MDX-кейсов из PDF (часть 2 из 2, финал)

Закрытие задачи "добавить недостающие кейсы из PDF". В Сессии 15.1 добавили 14 кейсов (e-com + туризм + 2 для добивки), в Сессии 15.2 добавили оставшиеся 16. Изначально планировалось 17 - один (стоматология СПб имплантация) оказался дублем уже существующего stomatology-spb.mdx из Сессии 8, поэтому удалили.

**Что сделано (16 новых MDX в src/content/cases/):**

Edtech / Инфобиз (+7):
- beyond-taylor-webinars.mdx - закрытые встречи для собственников, 1,485 регистраций
- telegram-school.mdx - подготовка младших школьников, 28K подписчиков в Telegram
- beauty-school.mdx ⭐ - **добивка edtech-вкладки на главной**, 1,521 заявка по 311₽ через реальные кейсы выпускников
- aifluent.mdx - AI-маркетинг через бот с 50 промптами, 10% конверсия в курс
- sommelier-school.mdx - расширение узкой ниши через смежные premium-категории
- english-language-school.mdx - персонализация пробных уроков, конверсия 19.5%
- driving-school-krasnodar.mdx - дифференциация в однородной нише через гарантии

Real-estate (+4):
- larisa-vk-broker.mdx - VK для русских инвесторов в ЮВА, дешевле Meta x2
- maritol-facades.mdx - B2B-вход через бесплатный аудит, 79 контрактов с УК
- baniprof.mdx - смена коммерческой модели (поэтапная оплата), 1.25М₽ прибыли/мес
- moscow-real-estate.mdx - локальная специализация по районам в перегретой нише

Разные ниши (+5, по факту с учетом удаления дубля):
- kids-franchise-kz.mdx - адаптация позиционирования франшизы под местную ментальность Казахстана
- markirovka-b2b.mdx - простой язык вместо юридического, гарантия от штрафов
- bankruptcy-individuals.mdx - смена эмоционального якоря в стигматизированной теме
- vending-franchise-yd.mdx - радикальная прозрачность как УТП на рынке мошеннических франшиз
- vending-franchise-vk.mdx - разные продуктовые пакеты для разных каналов (тот же бренд)

**Что НЕ добавили из плана и почему:**
- Стоматология СПб - имплантация (был в плане Сессии 15.2): оказался дублем существующего stomatology-spb.mdx из Сессии 8 - тот же кейс по 180 заявок, 1,700₽ CPL и 180К₽ среднему чеку. Не добавляли чтобы не дублировать.

**Состояние featured после Сессии 15.2 (что показывает CasesFeatured на главной):**

| Вкладка | Featured-кейсы (топ-3 по publishedAt) |
|---------|----------------------------------------|
| Недвижимость (5⭐) | premium-villas, good-karma, ibg-property |
| E-commerce (3⭐) | luding, anpak ⭐, toytrick |
| Инфобизнес (3⭐) | beyond-taylor, algoritmika, **beauty-school ⭐** - **дефицит закрыт** |
| Туризм (3⭐) | kmv-sanatoria, phuket-excursions, yacht-phuket ⭐ |
| Медицина (3⭐) | prague-clinic, almaty-clinics, stomatology-spb |
| Другие ниши (3⭐) | auto-import ⭐, fitness-club ⭐, tropicano |

**Все вкладки на главной теперь показывают по 3 кейса.**

**Решения по архитектуре в этой сессии:**

1. Автошкола Краснодар классифицирована как edtech, не как "разные ниши". Логика - это образовательный курс с продажей программы обучения, что ближе к edtech/онлайн-школам чем к auto/franchise. Это сделало edtech-вкладку насыщеннее (9 кейсов всего) и оставило "разные ниши" чище в композиции.

2. Решено НЕ редактировать industries.json и geos.json casesCount - это маркетинговые цифры. industries.json с прежними числами (10, 9, 9, 7, 2, 5) показывает суммарную экспертизу с учетом легаси-кейсов на /cases/, а не только Astro MDX. Менять при добавлении MDX смысла нет.

3. По нише franchise теперь 3 кейса (kids-franchise-kz, vending-franchise-yd, vending-franchise-vk), но все с featured: false. Они попадают во вкладку "Другие ниши" и не пробивают топ-3 потому что там auto-import (12.2024), fitness-club (08.2024), tropicano (04.2024) занимают позиции по publishedAt. Это норма - вендинговые франшизы как кейсы хороши, но не флагманские для главной.

**Уроки Сессии 15.2:**

1. Перед массовым добавлением кейсов надо сверять с существующими через grep по shortDescription или client - стоматология СПб была в Сессии 8 уже добавлена под именем stomatology-spb, а в "разные ниши" PDF тот же кейс описан повторно. Дублей в коллекции быть не должно - и Astro их не отвалит на билде, но семантически это плохо.

2. Имплантационная стоматология СПб попадала в "разные ниши" PDF потому что сами PDF группированы по тематике PDF-документа, не по чистой industry. Один и тот же кейс может фигурировать в "Кейсах разных ниш" PDF (как пример B2C с высоким чеком) и одновременно быть medical-кейсом. Нужен sanity-check всякий раз.

3. Финальный счет MDX в /portfolio/ - 53 (23 до Сессии 15 + 14 в Сессии 15.1 + 16 в Сессии 15.2 = 53). Это уже больше чем 58 легаси-кейсов в /cases/, и Astro-портфолио стало основным портфельным разделом. /cases/ остается доступным как дополнительный архив.

4. node_modules в архиве с macOS не работают на linux-сервере. Решение через каждый билд: rm -rf node_modules package-lock.json && npm install. Стабильно работает за 45-50 секунд.

---

## Текущее состояние

### Структура Astro-страниц (103 всего, было 87)
- `/` - главная (3 featured-кейса на каждую вкладку, все 6 вкладок заполнены)
- `/404/` - ошибка
- `/portfolio/` - хаб 53 Astro-кейсов + QuickAnswer + ItemList schema
- `/portfolio/<slug>/` - 53 MDX-кейса с AuthorByline и Article schema
- `/services/` - хаб + QA
- `/services/<slug>/` - 7 страниц (meta-ads, yandex-direct, google-ads, vk-ads, creatives, analytics, sales-support) + QA. Секции pricing удалены
- `/real-estate/` - хаб + QA
- `/real-estate/<country>/` - 7 стран (thailand, dubai, bali, north-cyprus, turkey, russia, georgia) + QA
- `/industries/` - хаб + QA
- `/industries/<slug>/` - 6 отраслей (real-estate, e-commerce, edtech, tourism, medical, b2b) + QA
- `/about/`, `/contacts/`, `/privacy/`, `/offer/`, `/requisites/`
- `/authors/magosh/` - Person schema для E-E-A-T
- `/blog/` - хаб + ItemList schema
- `/blog/<slug>/` - 17 статей + AuthorByline + Article schema

### MDX-кейсы по industry (53 штуки, +30 за Сессии 15.1+15.2)
- **real-estate (13, было 9):** premium-villas-phuket⭐, good-karma⭐, ibg-property⭐, nextpoint-condominium, dubai-real-estate, phuket-developer⭐, country-houses⭐, samolet-plus-sochi, karkasnye-doma-spb, larisa-vk-broker, maritol-facades, baniprof, moscow-real-estate
- **e-commerce (9, было 2):** luding⭐, toytrick⭐, anpak⭐, samoilov-art, phone-parts, flooring-moscow, bali-bikes, dubai-furniture-rental, niche-ecom-startup
- **edtech (9, было 2):** beyond-taylor⭐, algoritmika⭐, beauty-school⭐, beyond-taylor-webinars, telegram-school, aifluent, sommelier-school, english-language-school, driving-school-krasnodar
- **tourism (7, было 2):** phuket-excursions⭐, kmv-sanatoria⭐, yacht-phuket⭐, kz-travel, pirogov-sanatorium, yug-tour, kmv-booking-service
- **medical (7):** stomatology-spb⭐, prague-clinic-implants⭐, almaty-clinics-network⭐, astana-clinic-launch, dubai-orthodontics, minsk-dental-clinic, spb-kids-dental
- **auto (1):** auto-import-georgia⭐
- **fitness (1):** fitness-club-spb⭐
- **franchise (3):** kids-franchise-kz, vending-franchise-yd, vending-franchise-vk
- **legal (1):** bankruptcy-individuals
- **b2b (1):** markirovka-b2b
- **kids (1):** tropicano⭐

⭐ = featured: true (всего 20 ⭐ из 53). На главной CasesFeatured показывает по 3 свежайших ⭐ в каждой industry-вкладке. Все 6 вкладок (real-estate, e-commerce, edtech, tourism, medical, "другие ниши") заполнены до 3 кейсов.

### MDX-статьи блога (17 штук)

Пилоты из Сессии 10:
- top-10-agentstv-nedvizhimosti-phuket (Недвижимость, Пхукет, Агентства)
- meta-ads-vs-yandex-direct-dlya-nedvizhimosti (Сравнение каналов)
- kak-vybrat-performance-agentstvo (Чек-лист)

Блог-кластер "Недвижимость ЮВА" из Сессии 11:
- phuket-vs-pattaya-dlya-zastroyshchika (Недвижимость, Таиланд, Пхукет, Паттайя)
- russkie-investory-dubai-shemy-oplaty (Недвижимость, Дубай, ОАЭ, Инвесторы)
- sezonnost-reklamy-nedvizhimosti-yua (Недвижимость, ЮВА, Сезонность, Медиапланирование)
- leasehold-na-bali-kak-rabotaet (Недвижимость, Бали, Leasehold)
- vnzh-severnyy-kipr-cherez-nedvizhimost (Недвижимость, Северный Кипр, ВНЖ)
- grazhdanstvo-turcii-cherez-nedvizhimost (Недвижимость, Турция, Гражданство)
- gruziya-dlya-relokantov-nedvizhimost (Недвижимость, Грузия, ВНЖ, Релокация)

Блог-кластер "E-commerce" из Сессии 13:
- luding-vitrina-alkogolya-210m (E-commerce, Кейсы, Регулируемые ниши)
- roas-vs-cpo-dlya-ecommerce (E-commerce, Метрики, ROAS, CPO, Аналитика)
- konkurirovat-s-wildberries-ozon (E-commerce, Маркетплейсы, Wildberries, Ozon)
- retargeting-broshennyh-korzin-2026 (E-commerce, Ретаргетинг, Воронки)
- meta-ads-dlya-ecom-usa (E-commerce, США, Meta Ads, Международная реклама)
- zapusk-ecommerce-s-nulya-6-mesyacev (E-commerce, Стартап, Запуск бизнеса)
- b2b-dlya-sellerov-marketplaces (E-commerce, B2B, Маркетплейсы, Лидогенерация)

### FAQ состояние
110 записей с тегами: real-estate (23), analytics (12), meta-ads (10), yandex-direct (10), vk-ads (10), creatives (10), general (9), google-ads (9), medical (9), pricing (8), sales-support (8), home (7), timeline (7), infrastructure (6), e-commerce (4), edtech (4), tourism (4), b2b (4), industries (2), about (3), contacts (3).

### Легаси в public/
- `/cases/*` - 58 HTML-кейсов
- `/ai/*`, `/performance/commercial/*`, `/performance/ads/*`, `/performance/clients/*`, `/performance/sales/*`
- `/team/*`, `/files/*` - картинки
- `/llms.txt`, `/llms-full.txt`, `/robots.txt` - GEO-инфраструктура

---

## Схема коллекции CASES (для добавления новых кейсов)

```yaml
---
title: string                              # "Название - короткая суть"
client: string                             # Имя клиента
slug: string?                              # опционально
published: boolean = true
featured: boolean = false                  # true = на главной

industry: enum                             # ЖЕСТКИЙ список:
  # real-estate | e-commerce | edtech | tourism | medical |
  # auto | fitness | franchise | legal | b2b | kids | other

channels: array of enum                    # ЖЕСТКИЙ список:
  # meta-ads | yandex-direct | google-ads | vk-ads | telegram-ads

geo: string                                # "Москва" / "Пхукет, Таиланд"
geoSlug: string?                           # thailand / russia / dubai
period: string                             # "6 месяцев"

shortDescription: string
problem: string
solution: string
insight: string?

metrics: array                             # 4 метрики ВСЕГДА
  - value: string                          # "$58,514" / "1,721" / "450%"
    label: string                          # "потрачено" / "лидов" / "ROI"
    highlight: boolean = false             # true = золотым

headlineValue: string                      # "$3.2M"
headlineLabel: string                      # "pipeline за 4 месяца"

seo:
  metaTitle: string?
  metaDescription: string?
  ogImage: string?

publishedAt: date                          # "2024-11-10" - важно для сортировки
---
```

### Схема коллекции BLOG

```yaml
---
title: string
description: string
publishedAt: date
updatedAt: date?
author: string = "Магош Альшанский"
tags: array of string
cover: string?
draft: boolean = false
seo:
  metaTitle: string?
  metaDescription: string?
---
```

---

## Открытые вопросы

**Закрыто в Сессиях 12-15.2:**
- ~~Фавикон для поисковых систем~~ закрыто в Сессии 12 (v2.22)
- ~~Страница реквизитов~~ закрыто в Сессии 14 (v2.23)
- ~~Владислав +40 отделов продаж~~ закрыто в Сессии 14
- ~~Рубрикатор кейсов и блога~~ закрыто в Сессии 14
- ~~Дефицит кейсов в e-commerce и tourism~~ закрыто в Сессии 15.1 (+14 MDX)
- ~~Добавление 30 кейсов из PDF в /portfolio/~~ закрыто в Сессии 15.2 (+16 MDX, итого +30)
- ~~Дефицит featured в edtech-вкладке на главной~~ закрыто в Сессии 15.2 (Beauty School ⭐)
- ~~Все 6 вкладок главной заполнены до 3 кейсов~~ закрыто в Сессии 15.2

**Активные:**

1. **Privacy и Offer** - перед длинной дистанцией показать юристу Магоша.

2. **country-houses и phuket-developer** не всплыли на главной - старые publishedAt. После Сессии 15 на главной в недвижке: premium-villas (09.2025), good-karma (06.2025), ibg-property (03.2025). country-houses (06.2024) и phuket-developer (08.2024) не пройдут даже с обновлением дат если не поднять выше свежих. Решение: обновить даты или снять featured с одного из старших.

3. **Beyond Taylor "80 продаж"** в /services/sales-support/ - Магош не подтвердил, цифр нет в PDF.

4. **Article schema + ItemList + Favicon** - после деплоя проверить в Google Rich Results Test и на https://www.google.com/s2/favicons?domain=webnostra.pro&sz=128

5. **Яндекс.Вебмастер** - в настройках сайта указать https://. После Сессий 15.1+15.2 переобойти sitemap для индексации 30 новых /portfolio/* и обновленных листингов.

6. **GEO: фото /team/magosh.jpg** - нужно 500x500+ для AuthorByline в 53+ местах (на каждом из 53 кейсов + 17 блог-статей). Без файла показываются инициалы МА. Для E-E-A-T и LLM лучше реальное фото.

7. **GEO: мониторинг Prompt Win Rate** - раз в 2 недели 10 запросов в ChatGPT/Perplexity/Яндекс Нейро. Стартовая планка 10-20%, цель 40-55% через 3 мес. Запросы для начала:
   - "лучшее агентство рекламы недвижимости Пхукет"
   - "meta ads или яндекс директ для недвижимости"
   - "как выбрать performance агентство"
   - "агентство недвижимости Дубай с русскоязычной командой"
   - "сколько стоит реклама недвижимости в Таиланде"
   - "performance агентство для застройщика"
   - "квалифицированный лид для недвижимости стоимость"
   - "VK реклама для Крыма недвижимость"
   - "агентство google ads для дубая"
   - "офлайн конверсии в meta ads настройка"

8. **llms-full.txt** обновлен в Сессии 11 и Сессии 13 (17 blog-URL). После Сессии 15.2 имеет смысл обновить и портфолио - сейчас 53 кейса вместо упомянутых 23. Плановое обновление раз в квартал или при добавлении блог-кластера.

9. **Person schema sameAs Магоша** - сейчас только Telegram и Instagram. Добавить LinkedIn, VC, Habr если есть. Править в src/lib/seo-geo.ts → TEAM_PERSONS.magosh.sameAs.

10. **Цифры в листикле "Топ-10 агентств Пхукет"** - часть агентств описаны по публичным данным. Если Магош знает реальные ценники конкурентов точнее - править соответствующий блок в .mdx.

11. **Варианты следующих направлений (на выбор):**
    - Блог-кластер "Инфобиз" (7 статей по материалам Beyond Taylor, Алгоритмика, Beauty School - теперь у всех есть Astro-кейсы для перелинковки)
    - Закрытие оставшихся технических хвостов пакетом (GSC verification, Rich Results Test, Яндекс.Вебмастер https, фото Магоша, Person schema sameAs, обновление llms-full.txt)
    - Блог-кластер "Туризм/медицина" (теперь есть 14 кейсов в этих нишах для опоры)
    - Локальное SEO (страницы услуг по городам - Москва, СПб)
    - Обновление industries.json под реальные счетчики MDX (опционально)


---

## Переменные окружения (в .env, залиты в Netlify)

```
PUBLIC_ALBATO_WEBHOOK=https://h.albato.ru/wh/38/1lfbu2f/vsiGktuenA0Cylhee_lGrBN2mSA4JXQNtW3Dtj6D4Ps/
PUBLIC_TG_BOT_TOKEN=8736522279:AAEt7FLqxE2AFheHE2ftOsqqmXxiAQT9Qpw
PUBLIC_TG_CHAT_ID=-1002474936647
PUBLIC_YM_ID=96858541
PUBLIC_META_PIXEL_ID=1399100830794020
PUBLIC_CONTACT_EMAIL=ceo@webnostra.pro
PUBLIC_CONTACT_PHONE=+66967921486
PUBLIC_CONTACT_PHONE_DISPLAY=+66 96 792 14 86
PUBLIC_CONTACT_TELEGRAM=https://t.me/m/o8bYoFHBZmRi
PUBLIC_CONTACT_WHATSAPP=https://wa.me/77066671426
PUBLIC_CONTACT_INSTAGRAM=https://instagram.com/webnostra
PUBLIC_CONTACT_TG_CHANNEL=https://t.me/+uiQBTcL9yw9mOGVi
PUBLIC_SITE_URL=https://webnostra.pro
PUBLIC_GSC_VERIFICATION=nmQjVPU1uWcZBnXUC8UuClWhXhjvMsGsdojPA_gD8vA
PUBLIC_YANDEX_VERIFICATION=3076d7b484d6a684
```

---

## Локальная инфраструктура

- Папка: `~/Desktop/webnostra-pro/`
- Dev URL: `http://localhost:4321`
- Git repo: github.com/webnostra-per/webnostra-pro (private)
- Netlify: сайт webnostra.pro, автодеплой с main ветки
- Домен webnostra.pro: активный прод

## Быстрые команды

```bash
# Запуск локально
cd ~/Desktop/webnostra-pro && npm run dev

# Обновление точечно (для малых правок)
unzip -q ~/Downloads/webnostra-pro-vX.X.zip -d /tmp/vXX
cp /tmp/vXX/webnostra-pro/<path-to-file> ~/Desktop/webnostra-pro/<path-to-file>
rm -rf /tmp/vXX
cd ~/Desktop/webnostra-pro
git add -A
git commit -m "..."
git push

# Полная замена проекта
cd ~/Desktop/webnostra-pro
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
unzip -q ~/Downloads/webnostra-pro-vX.X.zip -d /tmp/new
mv /tmp/new/webnostra-pro/* .
mv /tmp/new/webnostra-pro/.* . 2>/dev/null
rm -rf /tmp/new node_modules package-lock.json
npm install && npm run dev

# Билд
npm run build

# Коммит и автодеплой в прод
git add -A && git commit -m "..." && git push origin main
```

---

## Типовые ошибки прошлых сессий (не повторять)

1. **Не передавать лишние пропсы компонентам.** COMPONENTS-REFERENCE.md - единственный источник правды по пропсам.

2. **Проверять схему коллекции ДО записи данных.** Если схема enum или required - JSON/MDX упадет на билде. В частности industry - строгий enum из 12 значений.

3. **Меню и футер подтягивают services/geos/industries из коллекций.** Добавил в JSON - автоматически в меню.

4. **TOC id = section id.** Всегда проверяй что id в toc-массиве равны id на секциях.

5. **Шаблон страницы услуги/страны/отрасли:** HeroLeaf -> LastUpdated -> QuickAnswer -> Toc -> секции -> Faq -> CtaSection id="form-final".

6. **Все inline-кейсы должны быть из PDF.** Не выдумывать цифры.

7. **featured: true на MDX-кейсах** - поднимает их на главную. Не ставить просто так.

8. **FAQ теги** - если добавляешь новую страницу с <Faq tag="xxx" />, в faq.json должны быть вопросы с этим тегом.

9. **Билд занимает ~12-22 сек.** Прогоняй перед каждым коммитом.

10. **Пропс BaseLayout - canonicalPath, не canonical.**

11. **Env-переменные в страницах** - через `import.meta.env.PUBLIC_*`.

12. **Schema.org помимо Organization** через пропс `structuredData={schema}` в BaseLayout. Organization добавляется автоматически.

13. **Якоря CTA = #form-final.** НЕ #form. Если якоря нет на странице - умный handler в BaseLayout откроет попап LeadPopup.

14. **LeadPopup монтируется ОДИН раз в BaseLayout.** Не надо добавлять отдельно.

15. **При упаковке архива - НЕ делать mv внутри webnostra-pro.** Если нужно переименовать - извне через cd .. и mv.

16. **Скрипты замены em-dash/е с плейсхолдерами** - ОСТОРОЖНО. Всегда после такого скрипта grep на __PROTECTED в src/.

17. **Article schema ожидает publishedAt как Date или ISO-строку** - MDX frontmatter coerce через z.coerce.date() сам обрабатывает.

18. **При замене файлов из архива cp /tmp/vXX/** - сначала unzip, потом cp.

19. **Яндекс.Вебмастер требует полный URL с https://**. В настройках указать https://.

20. **Массовая вставка через String.replace(regex, str) с $N в данных** - КРИТИЧЕСКИЙ БАГ. Символы $1, $2 в replacement = regex backreference. Если value содержит $8,000, $15K - вставка ломает структуру. Решение: function-replacement `((match) => result)` или `$$`.

21. **После массовой автоматической вставки - всегда grep на битые паттерны** перед билдом. Команды: `grep -rn '<HeroLeaf' src/pages/services/ src/pages/real-estate/ src/pages/industries/ | grep -v 'astro:[0-9]*:  <HeroLeaf$'`.

22. **astro.config.mjs sitemap filter** - проверять при добавлении новых разделов. В Сессии 10 был filter `!page.includes('/blog/')` с самого начала проекта - блог не индексировался пока не сняли.

23. **GEO-компоненты (QuickAnswer, LastUpdated) должны иметь собственную обертку section > container.narrow.** Без этого они растянутся на весь экран и сломают верстку. На страницах с HeroLeaf их можно вставлять напрямую между Hero и Toc.

24. **Стоимость наших услуг не публикуется на сайте по решению Магоша.** Все pricing-секции, абонентские планы, fee, ставки - убраны. Минимальные рекламные бюджеты клиентов в QA - оставлены, это бюджеты клиента а не наши цены. Если клиент спрашивает цену - через бесплатную диагностику.

---

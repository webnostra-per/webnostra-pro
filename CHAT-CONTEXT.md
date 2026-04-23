# WEBNOSTRA PERFORMANCE - состояние проекта

**Дата:** 23.04.2026
**Актуальная версия:** v2.20 (Сессия 11 закрыта, в проде)
**Статус:** билд чистый, 65 страниц, ~12-22 сек, на webnostra.pro
**Следующая задача:** Сессия 12 - обновление llms-full.txt и мониторинг Prompt Win Rate через 2 недели

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

---

## Текущее состояние

### Структура Astro-страниц (65 всего)
- `/` - главная (3 featured-кейса на вкладку)
- `/404/` - ошибка
- `/portfolio/` - хаб 23 Astro-кейсов + QuickAnswer + ItemList schema
- `/portfolio/<slug>/` - 23 MDX-кейса с AuthorByline и Article schema
- `/services/` - хаб + QA
- `/services/<slug>/` - 7 страниц (meta-ads, yandex-direct, google-ads, vk-ads, creatives, analytics, sales-support) + QA. Секции pricing удалены
- `/real-estate/` - хаб + QA
- `/real-estate/<country>/` - 7 стран (thailand, dubai, bali, north-cyprus, turkey, russia, georgia) + QA
- `/industries/` - хаб + QA
- `/industries/<slug>/` - 6 отраслей (real-estate, e-commerce, edtech, tourism, medical, b2b) + QA
- `/about/`, `/contacts/`, `/privacy/`, `/offer/`
- `/authors/magosh/` - Person schema для E-E-A-T
- `/blog/` - хаб + ItemList schema
- `/blog/<slug>/` - 10 статей + AuthorByline + Article schema

### MDX-кейсы по industry (23 штуки)
- **real-estate (9):** premium-villas-phuket⭐, good-karma⭐, ibg-property⭐, nextpoint-condominium, dubai-real-estate, phuket-developer⭐, country-houses⭐, samolet-plus-sochi, karkasnye-doma-spb
- **e-commerce (2):** luding⭐, toytrick⭐
- **edtech (2):** beyond-taylor⭐, algoritmika⭐
- **tourism (2):** phuket-excursions⭐, kmv-sanatoria⭐
- **medical (7):** stomatology-spb⭐, prague-clinic-implants⭐, almaty-clinics-network⭐, astana-clinic-launch, dubai-orthodontics, minsk-dental-clinic, spb-kids-dental
- **kids (1):** tropicano⭐

⭐ = featured: true

### MDX-статьи блога (10 штук)

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

1. **Privacy и Offer** - перед длинной дистанцией показать юристу Магоша.

2. **country-houses и phuket-developer** не всплыли на главной - старые publishedAt. Решение: либо featured: false убрать с других, либо обновить даты.

3. **Beyond Taylor "80 продаж"** в /services/sales-support/ - Магош не подтвердил, цифр нет в PDF.

4. **Article schema + ItemList** - после деплоя v2.19.2 проверить в Google Rich Results Test.

5. **Яндекс.Вебмастер** - в настройках сайта указать https://.

6. **GEO: фото /team/magosh.jpg** - нужно 500x500+ для AuthorByline в 26 местах. Без файла показываются инициалы МА. Для E-E-A-T и LLM лучше реальное фото.

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

8. **llms-full.txt** обновлен в Сессии 11 с 7 новыми URL блога. Следующий плановый апдейт - после Сессии 12 или через 3 месяца.

9. **Person schema sameAs Магоша** - сейчас только Telegram и Instagram. Добавить LinkedIn, VC, Habr если есть. Править в src/lib/seo-geo.ts → TEAM_PERSONS.magosh.sameAs.

10. **Цифры в листикле "Топ-10 агентств Пхукет"** - часть агентств описаны по публичным данным. Если Магош знает реальные ценники конкурентов точнее - править соответствующий блок в .mdx.

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

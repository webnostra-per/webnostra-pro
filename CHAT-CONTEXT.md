# WEBNOSTRA PERFORMANCE - состояние проекта

**Дата:** 22.04.2026
**Актуальная версия:** v2.19 (Сессия 10, GEO-развертывание)
**Статус:** билд чистый, 58 страниц, ~12-17 сек, готово к git push
**Следующая задача:** Сессия 11 - блог-кластеры (недвижимость, услуги-сравнения, отрасли), 5-10 новых статей

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
- 0 em-dashes (—), только обычные тире (-).
- 0 буквы "ё", только "е".

### Ключевые цифры
- $3M+ освоено в 2025 году
- 200+ проектов
- 15+ специалистов
- x5 средний ROI
- 8+ лет опыта, с 2018

---

## Что сделано по сессиям

### Сессии 1-8 (v2.10 - v2.17)
Архитектура + 54 страницы + 23 MDX-кейса (7 medical в Сессии 8). Прод-деплой, оптимизация PageSpeed, Article schema, чекбокс 152-ФЗ, вычитка.

### Сессия 9 (готово, v2.18) - GEO-фундамент
llms.txt + llms-full.txt + robots.txt для AI-crawlers + компоненты QuickAnswer/LastUpdated/AuthorByline + /authors/magosh/ + TEAM_PERSONS в seo-geo.ts.

### Сессия 10 (готово, v2.19) - GEO-развертывание

**Цель:** Разложить GEO-компоненты на все страницы, подключить AI-crawlers к новому контенту, создать первые листиклы для цитирования LLM.

**Что сделано:**

**1. QuickAnswer + LastUpdated - 25 страниц:**
- 7 услуг (meta-ads, yandex-direct, google-ads, vk-ads, creatives, analytics, sales-support)
- 7 стран недвижимости (thailand, dubai, bali, north-cyprus, turkey, russia, georgia)
- 6 отраслей (medical, real-estate, e-commerce, edtech, tourism, b2b)
- 4 хаба (/services/, /real-estate/, /industries/, /portfolio/)

**2. AuthorByline - через template, на 26 страницах:**
- src/pages/portfolio/[slug].astro - автоматически на все 23 MDX-кейса (с форматированной датой + расчётом времени чтения)
- src/pages/blog/[slug].astro - на все 3 листикла

**3. ItemList schema:**
- /portfolio/ - 23 кейса в JSON-LD с URL и descriptions
- /blog/ - 3 статьи в JSON-LD

**4. Блог /blog/ - 3 пилотных листикла:**
- **top-10-agentstv-nedvizhimosti-phuket** (1,800 слов) - Топ-10 агентств Пхукет, сравнительная таблица
- **meta-ads-vs-yandex-direct-dlya-nedvizhimosti** (1,900 слов) - сравнение каналов с цифрами из кейсов
- **kak-vybrat-performance-agentstvo** (2,100 слов) - чек-лист из 15 пунктов

**5. Блог-инфраструктура:**
- src/pages/blog/index.astro (хаб с карточками + ItemList schema)
- src/pages/blog/[slug].astro (template с AuthorByline, LastUpdated, Article schema, глобальные стили для markdown)
- src/content/blog/ (3 MDX статьи)
- Navigation (Блог в desktop + mobile меню)
- Footer (ссылка на /blog/)

**6. Технические фиксы:**
- astro.config.mjs - убран filter `!page.includes('/blog/')` из sitemap (теперь 4 blog-URL индексируются)
- public/llms-full.txt - добавлена секция "Блог и экспертные материалы"

**Верификация билда v2.19:**
- 58 страниц (было 54: +3 листикла, +1 blog-хаб)
- QuickAnswer в HTML: 25 страниц
- AuthorByline в HTML: 26 страниц (23 кейса + 3 листикла)
- LastUpdated в HTML: 28 страниц
- ItemList schema: /portfolio/ (23 элемента), /blog/ (3 элемента)
- sitemap-0.xml содержит все 4 blog-URL
- Билд 11-17 секунд, без ошибок

**Известная проблема Сессии 10 (решена, но для урока):**

Скрипты `insert-qa-*.mjs` использовали `String.prototype.replace(regex, str)` для вставки блоков. В replacement-строке символ `$` + цифра воспринимается JS как backreference ($1, $2 = захваченные группы из regex). Любой value, начинающийся с долларового значения ($15K, $250K, $8,000, $3,500), ломал замену - вставлялся лишний HeroLeaf-блок или обрезанный value. Пострадало 10 файлов, все починены вручную через str_replace.

Решение на будущее: использовать function-replacement `(match) => replacement` или `$$` вместо `$` в строке замены.

**Не сделано в Сессии 10 (для Сессии 11):**
- Тест листиклов в Google Rich Results Test и Яндекс.Вебмастере после деплоя
- Первые замеры Prompt Win Rate в ChatGPT/Perplexity/Яндекс Нейро
- AuthorByline в кейсах реализован через [slug].astro, не через MDX frontmatter. Если нужна кастомизация на конкретный кейс - правим template

**Следующие сессии по плану:**
- Сессия 11: Кластер "Недвижимость ЮВА" - 5-7 статей (Пхукет vs Паттайя, Бали leasehold инвестиции, русские в Дубае схемы оплаты, ВНЖ Северный Кипр, сезонность ЮВА, инвестиции под 400K гражданство Турции)
- Сессия 12: Кластер "Услуги и сравнения" - 5 статей (PMax разбор, офлайн-конверсии в Meta, VK Ads для новых регионов, Telegram Ads для инвесторов, Яндекс Аудитории для B2B)
- Сессия 13: Кластер "Отраслевые" - 5 статей (38-ФЗ в стоматологии, санатории в высокий сезон, e-com ROAS калькулятор, EdTech окупаемость пробного урока, B2B длинный цикл)
- Сессия 14: Линкбилдинг - гостевые на Habr/VC.ru/VC, аутрич к 50+ клиентам
- Сессия 15+: Мониторинг + итеративная оптимизация

---

## Текущее состояние

### Структура Astro-страниц (58 всего)
- `/` - главная (3 featured-кейса на вкладку)
- `/404/` - ошибка
- `/portfolio/` - хаб 23 Astro-кейсов + QuickAnswer + ItemList schema
- `/portfolio/<slug>/` - 23 MDX-кейса с AuthorByline и Article schema
- `/services/` - хаб + QA
- `/services/<slug>/` - 7 страниц (meta-ads, yandex-direct, google-ads, vk-ads, creatives, analytics, sales-support) + QA
- `/real-estate/` - хаб + QA
- `/real-estate/<country>/` - 7 стран (thailand, dubai, bali, north-cyprus, turkey, russia, georgia) + QA
- `/industries/` - хаб + QA
- `/industries/<slug>/` - 6 отраслей (real-estate, e-commerce, edtech, tourism, medical, b2b) + QA
- `/about/`, `/contacts/`, `/privacy/`, `/offer/`
- `/authors/magosh/` - Person schema для E-E-A-T
- `/blog/` - хаб блога + ItemList schema (NEW v2.19)
- `/blog/<slug>/` - 3 листикла + AuthorByline + Article schema (NEW v2.19)

### MDX-кейсы по industry (23 штуки)
- **real-estate (9):** premium-villas-phuket⭐, good-karma⭐, ibg-property⭐, nextpoint-condominium, dubai-real-estate, phuket-developer⭐, country-houses⭐, samolet-plus-sochi, karkasnye-doma-spb
- **e-commerce (2):** luding⭐, toytrick⭐
- **edtech (2):** beyond-taylor⭐, algoritmika⭐
- **tourism (2):** phuket-excursions⭐, kmv-sanatoria⭐
- **medical (7):** stomatology-spb⭐, prague-clinic-implants⭐, almaty-clinics-network⭐, astana-clinic-launch, dubai-orthodontics, minsk-dental-clinic, spb-kids-dental
- **kids (1):** tropicano⭐

### MDX-статьи блога (3 штуки)
- top-10-agentstv-nedvizhimosti-phuket (теги: Недвижимость, Пхукет, Агентства)
- meta-ads-vs-yandex-direct-dlya-nedvizhimosti (теги: Недвижимость, Сравнение, Meta Ads, Яндекс Директ)
- kak-vybrat-performance-agentstvo (теги: Выбор агентства, Чек-лист, Performance)

### FAQ состояние
110 записей, теги см. v2.18.

### Легаси в public/
- `/cases/*` - 58 HTML-кейсов
- `/ai/*`, `/performance/*`, `/team/*`, `/files/*`
- `/llms.txt`, `/llms-full.txt` (обновлен с секцией блога), `/robots.txt`

---

## Открытые вопросы

1. **Privacy и Offer** - показать юристу Магоша.

2. **country-houses и phuket-developer** не всплыли на главной - старые по дате.

3. **Beyond Taylor "80 продаж"** - Магош пока не подтвердил, данные не из PDF.

4. **Article schema** и ItemList schema в /portfolio/ - после деплоя v2.19 проверить в Google Rich Results Test.

5. **Яндекс.Вебмастер** - в настройках сайта указать https://.

6. **GEO: фото Магоша /team/magosh.jpg** - нужно 500x500+ для AuthorByline в 26 местах. Без файла показываются инициалы.

7. **GEO: мониторинг Prompt Win Rate** - раз в 2 недели 10 запросов в ChatGPT/Perplexity/Яндекс Нейро. Стартовая планка 10-20%, цель 40-55% через 3 мес. Запросы для начала: "лучшее агентство рекламы недвижимости Пхукет", "meta ads или яндекс директ для недвижимости", "как выбрать performance агентство", "агентство недвижимости Дубай с русскоязычной командой".

8. **llms-full.txt** обновлять раз в квартал.

9. **Person schema sameAs Магоша** - добавить LinkedIn, VC, Habr если есть.

10. **Цифры в листикле "Топ-10 агентств Пхукет"** - если обнаружатся неточности по конкретным агентствам, править соответствующий блок в MDX.

11. **Внутренние ссылки из листиклов** - сейчас ведут на /real-estate/thailand/, /portfolio/, #form-final. В следующих сессиях при появлении узких статей - добавлять ссылки.

---

## Переменные окружения (в .env, залиты в Netlify)

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
PUBLIC_GSC_VERIFICATION=nmQjVPU1uWcZBnXUC8UuClWhXhjvMsGsdojPA_gD8vA
PUBLIC_YANDEX_VERIFICATION=3076d7b484d6a684
```

---

## Локальная инфраструктура

- Папка: `~/Desktop/webnostra-pro/`
- Dev URL: `http://localhost:4321`
- Git repo: github.com/webnostra-per/webnostra-pro (private)
- Netlify: сайт webnostra.pro, автодеплой с main ветки

## Быстрые команды

```bash
# Обновление из архива
cd ~/Desktop/webnostra-pro
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
unzip -q ~/Downloads/webnostra-pro-v2_19.zip -d /tmp/new
mv /tmp/new/webnostra-pro/* .
mv /tmp/new/webnostra-pro/.* . 2>/dev/null
rm -rf /tmp/new node_modules package-lock.json
npm install && npm run dev

# Коммит и деплой
git add -A && git commit -m "v2.19 GEO rollout: QuickAnswer на 25 страницах, AuthorByline через template, 3 листикла, блог-инфраструктура, ItemList schema" && git push origin main
```

---

## Типовые ошибки прошлых сессий (не повторять)

Пункты 1-19 см. v2.18. Новое из Сессии 10:

20. **Массовая вставка через String.replace(regex, str) с $N в данных** - критический баг. Символы $1, $2 в replacement воспринимаются как regex backreference. Если value содержит $8,000, $15K, $250K - вставка ломает структуру. Решение: использовать function-replacement `((match) => result)` или экранировать через `$$`.

21. **После массовой автоматической вставки - всегда grep на битые паттерны** перед билдом. Команды: `grep -rn '<HeroLeaf' src/pages/services/ src/pages/real-estate/ src/pages/industries/ | grep -v 'astro:[0-9]*:  <HeroLeaf$'` и `grep -rn 'value: "[^"]*<[^"]*"' src/pages/`. В Сессии 10 это выявило 10 битых файлов.

22. **astro.config.mjs sitemap filter** - проверять при добавлении новых разделов. В v2.18 был filter `!page.includes('/blog/')`. Снят в v2.19 при запуске блога.

23. **Skrypt-replacement новых блоков в Astro-файлах** - паттерн поиска должен быть максимально узким. Regex `<HeroLeaf[\s\S]*?\/>` может захватить соседние HeroLeaf если в файле их больше одного - что и случилось с битыми value.

---

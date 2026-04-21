# Справочник компонентов WEBNOSTRA PERFORMANCE

**Обязательная справка для каждой сессии работы с проектом.** Претендует на роль единственного источника правды о том, **как передавать пропсы**. Обновлять при изменении компонентов.

---

## 1. Breadcrumbs

```astro
import Breadcrumbs from '@components/ui/Breadcrumbs.astro';

// пропс items: массив { name, url }
<Breadcrumbs items={[
  { name: 'Главная', url: '/' },
  { name: 'Услуги', url: '/services/' },
  { name: 'Meta Ads', url: '/services/meta-ads/' },
]} />
```

**Важно:** последний элемент в items - текущая страница, рендерится как span без ссылки.

**Не передавать:** `label`, `href`. Это я путал.

---

## 2. Label

```astro
import Label from '@components/ui/Label.astro';

// только атрибут text
<Label text="Услуги" />
<Label text="Проблемы" class="red" />
```

**Не делать:** `<Label>Текст</Label>` (children не поддерживается).

---

## 3. Button

```astro
import Button from '@components/ui/Button.astro';

<Button href="#form-final">Обсудить проект</Button>
<Button href="/services/" variant="secondary">Все услуги</Button>
<Button href="https://t.me/m/..." external>Telegram</Button>
<Button href="#form" variant="ghost" arrow={false}>Без стрелки</Button>
```

`variant`: `primary` (default, золотая), `secondary` (outline), `ghost` (text-only)

---

## 4. StatusPill

```astro
import StatusPill from '@components/ui/StatusPill.astro';

// БЕЗ пропсов - берет данные из current-status.json
<StatusPill />

// Или с пропсами-оверрайдами
<StatusPill clients={25} budget="$300K" period="в этом месяце" />
```

**Назначение:** живая метка "сейчас в работе: 22 клиента на $224K".

**НЕ использовать как general badge в inline-кейсах!** Для этого делать свой `<span class="case-pill">текст</span>`.

---

## 5. LeadForm

```astro
import LeadForm from '@components/ui/LeadForm.astro';

// Минимум - только leadSource
<LeadForm leadSource="services_meta_ads" />

// Полная версия
<LeadForm
  leadSource="services_meta_ads"
  contentCategory="services"
  title="Получить медиаплан"
  subtitle="Ответим в течение 24 часов"
  submitLabel="Отправить заявку"
  compact={false}
  id="form-meta-ads"
/>
```

**Важно:** `leadSource` должен быть в `LEAD_SOURCE_LABELS` из `src/lib/constants.ts`.

---

## 6. StickyMobileCta

```astro
import StickyMobileCta from '@components/ui/StickyMobileCta.astro';

// Минимум - без пропсов (используются дефолты)
<StickyMobileCta />

// С пропсами
<StickyMobileCta
  targetHash="#form-final"
  label="Обсудить проект"
  meta="Ответ за 24ч"
/>
```

**Пропс `targetHash`, а не `href`!** Хэш с `#`.

---

## 7. Toc (оглавление)

```astro
import Toc from '@components/ui/Toc.astro';

<Toc items={[
  { id: 'section-1', label: 'Первый раздел' },
  { id: 'section-2', label: 'Второй раздел' },
]} />

// С кастомным заголовком
<Toc items={[...]} title="Навигация по странице" />
```

**Важно:** `id` в items должны совпадать с `id` у `<section>` на странице.

---

## 8. HeroHome

Используется только на `/` (главной). Без пропсов - вся логика внутри.

```astro
import HeroHome from '@components/hero/HeroHome.astro';
<HeroHome />
```

---

## 9. HeroHub (для хаб-страниц: /services/, /real-estate/, /industries/)

```astro
import HeroHub from '@components/hero/HeroHub.astro';

<HeroHub
  label="Услуги"
  title="Семь направлений работы"
  description="Описание страницы, 1-2 предложения"
  meta={[
    { value: '7', label: 'направлений' },
    { value: '5', label: 'команд' },
  ]}
  breadcrumbs={[
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services/' },
  ]}
/>
```

**Не передавать:** `eyebrow`, `subtitle`, `primaryCta`, `secondaryCta`, `stats` - это я путал.

---

## 10. HeroLeaf (для leaf-страниц: конкретные услуги, страны, отрасли)

```astro
import HeroLeaf from '@components/hero/HeroLeaf.astro';

<HeroLeaf
  label="Услуга · Meta Ads"
  title="Meta Ads, где оптимизируем на квал-лида"
  description="Подробное описание страницы"
  ctaText="Обсудить проект"
  ctaHref="#form-final"
  breadcrumbs={[
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services/' },
    { name: 'Meta Ads', url: '/services/meta-ads/' },
  ]}
/>
```

**Важно:**
- Breadcrumbs уже рендерится внутри HeroLeaf - на странице отдельно его НЕ вызываем.
- Одна кнопка CTA (ctaText + ctaHref), не две.
- title может содержать `<span class="accent">...</span>` для акцентов.

---

## 11. HeroCase (для страниц кейсов)

```astro
import HeroCase from '@components/hero/HeroCase.astro';

<HeroCase
  tag="НЕДВИЖИМОСТЬ · ТАИЛАНД"
  client="Premium Villas Phuket"
  subtitle="Застройщик премиум-вилл на Пхукете"
  metrics={[
    { value: '$450K', label: 'средний чек' },
    { value: '7', label: 'сделок' },
    { value: '$3.2M', label: 'pipeline' },
    { value: '89', label: 'квал. лидов' },
  ]}
  breadcrumbs={[...]}
/>
```

---

## 12. Faq

```astro
import Faq from '@components/sections/Faq.astro';

<Faq tag="meta-ads" title="Короткие ответы на частые вопросы" label="FAQ" />

// Минимум
<Faq tag="meta-ads" title="Вопросы и ответы" />
```

**Важно:**
- Faq САМ грузит вопросы из коллекции по тегу, не надо передавать items!
- JSON-LD schema.org/FAQPage генерируется автоматически.
- Теги у FAQ-записей должны быть определены (после патча tags свободные).
- Порядок вопросов определяется полем `order` в `faq.json`.

---

## 13. CtaSection

```astro
import CtaSection from '@components/sections/CtaSection.astro';

<CtaSection
  title="Обсудим ваш проект"
  description="Бесплатная 40-минутная диагностика..."
  leadSource="services_meta_ads"
  bullets={[
    'Аудит кабинетов за 24 часа',
    'Расчет unit-экономики',
    'Кейсы из вашей ниши',
  ]}
  formTitle="Получить медиаплан"
  formSubtitle="Ответим в течение 24 часов"
  id="form-final"
/>
```

**Важно:**
- У CtaSection ВНУТРИ уже есть LeadForm. Не нужно вставлять LeadForm отдельно перед ней.
- id формы по умолчанию = `form-final`, на него ведут все CTA-ссылки и StickyMobileCta.
- НЕТ пропса `links` - если нужны ссылки на другие страницы, делать отдельный блок ПЕРЕД CtaSection.
- `title` может содержать `<span class="accent">...</span>`.

**Не делать:** `links=[...]` - такого пропса нет.

---

## Типовые ошибки, которые я совершал

1. **Breadcrumbs передавал с { label, href }** вместо { name, url }
2. **Label передавал как `<Label>текст</Label>`** вместо `<Label text="..." />`
3. **HeroLeaf передавал с eyebrow/subtitle/stats/primaryCta/secondaryCta** вместо label/description/ctaText/ctaHref
4. **Faq передавал items** - он их не принимает, только tag
5. **CtaSection передавал links** - такого пропса нет, надо делать отдельный блок
6. **LeadForm вставлял дополнительно к CtaSection** - дублирование форм
7. **StickyMobileCta передавал href** вместо targetHash
8. **StatusPill использовал как общий badge** в inline-кейсах - он не для этого

Если пишу новую страницу - начинаю с этого файла и иду по каждому компоненту.

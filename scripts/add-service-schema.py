#!/usr/bin/env python3
"""Добавляет Service schema к 7 страницам услуг."""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
SERVICES_DIR = ROOT / "src/pages/services"

# name, description, path, serviceType для каждой услуги
SERVICES = {
    "meta-ads.astro": {
        "name": "Настройка и ведение Meta Ads (Facebook и Instagram)",
        "description": "Запуск и ведение рекламы в Facebook и Instagram с оптимизацией на квалифицированные лиды и оффлайн-конверсии через CAPI. Для недвижимости, e-commerce, инфобизнеса, туризма.",
        "path": "/services/meta-ads/",
        "serviceType": "Facebook and Instagram Advertising",
    },
    "yandex-direct.astro": {
        "name": "Настройка и ведение Яндекс Директ",
        "description": "Ведение рекламы в Яндекс Директ и РСЯ с передачей оффлайн-конверсий из CRM. Поиск, РСЯ, Мастер Кампаний, ретаргетинг. Для недвижимости, e-commerce, инфобизнеса, медицины в РФ.",
        "path": "/services/yandex-direct/",
        "serviceType": "Yandex Direct Advertising",
    },
    "google-ads.astro": {
        "name": "Настройка и ведение Google Ads",
        "description": "Ведение Google Ads и Performance Max для международных проектов: Дубай, Бали, Таиланд, Европа, США. Поиск, Shopping, YouTube, Discovery, Enhanced Conversions.",
        "path": "/services/google-ads/",
        "serviceType": "Google Ads Advertising",
    },
    "vk-ads.astro": {
        "name": "Настройка и ведение VK Ads",
        "description": "Ведение таргетированной рекламы во ВКонтакте: маркет-платформа, лид-формы, динамические креативы. Для e-commerce, инфобизнеса, медицины и недвижимости в РФ и Крыму.",
        "path": "/services/vk-ads/",
        "serviceType": "VK Ads Advertising",
    },
    "creatives.astro": {
        "name": "Разработка рекламных креативов",
        "description": "Производство статичных и видеокреативов для рекламных кабинетов: дрон-съёмка, 3D-рендеры, моушен, копирайтинг. Локализация под разные языки и рынки.",
        "path": "/services/creatives/",
        "serviceType": "Creative Production",
    },
    "analytics.astro": {
        "name": "Настройка сквозной аналитики и CRM-интеграции",
        "description": "Настройка Яндекс Метрики, GA4, пикселей, передача оффлайн-конверсий из CRM (AmoCRM, Bitrix24, Getcourse, Profitbase) в рекламные кабинеты.",
        "path": "/services/analytics/",
        "serviceType": "Marketing Analytics and Attribution",
    },
    "sales-support.astro": {
        "name": "Отдел продаж и контроль качества",
        "description": "Построение и сопровождение отдела продаж клиента: скрипты, CRM, РОП, контроль качества обработки лидов, прослушивание звонков, работа с возражениями.",
        "path": "/services/sales-support/",
        "serviceType": "Sales Operations Consulting",
    },
}

def patch_file(filepath: Path, svc: dict) -> bool:
    text = filepath.read_text(encoding="utf-8")
    if "serviceSchema" in text:
        print(f"  уже патчен: {filepath.name}")
        return False

    # 1) Добавить импорт serviceSchema
    # Найдём последнюю строку import, встретим пустую строку или const, и вставим импорт
    import_match = re.search(r"(import\s+[^;]+;\s*\n)(?=\s*\n|\s*const )", text)
    if not import_match:
        # fallback — после последнего import
        imports = list(re.finditer(r"^import\s+[^;]+;\s*\n", text, re.MULTILINE))
        if not imports:
            print(f"  НЕ НАЙДЕНЫ импорты: {filepath.name}")
            return False
        last = imports[-1]
        insert_at = last.end()
    else:
        insert_at = import_match.end()

    new_import = "import { serviceSchema } from '@lib/seo';\n"
    text = text[:insert_at] + new_import + text[insert_at:]

    # 2) Найти `---` frontmatter-окончание (второй встречается) и перед ним вставить const
    # Frontmatter: два `---` — ищу второй
    fm_matches = list(re.finditer(r"^---\s*$", text, re.MULTILINE))
    if len(fm_matches) < 2:
        print(f"  нет frontmatter: {filepath.name}")
        return False
    fm_end = fm_matches[1].start()

    schema_const = (
        f"\nconst schema = serviceSchema({{\n"
        f"  name: {repr(svc['name'])},\n"
        f"  description: {repr(svc['description'])},\n"
        f"  path: {repr(svc['path'])},\n"
        f"  serviceType: {repr(svc['serviceType'])},\n"
        f"}});\n"
    )
    text = text[:fm_end] + schema_const + text[fm_end:]

    # 3) Добавить structuredData в <BaseLayout ...>
    # Найти первое <BaseLayout ...>. Заменю "<BaseLayout title={title}" -> добавлю structuredData={schema}
    # Страховка: только первое вхождение
    text, n = re.subn(
        r"<BaseLayout(\s+[^>]*?)>",
        lambda m: f"<BaseLayout{m.group(1)} structuredData={{schema}}>",
        text,
        count=1,
    )
    if n != 1:
        print(f"  не заменился BaseLayout: {filepath.name}")
        return False

    filepath.write_text(text, encoding="utf-8")
    return True

changed = 0
for fname, svc in SERVICES.items():
    fp = SERVICES_DIR / fname
    if not fp.exists():
        print(f"НЕТ файла: {fname}")
        continue
    if patch_file(fp, svc):
        changed += 1
        print(f"  + {fname}")

print(f"\nПатчено: {changed} из {len(SERVICES)}")

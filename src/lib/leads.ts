/**
 * ═══════════════════════════════════════════════════════════════════
 *  WEBNOSTRA — Lead Generation Module
 *  Дублирующая доставка лидов: Albato webhook + Telegram Bot API
 *  Локальный бекап в localStorage + Meta Pixel + Яндекс.Метрика
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  LEAD_SOURCE_LABELS,
  MARKET_LABELS,
  BACKUP_MAX_LEADS,
  BACKUP_STORAGE_KEY,
  UTM_SESSION_KEY,
} from './constants';

// ── Типы ──────────────────────────────────────────────────────────

export interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  yclid: string;
}

export interface LeadPayload extends UtmData {
  // Данные из формы
  name: string;
  contact: string;
  market: string;

  // Классификация
  lead_source: string;
  content_category: string;

  // Технический контекст
  page_url: string;
  referrer: string;
  user_agent: string;
  screen_resolution: string;
  timestamp: string;
  timezone: string;

  // Служебное
  _backup_id?: string;
  _backup_status?: 'pending' | 'sent' | 'failed';
}

export interface DeliveryOutcome {
  channel: 'albato' | 'telegram' | 'unknown';
  ok: boolean;
  status?: number;
  error?: unknown;
}

// ── Конфиг из env ─────────────────────────────────────────────────
// В Astro public env-переменные доступны через import.meta.env.PUBLIC_*

const ALBATO_WEBHOOK = import.meta.env.PUBLIC_ALBATO_WEBHOOK;
const TG_BOT_TOKEN = import.meta.env.PUBLIC_TG_BOT_TOKEN;
const TG_CHAT_ID = import.meta.env.PUBLIC_TG_CHAT_ID;
const YM_ID = Number(import.meta.env.PUBLIC_YM_ID);

// ── UTM persistence ───────────────────────────────────────────────

export function getUrlParams(): UtmData {
  if (typeof window === 'undefined') {
    return emptyUtm();
  }
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_content: p.get('utm_content') || '',
    utm_term: p.get('utm_term') || '',
    fbclid: p.get('fbclid') || '',
    gclid: p.get('gclid') || '',
    yclid: p.get('yclid') || '',
  };
}

function emptyUtm(): UtmData {
  return {
    utm_source: '', utm_medium: '', utm_campaign: '',
    utm_content: '', utm_term: '',
    fbclid: '', gclid: '', yclid: '',
  };
}

/**
 * Сохраняет UTM-метки в sessionStorage при загрузке страницы.
 * Вызывается один раз при инициализации приложения.
 */
export function persistUtm(): void {
  if (typeof window === 'undefined') return;
  const current = getUrlParams();
  const hasAny = Object.values(current).some(v => v);
  if (hasAny) {
    try {
      sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(current));
    } catch {}
  }
}

/**
 * Возвращает сохранённые UTM или текущие из URL.
 */
export function getStoredUtm(): UtmData {
  if (typeof window === 'undefined') return emptyUtm();
  try {
    const stored = sessionStorage.getItem(UTM_SESSION_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return getUrlParams();
}

// ── Telegram delivery ─────────────────────────────────────────────

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatLeadForTelegram(payload: LeadPayload): string {
  const sourceLabel = LEAD_SOURCE_LABELS[payload.lead_source] || payload.lead_source;

  const utmLines: string[] = [];
  if (payload.utm_source) utmLines.push(`source: ${payload.utm_source}`);
  if (payload.utm_medium) utmLines.push(`medium: ${payload.utm_medium}`);
  if (payload.utm_campaign) utmLines.push(`campaign: ${payload.utm_campaign}`);
  if (payload.utm_content) utmLines.push(`content: ${payload.utm_content}`);
  if (payload.utm_term) utmLines.push(`term: ${payload.utm_term}`);
  if (payload.fbclid) utmLines.push(`fbclid: ${payload.fbclid}`);
  if (payload.gclid) utmLines.push(`gclid: ${payload.gclid}`);
  if (payload.yclid) utmLines.push(`yclid: ${payload.yclid}`);

  const utmBlock = utmLines.length
    ? `\n<b>UTM:</b>\n<code>${utmLines.join('\n')}</code>`
    : '\n<b>UTM:</b> прямой заход';

  const time = new Date(payload.timestamp).toLocaleString('ru-RU', {
    timeZone: 'Asia/Bangkok',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return `🔥 <b>Новый лид — ${escapeHtml(sourceLabel)}</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(payload.name)}\n` +
    `<b>Контакт:</b> ${escapeHtml(payload.contact)}\n` +
    `<b>Рынок:</b> ${MARKET_LABELS[payload.market] || payload.market || 'не указан'}\n` +
    `<b>Страница:</b> <code>${escapeHtml(payload.page_url)}</code>${utmBlock}\n\n` +
    `<b>Время (Bangkok):</b> ${time}`;
}

async function sendToTelegram(payload: LeadPayload): Promise<boolean> {
  const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: TG_CHAT_ID,
    text: formatLeadForTelegram(payload),
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// ── localStorage backup ───────────────────────────────────────────

function updateBackupStatus(backupId: string, status: 'sent' | 'failed'): void {
  if (typeof window === 'undefined') return;
  try {
    const backup = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
    const idx = backup.findIndex((l: LeadPayload) => l._backup_id === backupId);
    if (idx !== -1) {
      backup[idx]._backup_status = status;
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backup));
    }
  } catch {}
}

/**
 * Регистрирует утилиты в window для выгрузки бекапа из консоли.
 * Вызывается при инициализации приложения.
 */
export function registerBackupUtils(): void {
  if (typeof window === 'undefined') return;

  (window as any).wnGetAllLeads = function () {
    try {
      return JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  };

  (window as any).wnGetFailedLeads = function () {
    return (window as any).wnGetAllLeads().filter(
      (l: LeadPayload) => l._backup_status === 'failed'
    );
  };

  (window as any).wnExportLeadsCsv = function () {
    const leads = (window as any).wnGetAllLeads();
    if (!leads.length) {
      console.log('No leads in backup');
      return;
    }
    const keys = Object.keys(leads[0]);
    const csv = [keys.join(',')]
      .concat(leads.map((l: any) => keys.map(k => JSON.stringify(l[k] ?? '')).join(',')))
      .join('\n');
    console.log(csv);
    return csv;
  };
}

// ── Главная функция submitForm ────────────────────────────────────

/**
 * Обрабатывает сабмит формы заявки.
 * @param e — submit event
 * @param leadSource — ключ из LEAD_SOURCE_LABELS (напр. 'homepage', 'thailand')
 * @param contentCategory — для Meta Pixel content_category
 */
export async function submitForm(
  e: Event,
  leadSource: string,
  contentCategory: string
): Promise<boolean> {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const card = form.closest('.form-card') as HTMLElement | null;
  const success = card?.querySelector('.form-success') as HTMLElement | null;
  const submitBtn = form.querySelector('.form-submit') as HTMLButtonElement | null;
  const data = new FormData(form);

  if (!data.get('market')) data.set('market', '');

  // Блокируем кнопку
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    submitBtn.innerHTML = 'Отправляем...';
  }

  const utm = getStoredUtm();
  const backupId = Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  const payload: LeadPayload = {
    name: (data.get('name') as string) || '',
    contact: (data.get('contact') as string) || '',
    market: (data.get('market') as string) || '',
    lead_source: leadSource || 'unknown',
    content_category: contentCategory || 'general',
    ...utm,
    page_url: window.location.href,
    referrer: document.referrer || '',
    user_agent: navigator.userAgent,
    screen_resolution: window.screen.width + 'x' + window.screen.height,
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    _backup_id: backupId,
  };

  // 1. Локальный бекап ПЕРЕД отправкой — на случай падения всех каналов
  try {
    const backup = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
    backup.push({ ...payload, _backup_status: 'pending' });
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backup.slice(-BACKUP_MAX_LEADS)));
  } catch {}

  // 2. Meta Pixel — Lead event (синхронно, не ждём сервер)
  try {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', {
        content_name: payload.lead_source,
        content_category: payload.content_category,
        value: 1,
        currency: 'USD',
      });
    }
  } catch (err) {
    console.warn('fbq Lead event failed:', err);
  }

  // 3. Яндекс.Метрика — достижение цели
  try {
    const ym = (window as any).ym;
    if (typeof ym === 'function' && YM_ID) {
      ym(YM_ID, 'reachGoal', 'lead', {
        lead_source: payload.lead_source,
        market: payload.market,
      });
    }
  } catch (err) {
    console.warn('ym reachGoal failed:', err);
  }

  // 4. Параллельная отправка: Albato + Telegram
  const results = await Promise.allSettled<DeliveryOutcome>([
    fetch(ALBATO_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(r => ({ channel: 'albato' as const, ok: r.ok, status: r.status })),
    sendToTelegram(payload).then(ok => ({ channel: 'telegram' as const, ok })),
  ]);

  const outcomes: DeliveryOutcome[] = results.map(r =>
    r.status === 'fulfilled'
      ? r.value
      : { channel: 'unknown' as const, ok: false, error: r.reason }
  );
  console.log('Lead delivery:', outcomes);

  const anyDelivered = outcomes.some(o => o.ok);
  updateBackupStatus(backupId, anyDelivered ? 'sent' : 'failed');

  if (!anyDelivered) {
    console.error('⚠ ALL CHANNELS FAILED. Lead saved to localStorage only. Payload:', payload);
  }

  // 5. Success в любом случае (в бекапе точно есть)
  if (card && success) {
    const head = form.querySelector('.form-head') as HTMLElement | null;
    if (head) head.style.display = 'none';
    form.querySelectorAll<HTMLElement>('.form-row, .form-submit, .form-note')
      .forEach(el => el.style.display = 'none');
    success.classList.add('show');

    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  return false;
}

// ── Chips handler ─────────────────────────────────────────────────

/**
 * Инициализирует обработчики chips-элементов (группы выбора) во всех формах.
 * Вызывается один раз после загрузки страницы.
 */
export function initChips(): void {
  if (typeof document === 'undefined') return;
  document.querySelectorAll<HTMLElement>('.form-chips').forEach(group => {
    const chips = group.querySelectorAll<HTMLElement>('.chip');
    const targetId = group.dataset.group;
    const input = targetId ? document.getElementById(targetId) as HTMLInputElement | null : null;
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (input && chip.dataset.value) {
          input.value = chip.dataset.value;
        }
      });
    });
  });
}

// ── Инициализация (вызвать один раз на странице) ──────────────────

/**
 * Общая инициализация всех частей lead-flow.
 * Вызывается из client-скрипта в BaseLayout.astro.
 */
export function initLeadSystem(): void {
  persistUtm();
  registerBackupUtils();
  initChips();

  // Экспортируем submitForm в window, чтобы формы могли звать её через onsubmit
  (window as any).submitForm = submitForm;
}

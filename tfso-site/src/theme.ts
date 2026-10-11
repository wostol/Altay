/* ══════════════════════════════════════════════════════════════
   ТФСО · тема «новой версии» (по мотивам orient.tomsk.ru, но
   в обновлённом стиле). Общие токены стилей: кнопки, палитра
   обложек-карт, вспомогательные CSS-классы (анимации).
   ══════════════════════════════════════════════════════════════ */

export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#166534] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0B3B24]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#15803D] hover:shadow-xl hover:shadow-[#0B3B24]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 active:translate-y-0'

export const BTN_GHOST =
  'inline-flex items-center justify-center gap-2 rounded-full border border-stone-300/80 bg-white/85 px-6 py-3 text-sm font-bold text-stone-800 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#166534]/50 hover:bg-white hover:text-[#0B3B24] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] active:translate-y-0'

/* Палитры декоративных SVG-обложек (стиль спортивной карты) */
export type CoverPalette = {
  base: string
  veg: string
  veg2: string
  open: string
  contour: string
  cp: string
}

export const COVER_PALETTES: CoverPalette[] = [
  { base: '#F4F7EC', veg: '#CFE3BE', veg2: '#B4D6A0', open: '#F6E9AE', contour: '#B4763C', cp: '#DB2777' },
  { base: '#FBF4E6', veg: '#E6DBB6', veg2: '#CBD9A6', open: '#F0C987', contour: '#A9662F', cp: '#C026D3' },
  { base: '#EDF3F1', veg: '#BFD8CB', veg2: '#9CC3B0', open: '#E9EFCB', contour: '#8A6A45', cp: '#DB2777' },
  { base: '#0C2A1C', veg: '#17432D', veg2: '#215C3C', open: '#2E6B45', contour: '#D9A45B', cp: '#BEF264' },
]

export function isNightPalette(variant: number): boolean {
  return variant % COVER_PALETTES.length === 3
}

/* Статусы соревнований — вариант на светлом фоне */
export type EventStatus = 'open' | 'soon' | 'closed'

export const STATUS_LIGHT: Record<
  EventStatus,
  { label: string; pill: string; dot: string }
> = {
  open: {
    label: 'Регистрация открыта',
    pill: 'bg-emerald-100 text-emerald-900 ring-emerald-300/70',
    dot: 'bg-emerald-500',
  },
  soon: {
    label: 'Скоро',
    pill: 'bg-amber-100 text-amber-900 ring-amber-300/70',
    dot: 'bg-amber-500',
  },
  closed: {
    label: 'Завершено',
    pill: 'bg-stone-200 text-stone-600 ring-stone-300/70',
    dot: 'bg-stone-400',
  },
}

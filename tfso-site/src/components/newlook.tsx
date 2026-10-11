import { useEffect, useMemo, useState, type ReactNode, type ReactElement } from 'react'
import { BTN_GHOST, BTN_PRIMARY, COVER_PALETTES, isNightPalette } from '../theme'
import { IconArrow, IconCalendar, IconClock, IconCompass, IconFile, IconFlag, IconPin } from './icons'

/* ─────────── helpers: даты в русском формате ─────────── */

const MONTHS: Record<string, number> = {
  января: 0, февраля: 1, марта: 2, апреля: 3, мая: 4, июня: 5,
  июля: 6, августа: 7, сентября: 8, октября: 9, ноября: 10, декабря: 11,
}

export function parseRuDate(str: string): Date | null {
  const m = String(str).match(/(\d{1,2})(?:\s*[–—-]\s*\d{1,2})?\s+([а-яё]+)\s+(\d{4})/i)
  if (!m) return null
  const mon = MONTHS[m[2].toLowerCase()]
  if (mon === undefined) return null
  return new Date(Number(m[3]), mon, Number(m[1]), 10, 0, 0)
}

function useCountdown(target: number | null) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!target) return undefined
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  if (!target) return null
  const diff = Math.max(0, target - now)
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

/* ─────────── SVG-карта (фон hero) ─────────── */

export function HeroMap() {
  const contours = Array.from({ length: 18 }).map((_, i) => {
    const y = -20 + i * 46
    const amp = 16 + (i % 5) * 9
    return `M -60 ${y} C 200 ${y - amp}, 380 ${y + amp * 0.85}, 600 ${y - amp * 0.4} S 1000 ${y + amp}, 1240 ${y - amp * 0.6} S 1460 ${y + amp * 0.5}, 1560 ${y - amp * 0.2}`
  })
  return (
    <svg
      viewBox="0 0 1440 780"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="1440" height="780" fill="#F8F5EC" />
      <path d="M0 0h700c60 120-40 260 40 380s240 180 200 400H0Z" fill="#E4EFD9" />
      <path d="M760 0h680v300c-140 40-220 160-360 180s-240-60-320-160-60-220 0-320Z" fill="#D5E7C6" />
      <path d="M1050 420c120-30 250 10 390 0v360h-520c-40-140 10-260 130-360Z" fill="#EFF0CF" />
      <path d="M180 520c120-40 260 0 340 80s60 180 60 180H60c-40-120 0-220 120-260Z" fill="#F6E9AE" opacity=".85" />
      <path d="M1180 60c90 60 120 200 60 280s-200 90-260 30 0-230 80-280 90-50 120-30Z" fill="#C4DDB2" opacity=".7" />
      <path
        d="M-20 640C180 600 300 690 480 660s280-110 460-90 300 120 540 70"
        fill="none"
        stroke="#8FBEE0"
        strokeWidth="7"
        strokeLinecap="round"
        opacity=".9"
      />
      <path d="M1290 120c60 30 90 110 40 150s-140 10-150-50 60-130 110-100Z" fill="#A9CFE8" />
      <path d="M1290 120c60 30 90 110 40 150s-140 10-150-50 60-130 110-100Z" fill="none" stroke="#7FB2D9" strokeWidth="3" />
      <g fill="none" stroke="#C08A4E" strokeWidth="1.25" opacity=".55">
        {contours.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 5 === 0 ? 2 : 1.25} />
        ))}
      </g>
      <g stroke="#3F3F46" fill="none" opacity=".75">
        <path d="M120 780 260 520 470 430 700 470 900 330 1120 300 1440 180" strokeWidth="2.4" />
        <path d="M0 300 200 280 380 180 620 200 820 90 1080 110" strokeWidth="1.6" strokeDasharray="9 7" />
        <path d="M540 780 600 600 760 520 700 470" strokeWidth="1.6" />
        <path d="M1120 300 1180 480 1360 560 1440 700" strokeWidth="1.6" strokeDasharray="9 7" />
      </g>
      <g fill="#4B5563" opacity=".8">
        <rect x="452" y="414" width="26" height="18" rx="2" />
        <rect x="486" y="424" width="18" height="14" rx="2" />
        <rect x="884" y="308" width="22" height="16" rx="2" />
        <rect x="1104" y="278" width="20" height="15" rx="2" />
      </g>
      <g stroke="#DB2777" strokeWidth="3.4" fill="none">
        <path
          d="M260 520 C 380 470, 430 380, 560 350 S 780 330, 860 250 S 1020 190, 1120 130"
          strokeDasharray="13 10"
          strokeLinecap="round"
          className="tfso-route"
        />
        <path d="m244 536 18-32 18 32z" />
        <circle cx="560" cy="350" r="13" />
        <circle cx="860" cy="250" r="13" />
        <circle cx="1120" cy="130" r="15" />
        <circle cx="1120" cy="130" r="8" />
      </g>
      <circle cx="1120" cy="130" r="15" fill="#DB2777" opacity=".25" className="tfso-pulse" />
      <g fill="#DB2777" fontSize="13" fontWeight="700" fontFamily="monospace">
        <text x="580" y="355">3</text>
        <text x="880" y="255">4</text>
      </g>
    </svg>
  )
}

/* Паттерн изогипс для тёмных секций */
export function ContourBackdrop({ opacity = 0.12, color = '#BEF264' }: { opacity?: number; color?: string }) {
  const lines = Array.from({ length: 14 }).map((_, i) => {
    const y = i * 60 - 20
    const amp = 24 + (i % 4) * 14
    return `M -40 ${y} C 220 ${y - amp}, 420 ${y + amp}, 700 ${y - amp * 0.5} S 1120 ${y + amp}, 1480 ${y - amp * 0.3}`
  })
  return (
    <svg
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1.4">
        {lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}

/* Декоративная обложка-карта (новости без фото) */
export function MapCover({ variant = 0, className = '' }: { variant?: number; className?: string }) {
  const p = COVER_PALETTES[variant % COVER_PALETTES.length]
  const night = isNightPalette(variant % COVER_PALETTES.length)
  const contours = Array.from({ length: 9 }).map((_, i) => {
    const y = 8 + i * 22
    const amp = 8 + (i % 3) * 6
    return `M -20 ${y} C 90 ${y - amp}, 180 ${y + amp}, 260 ${y - amp * 0.5} S 380 ${y + amp}, 440 ${y - amp * 0.3}`
  })
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Декоративная карта спортивного ориентирования"
    >
      <rect width="400" height="200" fill={p.base} />
      <path d="M0 0h180c30 60-20 110 20 160s120 40 120 40H0Z" fill={p.veg} opacity=".85" />
      <path d="M230 0h170v90c-70 20-110 70-180 80s-110-30-130-80 40-110 70-120 50-20 70 30Z" fill={p.veg2} opacity=".6" />
      <path d="M280 130c60-16 120 6 120 6v64H250c-20-40 0-60 30-70Z" fill={p.open} opacity=".9" />
      <path d="M-10 170C60 150 120 190 200 176s140-56 220-40" fill="none" stroke={night ? '#5C8FA8' : '#8FBEE0'} strokeWidth="4" />
      <g fill="none" stroke={p.contour} strokeWidth="1" opacity=".55">
        {contours.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 4 === 0 ? 1.6 : 1} />
        ))}
      </g>
      <g stroke={night ? '#D9A45B' : '#3F3F46'} fill="none" opacity=".7" strokeWidth="1.6">
        <path d="M30 200 90 130 170 108 250 130 320 80 400 66" />
        <path d="M0 70 80 62 140 26 230 34" strokeDasharray="7 6" />
      </g>
      <g stroke={p.cp} strokeWidth="2.6" fill="none">
        <path d="M90 130 C 140 110, 150 70, 210 62 S 300 70, 320 80" strokeDasharray="10 7" className="tfso-route" />
        <circle cx="210" cy="62" r="9" />
        <circle cx="320" cy="80" r="9" />
        <path d="m78 142 13-24 13 24z" />
      </g>
      <g fill={p.cp} fontSize="10" fontWeight="700" fontFamily="monospace">
        <text x="224" y="66">2</text>
        <text x="334" y="84">3</text>
      </g>
      {night && (
        <g opacity=".5">
          <circle cx="60" cy="34" r="1.6" fill="#FEF9C3" />
          <circle cx="360" cy="24" r="1.4" fill="#FEF9C3" />
          <circle cx="250" cy="18" r="1.2" fill="#FEF9C3" />
        </g>
      )}
    </svg>
  )
}

/* Карта города (секция «Клубы») */
export function CityMap({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="800" height="320" fill="#F6F3EA" />
      <path d="M600 0c40 70-10 130 30 190s20 130 20 130h150V0Z" fill="#BFDCED" />
      <path d="M600 0c40 70-10 130 30 190s20 130 20 130" fill="none" stroke="#8FBEE0" strokeWidth="3" />
      <path d="M40 40h200v110H40Z" fill="#DCEBD3" />
      <path d="M300 200h190v100H300Z" fill="#DCEBD3" />
      <g fill="#EFEBDF">
        <rect x="270" y="30" width="120" height="80" rx="6" />
        <rect x="420" y="40" width="140" height="70" rx="6" />
        <rect x="60" y="190" width="130" height="90" rx="6" />
        <rect x="520" y="180" width="80" height="110" rx="6" />
      </g>
      <g stroke="#E3DECF" strokeWidth="14" fill="none" strokeLinecap="round">
        <path d="M0 170h800M250 0v320M560 0v320M0 60h800" />
      </g>
      <g stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round">
        <path d="M0 170h800M250 0v320M560 0v320M0 60h800" />
      </g>
      <g stroke="#EFEADE" strokeWidth="5" fill="none">
        <path d="M120 0v320M400 0v320M700 0v320M0 250h800M0 110h800" />
      </g>
      <g transform="translate(300 170)">
        <circle r="26" fill="#DC2626" opacity=".18" className="tfso-pulse" />
        <path d="M0 14c0 0 15-16 15-27a15 15 0 1 0-30 0c0 11 15 27 15 27Z" fill="#DC2626" />
        <circle cy="-13" r="5.4" fill="#fff" />
      </g>
    </svg>
  )
}

/* ─────────── карточка ближайшего старта (hero) ─────────── */

type NextEvent = {
  title: string
  date: string
  location: string
  discipline: string
  status: 'open' | 'soon' | 'closed'
  deadline?: string
}

const STATUS_DARK = {
  open: { label: 'Регистрация открыта', pill: 'bg-emerald-100 text-emerald-900 ring-emerald-300/70', dot: 'bg-emerald-500' },
  soon: { label: 'Скоро', pill: 'bg-amber-100 text-amber-900 ring-amber-300/70', dot: 'bg-amber-500' },
  closed: { label: 'Завершено', pill: 'bg-stone-500/15 text-stone-300 ring-white/15', dot: 'bg-stone-400' },
} as const

export function NextStartCard({
  events,
  Reveal,
}: {
  events: NextEvent[]
  Reveal: (p: { children: ReactNode; delay?: number; className?: string }) => ReactElement
}) {
  const next = useMemo(() => {
    const now = Date.now()
    const list = events
      .filter((e) => e.status !== 'closed')
      .map((e) => ({ ...e, _d: parseRuDate(e.date) }))
      .filter((e): e is NextEvent & { _d: Date } => e._d !== null)
      .sort((a, b) => a._d.getTime() - b._d.getTime())
    const future = list.find((e) => e._d.getTime() > now)
    return future ?? list[0] ?? null
  }, [events])

  const target = next && next._d.getTime() > Date.now() ? next._d.getTime() : null
  const cd = useCountdown(target)
  const st = next ? STATUS_DARK[next.status] : STATUS_DARK.soon
  const cells = cd
    ? [
        { v: cd.d, l: 'дней' },
        { v: cd.h, l: 'часов' },
        { v: cd.m, l: 'минут' },
        { v: cd.s, l: 'секунд' },
      ]
    : []

  return (
    <Reveal delay={180} className="lg:justify-self-end">
      <div className="tfso-float w-full max-w-[26rem] rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_30px_70px_-30px_rgba(11,59,36,.55)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-stone-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Ближайший старт
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${st.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
            {st.label}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-[#052E16]">
          {next?.title ?? 'Календарь сезона'}
        </h2>

        <ul className="mt-4 space-y-2 text-sm text-stone-600">
          <li className="flex items-center gap-2.5">
            <IconCalendar className="h-4 w-4 shrink-0 text-[#166534]" />
            <span className="tfso-mono text-[13px] font-medium text-stone-700">{next?.date}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <IconPin className="h-4 w-4 shrink-0 text-[#166534]" />
            {next?.location}
          </li>
          <li className="flex items-center gap-2.5">
            <IconFlag className="h-4 w-4 shrink-0 text-[#166534]" />
            {next?.discipline}
          </li>
        </ul>

        {cells.length > 0 && (
          <>
            <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-stone-400">
              <IconClock className="h-3.5 w-3.5" />
              До старта осталось
            </p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {cells.map((c) => (
                <div key={c.l} className="rounded-xl border border-stone-200/80 bg-[#FAF8F2] py-2.5 text-center">
                  <span className="tfso-mono block text-xl font-bold leading-none text-[#0B3B24]">
                    {String(c.v).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-stone-500">{c.l}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="#contacts"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#166534] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#15803D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2"
          >
            Подать заявку
            <IconArrow className="h-4 w-4" />
          </a>
          <a
            href="#docs"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-2.5 text-[13px] font-bold text-stone-700 transition hover:border-[#166534]/50 hover:text-[#0B3B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]"
          >
            <IconFile className="h-4 w-4" />
            Положение
          </a>
        </div>

        {next?.deadline && (
          <p className="mt-4 border-t border-dashed border-stone-200 pt-3 text-xs font-medium text-amber-700">{next.deadline}</p>
        )}
      </div>
    </Reveal>
  )
}

/* Кнопки hero — переиспользуем токены темы */
export { BTN_GHOST, BTN_PRIMARY, IconCompass }

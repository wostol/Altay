import { useEffect, useMemo, useRef, useState } from 'react'

/* ─────────────────── данные (моки, позже — из CMS) ─────────────────── */

export type EventStatus = 'open' | 'soon' | 'closed'

export type HomeEvent = {
  id: number
  title: string
  date: string
  location: string
  discipline: string
  status: EventStatus
  deadline?: string
}

export type HomeNews = {
  id: number
  title: string
  date: string
  category: string
  excerpt: string
  /** вариант декоративной SVG-обложки MapCover; если undefined — фото/паттерн по умолчанию */
  cover?: number
  image?: string
}

export const NEWS: HomeNews[] = [
  {
    id: 1,
    title: 'Чемпионат Томской области собрал более 200 участников',
    date: '28 сентября 2026',
    category: 'Соревнования',
    excerpt:
      'В окрестностях Северска прошли соревнования на дистанциях всех уровней сложности. Победители представят область на первенстве Сибири.',
    cover: 0,
  },
  {
    id: 2,
    title: 'Открыта регистрация на осенний этап Кубка федерации',
    date: '20 сентября 2026',
    category: 'Анонсы',
    excerpt:
      'Приём заявок открыт до 15 октября. В программе — классика, спринт и эстафета в лесопарке «Притомье».',
    cover: 1,
  },
  {
    id: 3,
    title: 'Итоги летней школы ориентирования для начинающих и ночных стартов сезона',
    date: '5 сентября 2026',
    category: 'Обучение',
    excerpt:
      'Более 40 школьников освоили работу с картой и компасом. Лучшие получили разряды и памятные призы.',
    cover: 3,
  },
]

export const EVENTS: HomeEvent[] = [
  {
    id: 1,
    title: 'Кубок ТФСО — 3-й этап',
    date: '18 октября 2026',
    location: 'г. Томск, л/п «Притомье»',
    discipline: 'Спринт, классика',
    status: 'open',
    deadline: 'Заявки до 15 октября',
  },
  {
    id: 2,
    title: 'Первенство Томской области',
    date: '8–9 ноября 2026',
    location: 'г. Северск',
    discipline: 'Классика, эстафета',
    status: 'soon',
  },
  {
    id: 3,
    title: 'Ночное ориентирование «Осенняя лампа»',
    date: '22 ноября 2026',
    location: 'База «Сосновый бор»',
    discipline: 'Ночная классика',
    status: 'soon',
  },
  {
    id: 4,
    title: 'Кубок ТФСО — 2-й этап',
    date: '13 сентября 2026',
    location: 'п. Зональная ГПП',
    discipline: 'Спринт',
    status: 'closed',
  },
]

export const NAV_LINKS = [
  { href: '#news', id: 'news', label: 'Новости' },
  { href: '#events', id: 'events', label: 'Соревнования' },
  { href: '#results', id: 'results', label: 'Результаты' },
  { href: '#docs', id: 'docs', label: 'Документы' },
  { href: '#clubs', id: 'clubs', label: 'Клубы' },
  { href: '#contacts', id: 'contacts', label: 'Контакты' },
]

export const STATS = [
  { v: '24', l: 'клуба и секции' },
  { v: '38', l: 'стартов за сезон' },
  { v: '1 200+', l: 'участников' },
  { v: '27', l: 'лет федерации' },
]

export const STATUS: Record<
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
    pill: 'bg-stone-500/15 text-stone-300 ring-white/15',
    dot: 'bg-stone-400',
  },
}

const MONTHS: Record<string, number> = {
  января: 0, февраля: 1, марта: 2, апреля: 3, мая: 4, июня: 5,
  июля: 6, августа: 7, сентября: 8, октября: 9, ноября: 10, декабря: 11,
}

export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#166534] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0B3B24]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#15803D] hover:shadow-xl hover:shadow-[#0B3B24]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 active:translate-y-0'

export const BTN_GHOST =
  'inline-flex items-center justify-center gap-2 rounded-full border border-stone-300/80 bg-white/85 px-6 py-3 text-sm font-bold text-stone-800 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#166534]/50 hover:bg-white hover:text-[#0B3B24] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] active:translate-y-0'

/* ─────────────────────────── helpers ─────────────────────────── */

export function parseRuDate(str: string): Date | null {
  const m = String(str).match(/(\d{1,2})(?:\s*[–—-]\s*\d{1,2})?\s+([а-яё]+)\s+(\d{4})/i)
  if (!m) return null
  const mon = MONTHS[m[2].toLowerCase()]
  if (mon === undefined) return null
  return new Date(Number(m[3]), mon, Number(m[1]), 10, 0, 0)
}

export function splitDate(date: string) {
  const parts = String(date).split(/\s+/)
  return { day: parts[0].replace(/[–—-].*/, ''), month: parts[1] ?? '' }
}

export function useCountdown(target: number | null) {
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
    ended: diff === 0,
  }
}

export function useActiveSection(ids: string[]) {
  const key = ids.join(',')
  const [active, setActive] = useState('')
  useEffect(() => {
    const list = key.split(',').filter(Boolean)
    const els = list.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return active
}

export function useScrollUI() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0)
      setScrolled(el.scrollTop > 12)
      setShowTop(el.scrollTop > 760)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return { progress, scrolled, showTop }
}

/* ─────────────────────────── примитивы ─────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* memo-хук для списка id активной секции */
export function useSectionIds() {
  return useMemo(() => NAV_LINKS.map((l) => l.id), [])
}

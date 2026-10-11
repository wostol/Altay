import { useEffect, useState } from 'react'
import { news, events } from './data'
import { Reveal } from './components/Reveal'
import { ContactForm } from './components/ContactForm'
import { ContourBackdrop, HeroMap, MapCover, NextStartCard } from './components/newlook'
import { BTN_GHOST, BTN_PRIMARY } from './theme'
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CalendarIcon,
  CompassIcon,
  FileTextIcon,
  ImageOffIcon,
  LayersIcon,
  MapPinIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  TrophyIcon,
  UsersIcon,
  XIcon,
} from './components/icons'

const navLinks = [
  { href: '#news', label: 'Новости' },
  { href: '#events', label: 'Соревнования' },
  { href: '#results', label: 'Результаты' },
  { href: '#docs', label: 'Документы' },
  { href: '#clubs', label: 'Клубы' },
  { href: '#contacts', label: 'Контакты' },
]

const statusBadge: Record<string, { label: string; cls: string }> = {
  open: { label: 'Регистрация открыта', cls: 'bg-emerald-100 text-emerald-900 ring-emerald-300/60' },
  soon: { label: 'Скоро', cls: 'bg-amber-100 text-amber-900 ring-amber-300/60' },
  closed: { label: 'Завершено', cls: 'bg-stone-200 text-stone-600 ring-stone-300/60' },
}

/* "18 октября 2026" -> { day: "18", month: "октября" } */
function splitDate(date: string) {
  const parts = date.split(' ')
  return { day: parts[0], month: parts[1] ?? '' }
}

const NAV_IDS = ['news', 'events', 'results', 'docs', 'clubs', 'contacts']

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (!els.length) return undefined
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
  }, [ids])
  return active
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(document.documentElement.scrollTop > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/* локальная иконка часов (в новой версии — Clock) */
function ClockLocal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function Logo() {
  return (
    <a
      href="#top"
      className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
      aria-label="ТФСО — на главную"
    >
      {/* компас */}
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0"
        aria-hidden
      >
        {/* зелёный круг */}
        <circle cx="24" cy="24" r="23" fill="#0B3B24" />
        <circle cx="24" cy="24" r="23" fill="none" stroke="#052E16" strokeWidth="1" opacity="0.35" />
        {/* светлый циферблат */}
        <circle cx="24" cy="24" r="17.5" fill="#FDFBF3" />
        {/* деления румба */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8
          const r1 = i % 4 === 0 ? 13.5 : 15.2
          return (
            <line
              key={i}
              x1={24 + Math.sin(a) * r1}
              y1={24 - Math.cos(a) * r1}
              x2={24 + Math.sin(a) * 16.6}
              y2={24 - Math.cos(a) * 16.6}
              stroke="#052E16"
              strokeWidth={i % 4 === 0 ? 1.6 : 0.8}
              opacity="0.55"
            />
          )
        })}
        {/* красно-белая стрелка с плавным «сканированием» */}
        <g className="tfso-sweep" style={{ transformOrigin: '24px 24px' }}>
          <path d="M24 24 L29.4 10.6 L24 15.6 Z" fill="#DB2777" />
          <path d="M24 24 L18.6 37.4 L24 32.4 Z" fill="#DB2777" />
          <path d="M24 24 L18.6 10.6 L24 15.6 Z" fill="#F8FAFC" stroke="#052E16" strokeWidth="0.5" />
          <path d="M24 24 L29.4 37.4 L24 32.4 Z" fill="#F8FAFC" stroke="#052E16" strokeWidth="0.5" />
        </g>
        <circle cx="24" cy="24" r="2.6" fill="#052E16" />
        <circle cx="24" cy="24" r="1.1" fill="#FDFBF3" />
      </svg>
      <span className="leading-tight">
        <span className="block text-[19px] font-extrabold tracking-[.14em] text-[#052E16]">ТФСО</span>
        <span className="block max-w-44 text-[11px] leading-snug text-stone-500">
          Томская федерация спортивного ориентирования
        </span>
      </span>
    </a>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(12)
  const active = useActiveSection(NAV_IDS)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkBase =
    'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]'

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-stone-800">
      {/* ===== Шапка ===== */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-stone-200/80 bg-[#FAF8F2]/85 shadow-[0_10px_30px_-18px_rgba(11,59,36,.45)] backdrop-blur-xl'
            : 'border-transparent bg-[#FAF8F2]/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />
          {/* десктоп-навигация */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Основная навигация">
            {navLinks.map((l) => {
              const id = l.href.slice(1)
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active === id ? 'true' : undefined}
                  className={`${linkBase} ${
                    active === id
                      ? 'bg-[#E3EFE4] text-[#0B3B24]'
                      : 'text-stone-600 hover:bg-[#F0F4EC] hover:text-[#0B3B24] active:bg-[#E3EFE4]'
                  }`}
                >
                  {l.label}
                </a>
              )
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contacts"
              className="hidden rounded-full bg-[#166534] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#0B3B24]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#15803D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 sm:inline-flex"
            >
              Подать заявку
            </a>
            <button
              className="rounded-xl border border-stone-200 bg-white/80 p-2.5 text-[#0B3B24] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* мобильное выпадающее меню */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 top-[68px] z-40 bg-[#0B3B24]/35 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <nav
              className="tfso-drawer relative z-50 border-t border-stone-100 bg-[#FAF8F2] px-4 pb-5 pt-3 shadow-xl lg:hidden"
              aria-label="Мобильная навигация"
            >
              {navLinks.map((l, i) => {
                const id = l.href.slice(1)
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className={`tfso-drawer flex items-center justify-between rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors ${
                      active === id ? 'bg-[#E3EFE4] text-[#0B3B24]' : 'text-stone-700 hover:bg-[#F0F4EC]'
                    }`}
                  >
                    {l.label}
                    <ArrowRightIcon className="h-4 w-4 text-stone-400" />
                  </a>
                )
              })}
              <a
                href="#contacts"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#166534] px-4 py-3 text-sm font-bold text-white shadow-md"
              >
                Подать заявку
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </nav>
          </>
        )}
      </header>

      {/* ===== Hero с картой ===== */}
      <section className="tfso-grain relative overflow-hidden" id="top">
        <HeroMap />
        {/* спокойный светлый градиент: слева текст читается, справа карта видна сильнее */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F2] via-[#FAF8F2]/93 to-[#FAF8F2]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F2] via-[#FAF8F2]/10 to-[#FAF8F2]/70" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-44 pt-14 md:pb-52 md:pt-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:pb-56">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#166534]/20 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#166534] backdrop-blur">
                <CompassIcon className="h-3.5 w-3.5" />
                Сезон 2026 · Томск и область
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-5 max-w-[16ch] text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-[#052E16] md:text-6xl">
                Спортивное{' '}
                <span className="relative inline-block">
                  ориентирование
                  <svg
                    viewBox="0 0 320 14"
                    className="absolute -bottom-1 left-0 h-3 w-full text-[#DB2777]"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M3 9C60 3 120 12 180 6s90 2 137 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                в Томске
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-stone-600">
                Календарь соревнований, протоколы и результаты, документы федерации, карты районов
                и всё сообщество томского ориентирования — в одном месте.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#events" className={BTN_PRIMARY}>
                  <CalendarIcon className="h-4 w-4" />
                  Ближайшие старты
                </a>
                <a href="#docs" className={BTN_GHOST}>
                  <FileTextIcon className="h-4 w-4" />
                  Документы и положения
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-[#0B3B24]/10 pt-7 sm:grid-cols-4">
                {[
                  { v: '24', l: 'клуба и секции' },
                  { v: '38', l: 'стартов за сезон' },
                  { v: '1 200+', l: 'участников' },
                  { v: '27', l: 'лет федерации' },
                ].map((st) => (
                  <div key={st.l}>
                    <dt className="sr-only">{st.l}</dt>
                    <dd className="tfso-mono text-2xl font-bold leading-none text-[#0B3B24] md:text-[28px]">
                      {st.v}
                    </dd>
                    <dd className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                      {st.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <NextStartCard events={events} Reveal={Reveal} />
        </div>
      </section>

      {/* ===== Быстрые ссылки ===== */}
      <section className="relative z-20 mx-auto -mt-28 max-w-6xl px-4 md:-mt-32">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { t: 'Календарь', d: 'Старты сезона', href: '#events', Icon: CalendarIcon },
            { t: 'Результаты', d: 'Протоколы и зачёты', href: '#results', Icon: TrophyIcon },
            { t: 'Карты', d: 'Районы и схемы', href: '#maps', Icon: LayersIcon },
            { t: 'Вступить', d: 'Заявка в федерацию', href: '#contacts', Icon: CompassIcon },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 70} className="h-full">
              <a
                href={c.href}
                className="group flex h-full items-center gap-3.5 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_14px_36px_-22px_rgba(11,59,36,.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#166534]/35 hover:shadow-[0_22px_44px_-22px_rgba(11,59,36,.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] md:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EA] text-[#166534] transition-colors duration-300 group-hover:bg-[#166534] group-hover:text-white">
                  <c.Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold text-stone-800 transition-colors group-hover:text-[#0B3B24]">
                    {c.t}
                  </span>
                  <span className="mt-0.5 block truncate text-xs font-medium text-stone-500">{c.d}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Объявление ===== */}
      <Announcement />

      {/* ===== Новости ===== */}
      <section id="news" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-20">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-green-950 md:text-3xl">
              Новости
            </h2>
            <a
              href="#news"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg text-sm font-semibold text-green-800 transition hover:text-green-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              Все новости
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.id} delay={i * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-green-700/30 hover:shadow-xl">
                <NewsCover item={n} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-green-900">
                      {n.category}
                    </span>
                    <time className="text-xs text-stone-500">{n.date}</time>
                  </div>
                  <h3 className="line-clamp-3 font-bold leading-snug text-stone-900 transition-colors group-hover:text-green-900">
                    {n.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">
                    {n.excerpt}
                  </p>
                  <a
                    href="#news"
                    className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-green-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 sm:opacity-70 sm:group-hover:opacity-100"
                  >
                    Читать далее
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Соревнования ===== */}
      <section id="events" className="relative scroll-mt-24 overflow-hidden bg-[#052E16] py-16 text-white md:py-20">
        <ContourBackdrop opacity={0.1} />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-9 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Ближайшие соревнования
              </h2>
              <a
                href="#events"
                className="inline-flex shrink-0 items-center gap-1 rounded-lg text-sm font-semibold text-lime-300 transition hover:text-lime-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
              >
                Полный календарь
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {events.map((e, i) => {
              const b = statusBadge[e.status]
              const d = splitDate(e.date)
              const finished = e.status === 'closed'
              return (
                <Reveal key={e.id} delay={i * 80}>
                  <div
                    className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-lime-300/40 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between ${finished ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center gap-5">
                      {/* дата */}
                      <div className="w-16 shrink-0 rounded-xl bg-white/10 py-2 text-center">
                        <span className="block text-2xl font-extrabold leading-none text-lime-300">
                          {d.day}
                        </span>
                        <span className="mt-1 block text-[11px] leading-none text-white/60">
                          {d.month}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold leading-snug">{e.title}</h3>
                        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-white/60">
                          <MapPinIcon className="h-3.5 w-3.5" />
                          {e.location}
                          <span aria-hidden>·</span>
                          <span>{e.discipline}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${b.cls}`}>
                          {b.label}
                        </span>
                        {e.deadline && (
                          <span className="text-[11px] font-semibold text-amber-300">{e.deadline}</span>
                        )}
                      </div>
                      <a
                        href="#docs"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold transition hover:border-lime-300 hover:bg-lime-300/10 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                      >
                        <FileTextIcon className="h-3.5 w-3.5" />
                        Положение
                      </a>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Результаты / Документы / Клубы ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: 'results',
              title: 'Результаты',
              text: 'Протоколы стартов и зачёты Кубка ТФСО по годам и дисциплинам.',
              link: 'Смотреть протоколы',
              Icon: TrophyIcon,
            },
            {
              id: 'docs',
              title: 'Документы',
              text: 'Устав федерации, регламенты, положения о соревнованиях, отчёты.',
              link: 'Открыть архив',
              Icon: FileTextIcon,
            },
            {
              id: 'clubs',
              title: 'Клубы и секции',
              text: 'Организаторы стартов в Томске, Северске и районах области.',
              link: 'Список клубов',
              Icon: UsersIcon,
            },
          ].map((c, i) => (
            <Reveal key={c.id} delay={i * 100} className="h-full">
              <div
                id={c.id === 'docs' ? 'maps' : c.id}
                data-anchor={c.id}
                className="group flex h-full scroll-mt-24 flex-col rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_14px_36px_-26px_rgba(11,59,36,.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#166534]/35 hover:shadow-[0_22px_44px_-24px_rgba(11,59,36,.55)]"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EA] text-[#166534] transition-colors duration-300 group-hover:bg-[#166534] group-hover:text-white">
                  <c.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-extrabold text-[#052E16]">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{c.text}</p>
                <a
                  href={`#${c.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg text-sm font-bold text-[#166534] transition-all hover:gap-2.5 hover:text-[#15803D] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]"
                >
                  {c.link}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Контакты ===== */}
      <section id="contacts" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
              {/* левая колонка — контакты */}
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#052E16] md:text-3xl">
                  Контакты федерации
                </h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-stone-600">
                  Заявки на участие, вопросы по соревнованиям и сотрудничеству — пишите на почту
                  или через форму. Отвечаем в течение рабочего дня.
                </p>
                <ul className="mt-7 space-y-3.5">
                  {[
                    { Icon: MailIcon, l: 'Эл. почта', v: 'tfso.tomsk@list.ru', href: 'mailto:tfso.tomsk@list.ru' },
                    { Icon: PhoneIcon, l: 'Телефон', v: '+7 (351) 000-00-00', href: 'tel:+73510000000' },
                    { Icon: MapPinIcon, l: 'Адрес', v: 'г. Томск, ул. Спортивная, 10', href: null },
                    { Icon: ClockLocal, l: 'Часы работы', v: 'Пн–Пт 10:00–18:00', href: null },
                  ].map((c) => {
                    const inner = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EA] text-[#166534] transition-colors duration-300 group-hover:bg-[#166534] group-hover:text-white">
                          <c.Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-bold uppercase tracking-wide text-stone-400">
                            {c.l}
                          </span>
                          <span className="block text-sm font-bold text-stone-800">{c.v}</span>
                        </span>
                      </>
                    )
                    return (
                      <li key={c.l}>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="group flex items-center gap-3.5 rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-[0_10px_28px_-22px_rgba(11,59,36,.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#166534]/35 hover:shadow-[0_16px_34px_-22px_rgba(11,59,36,.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="group flex items-center gap-3.5 rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-[0_10px_28px_-22px_rgba(11,59,36,.5)]">
                            {inner}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* правая колонка — форма заявки */}
              <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(11,59,36,.5)] sm:p-8">
                <h3 className="text-lg font-extrabold tracking-tight text-[#052E16]">
                  Вступить в федерацию
                </h3>
                <p className="mt-1.5 text-sm text-stone-500">
                  Заполните заявку — свяжемся с вами и подскажем ближайшую секцию.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Подвал ===== */}
      <footer className="border-t border-stone-200/80 bg-[#F4F1E9]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
                Региональная общественная организация «Федерация спортивного ориентирования
                Томской области». Соревнования, карты, обучение и развитие спорта в регионе.
              </p>
            </div>
            <nav aria-label="Навигация по разделам">
              <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">Разделы</h3>
              <ul className="mt-3 space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm font-medium text-stone-600 transition-colors hover:text-[#0B3B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">Контакты</h3>
              <ul className="mt-3 space-y-2 text-sm font-medium text-stone-600">
                <li>
                  <a href="mailto:tfso.tomsk@list.ru" className="transition-colors hover:text-[#0B3B24]">
                    tfso.tomsk@list.ru
                  </a>
                </li>
                <li>г. Томск, ул. Спортивная, 10</li>
                <li>Пн–Пт 10:00–18:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-stone-200 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center">
            <span>© 2026 ТФСО · Все права защищены</span>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 font-bold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#166534]/50 hover:text-[#0B3B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]"
            >
              Наверх ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ===== Важное объявление ===== */
function Announcement() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <section className="mx-auto mt-10 max-w-6xl px-4">
      <Reveal>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm leading-relaxed text-amber-900">
              <span className="mr-2 inline-block rounded-full bg-amber-200 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-amber-900">
                Важно
              </span>
              Приём заявок на 3-й этап Кубка ТФСО (18 октября, л/п «Притомье») закрывается
              15 октября.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 self-stretch sm:self-auto">
            <a
              href="#events"
              className="inline-flex grow items-center justify-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:grow-0"
            >
              Подробнее
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setVisible(false)}
              aria-label="Скрыть объявление"
              className="rounded-full p-1.5 text-amber-700/70 transition hover:bg-amber-100 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ===== Обложка новости: фото или паттерн-карта, если фото нет ===== */
function NewsCover({ item }: { item: (typeof news)[number] }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    )
  }
  // Нет фото — декоративная SVG-карта в стиле спортивной карты
  return (
    <div className="relative h-44 w-full overflow-hidden">
      <MapCover variant={item.cover ?? 0} className="h-full w-full" />
      <ImageOffIcon className="absolute bottom-3 right-3 h-4 w-4 text-stone-500/50" />
    </div>
  )
}

import { useState } from 'react'
import heroMap from './assets/orienteer-map-hero.svg'
import { news, events } from './data'
import { Reveal } from './components/Reveal'
import { ContactForm } from './components/ContactForm'
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CalendarIcon,
  CompassIcon,
  FileTextIcon,
  FlagIcon,
  ImageOffIcon,
  MapIcon,
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
        className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:rotate-[20deg]"
        aria-hidden
      >
        {/* зелёный круг */}
        <circle cx="24" cy="24" r="23" fill="#166534" />
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
        {/* красно-белая стрелка */}
        <path d="M24 24 L29.5 10.5 L24 15.5 Z" fill="#DC2626" />
        <path d="M24 24 L18.5 37.5 L24 32.5 Z" fill="#DC2626" />
        <path d="M24 24 L18.5 10.5 L24 15.5 Z" fill="#F8FAFC" stroke="#052E16" strokeWidth="0.5" />
        <path d="M24 24 L29.5 37.5 L24 32.5 Z" fill="#F8FAFC" stroke="#052E16" strokeWidth="0.5" />
        <circle cx="24" cy="24" r="2.6" fill="#052E16" />
        <circle cx="24" cy="24" r="1.1" fill="#FDFBF3" />
      </svg>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-wide text-green-950">ТФСО</span>
        <span className="block max-w-44 text-[11px] leading-snug text-stone-500">
          Томская федерация спортивного ориентирования
        </span>
      </span>
    </a>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* ===== Шапка ===== */}
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />
          {/* десктоп-навигация */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-green-50 hover:text-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 active:bg-green-100"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contacts"
              className="hidden rounded-full bg-green-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 sm:inline-block"
            >
              Подать заявку
            </a>
            <button
              className="rounded-lg p-2 text-stone-600 transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* мобильное выпадающее меню */}
        {menuOpen && (
          <nav className="border-t border-stone-100 bg-white/95 px-4 pb-4 pt-2 shadow-lg backdrop-blur-md lg:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-green-50 hover:text-green-900"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacts"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-full bg-green-800 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Подать заявку
            </a>
          </nav>
        )}
      </header>

      {/* ===== Hero с картой ===== */}
      <section className="relative overflow-hidden" id="top">
        <img
          src={heroMap}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* спокойный светлый градиент: слева текст читается, справа карта видна сильнее */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/85 to-[#FAFAF9]/20" />
        {/* снизу фон успокаиваем — туда наезжают карточки быстрых ссылок */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/60 to-transparent md:h-24" />
        <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-20 md:pb-36 md:pt-28">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-700/20 bg-green-100/80 px-3 py-1 text-xs font-semibold tracking-wide text-green-800">
              <CompassIcon className="h-3.5 w-3.5" />
              Сезон 2026 · Томск и Томская область
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-green-950 md:text-6xl">
              Спортивное ориентирование в&nbsp;Томске
            </h1>
            <p className="mt-5 max-w-xl text-base text-stone-600 md:text-lg">
              Календарь соревнований, результаты, документы федерации и всё сообщество
              томского ориентирования — в одном месте.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#events"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                Ближайшие старты
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#docs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-green-700/50 hover:bg-white hover:text-green-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                Документы и положения
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Быстрые ссылки ===== */}
      <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { t: 'Календарь', d: 'Старты сезона', href: '#events', Icon: CalendarIcon },
            { t: 'Результаты', d: 'Протоколы', href: '#results', Icon: FlagIcon },
            { t: 'Карты', d: 'Районы и схемы', href: '#docs', Icon: MapIcon },
            { t: 'Вступить', d: 'Заявка в федерацию', href: '#contacts', Icon: CompassIcon },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <a
                href={c.href}
                className="group flex h-full items-center gap-3.5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-700/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 md:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-colors group-hover:bg-green-800 group-hover:text-white">
                  <c.Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-stone-800 group-hover:text-green-900">
                    {c.t}
                  </span>
                  <span className="block text-xs text-stone-500">{c.d}</span>
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
      <section id="events" className="scroll-mt-24 bg-[#052E16] py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
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
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${b.cls}`}>
                        {b.label}
                      </span>
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
                id={c.id}
                className="group flex h-full scroll-mt-24 flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-colors group-hover:bg-green-800 group-hover:text-white">
                  <c.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-extrabold text-green-950">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{c.text}</p>
                <a
                  href={`#${c.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-green-800 transition-all hover:gap-2.5 hover:text-green-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
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
      <section id="contacts" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20">
        <Reveal>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-12">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-green-950 md:text-3xl">
                  Контакты федерации
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Вопросы по регистрации, пропуску на соревнования и членству в ТФСО.
                </p>
                <ul className="mt-7 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-800">
                      <MapPinIcon className="h-4 w-4" />
                    </span>
                    <span className="pt-1.5 text-stone-700">г. Томск, ул. Говорихина, 16</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-800">
                      <MailIcon className="h-4 w-4" />
                    </span>
                    <a
                      href="mailto:info@tfso.tomsk.ru"
                      className="pt-1.5 font-medium text-green-800 transition hover:text-green-600 hover:underline"
                    >
                      info@tfso.tomsk.ru
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-800">
                      <PhoneIcon className="h-4 w-4" />
                    </span>
                    <a
                      href="tel:+73822000000"
                      className="pt-1.5 text-stone-700 transition hover:text-green-800"
                    >
                      +7 (3822) 00-00-00
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-800">
                      <UsersIcon className="h-4 w-4" />
                    </span>
                    <span className="flex gap-3 pt-1.5">
                      <a
                        href="#"
                        className="font-medium text-green-800 transition hover:text-green-600 hover:underline"
                      >
                        ВКонтакте
                      </a>
                      <span className="text-stone-300">·</span>
                      <a
                        href="#"
                        className="font-medium text-green-800 transition hover:text-green-600 hover:underline"
                      >
                        Telegram
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Подвал ===== */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 md:flex-row">
          <Logo />
          <p className="order-first text-center text-xs leading-relaxed text-stone-500 md:order-last md:text-right">
            © 2026 ТФСО. Общественная организация «Томская федерация спортивного ориентирования».
          </p>
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
  // Нет фото — цветной градиент с паттерном карты (изогипсы, просеки, КП)
  return (
    <div
      role="img"
      aria-label="Изображение отсутствует — декоративная карта"
      className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-lime-100 via-green-50 to-amber-50"
    >
      <svg
        viewBox="0 0 400 176"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-70"
        aria-hidden
      >
        <g fill="none" stroke="#16A34A" strokeWidth="1.4" opacity="0.35">
          <path d="M-20 40 Q80 10 160 45 T420 30" />
          <path d="M-20 70 Q90 40 170 75 T420 60" />
          <path d="M-20 105 Q100 75 180 110 T420 95" />
          <path d="M-20 140 Q110 115 190 145 T420 130" />
        </g>
        <g stroke="#CA8A04" strokeWidth="1.2" opacity="0.4" fill="none">
          <path d="M60 176 C75 120 55 80 90 20" strokeDasharray="6 5" />
          <path d="M300 176 C290 130 320 90 300 30" strokeDasharray="6 5" />
        </g>
        <g>
          <circle cx="150" cy="70" r="11" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="150" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">
            5
          </text>
          <circle cx="255" cy="110" r="11" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="255" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">
            6
          </text>
          <path d="M150 70 L255 110" stroke="#DC2626" strokeWidth="2" fill="none" />
        </g>
      </svg>
      <ImageOffIcon className="absolute bottom-3 right-3 h-4 w-4 text-green-900/30" />
    </div>
  )
}

import { useState } from 'react'
import heroMap from './assets/orienteer-map-hero.svg'
import { news, events } from './data'
import { Reveal } from './components/Reveal'

const navLinks = [
  { href: '#news', label: 'Новости' },
  { href: '#events', label: 'Соревнования' },
  { href: '#results', label: 'Результаты' },
  { href: '#docs', label: 'Документы' },
  { href: '#clubs', label: 'Клубы' },
  { href: '#contacts', label: 'Контакты' },
]

const statusBadge: Record<string, { label: string; cls: string }> = {
  open: { label: 'Регистрация открыта', cls: 'bg-emerald-100 text-emerald-800' },
  soon: { label: 'Скоро', cls: 'bg-amber-100 text-amber-800' },
  closed: { label: 'Завершено', cls: 'bg-stone-200 text-stone-600' },
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3">
      {/* компас */}
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="#166534" />
        <circle cx="24" cy="24" r="17" fill="none" stroke="#fdf6e3" strokeWidth="2" />
        <path d="M24 24 L31 13 L24 24 L15 30 Z" fill="#c94f3d" />
        <path d="M24 24 L33 35 L24 24 L17 18 Z" fill="#fdf6e3" />
        <circle cx="24" cy="24" r="2.5" fill="#fdf6e3" />
      </svg>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-wide text-green-900">ТФСО</span>
        <span className="block text-[11px] text-stone-500">
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
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-stone-600 transition-colors hover:text-green-800"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#events"
              className="rounded-full bg-green-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow"
            >
              Подать заявку
            </a>
          </nav>
          <button
            className="rounded-md p-2 text-stone-600 hover:bg-stone-100 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Открыть меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-stone-100 bg-white px-4 pb-4 md:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium text-stone-700 hover:text-green-800"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ===== Hero с картой ===== */}
      <section className="relative overflow-hidden">
        <img
          src={heroMap}
          alt="Карта для спортивного ориентирования с трассой и контрольными пунктами"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
          <Reveal>
            <p className="mb-3 inline-block rounded-full border border-green-800/20 bg-green-800/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-900">
              Сезон 2026 · Томск и Томская область
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-green-950 md:text-5xl">
              Спортивное ориентирование в Томске
            </h1>
            <p className="mt-4 max-w-xl text-lg text-stone-600">
              Календарь соревнований, результаты, документы федерации и всё сообщество
              томского ориентирования — в одном месте.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#events"
                className="rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
              >
                Ближайшие старты
              </a>
              <a
                href="#docs"
                className="rounded-full border border-stone-300 bg-white/80 px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:border-green-800 hover:text-green-900"
              >
                Документы и положения
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Быстрые ссылки ===== */}
      <section className="mx-auto -mt-2 max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { t: 'Календарь', d: 'Старты сезона', href: '#events', icon: '🗓' },
            { t: 'Результаты', d: 'Протоколы', href: '#results', icon: '🏁' },
            { t: 'Карты', d: 'Районы и схемы', href: '#docs', icon: '🗺' },
            { t: 'Вступить', d: 'Заявка в федерацию', href: '#contacts', icon: '🧭' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <a
                href={c.href}
                className="group flex h-full items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-green-800/40 hover:shadow-md"
              >
                <span className="text-2xl">{c.icon}</span>
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
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-amber-900">
              <span className="mr-2 inline-block rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase">
                Важно
              </span>
              Приём заявок на 3-й этап Кубка ТФСО (18 октября, л/п «Притомье») закрывается
              15 октября.
            </p>
            <a
              href="#events"
              className="shrink-0 rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-500"
            >
              Подробнее →
            </a>
          </div>
        </Reveal>
      </section>

      {/* ===== Новости ===== */}
      <section id="news" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-green-950 md:text-3xl">
              Новости
            </h2>
            <a href="#news" className="text-sm font-semibold text-green-800 hover:underline">
              Все новости →
            </a>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.id} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="h-32 bg-gradient-to-br from-green-100 via-lime-50 to-amber-50 p-4">
                  <span className="inline-block rounded-full bg-green-800/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-green-900">
                    {n.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs text-stone-500">{n.date}</time>
                  <h3 className="mt-2 font-bold leading-snug text-stone-900 transition-colors group-hover:text-green-900">
                    {n.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-stone-600">{n.excerpt}</p>
                  <a
                    href="#news"
                    className="mt-4 inline-block text-sm font-semibold text-green-800 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Читать далее →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Соревнования ===== */}
      <section id="events" className="scroll-mt-24 bg-green-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Ближайшие соревнования
              </h2>
              <a href="#events" className="text-sm font-semibold text-lime-300 hover:underline">
                Полный календарь →
              </a>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {events.map((e, i) => {
              const b = statusBadge[e.status]
              return (
                <Reveal key={e.id} delay={i * 80}>
                  <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-lime-300/40 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-16 shrink-0 text-center">
                        <span className="block text-xl font-extrabold text-lime-300">
                          {e.date.split(' ')[0]}
                        </span>
                        <span className="block text-xs text-white/60">
                          {e.date.split(' ')[1]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold">{e.title}</h3>
                        <p className="mt-1 text-sm text-white/60">
                          {e.location} · {e.discipline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-21 sm:pl-0">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${b.cls}`}>
                        {b.label}
                      </span>
                      <a
                        href="#events"
                        className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold transition hover:border-lime-300 hover:text-lime-300"
                      >
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
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              id: 'results',
              title: 'Результаты',
              text: 'Протоколы стартов и зачёты Кубка ТФСО по годам и дисциплинам.',
              link: 'Смотреть протоколы',
            },
            {
              id: 'docs',
              title: 'Документы',
              text: 'Устав федерации, регламенты, положения о соревнованиях, отчёты.',
              link: 'Открыть архив',
            },
            {
              id: 'clubs',
              title: 'Клубы и секции',
              text: 'Организаторы стартов в Томске, Северске и районах области.',
              link: 'Список клубов',
            },
          ].map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <div
                id={c.id}
                className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-extrabold text-green-950">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-stone-600">{c.text}</p>
                <a
                  href={`#${c.id}`}
                  className="mt-4 text-sm font-semibold text-green-800 hover:underline"
                >
                  {c.link} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Контакты ===== */}
      <section id="contacts" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16">
        <Reveal>
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-green-950">
                  Контакты федерации
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  Вопросы по регистрации, пропуску на соревнования и членству в ТФСО.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="text-lg">📍</span> г. Томск, ул. Говорихина, 16
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">✉️</span>
                    <a href="mailto:info@tfso.tomsk.ru" className="text-green-800 hover:underline">
                      info@tfso.tomsk.ru
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">📞</span> +7 (3822) 00-00-00
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🔗</span>
                    <a href="#" className="text-green-800 hover:underline">
                      ВКонтакте
                    </a>
                    ·
                    <a href="#" className="text-green-800 hover:underline">
                      Telegram
                    </a>
                  </li>
                </ul>
              </div>
              <form
                className="grid gap-3"
                onSubmit={(ev) => {
                  ev.preventDefault()
                  alert('Форма обратной связи появится на следующем этапе!')
                }}
              >
                <input
                  required
                  placeholder="Ваше имя"
                  className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-800/20"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-800/20"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Сообщение"
                  className="resize-none rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-800/20"
                />
                <button
                  type="submit"
                  className="justify-self-start rounded-full bg-green-800 px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Подвал ===== */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-stone-500 md:flex-row">
          <Logo />
          <p>© 2026 ТФСО. Общественная организация «Томская федерация спортивного ориентирования».</p>
        </div>
      </footer>
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import { CheckCircleIcon, LoaderIcon, SendIcon } from './icons'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'loading' | 'success'

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400'
const inputOk = 'border-stone-300 focus:border-green-700 focus-visible:ring-green-700/15'
const inputErr = 'border-red-400 focus:border-red-500 focus-visible:ring-red-500/15'

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const loading = status === 'loading'

  function validate(v: typeof values): Errors {
    const e: Errors = {}
    if (!v.name.trim()) e.name = 'Укажите имя'
    if (!v.email.trim()) e.email = 'Укажите email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
      e.email = 'Некорректный email'
    if (!v.message.trim()) e.message = 'Введите сообщение'
    else if (v.message.trim().length < 10) e.message = 'Сообщение слишком короткое (мин. 10 символов)'
    return e
  }

  function setField(field: Field, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }

  function blurField(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const e = validate(values)
    setErrors(e)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(e).length > 0) return

    setStatus('loading')
    // Заглушка до подключения бэкенда (React Hook Form + Zod + API/CMS)
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
    setValues({ name: '', email: '', message: '' })
    setTouched({})
  }

  if (status === 'success') {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircleIcon className="h-10 w-10 text-green-700" />
        <p className="font-bold text-green-900">Сообщение отправлено!</p>
        <p className="text-sm text-green-800/80">Мы ответим на вашу почту в ближайшее время.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 rounded-full border border-green-700/30 px-4 py-1.5 text-xs font-semibold text-green-800 transition hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          Написать ещё
        </button>
      </div>
    )
  }

  const err = (f: Field) => touched[f] && errors[f]

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-4 content-start">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold text-stone-700">
          Имя
        </label>
        <input
          id="cf-name"
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => blurField('name')}
          disabled={loading}
          placeholder="Иван Иванов"
          aria-invalid={!!err('name')}
          className={`${inputBase} ${err('name') ? inputErr : inputOk}`}
        />
        {err('name') && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold text-stone-700">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => blurField('email')}
          disabled={loading}
          placeholder="you@example.com"
          aria-invalid={!!err('email')}
          className={`${inputBase} ${err('email') ? inputErr : inputOk}`}
        />
        {err('email') && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold text-stone-700">
          Сообщение
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          onBlur={() => blurField('message')}
          disabled={loading}
          placeholder="Вопрос о регистрации, членстве или соревнованиях…"
          aria-invalid={!!err('message')}
          className={`resize-none ${inputBase} ${err('message') ? inputErr : inputOk}`}
        />
        {err('message') && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-green-800 px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            <LoaderIcon className="h-4 w-4 animate-spin" />
            Отправляем…
          </>
        ) : (
          <>
            <SendIcon className="h-4 w-4" />
            Отправить
          </>
        )}
      </button>
    </form>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { packages, resolvePackageId } from '@/content/packages'
import { budgets, projectTypes } from '@/lib/validation'
import { localizedPath } from '@/lib/paths'
import FramerButton from './FramerButton'

type Props = {
  source?: 'contact' | 'home' | 'offer' | 'audit'
  showSiteUrl?: boolean
  compact?: boolean
}

export default function LeadForm({ source = 'contact', showSiteUrl = false, compact = false }: Props) {
  const t = useTranslations('contact.form')
  const tOffer = useTranslations('offer.packages')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [packageId, setPackageId] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    siteUrl: '',
    gdpr: false,
    website: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const resolved = resolvePackageId(params.get('package'))
    if (resolved) {
      setPackageId(resolved)
      setForm((prev) => ({
        ...prev,
        message: prev.message || `${t('interestedIn')} ${resolved}\n\n`,
      }))
    }
  }, [t])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm((prev) => ({ ...prev, [target.name]: target.checked }))
      return
    }
    setForm((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          packageId,
          source,
          locale,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus('error')
        setErrorMessage(data.error || t('error'))
        return
      }
      setStatus('success')
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          event: source === 'audit' ? 'audit_request' : 'form_submit',
        }),
      }).catch(() => {})
      setForm({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
        siteUrl: '',
        gdpr: false,
        website: '',
      })
    } catch {
      setStatus('error')
      setErrorMessage(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass =
    'w-full px-4 py-3 text-base border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/10 text-white placeholder-gray-400'

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            {t('name')} <span className="text-yellow-400">{t('required')}</span>
          </label>
          <input id="name" name="name" required value={form.name} onChange={onChange} className={fieldClass} placeholder={t('namePlaceholder')} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            {t('email')} <span className="text-yellow-400">{t('required')}</span>
          </label>
          <input id="email" name="email" type="email" required value={form.email} onChange={onChange} className={fieldClass} placeholder={t('emailPlaceholder')} autoComplete="email" />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
          {t('phone')} <span className="text-gray-400 font-normal">({t('phoneOptional')})</span>
        </label>
        <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} className={fieldClass} placeholder={t('phonePlaceholder')} autoComplete="tel" />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
          {t('projectType')} <span className="text-yellow-400">{t('required')}</span>
        </label>
        <select id="projectType" name="projectType" required value={form.projectType} onChange={onChange} className={fieldClass}>
          <option value="" className="bg-gray-900">
            {t('projectTypePlaceholder')}
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-gray-900">
              {t(`projectTypes.${type}`)}
            </option>
          ))}
        </select>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
              {t('budget')}
            </label>
            <select id="budget" name="budget" value={form.budget} onChange={onChange} className={fieldClass}>
              <option value="" className="bg-gray-900">
                {t('budgetPlaceholder')}
              </option>
              {budgets.map((budget) => (
                <option key={budget} value={budget} className="bg-gray-900">
                  {t(`budgets.${budget}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="packageId" className="block text-sm font-medium text-white mb-2">
              {t('package')}
            </label>
            <select
              id="packageId"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              className={fieldClass}
            >
              <option value="" className="bg-gray-900">
                {t('packageNone')}
              </option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id} className="bg-gray-900">
                  {tOffer(`${pkg.id}.name`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {showSiteUrl && (
        <div>
          <label htmlFor="siteUrl" className="block text-sm font-medium text-white mb-2">
            {t('siteUrl')} <span className="text-yellow-400">{t('required')}</span>
          </label>
          <input id="siteUrl" name="siteUrl" type="url" required={showSiteUrl} value={form.siteUrl} onChange={onChange} className={fieldClass} placeholder={t('siteUrlPlaceholder')} />
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          {t('message')} <span className="text-yellow-400">{t('required')}</span>
        </label>
        <textarea id="message" name="message" required minLength={10} rows={compact ? 4 : 5} value={form.message} onChange={onChange} className={`${fieldClass} resize-none`} placeholder={t('messagePlaceholder')} />
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          name="gdpr"
          checked={form.gdpr}
          onChange={onChange}
          required
          className="mt-1 h-4 w-4 rounded border-white/40 bg-white/10 text-yellow-500 focus:ring-yellow-400"
        />
        <span>
          {t.rich('gdpr', {
            privacy: (chunks) => (
              <Link href={localizedPath(locale, '/privacy')} className="underline underline-offset-2 hover:text-white">
                {chunks}
              </Link>
            ),
          })}{' '}
          <span className="text-yellow-400">{t('required')}</span>
        </span>
      </label>

      <FramerButton type="submit" disabled={isSubmitting} variant="primary" className="w-full">
        {isSubmitting ? t('submitting') : source === 'audit' ? t('submit') : t('submit')}
      </FramerButton>

      {status === 'success' && (
        <p role="status" className="text-center text-sm text-green-300 bg-green-500/15 border border-green-500/40 rounded-xl px-4 py-3">
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-center text-sm text-red-300 bg-red-500/15 border border-red-500/40 rounded-xl px-4 py-3">
          {errorMessage || t('error')}
        </p>
      )}
    </form>
  )
}

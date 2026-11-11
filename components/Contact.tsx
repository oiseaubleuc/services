'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { site } from '@/content/site'
import { telLink, whatsappLink } from '@/lib/paths'
import LeadForm from './LeadForm'
import FramerButton from './FramerButton'

export default function Contact() {
  const t = useTranslations('contact')
  const tAppt = useTranslations('appointment')
  const locale = useLocale()
  const [tab, setTab] = useState<'message' | 'appointment'>('message')
  const showNativeAppointment = !site.calendlyUrl

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentData, setAppointmentData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false)
  const [appointmentStatus, setAppointmentStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const getAvailableDates = () => {
    const dates: Date[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let daysAdded = 0
    let i = 0
    while (daysAdded < 5 && i < 14) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
        daysAdded++
      }
      i++
    }
    return dates
  }

  const timeSlots = ['13:00', '15:00', '17:00', '19:00']

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !appointmentData.name || !appointmentData.email) {
      setAppointmentStatus('error')
      return
    }
    setIsSubmittingAppointment(true)
    setAppointmentStatus('idle')
    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appointmentData,
          date: selectedDate.toISOString(),
          time: selectedTime,
        }),
      })
      const data = await response.json()
      if (!response.ok || data.error) {
        setAppointmentStatus('error')
        return
      }
      setAppointmentStatus('success')
      setAppointmentData({ name: '', email: '', phone: '', message: '' })
      setSelectedDate(null)
      setSelectedTime('')
    } catch {
      setAppointmentStatus('error')
    } finally {
      setIsSubmittingAppointment(false)
    }
  }

  const track = (event: string) => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname, event }),
    }).catch(() => {})
  }

  const dateLocale = locale === 'nl' ? 'nl-BE' : locale === 'en' ? 'en-GB' : 'fr-BE'

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light">{t('subtitle')}</p>
          <p className="text-sm text-yellow-300 mt-3">{t('responseTime')}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <a href={`mailto:${site.email}`} className="text-white underline underline-offset-4 hover:text-yellow-300">
              {t('emailLabel')} : {site.email}
            </a>
            <a
              href={telLink(site.phone)}
              onClick={() => track('phone_click')}
              className="text-white underline underline-offset-4 hover:text-yellow-300"
            >
              {t('phoneLabel')} : {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-5 sm:p-8 rounded-2xl border border-white/20">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setTab('message')}
                className={`px-5 py-2 rounded-full text-sm font-medium ${tab === 'message' ? 'bg-white text-gray-900' : 'text-gray-300'}`}
              >
                {t('tabs.message')}
              </button>
              <button
                type="button"
                onClick={() => setTab('appointment')}
                className={`px-5 py-2 rounded-full text-sm font-medium ${tab === 'appointment' ? 'bg-white text-gray-900' : 'text-gray-300'}`}
              >
                {t('tabs.appointment')}
              </button>
            </div>
          </div>

          {tab === 'message' && <LeadForm source="contact" />}

          {tab === 'appointment' && site.calendlyUrl && (
            <iframe title={tAppt('title')} src={site.calendlyUrl} className="w-full min-h-[640px] rounded-xl border-0 bg-white" />
          )}

          {tab === 'appointment' && showNativeAppointment && !site.calendlyUrl && (
            <form onSubmit={handleAppointmentSubmit} className="space-y-6">
              <div>
                <p className="text-sm font-medium text-white mb-3">{tAppt('selectDate')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {getAvailableDates().map((date) => {
                    const selected = selectedDate?.getTime() === date.getTime()
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date)
                          setSelectedTime('')
                        }}
                        className={`px-3 py-3 rounded-xl text-sm ${selected ? 'bg-white text-gray-900' : 'bg-white/10 text-white border border-white/20'}`}
                      >
                        {date.toLocaleDateString(dateLocale, { weekday: 'short', day: 'numeric', month: 'short' })}
                      </button>
                    )
                  })}
                </div>
              </div>
              {selectedDate && (
                <div>
                  <p className="text-sm font-medium text-white mb-3">{tAppt('selectTime')}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-3 rounded-xl text-sm ${selectedTime === time ? 'bg-white text-gray-900' : 'bg-white/10 text-white border border-white/20'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {selectedDate && !selectedTime && <p className="text-sm text-yellow-300">{tAppt('pickTime')}</p>}
              {selectedDate && selectedTime && (
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <input required name="name" value={appointmentData.name} onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })} placeholder={t('form.namePlaceholder')} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white" />
                  <input required type="email" name="email" value={appointmentData.email} onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })} placeholder={t('form.emailPlaceholder')} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white" />
                  <input type="tel" name="phone" value={appointmentData.phone} onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })} placeholder={t('form.phonePlaceholder')} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white" />
                  <textarea name="message" value={appointmentData.message} onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })} placeholder={tAppt('messagePlaceholder')} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white resize-none" />
                  <FramerButton type="submit" disabled={isSubmittingAppointment} variant="primary" className="w-full">
                    {isSubmittingAppointment ? tAppt('submitting') : tAppt('confirm')}
                  </FramerButton>
                </div>
              )}
              {appointmentStatus === 'success' && <p className="text-sm text-green-300">{tAppt('success')}</p>}
              {appointmentStatus === 'error' && <p className="text-sm text-red-300">{tAppt('error')}</p>}
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400 mb-3">{t('whatsappMessage')}</p>
            <a
              href={whatsappLink(site.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click')}
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#25D366] hover:scale-105"
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

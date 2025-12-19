'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface TimeSlot {
  time: string
  available: boolean
}

export default function Contact() {
  const { t } = useLanguage()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'message' | 'appointment'>('message')
  
  // État pour le formulaire de contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // État pour le formulaire de rendez-vous
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false)
  const [appointmentStatus, setAppointmentStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Générer les dates disponibles (5 prochains jours)
  const getAvailableDates = () => {
    const dates: Date[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let daysAdded = 0
    let i = 0
    while (daysAdded < 5 && i < 14) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Exclure les dimanches (0) et samedis (6)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
        daysAdded++
      }
      i++
    }
    return dates
  }

  // Créneaux horaires disponibles (4 slots entre 13h et 19h)
  const timeSlots: TimeSlot[] = [
    { time: '13:00', available: true },
    { time: '15:00', available: true },
    { time: '17:00', available: true },
    { time: '19:00', available: true },
  ]

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      console.log('Envoi du formulaire:', formData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Réponse reçue, status:', response.status, 'ok:', response.ok)

      let data
      try {
        data = await response.json()
        console.log('Données parsées:', data)
      } catch (parseError) {
        console.error('Erreur parsing JSON:', parseError)
        setSubmitStatus('error')
        return
      }

      if (!response.ok) {
        setSubmitStatus('error')
        console.error('Erreur HTTP:', response.status, data.error || data.message)
        return
      }

      if (data.error) {
        setSubmitStatus('error')
        console.error('Erreur dans la réponse:', data.error)
        return
      }

      // Succès
      console.log('Succès!', data)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: any) {
      setSubmitStatus('error')
      console.error('Erreur lors de l\'envoi:', error)
      console.error('Détails:', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation côté client
    if (!selectedDate) {
      setAppointmentStatus('error')
      alert('Veuillez sélectionner une date')
      return
    }
    
    if (!selectedTime) {
      setAppointmentStatus('error')
      alert('Veuillez sélectionner une heure')
      return
    }
    
    if (!appointmentData.name || !appointmentData.email) {
      setAppointmentStatus('error')
      alert('Veuillez remplir au moins votre nom et votre email')
      return
    }

    setIsSubmittingAppointment(true)
    setAppointmentStatus('idle')

    try {
      const appointmentPayload = {
        ...appointmentData,
        date: selectedDate.toISOString(),
        time: selectedTime,
      }
      
      console.log('Envoi du rendez-vous:', appointmentPayload)
      
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentPayload),
      })

      console.log('Réponse reçue, status:', response.status, 'ok:', response.ok)

      let data
      try {
        data = await response.json()
        console.log('Données parsées:', data)
      } catch (parseError) {
        console.error('Erreur parsing JSON:', parseError)
        setAppointmentStatus('error')
        return
      }

      if (!response.ok) {
        setAppointmentStatus('error')
        console.error('Erreur HTTP:', response.status, data.error || data.message)
        return
      }

      if (data.error) {
        setAppointmentStatus('error')
        console.error('Erreur dans la réponse:', data.error)
        return
      }

      // Succès
      console.log('Succès!', data)
      setAppointmentStatus('success')
      setAppointmentData({ name: '', email: '', phone: '', message: '' })
      setSelectedDate(null)
      setSelectedTime('')
      setTimeout(() => {
        setAppointmentStatus('idle')
        router.push('/')
      }, 5000)
    } catch (error: any) {
      setAppointmentStatus('error')
      console.error('Erreur lors de la réservation:', error)
      console.error('Détails:', error.message)
    } finally {
      setIsSubmittingAppointment(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const availableDates = getAvailableDates()
  const whatsappNumber = '32456862580'

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight px-2 sm:px-4">
            {t('contact.title')}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light px-4">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20">
          {/* Onglets style Apple */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full p-0.5 sm:p-1 md:p-1.5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === 'message'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('contact.tabs.message')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('appointment')}
                className={`px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === 'appointment'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('contact.tabs.appointment')}
              </button>
            </div>
          </div>

          {/* Formulaire de contact */}
          {activeTab === 'message' && (
            <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 md:mb-3">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 md:mb-3">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 md:mb-3">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 md:mb-3">
                  {t('contact.form.projectType')}
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white transition-all duration-200 appearance-none cursor-pointer pr-8 sm:pr-10 md:pr-12"
                  >
                    <option value="" className="bg-gray-900 text-gray-400">{t('contact.form.projectTypePlaceholder')}</option>
                    <option value="healthcare" className="bg-gray-900">{t('contact.form.projectTypes.healthcare')}</option>
                    <option value="ecommerce" className="bg-gray-900">{t('contact.form.projectTypes.ecommerce')}</option>
                    <option value="developer" className="bg-gray-900">{t('contact.form.projectTypes.developer')}</option>
                    <option value="business" className="bg-gray-900">{t('contact.form.projectTypes.business')}</option>
                    <option value="restaurant" className="bg-gray-900">{t('contact.form.projectTypes.restaurant')}</option>
                    <option value="realestate" className="bg-gray-900">{t('contact.form.projectTypes.realestate')}</option>
                    <option value="education" className="bg-gray-900">{t('contact.form.projectTypes.education')}</option>
                    <option value="blog" className="bg-gray-900">{t('contact.form.projectTypes.blog')}</option>
                    <option value="saas" className="bg-gray-900">{t('contact.form.projectTypes.saas')}</option>
                    <option value="other" className="bg-gray-900">{t('contact.form.projectTypes.other')}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-5 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2 md:mb-3">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200 resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-gray-900 px-5 xs:px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-xs xs:text-sm sm:text-base md:text-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {isSubmitting ? 'Envoi...' : t('contact.form.submit')}
              </button>
            </form>
          )}

          {/* Formulaire de rendez-vous */}
          {activeTab === 'appointment' && (
            <form onSubmit={handleAppointmentSubmit} className="space-y-6 sm:space-y-8 animate-fade-in-up">
              {/* Sélection de la date */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-3 sm:mb-4">
                  {t('appointment.selectDate')}
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                  {availableDates.map((date) => {
                    const isSelected = selectedDate?.getTime() === date.getTime()
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        className={`px-2 xs:px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs xs:text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-white text-gray-900'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <div className="text-[10px] xs:text-xs text-gray-400 mb-0.5 sm:mb-1">
                          {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </div>
                        <div className="text-sm xs:text-base font-semibold">
                          {date.getDate()}
                        </div>
                        <div className="text-[10px] xs:text-xs text-gray-400">
                          {date.toLocaleDateString('fr-FR', { month: 'short' })}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sélection de l'heure */}
              {selectedDate && (
                <div className="animate-fade-in-up">
                  <label className="block text-xs sm:text-sm font-medium text-white mb-3 sm:mb-4">
                    {t('appointment.selectTime')}
                  </label>
                  <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`px-2 xs:px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs xs:text-sm font-medium transition-all duration-200 ${
                          selectedTime === slot.time
                            ? 'bg-white text-gray-900'
                            : slot.available
                            ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                            : 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations de contact */}
              {selectedDate && selectedTime ? (
                <div className="animate-fade-in-up space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-white/10">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                    {t('appointment.contactInfo')}
                  </h3>
                  
                  <div>
                    <label htmlFor="appointment-name" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="appointment-name"
                      name="name"
                      value={appointmentData.name}
                      onChange={handleAppointmentChange}
                      required
                      className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="appointment-email" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="appointment-email"
                      name="email"
                      value={appointmentData.email}
                      onChange={handleAppointmentChange}
                      required
                      className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="appointment-phone" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="appointment-phone"
                      name="phone"
                      value={appointmentData.phone}
                      onChange={handleAppointmentChange}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="appointment-message" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t('appointment.message')}
                    </label>
                    <textarea
                      id="appointment-message"
                      name="message"
                      value={appointmentData.message}
                      onChange={handleAppointmentChange}
                      rows={4}
                      className="w-full px-3 xs:px-4 sm:px-5 py-2.5 sm:py-3 md:py-4 text-sm xs:text-base sm:text-lg border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200 resize-none"
                      placeholder={t('appointment.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAppointment || !selectedDate || !selectedTime || !appointmentData.name || !appointmentData.email}
                    className={`w-full bg-white text-gray-900 px-5 xs:px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-xs xs:text-sm sm:text-base md:text-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      isSubmittingAppointment || !selectedDate || !selectedTime || !appointmentData.name || !appointmentData.email
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {isSubmittingAppointment ? t('appointment.submitting') : t('appointment.confirm')}
                  </button>
                </div>
              ) : selectedDate && !selectedTime ? (
                <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-300 text-sm text-center">
                  Veuillez sélectionner une heure
                </div>
              ) : null}
            </form>
          )}

          {/* Messages de statut */}
          {submitStatus === 'success' && (
            <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
              <div className="bg-green-500 text-white px-4 xs:px-6 sm:px-8 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 md:gap-4 min-w-[240px] xs:min-w-[280px] sm:min-w-[320px] max-w-[90vw] border border-green-400">
                <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs xs:text-sm sm:text-base font-medium">{t('contact.form.success')}</p>
              </div>
            </div>
          )}

          {appointmentStatus === 'success' && (
            <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
              <div className="bg-green-500 text-white px-4 xs:px-6 sm:px-8 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 md:gap-4 min-w-[240px] xs:min-w-[280px] sm:min-w-[320px] max-w-[90vw] border border-green-400">
                <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs xs:text-sm sm:text-base font-medium">{t('appointment.success')}</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm text-center">
              <p className="font-medium mb-1">Erreur lors de l'envoi</p>
              <p className="text-xs opacity-90">Vérifiez votre connexion et réessayez. Si le problème persiste, contactez-nous directement.</p>
            </div>
          )}
          
          {appointmentStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm text-center">
              <p className="font-medium mb-1">{t('appointment.error')}</p>
              <p className="text-xs opacity-90">Vérifiez que tous les champs sont remplis et réessayez.</p>
            </div>
          )}
          
          {/* WhatsApp - Option de contact rapide */}
          <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/10 flex flex-col items-center gap-2 sm:gap-3">
            <p className="text-xs xs:text-sm text-gray-400 font-light text-center px-4">
              {t('contact.whatsappMessage')}
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full hover:bg-[#20BA5A] transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
              aria-label="Contacter sur WhatsApp"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

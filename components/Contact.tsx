'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '' })
        // Réinitialiser le statut après 5 secondes
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        console.error('Erreur:', data.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Erreur lors de l\'envoi:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Numéro WhatsApp au format international (sans le +)
  const whatsappNumber = '32456862580' // +32 456 86 25 80

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight px-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light px-4">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2 sm:mb-3">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2 sm:mb-3">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2 sm:mb-3">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                placeholder={t('contact.form.phonePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2 sm:mb-3">
                {t('contact.form.projectType')}
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white transition-all duration-200 appearance-none cursor-pointer pr-10 sm:pr-12"
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
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2 sm:mb-3">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200 resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {isSubmitting ? 'Envoi...' : t('contact.form.submit')}
            </button>
            
            {submitStatus === 'success' && (
              <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
                <div className="bg-green-500 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl shadow-2xl flex items-center gap-3 sm:gap-4 min-w-[280px] sm:min-w-[320px] max-w-[90vw] border border-green-400">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm sm:text-base font-medium">{t('contact.form.success')}</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm text-center">
                Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
              </div>
            )}
          </form>
          
          {/* WhatsApp - Option de contact rapide */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex flex-col items-center gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm text-gray-400 font-light text-center px-4">
              {t('contact.whatsappMessage')}
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-[#25D366] rounded-full hover:bg-[#20BA5A] transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
              aria-label="Contacter sur WhatsApp"
            >
              <svg
                className="w-6 h-6 text-white"
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


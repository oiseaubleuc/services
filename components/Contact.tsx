'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Formulaire soumis:', formData)
    alert(t('contact.form.success'))
    setFormData({ name: '', email: '', projectType: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-2xl text-gray-300 font-light">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg p-12 rounded-3xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-3">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-3">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-white mb-3">
                {t('contact.form.projectType')}
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white transition-all duration-200 appearance-none cursor-pointer pr-12"
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-3">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-5 py-4 text-lg border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-gray-400 transition-all duration-200 resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}


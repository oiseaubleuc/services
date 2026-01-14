'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPolicy() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 sm:mb-8 tracking-tight">
            {t('privacy.title')}
          </h1>
          <p className="text-sm xs:text-base text-gray-400 mb-8 sm:mb-10">
            {t('privacy.lastUpdated')}
          </p>

          <div className="space-y-6 sm:space-y-8 md:space-y-10 text-gray-300">
            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section1.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light mb-4">
                {t('privacy.section1.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section2.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light mb-4">
                {t('privacy.section2.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm xs:text-base sm:text-lg ml-4">
                <li>{t('privacy.section2.item1')}</li>
                <li>{t('privacy.section2.item2')}</li>
                <li>{t('privacy.section2.item3')}</li>
                <li>{t('privacy.section2.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section3.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light mb-4">
                {t('privacy.section3.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section4.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light mb-4">
                {t('privacy.section4.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section5.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light mb-4">
                {t('privacy.section5.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section6.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light mb-4">
                {t('privacy.section6.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">
                {t('privacy.section7.title')}
              </h2>
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed font-light">
                {t('privacy.section7.content')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import FramerButton from './FramerButton'

interface Package {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    popular?: boolean
    cta: string
}

export default function Offer() {
    const { t } = useLanguage()

    const packages: Package[] = [
        {
            id: 'starter',
            name: t('offer.packages.starter.name'),
            price: 890,
            description: t('offer.packages.starter.description'),
            features: [
                t('offer.packages.starter.feature1'),
                t('offer.packages.starter.feature2'),
                t('offer.packages.starter.feature3'),
                t('offer.packages.starter.feature4'),
                t('offer.packages.starter.feature5'),
                t('offer.packages.starter.feature6'),
            ],
            cta: t('offer.cta'),
        },
        {
            id: 'professional',
            name: t('offer.packages.professional.name'),
            price: 1650,
            description: t('offer.packages.professional.description'),
            features: [
                t('offer.packages.professional.feature1'),
                t('offer.packages.professional.feature2'),
                t('offer.packages.professional.feature3'),
                t('offer.packages.professional.feature4'),
                t('offer.packages.professional.feature5'),
                t('offer.packages.professional.feature6'),
                t('offer.packages.professional.feature7'),
                t('offer.packages.professional.feature8'),
            ],
            popular: true,
            cta: t('offer.cta'),
        },
        {
            id: 'enterprise',
            name: t('offer.packages.enterprise.name'),
            price: 2900,
            description: t('offer.packages.enterprise.description'),
            features: [
                t('offer.packages.enterprise.feature1'),
                t('offer.packages.enterprise.feature2'),
                t('offer.packages.enterprise.feature3'),
                t('offer.packages.enterprise.feature4'),
                t('offer.packages.enterprise.feature5'),
                t('offer.packages.enterprise.feature6'),
                t('offer.packages.enterprise.feature7'),
                t('offer.packages.enterprise.feature8'),
                t('offer.packages.enterprise.feature9'),
                t('offer.packages.enterprise.feature10'),
            ],
            cta: t('offer.cta'),
        },
    ]

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <div className="inline-block mb-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 border border-yellow-400 rounded-full shadow-lg">
                        <p className="text-sm sm:text-base md:text-lg text-gray-900 font-semibold">
                            {t('offer.temporary')}
                        </p>
                    </div>
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight px-2 sm:px-4">
                        {t('offer.title')}
                    </h1>
                    <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light mb-6 sm:mb-8 md:mb-12 px-4">
                        {t('offer.subtitle')}
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12">
                    {packages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            className={`relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col ${pkg.popular
                                ? 'border-yellow-500/50 shadow-yellow-500/20 shadow-lg md:scale-105 md:-mt-4'
                                : 'border-white/10 hover:border-white/20'
                                }`}
                            style={{
                                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                            }}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                                        {t('offer.popular')}
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
                                    {pkg.name}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                                        {pkg.price}€
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                                    {pkg.description}
                                </p>
                            </div>

                            <ul className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <svg
                                            className={`flex-shrink-0 w-5 h-5 mt-0.5 ${pkg.popular ? 'text-yellow-500' : 'text-green-500'
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-sm sm:text-base text-gray-300 font-light">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <FramerButton
                                href={`/contact?package=${pkg.id}`}
                                variant={pkg.popular ? 'primary' : 'outline'}
                                className="w-full mt-auto"
                            >
                                {pkg.cta}
                            </FramerButton>
                        </div>
                    ))}
                </div>

                {/* 12 Hours Principle */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500 rounded-full mb-4 sm:mb-6">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3 sm:mb-4">
                            {t('offer.guarantee.title')}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed">
                            {t('offer.guarantee.description')}
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-400 mb-4">
                        {t('offer.note')}
                    </p>
                    <FramerButton href="/contact" variant="secondary">
                        {t('offer.contact')}
                    </FramerButton>
                </div>
            </div>
        </section>
    )
}

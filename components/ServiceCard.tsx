'use client'

import { useState } from 'react'
import FramerButton from './FramerButton'

interface ServiceCardProps {
  title: string
  shortDescription: string
  details: string
  serviceId: string
  learnMoreText: string
  showLessText: string
}

export default function ServiceCard({ title, shortDescription, details, serviceId, learnMoreText, showLessText }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`group bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl transition-all duration-500 border border-white/20 flex flex-col overflow-hidden ${
      isExpanded ? 'hover:bg-white/20' : 'hover:bg-white/20 hover:-translate-y-1'
    }`}>
      <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col">
        <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight">{title}</h3>
        <p className="text-sm xs:text-base sm:text-lg text-gray-300 leading-relaxed font-light mb-3 sm:mb-4 md:mb-6">{shortDescription}</p>
        
        <div className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-[1000px] opacity-100 mb-3 sm:mb-4 md:mb-6' : 'max-h-0 opacity-0 mb-0'
        }`}>
          <p className="text-xs xs:text-sm sm:text-base text-gray-300 leading-relaxed font-light pt-2 sm:pt-3 md:pt-4 border-t border-white/20">
            {details}
          </p>
        </div>
        
        <FramerButton
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="self-start mt-auto text-xs sm:text-sm px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5"
        >
          {isExpanded ? showLessText : learnMoreText}
        </FramerButton>
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'

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
    <div className={`group bg-white/10 backdrop-blur-lg rounded-2xl transition-all duration-500 border border-white/20 flex flex-col overflow-hidden ${
      isExpanded ? 'hover:bg-white/20' : 'hover:bg-white/20 hover:-translate-y-1'
    }`}>
      <div className="p-8 flex flex-col">
        <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-lg text-gray-300 leading-relaxed font-light mb-6">{shortDescription}</p>
        
        <div className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
        }`}>
          <p className="text-base text-gray-300 leading-relaxed font-light pt-4 border-t border-white/20">
            {details}
          </p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 self-start mt-auto"
        >
          {isExpanded ? showLessText : learnMoreText}
        </button>
      </div>
    </div>
  )
}


'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface FramerButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

export default function FramerButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}: FramerButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ease-out overflow-hidden group'

  const variants = {
    primary: 'bg-white text-gray-900 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98]',
    yellow: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-semibold'
  }

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
    </>
  )

  if (href && !disabled) {
    const classNames = `${baseStyles} ${variants[variant]} ${className}`
    const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
    if (external) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={classNames}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {buttonContent}
        </a>
      )
    }
    return (
      <Link href={href} onClick={onClick} className={classNames}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {buttonContent}
    </button>
  )
}







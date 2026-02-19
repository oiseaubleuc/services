'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const TECH_STACK = [
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3/1572B6' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
  { name: 'GitLab', icon: 'https://cdn.simpleicons.org/gitlab/FC6D26' },
  { name: 'Bitbucket', icon: 'https://cdn.simpleicons.org/bitbucket/0052CC' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
  { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'Swagger', icon: 'https://cdn.simpleicons.org/swagger/000000' },
  { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma/2D3748' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
  { name: 'Netlify', icon: 'https://cdn.simpleicons.org/netlify/00C7B7' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
  { name: 'Azure', icon: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
  { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
  { name: 'Ubuntu', icon: 'https://cdn.simpleicons.org/ubuntu/E95420' },
  { name: 'npm', icon: 'https://cdn.simpleicons.org/npm/CB3837' },
  { name: 'Yarn', icon: 'https://cdn.simpleicons.org/yarn/2C8EBB' },
  { name: 'pnpm', icon: 'https://cdn.simpleicons.org/pnpm/F69220' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'Webpack', icon: 'https://cdn.simpleicons.org/webpack/8DD6F9' },
  { name: 'Jest', icon: 'https://cdn.simpleicons.org/jest/C21325' },
  { name: 'Vitest', icon: 'https://cdn.simpleicons.org/vitest/6E9F18' },
  { name: 'ESLint', icon: 'https://cdn.simpleicons.org/eslint/4B32C3' },
  { name: 'Prettier', icon: 'https://cdn.simpleicons.org/prettier/F7B93E' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/0052CC' },
  { name: 'Slack', icon: 'https://cdn.simpleicons.org/slack/4A154B' },
  { name: 'VS Code', icon: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
]

export default function TechStackMarquee() {
  const { t } = useLanguage()
  const [iconErrors, setIconErrors] = useState<Set<number>>(new Set())

  const label = t('services.techStack')

  return (
    <section
      id="tech-stack-liquid-glass"
      className="w-full overflow-hidden"
      aria-label={label}
      data-liquid-glass
      style={{
        background: 'rgba(10, 10, 15, 0.35)',
        backdropFilter: 'saturate(160%) blur(28px)',
        WebkitBackdropFilter: 'saturate(160%) blur(28px)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset',
      }}
    >
      <p className="text-center text-white text-sm sm:text-base font-medium py-4 sm:py-5 border-b border-white/10">
        {label}
      </p>
      <div
        className="overflow-hidden py-6 sm:py-8"
        style={{
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)',
          isolation: 'isolate',
        }}
      >
        <div className="flex animate-marquee-tech-single gap-8 sm:gap-10 md:gap-12 w-max flex-nowrap">
          {TECH_STACK.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 sm:w-24"
              title={tech.name}
            >
              {iconErrors.has(index) ? (
                <span className="text-white/80 text-xs font-medium text-center">{tech.name}</span>
              ) : (
                <>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 grayscale brightness-0 invert">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="object-contain"
                      unoptimized
                      onError={() => setIconErrors((prev) => new Set(prev).add(index))}
                    />
                  </div>
                  <span className="text-white text-[10px] sm:text-xs font-medium text-center truncate w-full">
                    {tech.name}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    if (match[0].startsWith('**')) {
      nodes.push(<strong key={key++}>{match[0].slice(2, -2)}</strong>)
    } else {
      const href = match[3]
      const external = href.startsWith('http')
      nodes.push(
        <a
          key={key++}
          href={href}
          className="underline underline-offset-2 hover:text-white"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {match[2]}
        </a>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\n+/)
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="text-2xl font-semibold text-white mt-10 mb-2">
              {inline(block.slice(3))}
            </h2>
          )
        }
        if (block.split('\n').every((line) => line.startsWith('- '))) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1 text-gray-300">
              {block.split('\n').map((line, j) => (
                <li key={j}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-gray-300 leading-relaxed text-base sm:text-[17px]">
            {inline(block)}
          </p>
        )
      })}
    </div>
  )
}

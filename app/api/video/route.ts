import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

export async function GET() {
  const base = process.cwd()
  const paths = [
    path.join(base, 'public', 'space.mp4'),
    path.join(base, 'public', 'video', 'space.mp4'),
  ]
  for (const filePath of paths) {
    if (existsSync(filePath)) {
      const buffer = readFileSync(filePath)
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Length': String(buffer.length),
          'Accept-Ranges': 'bytes',
        },
      })
    }
  }
  return new NextResponse('Video not found', { status: 404 })
}

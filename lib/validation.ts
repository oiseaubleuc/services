import { z } from 'zod'
import { resolvePackageId } from '@/content/packages'

export const projectTypes = [
  'vitrine',
  'ecommerce',
  'portfolio',
  'custom',
  'refonte',
  'maintenance',
  'other',
] as const

export const budgets = ['under-1000', '1000-2500', '2500-5000', '5000-plus', 'unknown'] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  projectType: z.enum(projectTypes).optional().or(z.literal('')),
  budget: z.enum(budgets).optional().or(z.literal('')),
  packageId: z.string().optional().or(z.literal('')),
  message: z.string().trim().min(10).max(5000),
  gdpr: z.literal(true),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  source: z.enum(['contact', 'home', 'offer', 'audit']).optional(),
  siteUrl: z.string().trim().url().optional().or(z.literal('')),
})

export type ContactPayload = z.infer<typeof contactSchema>

export function normalizePackage(value?: string | null) {
  return resolvePackageId(value)
}

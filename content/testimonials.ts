export type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  text: string
  source?: 'google' | 'email' | 'other'
}

/**
 * Authentic reviews only. Leave empty to hide the section.
 * Never invent names, companies or quotes.
 */
export const testimonials: Testimonial[] = [
  // TODO(owner): paste real Google / client reviews here
]

export function publishedTestimonials() {
  return testimonials.filter((item) => Boolean(item.name && item.text))
}

export type Project = {
  id: string
  name: string
  sector: string
  result: string
  image: string
  url?: string
  demo?: boolean
}

/**
 * Real client projects only. Leave empty to hide the section.
 * Demo/personal work must set `demo: true`.
 */
export const projects: Project[] = [
  // TODO(owner): add real projects, e.g.
  // {
  //   id: 'example',
  //   name: 'Nom du client',
  //   sector: 'Restaurant — Bruxelles',
  //   result: '+40 % de réservations en 3 mois',
  //   image: '/projects/example.jpg',
  //   url: 'https://example.com',
  //   demo: false,
  // },
]

export function publishedProjects() {
  return projects.filter((project) => Boolean(project.name && project.image))
}

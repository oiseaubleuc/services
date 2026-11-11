import { redirect } from 'next/navigation'

export default async function OfferRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  redirect(`/${locale}/offres`)
}

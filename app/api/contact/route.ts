import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import db from '@/lib/db'
import { contactSchema, normalizePackage } from '@/lib/validation'
import { rateLimit } from '@/lib/rate-limit'
import { site } from '@/content/site'

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const limited = rateLimit(`contact:${ip}`, 8, 15 * 60 * 1000)
    if (!limited.ok) {
      return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' }, { status: 429 })
    }

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Veuillez vérifier les champs requis.' }, { status: 400 })
    }

    const data = parsed.data
    if (data.website) {
      return NextResponse.json({ success: true })
    }

    if (data.source === 'audit' && !data.siteUrl) {
      return NextResponse.json({ error: 'L’URL du site est requise pour l’audit.' }, { status: 400 })
    }

    const name = data.name
    const email = data.email
    const phone = data.phone || ''
    const projectType = data.projectType || 'other'
    const message = [
      data.message,
      data.budget ? `Budget: ${data.budget}` : '',
      data.siteUrl ? `Site: ${data.siteUrl}` : '',
      data.source ? `Source: ${data.source}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    const packageInterest = normalizePackage(data.packageId)

    const recipientEmail = process.env.CONTACT_EMAIL || site.email
    const smtpUser = process.env.SMTP_USER || site.email
    const smtpPassword = process.env.SMTP_PASSWORD

    if (!smtpPassword) {
      console.error('SMTP_PASSWORD n\'est pas configuré')
      return NextResponse.json(
        { error: 'Configuration email manquante. Écrivez-nous directement.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPassword.trim().replace(/\s+/g, ''),
      },
    })

    const emailHtml = `
<!DOCTYPE html>
<html lang="fr"><body style="font-family:sans-serif;color:#1d1d1f">
  <h1>Nouvelle demande HohoSolutions</h1>
  <p><strong>Nom</strong> ${name}</p>
  <p><strong>Email</strong> <a href="mailto:${email}">${email}</a></p>
  ${phone ? `<p><strong>Téléphone</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
  <p><strong>Type</strong> ${projectType}</p>
  ${packageInterest ? `<p><strong>Formule</strong> ${packageInterest}</p>` : ''}
  <pre style="white-space:pre-wrap">${message}</pre>
</body></html>`

    await transporter.sendMail({
      from: `"HohoSolutions Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Nouveau contact HohoSolutions: ${projectType}${packageInterest ? ` / ${packageInterest}` : ''}`,
      html: emailHtml,
    })

    try {
      await transporter.sendMail({
        from: `"HohoSolutions" <${smtpUser}>`,
        to: email,
        subject: 'Nous avons bien reçu votre demande — HohoSolutions',
        html: `<p>Bonjour ${name},</p><p>Votre message est bien arrivé. Réponse sous 12 h ouvrées.</p><p>HohoSolutions<br/><a href="mailto:${site.email}">${site.email}</a> · ${site.phoneDisplay}</p>`,
      })
    } catch (confirmError) {
      console.error('Confirmation email failed', confirmError)
    }

    try {
      db.prepare(`
        INSERT INTO contacts (name, email, phone, project_type, message, package_interest)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(name, email, phone || null, projectType, message, packageInterest)
    } catch (dbError) {
      console.error('Error saving contact to database:', dbError)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    console.error('Erreur lors de l\'envoi du formulaire:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Réessayez ou contactez-nous directement.' },
      { status: 500 }
    )
  }
}

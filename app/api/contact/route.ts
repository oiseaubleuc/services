import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, projectType, message } = body

    // Validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Configuration email Gmail
    const recipientEmail = process.env.CONTACT_EMAIL || 'hohoservicess@gmail.com'
    const smtpUser = process.env.SMTP_USER || 'hohoservicess@gmail.com'
    const smtpPassword = process.env.SMTP_PASSWORD

    if (!smtpPassword) {
      console.error('SMTP_PASSWORD n\'est pas configuré')
      return NextResponse.json(
        { error: 'Configuration email manquante. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      )
    }

    // Configuration du transporteur Gmail
    // Nettoyer le mot de passe (enlever les espaces)
    const cleanPassword = smtpPassword.trim().replace(/\s+/g, '')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: cleanPassword,
      },
    })

    // Préparer le contenu de l'email style Apple
    const emailSubject = `Nouveau contact HohoServices: ${projectType}`
    const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 60px 20px;">
        <table role="presentation" style="max-width: 680px; width: 100%; border-collapse: collapse;">
          <!-- Header minimaliste -->
          <tr>
            <td style="padding: 0 0 48px 0; text-align: center;">
              <h1 style="margin: 0; color: #1d1d1f; font-size: 32px; font-weight: 600; letter-spacing: -0.5px; line-height: 1.1;">
                Nouveau message
              </h1>
            </td>
          </tr>
          
          <!-- Contenu principal -->
          <tr>
            <td>
              <!-- Informations -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 48px;">
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      Nom
                    </div>
                    <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47;">
                      ${name}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      Email
                    </div>
                    <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47;">
                      <a href="mailto:${email}" style="color: #0071e3; text-decoration: none;">${email}</a>
                    </div>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      Téléphone
                    </div>
                    <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47;">
                      <a href="tel:${phone}" style="color: #0071e3; text-decoration: none;">${phone}</a>
                    </div>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      Type de projet
                    </div>
                    <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47;">
                      ${projectType}
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="border-top: 1px solid #d2d2d7; padding-top: 48px; margin-top: 48px;">
                <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                  Message
                </div>
                <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47; white-space: pre-wrap; margin-top: 16px;">
${message}
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Footer minimaliste -->
          <tr>
            <td style="padding-top: 80px; border-top: 1px solid #d2d2d7; margin-top: 80px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 0 8px 0;">
                    <div style="color: #86868b; font-size: 13px; font-weight: 400; line-height: 1.38;">
                      ${new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="color: #86868b; font-size: 13px; font-weight: 400; line-height: 1.38;">
                      HohoServices
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    // Envoi de l'email
    await transporter.sendMail({
      from: `"HohoServices Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    })

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi du formulaire:', error)

    // Message d'erreur plus détaillé
    let errorMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.'
    if (error.code === 'EAUTH') {
      errorMessage = 'Erreur d\'authentification email. Veuillez contacter l\'administrateur.'
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.'
    }

    // Log détaillé en développement uniquement
    if (process.env.NODE_ENV === 'development') {
      console.error('Détails de l\'erreur:', error)
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


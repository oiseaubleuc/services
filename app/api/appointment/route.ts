import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

// Fonction pour créer un événement Google Calendar avec Google Meet
async function createGoogleCalendarEvent(
  summary: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  attendeeEmail: string
): Promise<{ meetLink: string; eventId: string } | null> {
  try {
    // Vérifier si les credentials sont configurés
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

    if (!clientEmail || !privateKey) {
      console.log('Google Calendar API non configuré, utilisation d\'un lien Meet générique')
      return null
    }

    // Authentification avec Service Account
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Créer l'événement avec Google Meet
    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Brussels', // Ajustez selon votre fuseau horaire
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Brussels',
      },
      attendees: [{ email: attendeeEmail }],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // Rappel 1 jour avant
          { method: 'popup', minutes: 15 }, // Rappel 15 min avant
        ],
      },
    }

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
    })

    const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri || null
    const eventId = response.data.id || ''

    if (meetLink) {
      return { meetLink, eventId }
    }

    return null
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement Google Calendar:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, message, date, time } = body

        // Validation
        if (!name || !email || !date || !time) {
            return NextResponse.json(
                { error: 'Tous les champs requis doivent être remplis' },
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

        // Validation de la date (ne pas permettre les dates passées)
        const appointmentDate = new Date(date)
        const [hours, minutes] = time.split(':').map(Number)
        appointmentDate.setHours(hours, minutes, 0, 0)
        
        const now = new Date()
        if (appointmentDate < now) {
            return NextResponse.json(
                { error: 'La date et l\'heure du rendez-vous doivent être dans le futur' },
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

        // Créer l'événement Google Calendar avec Google Meet
        // appointmentDate est déjà défini dans la validation ci-dessus
        
        const endDate = new Date(appointmentDate)
        endDate.setHours(endDate.getHours() + 1) // Durée de 1 heure par défaut
        
        const startDateTime = appointmentDate.toISOString()
        const endDateTime = endDate.toISOString()
        
        const calendarEvent = await createGoogleCalendarEvent(
          `Rendez-vous avec ${name}`,
          message || `Rendez-vous avec ${name}${phone ? ` - Tél: ${phone}` : ''}`,
          startDateTime,
          endDateTime,
          email
        )
        
        // Générer un lien Google Meet générique fonctionnel
        // Si Google Calendar n'est pas configuré, on utilise un lien qui crée une nouvelle réunion
        // Ce lien fonctionne et créera automatiquement une réunion Google Meet
        const meetLink = calendarEvent?.meetLink || `https://meet.google.com/new`

        // Nettoyer le mot de passe
        const cleanPassword = smtpPassword.trim().replace(/\s+/g, '')

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpUser,
                pass: cleanPassword,
            },
        })

        // Formater la date pour l'email
        const formattedDate = appointmentDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        
        const formattedTime = appointmentDate.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        })
        
        const formattedEndTime = endDate.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        })

        // Email pour le client (style Apple complet)
        const clientEmailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-bottom: 1px solid #e9ecef;">
              <h1 style="margin: 0; color: #1d1d1f; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                Rendez-vous confirmé
              </h1>
              <p style="margin: 8px 0 0 0; color: #86868b; font-size: 14px;">
                HohoServices
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Informations de réservation -->
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 20px 0; color: #1d1d1f; font-size: 18px; font-weight: 600; letter-spacing: -0.5px;">
                  Détails de votre réservation
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #86868b; font-size: 14px; display: inline-block; min-width: 120px; text-transform: lowercase; letter-spacing: 0.5px;">Date:</strong>
                      <span style="color: #1d1d1f; font-size: 17px;">${formattedDate}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #86868b; font-size: 14px; display: inline-block; min-width: 120px; text-transform: lowercase; letter-spacing: 0.5px;">Heure:</strong>
                      <span style="color: #1d1d1f; font-size: 17px;">${formattedTime} - ${formattedEndTime}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #86868b; font-size: 14px; display: inline-block; min-width: 120px; text-transform: lowercase; letter-spacing: 0.5px;">Durée:</strong>
                      <span style="color: #1d1d1f; font-size: 17px;">1 heure</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #86868b; font-size: 14px; display: inline-block; min-width: 120px; text-transform: lowercase; letter-spacing: 0.5px;">Type:</strong>
                      <span style="background-color: #e8f0fe; color: #0071e3; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 500; display: inline-block;">Visioconférence</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <strong style="color: #86868b; font-size: 14px; display: inline-block; min-width: 120px; text-transform: lowercase; letter-spacing: 0.5px;">Fuseau horaire:</strong>
                      <span style="color: #1d1d1f; font-size: 17px;">Europe/Brussels (GMT+1)</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Lien Google Meet -->
              <div style="margin-bottom: 24px; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                <h2 style="margin: 0 0 16px 0; color: #1d1d1f; font-size: 18px; font-weight: 600; letter-spacing: -0.5px;">
                  Lien de la réunion
                </h2>
                <div style="margin-bottom: 16px;">
                  <a href="${meetLink}" style="display: inline-block; background-color: #0071e3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 17px; font-weight: 400; transition: background-color 0.2s;">
                    Rejoindre la réunion Google Meet
                  </a>
                </div>
                <div style="color: #86868b; font-size: 13px; font-weight: 400; word-break: break-all;">
                  ${meetLink}
                </div>
              </div>
              
              <!-- Message optionnel -->
              ${message ? `
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; color: #1d1d1f; font-size: 18px; font-weight: 600; letter-spacing: -0.5px;">
                  Message
                </h2>
                <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; color: #1d1d1f; font-size: 17px; line-height: 1.6; white-space: pre-wrap;">
${message}
                </div>
              </div>
              ` : ''}
              
              <!-- Informations de contact -->
              <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px;">
                <h2 style="margin: 0 0 16px 0; color: #1d1d1f; font-size: 18px; font-weight: 600; letter-spacing: -0.5px;">
                  Informations de contact
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #86868b; font-size: 12px;">Email:</span>
                      <a href="mailto:${recipientEmail}" style="color: #0071e3; text-decoration: none; font-size: 12px; margin-left: 8px;">${recipientEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #86868b; font-size: 12px;">WhatsApp:</span>
                      <a href="https://wa.me/32456862580" style="color: #0071e3; text-decoration: none; font-size: 12px; margin-left: 8px;">+32 456 86 25 80</a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Footer -->
              <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #86868b; font-size: 12px;">Date de réservation:</span>
                      <span style="color: #1d1d1f; font-size: 12px; margin-left: 8px;">${new Date().toLocaleString('fr-FR')}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Bottom Bar -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #86868b; font-size: 12px;">
                Ce rendez-vous a été confirmé automatiquement. Vous recevrez un rappel 24 heures avant la réunion.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `

        // Email pour vous (notification)
        const notificationEmailHtml = `
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
          <tr>
            <td style="padding: 0 0 48px 0; text-align: center;">
              <h1 style="margin: 0; color: #1d1d1f; font-size: 32px; font-weight: 600; letter-spacing: -0.5px; line-height: 1.1;">
                Nouveau rendez-vous
              </h1>
            </td>
          </tr>
          
          <tr>
            <td>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 48px;">
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      Client
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
                      Date et heure
                    </div>
                    <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47;">
                      ${formattedDate} à ${time}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                      Lien Google Meet
                    </div>
                    <div style="margin-top: 16px;">
                      <a href="${meetLink}" style="display: inline-block; background-color: #0071e3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 17px; font-weight: 400;">
                        Rejoindre la réunion
                      </a>
                    </div>
                    <div style="margin-top: 12px; color: #86868b; font-size: 13px; font-weight: 400;">
                      ${meetLink}
                    </div>
                  </td>
                </tr>
              </table>
              
              ${message ? `
              <div style="border-top: 1px solid #d2d2d7; padding-top: 48px; margin-top: 48px;">
                <div style="color: #86868b; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                  Message
                </div>
                <div style="color: #1d1d1f; font-size: 17px; font-weight: 400; line-height: 1.47; white-space: pre-wrap; margin-top: 16px;">
${message}
                </div>
              </div>
              ` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `

        // Envoyer l'email au client
        await transporter.sendMail({
            from: `"HohoServices" <${smtpUser}>`,
            to: email,
            replyTo: smtpUser,
            subject: `Rendez-vous confirmé - ${formattedDate} à ${time}`,
            html: clientEmailHtml,
        })

        // Envoyer la notification à vous
        await transporter.sendMail({
            from: `"HohoServices Rendez-vous" <${smtpUser}>`,
            to: recipientEmail,
            replyTo: email,
            subject: `Nouveau rendez-vous: ${name} - ${formattedDate} à ${time}`,
            html: notificationEmailHtml,
        })

        return NextResponse.json(
            { success: true, message: 'Rendez-vous confirmé avec succès' },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Erreur lors de la réservation:', error)
        console.error('Stack:', error.stack)
        
        let errorMessage = 'Erreur lors de la réservation. Veuillez réessayer plus tard.'
        if (error.code === 'EAUTH') {
            errorMessage = 'Erreur d\'authentification email. Veuillez contacter l\'administrateur.'
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.'
        } else if (error.message && process.env.NODE_ENV === 'development') {
            errorMessage = `Erreur: ${error.message}`
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


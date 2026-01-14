# Deployment Guide - HohoSolutions

## Deployment op Vercel met Custom Domain (hohosolutions.com)

### Stap 1: Vercel Project Aanmaken

1. Ga naar https://vercel.com en log in met je GitHub account
2. Klik op **"Add New Project"**
3. Selecteer je repository: `oiseaubleuc/services`
4. Configureer:
   - **Framework Preset**: Next.js (automatisch)
   - **Root Directory**: `./` (standaard)
   - **Build Command**: `npm run build` (standaard)
   - **Output Directory**: `.next` (standaard)
5. Klik op **"Deploy"**

### Stap 2: Environment Variables Instellen

Ga naar je Vercel project → **Settings** → **Environment Variables** en voeg toe:

```
SMTP_USER=je-gmail@gmail.com
SMTP_PASSWORD=je-app-password-16-karakters
CONTACT_EMAIL=contact@hohosolutions.com
```

**Voor Google Calendar (optioneel):**
```
GOOGLE_CLIENT_EMAIL=je-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
GOOGLE_CALENDAR_ID=primary
```

### Stap 3: Custom Domain Koppelen

1. Ga naar je Vercel project → **Settings** → **Domains**
2. Voeg toe:
   - `hohosolutions.com`
   - `www.hohosolutions.com`
3. Vercel geeft je DNS records die je moet toevoegen bij je domain provider

### Stap 4: DNS Records Configureren

Bij je domain provider (waar je hohosolutions.com hebt gekocht):

**Voor hohosolutions.com (root domain):**
- Type: **A**
- Name: `@` of leeg
- Value: `76.76.21.21` (of wat Vercel aangeeft)

**Voor www.hohosolutions.com:**
- Type: **CNAME**
- Name: `www`
- Value: `cname.vercel-dns.com` (of wat Vercel aangeeft)

### Stap 5: SSL Certificaat

Vercel regelt automatisch SSL (HTTPS) voor je custom domain. Dit kan 24-48 uur duren.

### Stap 6: Verificatie

Na DNS propagation (24-48 uur):
- ✅ https://hohosolutions.com werkt
- ✅ https://www.hohosolutions.com werkt
- ✅ SSL certificaat is actief

## Automatische Deployments

Elke keer dat je naar `main` branch pusht, wordt automatisch een nieuwe deployment getriggerd.

## Troubleshooting

**Domain werkt niet?**
- Check DNS records bij je provider
- Wacht 24-48 uur voor propagation
- Gebruik https://dnschecker.org om te checken

**Build errors?**
- Check Environment Variables in Vercel
- Check build logs in Vercel dashboard

**Email werkt niet?**
- Verifieer SMTP credentials
- Check dat Gmail "Less secure app access" is ingeschakeld OF gebruik App Password

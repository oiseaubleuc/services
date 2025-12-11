# HohoServices 
Site vitrine pour HohoServices, proposant des services full stack.

## Technologies utilisées

- **Next.js 16** - Framework React avec SSR
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Nodemailer** - Envoi d'emails via Gmail SMTP
- **Googleapis** - Intégration Google Calendar (optionnel)

## Installation

```bash
npm install
```

## Configuration

1. Copiez le fichier `.env.example` vers `.env.local` :
```bash
cp .env.example .env.local
```

2. Configurez les variables d'environnement dans `.env.local` :
   - `SMTP_USER` : Votre email Gmail
   - `SMTP_PASSWORD` : Mot de passe d'application Gmail (16 caractères)
   - `CONTACT_EMAIL` : Email où recevoir les messages

Voir `.env.example` pour plus de détails.

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Build de production

```bash
npm run build
npm start
```

## Déploiement

⚠️ **Important** : Avant de déployer, configurez les variables d'environnement sur votre plateforme de déploiement (Vercel, Netlify, etc.).

Voir `DEPLOYMENT.md` pour les instructions détaillées.

## Fonctionnalités

- 🌐 Site multilingue (Français, Anglais, Néerlandais)
- 📧 Formulaire de contact avec envoi d'email
- 📅 Système de réservation de rendez-vous
- 📧 Confirmation automatique par email avec lien Google Meet
- 📱 Design responsive (mobile, tablette, desktop)
- 🎨 Design inspiré d'Apple


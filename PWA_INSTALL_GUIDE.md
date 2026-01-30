# 📱 HohoSolutions PWA Installatie Gids

Je website is nu een **Progressive Web App (PWA)** en kan geïnstalleerd worden op iOS, Android en desktop!

## 🍎 Installeren op iPhone/iPad (iOS)

### Methode 1: Via Safari (Aanbevolen)

1. **Open de website** in Safari op je iPhone/iPad
   - Ga naar: `https://www.hohosolutions.com`

2. **Tik op de Share knop** (⎋) onderaan het scherm

3. **Scroll naar beneden** en tik op **"Add to Home Screen"**

4. **Pas de naam aan** (optioneel) en tik op **"Add"** rechtsboven

5. **Klaar!** Je ziet nu een app-icoon op je home screen

### Methode 2: Via de Install Prompt

- Na 5 seconden verschijnt er automatisch een prompt met instructies
- Volg de stappen in de prompt

## 🤖 Installeren op Android

1. **Open de website** in Chrome op je Android apparaat

2. **Wacht op de install prompt** of:
   - Tik op het menu (⋮) rechtsboven
   - Selecteer **"Add to Home screen"** of **"Install app"**

3. **Bevestig de installatie**

4. **Klaar!** De app verschijnt in je app drawer

## 💻 Installeren op Desktop (Chrome/Edge)

1. **Open de website** in Chrome of Edge

2. **Kijk naar het install icoon** in de adresbalk (rechts)
   - Of wacht op de install prompt

3. **Klik op "Install"**

4. **De app opent in een eigen venster**

## ✨ Features van de PWA

- ✅ **Offline toegang** - Werkt zonder internet (beperkt)
- ✅ **Snelle laadtijden** - Gecachte content
- ✅ **App-achtige ervaring** - Geen browser UI
- ✅ **Home screen icoon** - Directe toegang
- ✅ **Push notifications** - (Toekomstige feature)
- ✅ **Automatische updates** - Altijd de nieuwste versie

## 🔧 Technische Details

- **Service Worker**: Geregistreerd voor caching en offline functionaliteit
- **Manifest**: Configureert app metadata en icons
- **Cache Strategy**: Network-first met fallback naar cache
- **Update Check**: Elke minuut gecontroleerd op updates

## 🐛 Troubleshooting

### App werkt niet offline?
- De service worker moet eerst geregistreerd zijn
- Bezoek de website eerst met internet
- Sommige features (API calls) werken alleen online

### Install prompt verschijnt niet?
- **iOS**: Gebruik Safari, niet Chrome
- **Android**: Gebruik Chrome browser
- Controleer of de website via HTTPS wordt geladen
- Clear browser cache en probeer opnieuw

### App update niet?
- Verwijder de app en installeer opnieuw
- Of clear browser cache en refresh

## 📞 Support

Voor vragen of problemen, neem contact op via:
- Website: https://www.hohosolutions.com/contact
- Email: Via het contactformulier

---

**Gemaakt met ❤️ door HohoSolutions**

import type { Locale } from '@/i18n'

export type Localized = Record<Locale, string>

export type BlogPost = {
  id: string
  date: string
  slug: Localized
  title: Localized
  description: Localized
  body: Localized
}

export const posts: BlogPost[] = [
  {
    id: 'cost-2026',
    date: '2026-11-11',
    slug: {
      fr: 'combien-coute-un-site-internet-belgique-2026',
      nl: 'hoeveel-kost-een-website-belgie-2026',
      en: 'how-much-does-a-website-cost-belgium-2026',
    },
    title: {
      fr: 'Combien coûte un site internet en Belgique en 2026 ?',
      nl: 'Hoeveel kost een website in België in 2026?',
      en: 'How much does a website cost in Belgium in 2026?',
    },
    description: {
      fr: 'Prix HTVA d’un site vitrine, d’une boutique et d’un projet sur mesure. Ce qui est inclus, ce qui ne l’est pas, et comment lire un devis.',
      nl: 'Prijzen excl. BTW voor een bedrijfswebsite, een webshop en maatwerk. Wat inbegrepen is — en wat niet.',
      en: 'Excl. VAT prices for a showcase site, a shop and custom work. What is included — and what is not.',
    },
    body: {
      fr: `Un site n’a pas un prix unique. Il y a le travail de création, puis le nom de domaine, l’hébergement, et parfois la maintenance. Voici comment je présente les choses, sans fourchette inventée « marché belge ».

## Les formules affichées

Chez HohoSolutions, les montants publics sont hors TVA (HTVA). La TVA belge s’ajoute en facture, en général 21 %.

- Essentiel : 990 € HTVA — un site vitrine clair, pour être trouvé et contacté
- Professionnel : 2 490 € HTVA — plus de pages, une structure plus complète
- Entreprise : 4 990 € HTVA — un projet plus large
- Sur devis : boutique complexe, application, outil métier

Le détail de chaque formule est sur la [page Offres](/fr/offres).

## Ce qui fait monter (ou baisser) le devis

Le nombre de pages, une seconde langue (FR/NL), les paiements en ligne, un espace client, des textes à rédiger, des photos à produire. Si vous apportez contenus et visuels, le devis reste plus simple.

Je ne publie pas un « prix moyen en Belgique » : sans source, ce serait du marketing. Vous recevez un montant écrit, pour **votre** projet.

## Ce qui n’est souvent pas dans le « prix du site »

- Le nom de domaine (quelques dizaines d’euros par an)
- L’hébergement
- Les photos professionnelles
- Les traductions
- Les évolutions après la mise en ligne

Je les indique au devis, pour éviter la surprise.

## Comment démarrer

Décrivez votre activité. Je réponds sous 12 h ouvrées, sans engagement. Vous pouvez aussi [demander un audit gratuit](/fr/audit-gratuit) si vous avez déjà un site.`,
      nl: `Een website heeft geen unieke prijs. Er is het maakwerk, daarna het domein, hosting, en soms onderhoud. Zo presenteer ik het, zonder verzonnen « Belgisch gemiddelde ».

## De getoonde formules

Bij HohoSolutions zijn de publieke bedragen exclusief BTW. De Belgische BTW komt op de factuur, meestal 21 %.

- Essentieel: 990 € excl. BTW — een duidelijke bedrijfswebsite, om gevonden en gecontacteerd te worden
- Professioneel: 2 490 € excl. BTW — meer pagina’s, meer structuur
- Enterprise: 4 990 € excl. BTW — een groter project
- Op maat: complexe webshop, applicatie, business-tool

Het detail staat op de [pagina Aanbiedingen](/nl/offres).

## Wat de offerte duurder of goedkoper maakt

Aantal pagina’s, een tweede taal (NL/FR), online betalingen, een klantenzone, teksten schrijven, foto’s maken. Als u inhoud en beelden aanlevert, blijft de offerte eenvoudiger.

Ik publiceer geen « gemiddelde prijs in België »: zonder bron is dat marketing. U krijgt een geschreven bedrag, voor **uw** project.

## Wat vaak níét in « de prijs van de site » zit

- Het domein (enkele tientallen euro per jaar)
- Hosting
- Professionele foto’s
- Vertalingen
- Wijzigingen na livegang

Die vermeld ik in de offerte, zodat er geen verrassing is.

## Hoe starten

Beschrijf uw activiteit. Ik antwoord binnen 12 werkuren, zonder verplichting. U kunt ook [een gratis audit vragen](/nl/audit-gratuit) als u al een site hebt.`,
      en: `A website does not have a single price. There is the build, then the domain, hosting, and sometimes maintenance. This is how I present it — no invented “Belgian market average”.

## Published packages

At HohoSolutions, public amounts are exclusive of VAT (excl. VAT). Belgian VAT is added on the invoice, usually 21%.

- Essential: €990 excl. VAT — a clear showcase site, so people can find you and get in touch
- Professional: €2,490 excl. VAT — more pages, more structure
- Enterprise: €4,990 excl. VAT — a larger project
- Custom quote: complex shop, application, business tool

Details are on the [Offers page](/en/offres).

## What raises (or lowers) the quote

Number of pages, a second language (FR/NL), online payments, a client area, copywriting, photography. If you provide texts and visuals, the quote stays simpler.

I do not publish a “Belgium average price”: without a source, that is marketing. You get a written amount for **your** project.

## What is often not in “the price of the site”

- The domain name (a few tens of euros per year)
- Hosting
- Professional photos
- Translations
- Changes after launch

I list them on the quote, so there is no surprise.

## How to start

Describe what you do. I reply within 12 business hours, no obligation. You can also [request a free audit](/en/audit-gratuit) if you already have a site.`,
    },
  },
  {
    id: 'vitrine-vs-shop',
    date: '2026-11-11',
    slug: {
      fr: 'site-vitrine-ou-e-commerce',
      nl: 'bedrijfswebsite-of-webshop',
      en: 'showcase-site-or-ecommerce',
    },
    title: {
      fr: 'Site vitrine ou e-commerce : que choisir ?',
      nl: 'Bedrijfswebsite of webshop: wat kiezen?',
      en: 'Showcase site or e-commerce: which one?',
    },
    description: {
      fr: 'Quand une vitrine suffit, quand une boutique en ligne est nécessaire, et l’option catalogue sans paiement.',
      nl: 'Wanneer een bedrijfswebsite volstaat, wanneer u een webshop nodig hebt, en de tussenvorm zonder betaling.',
      en: 'When a showcase site is enough, when you need a shop, and the catalogue-without-payment option.',
    },
    body: {
      fr: `Beaucoup de demandes commencent par « il me faut une boutique ». Souvent, non. Le bon choix dépend de ce que le visiteur doit faire **aujourd’hui**.

## La vitrine

Un site vitrine présente l’activité, les services, les horaires, un formulaire, parfois un menu ou un catalogue PDF. Il sert à être trouvé, à rassurer, et à déclencher un appel, un WhatsApp ou un rendez-vous.

C’est le bon choix si vous ne vendez pas en ligne, ou si chaque vente a besoin d’un devis (chantier, conseil, formation sur mesure).

Formule de départ : [Essentiel, dès 990 € HTVA](/fr/offres).

## La boutique

Une boutique (e-commerce) a un panier, un paiement, souvent un stock, des e-mails de commande, des retours. C’est un vrai projet : plus long, plus cher, plus de règles (TVA, CGV, droit de rétractation si vous vendez à des consommateurs).

Choisissez-la si vos clients doivent payer **sans vous appeler**. Produits standard, prix affichés, livraison ou retrait.

## L’entre-deux : catalogue sans paiement

Parfois il suffit de montrer les produits, les prix, et un bouton « demander un devis » ou « réserver ». Moins lourd qu’une boutique, plus clair qu’une vitrine générique.

## Comment décider

- Le client peut-il choisir et payer seul ? → boutique
- Chaque mission est différente ? → vitrine + formulaire
- Vous testez la vente en ligne ? → commencez simple ; on pourra ajouter le paiement plus tard

Décrivez votre offre : je vous dis laquelle des trois pistes tient la route, [sans engagement](/fr/contact).`,
      nl: `Veel aanvragen beginnen met « ik heb een webshop nodig ». Vaak niet. De juiste keuze hangt af van wat de bezoeker **vandaag** moet doen.

## De bedrijfswebsite

Een bedrijfswebsite toont de activiteit, diensten, openingsuren, een formulier, soms een menu of catalogus. Ze dient om gevonden te worden, vertrouwen te geven, en een telefoon, WhatsApp of afspraak uit te lokken.

Dat is de juiste keuze als u niet online verkoopt, of als elke verkoop een offerte nodig heeft (werf, advies, maatwerk).

Startformule: [Essentieel, vanaf 990 € excl. BTW](/nl/offres).

## De webshop

Een webshop heeft een winkelmandje, betaling, vaak stock, ordermails, retouren. Dat is een écht project: langer, duurder, meer regels (BTW, voorwaarden, herroepingsrecht als u aan consumenten verkoopt).

Kies die als klanten **zonder u te bellen** moeten kunnen betalen. Standaardproducten, zichtbare prijzen, levering of afhaling.

## Tussenvorm: catalogus zonder betaling

Soms volstaat het om producten en prijzen te tonen, met een knop « offerte » of « reserveren ». Lichter dan een shop, duidelijker dan een algemene vitrine.

## Hoe beslissen

- Kan de klant alleen kiezen en betalen? → webshop
- Is elke opdracht anders? → bedrijfswebsite + formulier
- Test u online verkoop? → begin eenvoudig; betaling kan later

Beschrijf uw aanbod: ik zeg welke van de drie pistes klopt, [zonder verplichting](/nl/contact).`,
      en: `Many requests start with “I need a shop”. Often, no. The right choice depends on what the visitor must do **today**.

## The showcase site

A showcase site presents the activity, services, hours, a form, sometimes a menu or PDF catalogue. It exists so people can find you, trust you, and call, WhatsApp or book.

That is the right choice if you do not sell online, or if every sale needs a quote (works, consulting, custom training).

Starting package: [Essential, from €990 excl. VAT](/en/offres).

## The shop

A shop has a cart, payment, often stock, order emails, returns. It is a real project: longer, more expensive, more rules (VAT, terms, withdrawal rights if you sell to consumers).

Choose it if customers must pay **without calling you**. Standard products, displayed prices, delivery or pickup.

## The middle: catalogue without payment

Sometimes it is enough to show products and prices, with a “request a quote” or “book” button. Lighter than a shop, clearer than a generic brochure.

## How to decide

- Can the customer pick and pay alone? → shop
- Is every job different? → showcase + form
- Testing online sales? → start simple; payment can come later

Describe your offer: I’ll say which of the three paths holds, [no obligation](/en/contact).`,
    },
  },
  {
    id: 'wix-vs-custom',
    date: '2026-11-11',
    slug: {
      fr: 'wix-vs-site-sur-mesure-pme',
      nl: 'wix-vs-maatwerk-kmo',
      en: 'wix-vs-custom-website-sme',
    },
    title: {
      fr: 'Wix vs site sur mesure pour une PME',
      nl: 'Wix vs maatwerksite voor een KMO',
      en: 'Wix vs a custom website for an SME',
    },
    description: {
      fr: 'Wix va plus vite au départ. Un site sur mesure coûte plus, et vous restez propriétaire du code. Quand chaque option a du sens.',
      nl: 'Wix is sneller om te starten. Maatwerk kost meer, en de code blijft van u. Wanneer welke optie zinvol is.',
      en: 'Wix is faster to start. Custom costs more, and you own the code. When each option makes sense.',
    },
    body: {
      fr: `Wix (ou un builder du même type) n’est pas « mauvais ». Pour une page de test, un événement, un tout petit budget, c’est souvent le bon réflexe. Le problème commence quand on en attend le même résultat qu’un site pensé pour Google et pour durer.

## Ce que Wix fait bien

Vous avez un site en quelques jours, un éditeur visuel, un abonnement mensuel. Pas besoin d’un développeur pour changer un titre. Pour valider une idée, c’est utile.

## Où ça coince pour une PME

- Le référencement : possible, mais vous dépendez des limites du builder (vitesse, structure des pages, export)
- La propriété : le site vit **chez** Wix. Partir plus tard veut souvent dire tout refaire
- Les formulaires, langues FR/NL, devis, outils métier : on ajoute des apps, puis la facture mensuelle monte
- Le design ressemble à d’autres sites Wix, sauf si quelqu’un y passe du temps (et du budget)

Je n’invente pas de scores ni d’études. Ce sont des limites de produit, visibles dès qu’on veut un site sérieux.

## Ce qu’un site sur mesure change

Le code est à vous (après paiement du solde). On choisit l’hébergement. On peut brancher un CMS pour que vous changiez les textes. On soigne les titres, la vitesse, le mobile — ce que Google regarde vraiment — et les mentions / RGPD.

Ça coûte plus au départ (chez moi, dès 990 € HTVA pour une vitrine). Ça évite de payer un loyer d’éditeur pendant des années, et de tout casser le jour où vous grandissez.

## Une règle simple

- Vous testez, budget serré, besoin d’une page cette semaine → un builder peut suffire
- Vous voulez des demandes de devis, deux langues, un site que vous gardez → sur mesure

Si vous avez déjà un Wix : [envoyez l’URL](/fr/audit-gratuit), je vous dis concrètement ce qui bloque (sans jargon).`,
      nl: `Wix (of een gelijkaardige builder) is niet « slecht ». Voor een testpagina, een event, een heel klein budget is het vaak de juiste reflex. Het probleem begint als u hetzelfde resultaat verwacht als van een site die voor Google en voor de lange termijn is gemaakt.

## Wat Wix goed doet

U hebt in enkele dagen een site, een visuele editor, een maandelijks abonnement. Geen ontwikkelaar nodig om een titel te wijzigen. Om een idee te valideren is dat nuttig.

## Waar het knelt voor een KMO

- SEO: mogelijk, maar u hangt af van de limieten van de builder (snelheid, paginastructuur, export)
- Eigendom: de site leeft **bij** Wix. Later vertrekken betekent vaak alles opnieuw maken
- Formulieren, NL/FR, offertes, business-tools: u stapelt apps, daarna stijgt de maandfactuur
- Het design lijkt op andere Wix-sites, tenzij iemand er tijd (en budget) in steekt

Ik verzin geen scores of studies. Dit zijn productlimieten, zichtbaar zodra u een ernstige site wilt.

## Wat maatwerk verandert

De code is van u (na betaling van het saldo). U kiest de hosting. We kunnen een CMS koppelen zodat u teksten wijzigt. We verzorgen titels, snelheid, mobiel — wat Google écht bekijkt — en de wettelijke vermeldingen / GDPR.

Dat kost meer bij de start (bij mij vanaf 990 € excl. BTW voor een bedrijfswebsite). Het vermijdt jarenlang huur aan een editor, en alles afbreken de dag dat u groeit.

## Een eenvoudige regel

- U test, krap budget, deze week een pagina nodig → een builder kan volstaan
- U wilt offertes, twee talen, een site die u houdt → maatwerk

Hebt u al Wix: [stuur de URL](/nl/audit-gratuit), ik zeg concreet wat blokkeert (zonder jargon).`,
      en: `Wix (or a similar builder) is not “bad”. For a test page, an event, a very small budget, it is often the right reflex. The problem starts when you expect the same result as a site built for Google and for the long term.

## What Wix does well

You get a site in a few days, a visual editor, a monthly subscription. No developer needed to change a heading. Useful to validate an idea.

## Where it gets tight for an SME

- SEO: possible, but you depend on the builder’s limits (speed, page structure, export)
- Ownership: the site lives **on** Wix. Leaving later often means rebuilding everything
- Forms, FR/NL, quotes, business tools: you stack apps, then the monthly bill rises
- The design looks like other Wix sites, unless someone spends time (and budget) on it

I am not inventing scores or studies. These are product limits, visible as soon as you want a serious site.

## What custom changes

The code is yours (after the balance is paid). You choose hosting. We can add a CMS so you edit texts. We look after titles, speed, mobile — what Google actually looks at — and legal notices / GDPR.

It costs more up front (here, from €990 excl. VAT for a showcase site). It avoids paying editor rent for years, and tearing everything down the day you grow.

## A simple rule

- Testing, tight budget, need a page this week → a builder can be enough
- You want quote requests, two languages, a site you keep → custom

Already on Wix: [send the URL](/en/audit-gratuit), I’ll tell you concretely what is blocking (no jargon).`,
    },
  },
]

export function getPostBySlug(locale: Locale, slug: string) {
  return posts.find((post) => post.slug[locale] === slug)
}

export function allBlogSlugs(locale: Locale) {
  return posts.map((post) => post.slug[locale])
}

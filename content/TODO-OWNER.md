# À fournir par le propriétaire

Rien de tout ceci n’est inventé dans le code. Tant qu’un champ est vide, la section correspondante est **masquée** (ou indiquée comme incomplète pour les mentions légales).

## Déjà en ligne (ne pas remettre en TODO)

- Fondateur : Houdaifa Hamouchi (`content/site.ts` → `founder`)
- WhatsApp / téléphone : +32 451 015 476
- GitHub : https://github.com/oiseaubleuc
- Prix publics : 990 / 2 490 / 4 990 € HTVA + sur devis
- Promesse devis sous 12 h

## Identité légale (Belgique — obligatoire pour les mentions)

- [ ] Forme juridique (indépendant, SRL, …)
- [ ] Adresse du siège (rue, code postal, ville)
- [ ] Numéro d’entreprise BCE
- [ ] Numéro de TVA (BE0…)

Fichier : `content/site.ts` → `legal` (`streetAddress`, `postalCode`, `city`, `bce`, `vat`).  
Tant que ces champs sont vides, l’adresse et les n° BCE/TVA ne s’affichent pas (le nom Houdaifa Hamouchi — HohoSolutions reste visible).

## Photo

- [ ] Photo du fondateur : déposer `public/founder.jpg` et mettre le chemin dans `site.founder.photo`  
  Tant que le champ est vide, **aucune photo n’est affichée** (pas de placeholder générique).

## Rendez-vous

- [ ] URL Cal.com / Calendly dans `site.calendlyUrl` si tu veux remplacer le formulaire de rendez-vous interne

## Offres

Dans `content/packages.ts`, pour chaque formule (Essentiel, Professionnel, Entreprise) :

- [ ] Délai de livraison indicatif
- [ ] Nombre de pages inclus
- [ ] Nombre d’allers-retours de révisions
- [ ] Ce qui n’est **pas** inclus
- [ ] Conditions de paiement (acompte 50 % ?)
- [ ] Abonnement maintenance / hébergement mensuel : prix et ce qui est inclus (`site.maintenance`)

Bannière promo : uniquement si tu as une **remise réelle**, une **date de fin** et des **conditions**. Sinon laisser `promo.enabled = false`.

## Preuve sociale

- [ ] 3–8 projets réels (image, nom, secteur, résultat) dans `content/projects.ts`
- [ ] Avis Google / e-mails clients à coller dans `content/testimonials.ts`
- [ ] Si un projet est une démo perso, le marquer `demo: true`

Les sections Réalisations et Témoignages sont **masquées** tant que les tableaux sont vides. Ne pas inventer de clients.

## Pages locales SEO

Une page Bruxelles est rédigée et publiée. Pour les autres, écrire un texte **différent** (pas un copier-coller) puis passer `published: true` dans `content/services.ts` :

- [ ] Liège
- [ ] Namur
- [ ] Charleroi
- [ ] Mons
- [ ] Gent (NL)
- [ ] Antwerpen (NL)

## Traductions NL

- [ ] **TODO(owner): relecture NL** des fichiers `messages/nl.json` et des 3 articles (`content/blog.ts`) par un natif (ton, termes belges : KMO, webshop, offerte, BTW)

## Légal

- [ ] Faire relire politique de confidentialité + CGV (squelettes FR/NL/EN)
- [ ] Analytics sans cookies (Plausible / Umami) : ID en variable d’environnement — sinon pas de bannière cookies pour l’instant

## Mesure

- [ ] IDs d’events (form_submit, whatsapp_click, phone_click, offer_select, audit_request) en variables d’environnement / outil d’analytics
- [ ] Vérifier que `/api/track` reçoit bien les clics

## Hors code (acquisition)

- [ ] Google Search Console + soumettre `https://hohosolutions.com/sitemap.xml`
- [ ] Fiche Google Business Profile (ville réelle, catégorie « Création de sites web »)
- [ ] Demander un avis Google à chaque client satisfait
- [ ] Annuaires : Sortlist, Clutch, Infobel / Gouden Gids
- [ ] Page LinkedIn entreprise + lien vers le site

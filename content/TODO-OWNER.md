# À fournir par le propriétaire

Rien de tout ceci n’est inventé dans le code. Tant qu’un champ est vide, la section correspondante est **masquée**.

## Identité légale (Belgique — obligatoire)

- [ ] Dénomination sociale exacte
- [ ] Forme juridique (SRL, indépendant, …)
- [ ] Adresse du siège (rue, code postal, ville)
- [ ] Numéro d’entreprise BCE
- [ ] Numéro de TVA (BE0…)
- [ ] Nom du responsable / fondateur

Fichier : `content/site.ts` → `legal` et `founder`.

## Contact

- [ ] Confirmer le numéro WhatsApp / téléphone affiché (`+32 451 01 54 76`)
- [ ] Photo du fondateur (`public/founder.jpg`) + prénom + 2–3 phrases
- [ ] URL Cal.com / Calendly si tu veux remplacer le formulaire de rendez-vous interne

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

## Pages locales SEO

Une page Bruxelles est rédigée et publiée. Pour les autres, écrire un texte **différent** (pas un copier-coller) puis passer `published: true` dans `content/services.ts` :

- [ ] Liège
- [ ] Namur
- [ ] Charleroi
- [ ] Mons
- [ ] Gent (NL)
- [ ] Antwerpen (NL)

## Traductions NL

- [ ] **TODO(owner): relecture NL** des fichiers `messages/nl.json` par un natif (ton, termes belges : KMO, webshop, offerte, BTW)

## Analytics

- [ ] ID Plausible / Umami / autre (sans cookies de préférence) en variable d’environnement
- [ ] Vérifier que les events `form_submit`, `whatsapp_click`, `phone_click`, `offer_select`, `audit_request` arrivent bien

## Hors code (acquisition)

- [ ] Google Search Console + soumettre `https://hohosolutions.com/sitemap.xml`
- [ ] Fiche Google Business Profile
- [ ] Demander un avis Google à chaque client satisfait
- [ ] Annuaires : Sortlist, Clutch, Infobel / Gouden Gids
- [ ] Page LinkedIn entreprise + lien vers le site

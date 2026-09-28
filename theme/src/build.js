// Construit le thème bloc theme/aepcna/ et le contenu des pages (deploy/content.json).
// Usage : node theme/src/build.js [base]   — base = chemin du site ("/site" par défaut).
const fs = require('fs');
const path = require('path');
const { groupe: g, para: p, bouton: b, boutons: bs } = require('./blocs');

const BASE = process.argv[2] ?? '/site';
const VERSION = '1.0.0';
const RACINE = path.join(__dirname, '..');
const THEME = path.join(RACINE, 'aepcna');
const U = chemin => `${BASE}${chemin}`;
const ecrire = (rel, texte) => {
  const f = path.join(THEME, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, texte);
};

// ---------- Icônes : SVG de la maquette → images de fond (aucun SVG dans le contenu) ----------
const TRACES = {
  equipe: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M15 14.5c3 0 6 2 6 5.5"/>',
  valide: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  filieres: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  lieu: '<path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  courriel: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  telephone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  etoile: '<path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
  bouclier: '<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  cible: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  usine: '<path d="M3 21h18"/><path d="M5 21V10l5 3V10l5 3V6l4 2v13"/>',
  pousse: '<path d="M12 22V11"/><path d="M12 11c0-4 3-7 8-7 0 5-3 8-8 7z"/><path d="M12 14c0-3-2-5-7-5 0 4 2 6 7 5z"/>',
  formation: '<path d="M2 8l10-5 10 5-10 5z"/><path d="M6 10v5c3 2 9 2 12 0v-5"/>',
  strategie: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h4a4 4 0 014 4v5"/>',
};
const svgUrl = (nom, couleur, epaisseur) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${couleur}' stroke-width='${epaisseur}' stroke-linecap='round' stroke-linejoin='round'>${TRACES[nom].replace(/"/g, "'")}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/%20/g, ' ').replace(/%3D/g, '=').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%2C/g, ',').replace(/%27/g, "'")}")`;
};
const icones = [
  '/* ---------- Icônes (générées par theme/src/build.js) ---------- */',
  ...['equipe', 'valide', 'filieres', 'lieu', 'courriel', 'telephone', 'horloge', 'etoile', 'bouclier', 'cible']
    .map(n => `.icone-${n}::before { background-image: ${svgUrl(n, '#0E7A87', 1.8)}; }`),
  ...['usine', 'formation', 'strategie'].map(n => `.icone-${n}::before { background-image: ${svgUrl(n, '#0F3D66', 1.6)}; }`),
  `.icone-pousse::before { background-image: ${svgUrl('pousse', '#2F5D50', 1.6)}; }`,
  `.carte-equipe__pied::before { background-image: ${svgUrl('equipe', '#0F3D66', 1.7)}; }`,
  ...['lieu', 'courriel', 'telephone'].map(n => `.pied__ligne.pied-${n}::before { background-image: ${svgUrl(n, '#9FDDE2', 1.8)}; }`),
].join('\n');

// ---------- style.css ----------
const entete = `/*
Theme Name: AEPC Nouvelle-Aquitaine
Theme URI: https://aepcna.fr
Author: AEPC Nouvelle-Aquitaine
Description: Thème bloc sur mesure de l'Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine (charte UDF4). Contenu 100 % éditable dans l'éditeur de blocs.
Version: ${VERSION}
Requires at least: 6.6
Requires PHP: 8.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: aepcna
Tags: block-theme, full-site-editing, business
*/
`;
ecrire('style.css', entete + '\n' + fs.readFileSync(path.join(__dirname, 'base.css'), 'utf8') + '\n' + icones + '\n');

// ---------- theme.json ----------
const police = f => ({ fontFamily: 'Figtree', fontStyle: 'normal', fontWeight: '400 800', fontDisplay: 'swap', src: [`file:./assets/fonts/${f}`] });
ecrire('theme.json', JSON.stringify({
  $schema: 'https://schemas.wp.org/trunk/theme.json',
  version: 3,
  settings: {
    appearanceTools: true,
    layout: { contentSize: '1280px', wideSize: '1440px' },
    color: {
      defaultPalette: false, defaultGradients: false, defaultDuotone: false, custom: true,
      palette: [
        { slug: 'encre', color: '#0B2A47', name: 'Encre' },
        { slug: 'marine', color: '#0F3D66', name: 'Marine' },
        { slug: 'sarcelle', color: '#0E7A87', name: 'Sarcelle' },
        { slug: 'sarcelle-vif', color: '#1C99A3', name: 'Sarcelle vif' },
        { slug: 'vert', color: '#2F5D50', name: 'Vert RSE' },
        { slug: 'texte', color: '#3A4B5E', name: 'Texte' },
        { slug: 'fond', color: '#F2F6F9', name: 'Fond' },
        { slug: 'blanc', color: '#FFFFFF', name: 'Blanc' },
      ],
    },
    typography: {
      fluid: false,
      defaultFontSizes: false,
      fontFamilies: [{
        slug: 'figtree', name: 'Figtree',
        fontFamily: "'Figtree', system-ui, sans-serif",
        fontFace: [police('figtree-latin.woff2'), police('figtree-latin-ext.woff2')],
      }],
      fontSizes: [
        { slug: 'petit', name: 'Petit', size: '14px' },
        { slug: 'normal', name: 'Normal', size: '16px' },
        { slug: 'chapeau', name: 'Chapeau', size: '18px' },
        { slug: 'titre-3', name: 'Titre 3', size: '22px' },
        { slug: 'titre-2', name: 'Titre 2', size: '44px' },
        { slug: 'titre-1', name: 'Titre 1', size: '56px' },
      ],
    },
    spacing: { blockGap: true, units: ['px', 'rem', '%', 'vw'] },
    border: { radius: true, color: true, style: true, width: true },
  },
  styles: {
    spacing: { blockGap: '0px', padding: { top: '0px', right: '0px', bottom: '0px', left: '0px' } },
    color: { background: 'var(--wp--preset--color--fond)', text: 'var(--wp--preset--color--encre)' },
    typography: { fontFamily: 'var(--wp--preset--font-family--figtree)', fontSize: '16px', lineHeight: '1.5' },
    elements: {
      link: { color: { text: 'var(--wp--preset--color--encre)' }, ':hover': { color: { text: 'var(--wp--preset--color--sarcelle)' } } },
      heading: { typography: { fontWeight: '800', letterSpacing: '-0.01em' } },
      button: {
        color: { background: 'var(--wp--preset--color--marine)', text: 'var(--wp--preset--color--blanc)' },
        border: { radius: '6px' },
        typography: { fontWeight: '600', fontSize: '16px', lineHeight: '1.2' },
        spacing: { padding: { top: '16px', bottom: '16px', left: '26px', right: '26px' } },
      },
    },
  },
  templateParts: [
    { name: 'header', title: 'En-tête', area: 'header' },
    { name: 'footer', title: 'Pied de page', area: 'footer' },
  ],
}, null, 2) + '\n');

// ---------- parts/header.html ----------
const lienNav = (label, url) => `<!-- wp:navigation-link ${JSON.stringify({ label, url, kind: 'custom', isTopLevelLink: true })} /-->`;
ecrire('parts/header.html', g('site-entete', g('enveloppe', [
  `<!-- wp:site-logo {"width":141,"shouldSyncIcon":false} /-->`,
  `<!-- wp:navigation {"className":"nav-principale","overlayMenu":"mobile","layout":{"type":"flex","justifyContent":"right"}} -->\n` + [
    lienNav('Notre méthode', U('/#methode')),
    lienNav('Territoire', U('/#territoire')),
    lienNav('Nos consultants', U('/#consultants')),
    lienNav('Nos offres', U('/#offres')),
    lienNav('Réalisations', U('/#realisations')),
    lienNav("L'association", U('/qui-sommes-nous/')),
    `<!-- wp:navigation-link ${JSON.stringify({ label: 'Parlons de votre projet', url: U('/contact/'), kind: 'custom', isTopLevelLink: true, className: 'nav-contact' })} /-->`,
  ].join('\n') + '\n<!-- /wp:navigation -->',
  bs('entete-cta', [b('Parlons de votre projet', U('/contact/'), '')]),
])) + '\n');

// ---------- parts/footer.html ----------
const lien = (texte, url) => `<a href="${url}">${texte}</a>`;
ecrire('parts/footer.html', [
  g('pied__appels', g('enveloppe grille-2', [
    g('appel', [
      g('', [
        `<!-- wp:heading {"level":3,"className":"appel__titre"} -->\n<h3 class="wp-block-heading appel__titre">Découvrez l'AEPC NA</h3>\n<!-- /wp:heading -->`,
        p('appel__texte', "Plus qu'un simple réseau : une plateforme de collaboration et d'innovation au service du territoire."),
      ]),
      bs('', [b('À propos', U('/qui-sommes-nous/'), 'bouton--contour bouton--petit')]),
    ]),
    g('appel', [
      g('', [
        `<!-- wp:heading {"level":3,"className":"appel__titre"} -->\n<h3 class="wp-block-heading appel__titre">Rejoignez-nous !</h3>\n<!-- /wp:heading -->`,
        p('appel__texte', "Consultant, vous souhaitez travailler de manière collective ? Découvrez notre parcours d'admission."),
      ]),
      bs('', [b('Candidater', U('/contact/'), 'bouton--sarcelle-fonce')]),
    ]),
  ])),
  g('pied', g('enveloppe', [
    g('pied__colonnes', [
      g('pied__marque', [
        `<!-- wp:site-logo {"width":130,"shouldSyncIcon":false} /-->`,
        p('pied__devise', 'Au service de la transformation des acteurs du territoire !'),
        p('pied__desc', 'Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine — association loi 1901, émanation de la CPC Nouvelle-Aquitaine.'),
      ]),
      g('', [p('pied__titre', 'Navigation'), g('pied__liens', [
        p('', lien("À propos de l'AEPC NA", U('/qui-sommes-nous/'))),
        p('', lien('Nos consultants', U('/nos-consultants/'))),
        p('', lien('Réalisations', U('/#realisations'))),
        p('', lien('Contact', U('/contact/'))),
        p('', lien('Espace adhérents', U('/espace-adherents/'))),
      ])]),
      g('', [p('pied__titre', 'Contact'), g('pied__liens', [
        p('pied__ligne pied-lieu', '51-53 boulevard du Président Wilson<br>33000 Bordeaux'),
        p('pied__ligne pied-courriel', lien('contact@aepcna.fr', 'mailto:contact@aepcna.fr')),
        p('pied__ligne pied-telephone', lien('06 10 50 10 77', 'tel:+33610501077')),
        p('pied__lien-fort', lien('Formulaire de contact →', U('/contact/'))),
      ])]),
      g('', [p('pied__titre', 'Informations'), g('pied__liens', [
        p('', lien('Mentions légales', U('/mentions-legales/'))),
        p('', lien('Déclaration de confidentialité (UE)', U('/declaration-de-confidentialite-ue/'))),
        p('', lien('Politique de cookies (UE)', U('/politique-de-cookies-ue-2/'))),
        p('', lien('Gérer le consentement', U('/politique-de-cookies-ue-2/'))),
      ])]),
    ]),
    g('pied__legal', [
      p('pied__legal-liens', `${lien('Mentions légales', U('/mentions-legales/'))} | ${lien('Politique de cookies (UE)', U('/politique-de-cookies-ue-2/'))} | ${lien('Déclaration de confidentialité (UE)', U('/declaration-de-confidentialite-ue/'))}`),
      p('pied__mentions', '© 2026 AEPC Nouvelle-Aquitaine · Association loi 1901<br>SIRET 924 343 379 00021 · APE 9499Z · TVA FR66 924 343 379 · Hébergement OVH'),
    ]),
  ])),
].join('\n') + '\n');

// ---------- templates ----------
const cadre = milieu => `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->\n\n${milieu}\n\n<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->\n`;
const principal = `<!-- wp:group {"tagName":"main","layout":{"type":"default"}} -->\n<main class="wp-block-group"><!-- wp:post-content {"layout":{"type":"default"}} /--></main>\n<!-- /wp:group -->`;
ecrire('templates/front-page.html', cadre(principal));
// Pages existantes (Elementor, textes légaux) : même cadre ; les pages conçues
// avec le thème portent leur propre bandeau dans le contenu.
ecrire('templates/page.html', cadre(principal));
ecrire('templates/index.html', cadre(`<!-- wp:group {"tagName":"main","className":"enveloppe page-contenu","layout":{"type":"default"}} -->
<main class="wp-block-group enveloppe page-contenu"><!-- wp:query {"queryId":1,"query":{"perPage":9,"postType":"post","inherit":true},"layout":{"type":"default"}} -->
<div class="wp-block-query"><!-- wp:post-template -->
<!-- wp:post-title {"isLink":true} /-->
<!-- wp:post-excerpt {"excerptLength":28} /-->
<!-- /wp:post-template -->
<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>Aucune publication pour le moment.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query --></main>
<!-- /wp:group -->`));
ecrire('templates/single.html', cadre(`<!-- wp:group {"tagName":"main","className":"enveloppe page-contenu","layout":{"type":"default"}} -->
<main class="wp-block-group enveloppe page-contenu"><!-- wp:post-title {"level":1,"className":"titre-section"} /-->
<!-- wp:post-content {"layout":{"type":"default"}} /--></main>
<!-- /wp:group -->`));
ecrire('templates/404.html', cadre(`<!-- wp:group {"tagName":"main","className":"enveloppe page-contenu","layout":{"type":"default"}} -->
<main class="wp-block-group enveloppe page-contenu"><!-- wp:heading {"level":1,"className":"titre-section"} -->
<h1 class="wp-block-heading titre-section">Cette page n’existe pas</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"chapeau"} -->
<p class="chapeau">Le lien que vous avez suivi ne mène nulle part.</p>
<!-- /wp:paragraph -->
${bs('hero__actions', [b('Retour à l’accueil', U('/'), '')])}</main>
<!-- /wp:group -->`));

// ---------- functions.php, editor.css, app.js ----------
fs.copyFileSync(path.join(__dirname, 'functions.php'), path.join(THEME, 'functions.php'));
fs.copyFileSync(path.join(__dirname, 'editor.css'), path.join(THEME, 'assets/editor.css'));

// ---------- contenu des pages ----------
const pages = require('./pages')(BASE);
const sortie = path.join(RACINE, '..', 'deploy', 'content.json');
fs.mkdirSync(path.dirname(sortie), { recursive: true });
fs.writeFileSync(sortie, JSON.stringify(pages, null, 1));
console.log('thème et contenu écrits — base', BASE, '— version', VERSION);

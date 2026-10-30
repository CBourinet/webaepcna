// Construit le thème bloc theme/aepcna/ et le contenu des pages (deploy/content.json).
// Usage : node theme/src/build.js [base]   — base = chemin du site ("/site" par défaut).
const fs = require('fs');
const path = require('path');
const { groupe: g, para: p, bouton: b, boutons: bs } = require('./blocs');

const BASE = process.argv[2] ?? '/site';
const VERSION = '1.9.1';
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
// Logo LinkedIn (glyphe « in », plein) : forme de marque, donc tracé plein et non au trait.
const LINKEDIN = 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z';
const logoUrl = (trace, couleur) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${couleur}'><path d='${trace}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/%20/g, ' ').replace(/%3D/g, '=').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%2C/g, ',').replace(/%27/g, "'")}")`;
};
const icones = [
  '/* ---------- Icônes (générées par theme/src/build.js) ---------- */',
  ...['equipe', 'valide', 'filieres', 'lieu', 'courriel', 'telephone', 'horloge', 'etoile', 'bouclier', 'cible']
    .map(n => `.icone-${n}::before { background-image: ${svgUrl(n, '#0E7A87', 1.8)}; }`),
  ...['usine', 'formation', 'strategie'].map(n => `.icone-${n}::before { background-image: ${svgUrl(n, '#0F3D66', 1.6)}; }`),
  `.icone-pousse::before { background-image: ${svgUrl('pousse', '#2F5D50', 1.6)}; }`,
  `.icone-usine-s::before { background-image: ${svgUrl('usine', '#0E7A87', 1.8)}; }`,
  `.nav-actionnable .wp-block-navigation-item__content::before { background-image: ${svgUrl('pousse', '#2F5D50', 1.8)}; }`,
  `.liste-coches li::before { background-image: ${svgUrl('valide', '#0E7A87', 1.8)}; }`,
  `.carte-equipe__pied::before { background-image: ${svgUrl('equipe', '#0F3D66', 1.7)}; }`,
  ...['lieu', 'courriel', 'telephone'].map(n => `.pied__ligne.pied-${n}::before { background-image: ${svgUrl(n, '#9FDDE2', 1.8)}; }`),
  `.pied__linkedin a::before { background-image: ${logoUrl(LINKEDIN, '#FFFFFF')}; }`,
].join('\n');

// ---------- Illustrations des bandeaux (traits clairs sur fond marine, touches ambre) ----------
// Purement décoratives : servies en image de fond, jamais dans le contenu.
const CYAN = '#9FDDE2', AMBRE = '#FFB547';
const enDataUri = svg => `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/%20/g, ' ').replace(/%3D/g, '=').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%2C/g, ',').replace(/%27/g, "'")}")`;
const svgIllu = corps => enDataUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 460 320' fill='none' stroke-linecap='round' stroke-linejoin='round'>${corps}</svg>`);
const r1 = n => Math.round(n * 10) / 10;
// Le motif du logo : trois personnes autour d'un centre.
const trio = (cx, cy, d, rr, op) => [[0, -1], [-0.87, 0.5], [0.87, 0.5]].map(([x, y]) => `<circle cx='${r1(cx + x * d)}' cy='${r1(cy + y * d)}' r='${rr}' stroke='${CYAN}' stroke-opacity='${op}' stroke-width='3'/>`).join('');
const ILLUS = {
  anneaux: svgIllu(`<circle cx='330' cy='160' r='150' stroke='${CYAN}' stroke-opacity='.16' stroke-width='2'/><circle cx='330' cy='160' r='104' stroke='${CYAN}' stroke-opacity='.12' stroke-width='2' stroke-dasharray='2 10'/>${trio(330, 160, 52, 24, '.55')}<circle cx='330' cy='160' r='9' fill='${AMBRE}'/><circle cx='196' cy='72' r='5' fill='${AMBRE}' fill-opacity='.8'/><circle cx='430' cy='278' r='4' fill='${CYAN}' fill-opacity='.5'/>`),
  collectif: (() => {
    const cx = 310, cy = 160, R = 112, n = 7;
    const pts = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [r1(cx + R * Math.cos(a)), r1(cy + R * Math.sin(a))]; });
    const rayons = pts.map(([x, y]) => `<line x1='${cx}' y1='${cy}' x2='${x}' y2='${y}' stroke='${CYAN}' stroke-opacity='.3' stroke-width='2'/>`).join('');
    const anneau = pts.map(([x, y], i) => { const [x2, y2] = pts[(i + 1) % n]; return `<line x1='${x}' y1='${y}' x2='${x2}' y2='${y2}' stroke='${CYAN}' stroke-opacity='.18' stroke-width='2'/>`; }).join('');
    const noeuds = pts.map(([x, y]) => `<circle cx='${x}' cy='${y}' r='13' fill='#0F3D66' stroke='${CYAN}' stroke-opacity='.75' stroke-width='3'/><circle cx='${x}' cy='${y}' r='4' fill='${CYAN}' fill-opacity='.7'/>`).join('');
    return svgIllu(`<circle cx='${cx}' cy='${cy}' r='150' stroke='${CYAN}' stroke-opacity='.1' stroke-width='2'/>${rayons}${anneau}${noeuds}<circle cx='${cx}' cy='${cy}' r='30' fill='#0F3D66' stroke='${AMBRE}' stroke-width='3.5'/><path d='M${cx - 11} ${cy}l7 7 15-15' stroke='${AMBRE}' stroke-width='3.5'/>`);
  })(),
  parcours: (() => {
    const pts = Array.from({ length: 9 }, (_, i) => [r1(60 + i * 37), r1(230 - i * 15 - 34 * Math.sin(i * 0.9))]);
    const chemin = 'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L');
    const jalons = pts.map(([x, y], i) => `<circle cx='${x}' cy='${y}' r='${i === 8 ? 0 : 7}' fill='#0F3D66' stroke='${i < 3 ? AMBRE : CYAN}' stroke-opacity='${i < 3 ? 1 : 0.7}' stroke-width='3'/>`).join('');
    const [fx, fy] = pts[8];
    return svgIllu(`<path d='${chemin}' stroke='${CYAN}' stroke-opacity='.45' stroke-width='3' stroke-dasharray='1 9'/>${jalons}<rect x='${fx - 6}' y='${fy - 58}' width='54' height='68' rx='6' fill='#0F3D66' stroke='${CYAN}' stroke-opacity='.8' stroke-width='3'/><path d='M${fx + 5} ${fy - 40}h32M${fx + 5} ${fy - 28}h32M${fx + 5} ${fy - 16}h20' stroke='${CYAN}' stroke-opacity='.6' stroke-width='3'/><circle cx='${fx + 46}' cy='${fy + 6}' r='15' fill='${AMBRE}'/><path d='M${fx + 39} ${fy + 6}l5 5 9-10' stroke='#0B2A47' stroke-width='3'/>`);
  })(),
  usine: (() => {
    const dents = Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x1='${r1(232 + 24 * Math.cos(a))}' y1='${r1(212 + 24 * Math.sin(a))}' x2='${r1(232 + 32 * Math.cos(a))}' y2='${r1(212 + 32 * Math.sin(a))}' stroke='${CYAN}' stroke-opacity='.7' stroke-width='6'/>`; }).join('');
    return svgIllu(`<path d='M150 262H440' stroke='${CYAN}' stroke-opacity='.35' stroke-width='3'/><path d='M290 262V176l36-26v26l36-26v26l36-26v112' stroke='${CYAN}' stroke-opacity='.7' stroke-width='3'/><path d='M398 150V96h16v54' stroke='${CYAN}' stroke-opacity='.55' stroke-width='3'/><circle cx='232' cy='212' r='24' stroke='${CYAN}' stroke-opacity='.7' stroke-width='3'/>${dents}<circle cx='232' cy='212' r='8' fill='${AMBRE}'/><path d='M160 140l50-24 40 14 64-46' stroke='${AMBRE}' stroke-width='3.5'/><path d='M296 82h20v20' stroke='${AMBRE}' stroke-width='3.5'/><circle cx='160' cy='140' r='5' fill='${AMBRE}'/>`);
  })(),
};
const illustrations = [
  '/* ---------- Illustrations des bandeaux (générées par theme/src/build.js) ---------- */',
  `.bandeau-page::after { background-image: ${ILLUS.anneaux}; }`,
  ...[['collectif', ['qui-sommes-nous', 'nos-consultants', 'adherer', 'contact']], ['parcours', ['rse-actionnable']], ['usine', ['usine-du-futur', 'solutions']]]
    .map(([nom, pages]) => `${pages.map(sl => `.page-${sl} .bandeau-page::after`).join(', ')} { background-image: ${ILLUS[nom]}; }`),
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
ecrire('style.css', entete + '\n' + fs.readFileSync(path.join(__dirname, 'base.css'), 'utf8') + '\n' + icones + '\n\n' + fs.readFileSync(path.join(__dirname, 'dynamique.css'), 'utf8') + '\n' + illustrations + '\n');

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
    lienNav('Notre modèle', U('/#modele')),
    lienNav('Solutions', U('/solutions/')),
    lienNav('Réalisations', U('/#realisations')),
    lienNav('Consultants', U('/nos-consultants/')),
    lienNav("L'association", U('/qui-sommes-nous/')),
    `<!-- wp:navigation-link ${JSON.stringify({ label: 'RSE Actionnable', title: 'Parcours RSE pour les PME, référencé par la Région', url: U('/rse-actionnable/'), kind: 'custom', isTopLevelLink: true, className: 'nav-actionnable' })} /-->`,
    `<!-- wp:navigation-link ${JSON.stringify({ label: 'Échanger sur mon projet', url: U('/contact/'), kind: 'custom', isTopLevelLink: true, className: 'nav-contact' })} /-->`,
  ].join('\n') + '\n<!-- /wp:navigation -->',
  bs('entete-cta', [b('Échanger sur mon projet', U('/contact/'), '')]),
])) + '\n');

// Document signé de la politique QSE-RSE, servi avec le thème.
fs.mkdirSync(path.join(THEME, 'assets/docs'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'docs/politique-integree-qse-rse-aepc-na.pdf'), path.join(THEME, 'assets/docs/politique-integree-qse-rse-aepc-na.pdf'));

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
        `<!-- wp:heading {"level":3,"className":"appel__titre"} -->\n<h3 class="wp-block-heading appel__titre">Vous êtes consultant ?</h3>\n<!-- /wp:heading -->`,
        p('appel__texte', "Rejoignez un collectif qui répond ensemble aux appels d'offres. Découvrez notre parcours d'adhésion."),
      ]),
      bs('', [b("Rejoindre l'AEPC", U('/adherer/'), 'bouton--sarcelle-fonce')]),
    ]),
  ])),
  g('pied', g('enveloppe', [
    g('pied__colonnes', [
      g('pied__marque', [
        `<!-- wp:site-logo {"width":130,"shouldSyncIcon":false} /-->`,
        p('pied__devise', 'Au service de la transformation des acteurs du territoire !'),
        p('pied__desc', 'Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine — association loi 1901.'),
        p('pied__linkedin', '<a href="https://www.linkedin.com/company/aepcna" target="_blank" rel="noreferrer noopener">Suivez-nous sur LinkedIn</a>'),
      ]),
      g('', [p('pied__titre', 'Navigation'), g('pied__liens', [
        p('', lien("À propos de l'AEPC NA", U('/qui-sommes-nous/'))),
        p('', lien('Nos solutions', U('/solutions/'))),
        p('', lien('Nos consultants', U('/nos-consultants/'))),
        p('', lien('Réalisations', U('/#realisations'))),
        p('', lien("Rejoindre l'AEPC", U('/adherer/'))),
        p('', lien('Usine du Futur', U('/usine-du-futur/'))),
        p('', lien('Actualités', U('/actualites/'))),
        p('', lien('Contact', U('/contact/'))),
        p('', lien('Espace adhérents', U('/espace-adherents/'))),
      ])]),
      g('', [p('pied__titre', 'Contact'), g('pied__liens', [
        p('pied__ligne pied-lieu', '51-53 boulevard du Président Wilson<br>33000 Bordeaux'),
        p('pied__ligne pied-telephone', lien('06 10 50 10 77', 'tel:+33610501077')),
        p('pied__lien-fort', lien('Formulaire de contact →', U('/contact/'))),
      ])]),
      g('', [p('pied__titre', 'Informations'), g('pied__liens', [
        p('', lien('Mentions légales', U('/mentions-legales/'))),
        p('', lien('Politique Intégrée QSE-RSE', U('/politique-qse-rse/'))),
        p('', lien('Déclaration de confidentialité (UE)', U('/declaration-de-confidentialite-ue/'))),
        p('', lien('Politique de cookies (UE)', U('/politique-de-cookies-ue-2/'))),
        p('', lien('Gérer le consentement', U('/politique-de-cookies-ue-2/'))),
      ])]),
    ]),
    g('pied__legal', [
      p('pied__legal-liens', `${lien('Mentions légales', U('/mentions-legales/'))} | ${lien('Politique QSE-RSE', U('/politique-qse-rse/'))} | ${lien('Politique de cookies (UE)', U('/politique-de-cookies-ue-2/'))} | ${lien('Déclaration de confidentialité (UE)', U('/declaration-de-confidentialite-ue/'))}`),
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
// Les articles portent leur bandeau (fil d'Ariane, date, titre) dans leur contenu, comme les pages.
ecrire('templates/single.html', cadre(principal));
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
fs.copyFileSync(path.join(__dirname, 'anime.js'), path.join(THEME, 'assets/anime.js'));

// ---------- contenu des pages ----------
const pages = require('./pages')(BASE);
const sortie = path.join(RACINE, '..', 'deploy', 'content.json');
fs.mkdirSync(path.dirname(sortie), { recursive: true });
fs.writeFileSync(sortie, JSON.stringify(pages, null, 1));

// Questions fréquentes décrites aux moteurs (FAQPage) par functions.php.
ecrire('donnees/faq.json', JSON.stringify(pages.faq, null, 1));

// llms.txt : fiche d'identité factuelle destinée aux assistants IA (https://llmstxt.org).
const SITE = 'https://aepcna.fr' + BASE;
fs.writeFileSync(path.join(RACINE, '..', 'deploy', 'llms.txt'), `# AEPC Nouvelle-Aquitaine

> L'Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine (AEPC NA) est une association loi 1901, créée en 2023 à Bordeaux par des consultants issus de la Chambre Professionnelle du Conseil de Nouvelle-Aquitaine (CPC NA). Elle réunit plus de 50 consultants indépendants et constitue, pour chaque projet de transformation d'entreprise ou de filière, l'équipe d'experts adaptée, coordonnée par une équipe salariée (chef de projet, PMO, spécialistes). On ne choisit pas l'AEPC pour un expert, mais pour la qualité d'un collectif.

Faits clés :
- Siège : 51-53 boulevard du Président Wilson, 33000 Bordeaux. Intervention dans les douze départements de Nouvelle-Aquitaine.
- Président : Charles Bourinet, consultant, membre de l'Institut Lean France.
- Usine du Futur 4 (Région Nouvelle-Aquitaine) : l'AEPC NA anime le dispositif ; lauréate en 2024, confiance renouvelée pour 2026-2027 ; plus de 150 entreprises industrielles accompagnées par une trentaine d'experts ; équipe labellisée Aero Excellence pour l'aéronautique.
- Actionnable : parcours RSE pour PME, offre RSE référencée Néo Terra par la Région Nouvelle-Aquitaine, porté avec la Fédération Cinov Nouvelle-Aquitaine ; cohorte de 3 à 8 entreprises, 6 jours + 3 jours à la carte sur 6 mois, 25 experts, rapport RSE en fin de parcours ; 2 227,50 € HT par entreprise ; prochaine cohorte « Impulse » le 12 janvier 2027. Référencement : catalogue des offres et labels RSE reconnus par la Région (https://www.calameo.com/read/0060092718ce69b679e0c), annonce régionale (https://entreprises.nouvelle-aquitaine.fr/actualites/un-referencement-regional-pour-structurer-les-demarches-rse), catalogue en ligne ADI (https://events.adi-na.fr/content/les-solutions-rse).
- Formation : marchés de formation triennaux 2024-2026 pour la Chambre de Métiers et de l'Artisanat et pour OCAPIAT–IFRIA.
- Partenaires : CPC Nouvelle-Aquitaine, Maison des Professions Libérales, Fédération Cinov Nouvelle-Aquitaine, Agence LUCIE (plus de 20 consultants labellisés RSE). Membre d'ADI Nouvelle-Aquitaine.
- Contact : ${SITE}/contact/ ; téléphone 06 10 50 10 77.

## Offres
- [Nos solutions](${SITE}/solutions/) : performance industrielle, programmes de formation, stratégie et transformation des organisations, parcours RSE pour PME.
- [Usine du Futur Nouvelle-Aquitaine](${SITE}/usine-du-futur/) : rôle de l'AEPC NA dans le programme régional.
- [RSE Actionnable](${SITE}/rse-actionnable/) : parcours RSE des PME, modules, livrables, tarifs.

## L'association
- [Qui sommes-nous](${SITE}/qui-sommes-nous/) : origine, modèle, valeurs, écosystème.
- [Nos consultants](${SITE}/nos-consultants/) : le collectif d'experts.
- [Rejoindre l'AEPC](${SITE}/adherer/) : adhésion des consultants indépendants.
- [Politique QSE-RSE](${SITE}/politique-qse-rse/) : engagements qualité, sécurité, environnement, RSE.

## Actualités
- [Actualités et presse](${SITE}/actualites/)
${pages.filter(x => x.type === 'post').reverse().map(x => `- [${x.title}](${SITE}/actualites/${x.slug}/) : ${x.excerpt}`).join('\n')}
`);
console.log('thème et contenu écrits — base', BASE, '— version', VERSION);

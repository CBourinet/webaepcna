// Fabriques de balisage Gutenberg : la sortie correspond exactement à save()
// des blocs natifs, pour qu'aucun bloc ne soit marqué « invalide ».

const attrs = o => {
  const s = JSON.stringify(o);
  return s === '{}' ? '' : ' ' + s;
};
const classes = (...c) => c.filter(Boolean).join(' ');

// core/group — layout "default" : aucune classe calculée, le CSS fait la mise en page.
function groupe(className, enfants, { tag = 'div', ancre } = {}) {
  const a = {};
  if (tag !== 'div') a.tagName = tag;
  if (ancre) a.anchor = ancre;
  if (className) a.className = className;
  a.layout = { type: 'default' };
  const id = ancre ? ` id="${ancre}"` : '';
  return `<!-- wp:group${attrs(a)} -->\n<${tag}${id} class="${classes('wp-block-group', className)}">${[].concat(enfants).join('\n')}</${tag}>\n<!-- /wp:group -->`;
}

function para(className, html) {
  const a = className ? { className } : {};
  const c = className ? ` class="${className}"` : '';
  return `<!-- wp:paragraph${attrs(a)} -->\n<p${c}>${html}</p>\n<!-- /wp:paragraph -->`;
}

function titre(niveau, className, html) {
  const a = {};
  if (niveau !== 2) a.level = niveau;
  if (className) a.className = className;
  return `<!-- wp:heading${attrs(a)} -->\n<h${niveau} class="${classes('wp-block-heading', className)}">${html}</h${niveau}>\n<!-- /wp:heading -->`;
}

// core/image liée à la médiathèque : {{ID:slug}} et {{SRC:slug:taille}} sont
// résolus côté serveur après l'import des visuels.
function image(slug, alt, className, taille = 'full') {
  const a = { id: `__ID_${slug}__`, sizeSlug: taille, linkDestination: 'none' };
  if (className) a.className = className;
  const json = JSON.stringify(a).replace(`"__ID_${slug}__"`, `{{ID:${slug}}}`);
  return `<!-- wp:image ${json} -->\n<figure class="${classes('wp-block-image', 'size-' + taille, className)}"><img src="{{SRC:${slug}:${taille}}}" alt="${alt}" class="wp-image-{{ID:${slug}}}"/></figure>\n<!-- /wp:image -->`;
}

function bouton(texte, url, className) {
  const a = className ? { className } : {};
  return `<!-- wp:button${attrs(a)} -->\n<div class="${classes('wp-block-button', className)}"><a class="wp-block-button__link wp-element-button" href="${url}">${texte}</a></div>\n<!-- /wp:button -->`;
}

function boutons(className, liste) {
  const a = className ? { className } : {};
  return `<!-- wp:buttons${attrs(a)} -->\n<div class="${classes('wp-block-buttons', className)}">${liste.join('\n')}</div>\n<!-- /wp:buttons -->`;
}

function shortcode(code) {
  return `<!-- wp:shortcode -->\n${code}\n<!-- /wp:shortcode -->`;
}

module.exports = { groupe, para, titre, image, bouton, boutons, shortcode };

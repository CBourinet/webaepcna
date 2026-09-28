# Maquette AEPC Nouvelle-Aquitaine (phase 2)

Reproduction fidèle de « Proposition B — charte UDF4 » en HTML/CSS responsive, avant conversion en thème bloc WordPress.

- `src/` : sources (en-tête, pied de page, bloc contact, pages). Ne pas éditer les `.html` de la racine à la main.
- `node build.js` : assemble `index.html` et `contact.html`.
- Serveur local : `cd /tmp && RACINE=$PWD/maquette node .claude/skills/claude-to-wordpress/scripts/serve.js`
- `captures/` : captures pleine page (ordinateur 1440 px, mobile 390 px).
- Police Figtree auto-hébergée (`fonts/`), pas d'appel à Google Fonts.

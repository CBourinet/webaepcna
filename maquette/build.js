// Assemble les pages de la maquette : en-tête et pied de page identiques partout.
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'src');
const lire = f => fs.readFileSync(path.join(src, f), 'utf8');
const entete = lire('entete.html');
const pied = lire('pied.html');
const contact = lire('contact-bloc.html');

for (const fichier of fs.readdirSync(path.join(src, 'pages'))) {
  let corps = lire(path.join('pages', fichier));
  const titre = (corps.match(/<!--TITRE: (.*?)-->/) || [])[1] || 'AEPC Nouvelle-Aquitaine';
  const desc = (corps.match(/<!--DESCRIPTION: (.*?)-->/) || [])[1] || '';
  corps = corps.replace(/<!--(TITRE|DESCRIPTION):.*?-->\n?/g, '').replace('{{CONTACT}}', contact);
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titre}</title>
<meta name="description" content="${desc}">
<link rel="preload" href="fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="styles.css">
</head>
<body>
${entete}
${corps}
${pied}
<script src="app.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(__dirname, fichier), html);
  console.log('écrit', fichier);
}

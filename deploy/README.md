# Déploiement du thème AEPC NA sur aepcna.fr/site

## Structure
- `theme/src/` : sources (feuille de style `base.css`, contenu des pages `pages.js`, générateur `build.js`).
- `theme/aepcna/` : thème bloc généré — ne pas éditer à la main, relancer `node theme/src/build.js`.
- `deploy/content.json` : contenu des pages Accueil et Contact en blocs natifs (généré).
- `deploy/formulaire.txt` : gabarit Contact Form 7.
- `deploy/deploy.php` : script idempotent (sauvegarde, thème, médiathèque, formulaire, pages, page d'accueil, purge).

## Redéployer
1. `node theme/src/build.js`, puis incrémenter `VERSION` dans `theme/src/build.js` si le CSS change.
2. Pousser la branche sur GitHub.
3. Via Novamira (`novamira/execute-php`) : télécharger l'archive de la branche depuis codeload.github.com,
   la décompresser dans `wp-content/aepcna-deploy`, puis `require .../deploy/deploy.php; aepcna_deploy($src);`,
   et supprimer `wp-content/aepcna-deploy` à la fin.

Attention : l'étape `pages` réécrit le contenu des pages Accueil et Contact. Si des modifications ont été
faites dans l'éditeur WordPress entre-temps, lancer `aepcna_deploy($src, ['theme', 'purge'])` pour ne mettre
à jour que le thème, ou `aepcna_deploy($src, ['theme', 'medias', 'pages', 'purge'], ['nos-consultants'])`
pour ne (re)déployer qu'une page.

## Revenir en arrière
- Thème : `switch_theme('oceanwp-child-theme-master');` (l'ancien thème est toujours installé).
- Page d'accueil : `update_option('page_on_front', 24);`
- Page Contact (Elementor) : `update_post_meta(32, '_elementor_edit_mode', 'builder');` — les données Elementor
  n'ont pas été supprimées ; le contenu précédent est aussi dans les révisions de la page.
- Sauvegarde complète avant déploiement : `wp-content/uploads/sauvegarde-avant-theme-aepcna-*.json`.

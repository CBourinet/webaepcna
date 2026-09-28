// Menu mobile : bascule une classe, aucun contenu injecté.
document.querySelectorAll('.site-entete').forEach(function (entete) {
  var bouton = entete.querySelector('.burger');
  if (!bouton) return;
  bouton.addEventListener('click', function () {
    var ouvert = entete.classList.toggle('est-ouvert');
    bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
  });
  entete.querySelectorAll('.nav-principale a').forEach(function (lien) {
    lien.addEventListener('click', function () {
      entete.classList.remove('est-ouvert');
      bouton.setAttribute('aria-expanded', 'false');
    });
  });
});

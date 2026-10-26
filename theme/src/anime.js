/**
 * Apparition des blocs au défilement (une seule fois) et ombre de l'en-tête.
 * Ce qui est déjà à l'écran au chargement ne bouge pas : seul ce qui arrive
 * en défilant apparaît. Sans JavaScript ou avec « réduire les animations »,
 * tout reste visible et immobile.
 */
(function () {
	var racine = document.documentElement;
	var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// En-tête : une ombre légère dès que la page défile (indique qu'il flotte).
	var entete = document.querySelector('header.wp-block-template-part');
	if (entete) {
		var majEntete = function () { entete.classList.toggle('est-defile', window.scrollY > 8); };
		majEntete();
		window.addEventListener('scroll', majEntete, { passive: true });
	}

	if (calme || !('IntersectionObserver' in window) || !racine.classList.contains('js-anime')) {
		racine.classList.remove('js-anime');
		return;
	}

	var CIBLES = [
		'.entete-section', '.grille-2 > *', '.grille-3 > *', '.grille-4 > *', '.etapes > *',
		'.faq__item', '.actus__liste > *', '.equation', '.encart-sombre', '.document-legal',
		'.competences', '.logos__groupe', '.exemple', '.carte-region', '.territoire__texte',
	].join(',');

	var hauteur = window.innerHeight;
	var aReveler = [];
	document.querySelectorAll('main ' + CIBLES.split(',').join(', main ')).forEach(function (el) {
		if (el.closest('.a-reveler')) {
			return; // un parent apparaît déjà : pas de double mouvement
		}
		if (el.getBoundingClientRect().top < hauteur * 0.92) {
			return; // déjà visible au chargement : ne pas le faire disparaître
		}
		// Décalage en cascade entre éléments frères (60 ms, plafonné à 240 ms).
		var rang = Array.prototype.indexOf.call(el.parentElement.children, el);
		el.style.setProperty('--decalage', Math.min(rang, 4) * 60 + 'ms');
		el.classList.add('a-reveler');
		aReveler.push(el);
	});

	var observateur = new IntersectionObserver(function (entrees) {
		entrees.forEach(function (entree) {
			if (entree.isIntersecting) {
				var el = entree.target;
				el.classList.add('est-visible');
				observateur.unobserve(el);
				// Une fois arrivé, l'élément retrouve ses propres transitions (survols).
				setTimeout(function () {
					el.classList.remove('a-reveler', 'est-visible');
					el.style.removeProperty('--decalage');
				}, 1000);
			}
		});
	}, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
	aReveler.forEach(function (el) { observateur.observe(el); });
})();

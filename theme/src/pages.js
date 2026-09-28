// Contenu des pages en blocs natifs, repris de la maquette validée.
const { groupe: g, para: p, titre: t, image: img, bouton: b, boutons: bs, shortcode } = require('./blocs');

module.exports = function pages(BASE) {
  const U = chemin => `${BASE}${chemin}`;
  const CONTACT = U('/contact/');

  // ---------- Bloc contact partagé (accueil + page Contact) ----------
  const blocContact = g('contact__grille', [
    g('formulaire', [
      t(2, 'formulaire__titre', 'Formulaire de contact'),
      shortcode('{{FORMULAIRE}}'),
      g('rgpd', [
        p('rgpd__titre', 'Protection de vos données personnelles'),
        p('', "Les informations recueillies via ce formulaire sont enregistrées par l'AEPC Nouvelle-Aquitaine, association loi 1901, 51-53 boulevard du Président Wilson, 33000 Bordeaux, responsable du traitement, dans le seul but de répondre à votre demande. Base légale : votre consentement."),
        p('', "Destinataires : l'équipe de coordination de l'AEPC NA et, si nécessaire, les consultants mobilisés pour votre demande. Vos données ne sont ni cédées ni vendues à des tiers. Durée de conservation : 3 ans à compter du dernier contact."),
        p('', "Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation du traitement, ainsi que du droit de retirer votre consentement, en écrivant à <a href=\"mailto:contact@aepcna.fr\">contact@aepcna.fr</a>. Vous pouvez également adresser une réclamation à la CNIL (www.cnil.fr)."),
        p('', `Pour en savoir plus : <a href="${U('/declaration-de-confidentialite-ue/')}">Déclaration de confidentialité (UE)</a> · <a href="${U('/mentions-legales/')}">Mentions légales</a> · <a href="${U('/politique-de-cookies-ue-2/')}">Politique de cookies (UE)</a>`),
      ]),
    ]),
    g('contact__aside', [
      g('coordonnees', [
        img('photo-consultant-telephone', "Un membre de l'équipe de coordination au téléphone", 'coordonnees__photo', 'large'),
        g('coordonnees__corps', [
          t(2, 'coordonnees__titre', 'Nos coordonnées'),
          g('coordonnee a-icone a-icone--mini icone-lieu', g('', [p('coordonnee__libelle', 'Siège'), p('coordonnee__valeur', '51-53 boulevard du Président Wilson<br>33000 Bordeaux')])),
          g('coordonnee a-icone a-icone--mini icone-courriel', g('', [p('coordonnee__libelle', 'E-mail'), p('coordonnee__valeur', '<a href="mailto:contact@aepcna.fr">contact@aepcna.fr</a>')])),
          g('coordonnee a-icone a-icone--mini icone-telephone', g('', [p('coordonnee__libelle', 'Téléphone'), p('coordonnee__valeur', '<a href="tel:+33610501077">06 10 50 10 77</a>')])),
        ]),
      ]),
      g('encart-sombre', [
        p('surtitre', 'Vous êtes consultant ?'),
        t(3, 'encart-sombre__titre', "Rejoignez un collectif qui répond ensemble aux appels d'offres."),
        bs('', [b("Découvrir le parcours d'admission", CONTACT, 'bouton--blanc bouton--petit')]),
      ]),
    ]),
  ]);

  const role = (sigle, nom, desc, variante) => g('role', [
    p(`role__pastille${variante ? ' role__pastille--sarcelle' : ''}`, sigle),
    g('', [p('role__nom', nom), p('role__desc', desc)]),
  ]);
  const chiffre = (icone, valeur, libelle, sarcelle) => g(`chiffre a-icone ${icone}`, g('', [
    p(`chiffre__valeur${sarcelle ? ' chiffre__valeur--sarcelle' : ''}`, valeur),
    p('chiffre__libelle', libelle),
  ]));
  const carte = (etiquette, titre_, texte) => g('carte', [p('carte__etiquette', etiquette), t(3, 'carte__titre', titre_), p('carte__texte', texte)]);
  const atout = (icone, titre_, texte) => g(`atout a-icone a-icone--petite ${icone}`, [t(3, 'atout__titre', titre_), p('atout__texte', texte)]);
  const etape = (num, titre_, texte, active) => g(`etape${active ? ' etape--active' : ''}`, [p('etape__num', num), t(3, 'etape__titre', titre_), p('etape__texte', texte)]);
  const miniCarte = (titre_, texte) => g('mini-carte', [p('mini-carte__titre', titre_), p('mini-carte__texte', texte)]);
  const offre = (icone, titre_, texte) => g(`offre ${icone}`, [t(3, 'offre__titre', titre_), p('offre__texte', texte)]);
  const realisation = (photo, alt, etiquette, variante, titre_, texte) => g('realisation', [
    img(photo, alt, 'realisation__photo', 'large'),
    g('realisation__corps', [p(`realisation__etiquette${variante ? ' realisation__etiquette--' + variante : ''}`, etiquette), t(3, 'realisation__titre', titre_), p('realisation__texte', texte)]),
  ]);
  const garantie = (variante, badge, titre_, texte) => g(`garantie${variante ? ' garantie--' + variante : ''}`, [
    ...(badge ? [p('badge', 'En cours')] : []), t(3, 'garantie__titre', titre_), p('garantie__texte', texte),
  ]);

  const sectionEcosysteme =
    g('section', g('enveloppe pile ecosysteme', [
      g('entete-section', [
        p('surtitre', 'Écosystème'),
        t(2, 'titre-section', 'Un réseau de partenaires locaux et régionaux au service du territoire.'),
        p('chapeau', 'Nous nous appuyons sur des réseaux professionnels solides pour orienter chaque entreprise vers les bons dispositifs et les bonnes compétences.'),
      ]),
      g('grille-4', [
        g('logos__groupe logos__partenaires', [
          p('logos__libelle', 'Nos partenaires officiels'),
          g('logos__grille3', [
            img('logo-cpc-na', 'Chambre Professionnelle du Conseil Nouvelle-Aquitaine', 'logo-tuile'),
            img('logo-mpl-na', 'Maison des Professions Libérales Nouvelle-Aquitaine', 'logo-tuile logo-h64'),
            img('logo-cinov-na', 'Cinov Nouvelle-Aquitaine', 'logo-tuile logo-h96'),
          ]),
        ]),
        g('logos__groupe', [p('logos__libelle', 'Membre de'), img('logo-adi-na', 'ADI Nouvelle-Aquitaine', 'logo-tuile')]),
      ]),
      g('logos__groupe', [
        p('logos__libelle', 'Ils nous ont confié des missions'),
        g('grille-4 logos__clients', [
          img('logo-region-na', 'Région Nouvelle-Aquitaine', 'logo-tuile logo-tuile--basse'),
          img('logo-cma-na', "Chambre de Métiers et de l'Artisanat Nouvelle-Aquitaine", 'logo-tuile logo-tuile--basse logo-h72'),
          img('logo-ocapiat', 'OCAPIAT', 'logo-tuile logo-tuile--basse'),
          img('logo-ifria-na', 'IFRIA Nouvelle-Aquitaine', 'logo-tuile logo-tuile--basse logo-h64'),
        ]),
      ]),
    ]), { tag: 'section' });

  const sectionGaranties =
    g('section--blanc', g('enveloppe pile garanties', [
      t(2, 'titre-section', 'Nos engagements et garanties'),
      g('grille-4', [
        garantie('', false, 'Charte de déontologie', 'Partagée par tous nos membres et partenaires, avec formation continue obligatoire.'),
        garantie('verte', true, 'Labellisation RSE LUCIE', 'Label RSO dédié aux métiers du conseil : nous appliquons à nous-mêmes ce que nous recommandons.'),
        garantie('', true, 'Qualiopi', 'Certification qualité de nos actions de formation.'),
        garantie('bleue', false, 'Un cadre sécurisé', 'Vous contractez avec une association structurée : contrat unique, facturation unique, responsabilité claire.'),
      ]),
    ]), { tag: 'section' });

  const accueil = [
    // HERO
    g('hero', [
      img('photo-plateforme-logistique', '', 'hero__photo', 'full'),
      g('enveloppe', [
        p('surtitre', 'Territoires · Entreprises · Transitions'),
        t(1, 'hero__titre', 'Réussir votre programme de transformation en Nouvelle-Aquitaine'),
        g('hero__corps grille-2', [
          g('hero__texte', [
            p('hero__accroche', 'Les experts du conseil du territoire, une équipe de coordination dédiée à chaque mission.'),
            p('hero__intro', "L'AEPC Nouvelle-Aquitaine réunit plus de 50 consultants experts régionaux et place chaque projet sous la conduite d'une cellule de coordination : chef de projet, PMO et interlocuteur spécialiste. Un seul point de contact pour vous, des délais et une qualité tenus."),
            bs('hero__actions', [b('Confier un projet', CONTACT, 'bouton--sarcelle'), b('Découvrir notre méthode', '#methode', 'bouton--contour-blanc')]),
          ]),
          g('carte-equipe', [
            p('carte-equipe__titre', 'Votre équipe projet AEPC'),
            role('CP', 'Chef de projet', 'Votre interlocuteur unique, garant des engagements'),
            role('PMO', 'PMO', 'Planning, livrables, reporting et contrôle qualité'),
            role('IS', 'Interlocuteur spécialiste', 'Expertise métier : éco-finance, aéronautique, RSE…', true),
            p('carte-equipe__pied', '+ les consultants experts mobilisés selon votre filière'),
          ]),
        ]),
      ]),
    ], { tag: 'section' }),

    // CHIFFRES
    g('chiffres', g('enveloppe grille-4', [
      chiffre('icone-equipe', '50+', 'consultants experts régionaux'),
      chiffre('icone-valide', '1', 'équipe de coordination dédiée par projet', true),
      chiffre('icone-filieres', '15', 'filières couvertes'),
      chiffre('icone-lieu', '30 ans', "d'ancrage régional de la CPC NA", true),
    ]), { tag: 'section' }),

    // QUI SOMMES-NOUS
    g('section qui-section', g('enveloppe pile qui', [
      g('entete-section entete-section--large', [
        p('surtitre', 'Qui sommes-nous'),
        t(2, 'titre-section', "Notre raison d'être : aider les entreprises régionales à se transformer et à durer."),
        p('chapeau', "Transformation, performance, pérennité : nous mettons l'expertise d'un collectif régional au service des entreprises et des organisations qui font vivre la Nouvelle-Aquitaine."),
      ]),
      g('grille-4', [
        carte('Notre origine', 'Née de la volonté des consultants de la CPC NA', "Créée en 2023 pour que les consultants de la région puissent répondre ensemble aux appels d'offres, sans passer par de grands cabinets nationaux. Une émanation de la Chambre Professionnelle du Conseil, active depuis plus de 30 ans."),
        carte('Notre statut', 'Une association, pas un cabinet', "Association loi 1901 à but non lucratif : pas d'actionnaire à rémunérer, une seule finalité, la réussite de vos projets et du territoire."),
        carte('Notre ancrage', 'Des experts qui vivent ici', 'Plus de 50 consultants experts régionaux qui connaissent les filières, les cultures locales et les entreprises de chaque bassin.'),
        carte('Notre différence', 'Un collectif piloté', 'Une équipe de coordination dédiée à chaque projet, des experts choisis pour vos enjeux et une charte de déontologie commune.'),
      ]),
      g('competences', [
        g('competences__entete', [t(3, 'competences__titre', 'Des compétences à 360°'), p('competences__sous-titre', 'mobilisables seules ou en équipe pluridisciplinaire')]),
        g('puces', [
          ...['Stratégie', "Pilotage d'entreprise", 'Modèles économiques', 'Ressources humaines', 'Management', 'Performance industrielle', 'Lean', 'Transformation', 'IT &amp; numérique', 'RSE', 'Formation'].map(x => p('puce', x)),
          p('puce puce--ouverte', "et bien d'autres…"),
        ]),
      ]),
    ]), { tag: 'section', ancre: 'qui' }),

    // CONSULTANTS
    g('section--sombre', g('enveloppe pile consultants', [
      g('consultants__entete', [
        g('entete-section', [
          p('surtitre', 'Nos consultants'),
          t(2, 'titre-section', 'Pourquoi choisir nos consultants ?'),
          p('chapeau', 'Plus de 50 experts régionaux, indépendants et engagés, réunis dans un collectif qui garantit leur sérieux.'),
        ]),
        g('consultants__droite', [
          g('portraits', [
            img('portrait-1', "Portrait d'Angélique", '', 'thumbnail'),
            img('portrait-2', 'Portrait de Pascal', '', 'thumbnail'),
            img('portrait-3', "Portrait d'Estelle", '', 'thumbnail'),
            img('portrait-4', "Portrait d'Éric", '', 'thumbnail'),
            img('portrait-5', "Portrait d'Audrey", '', 'thumbnail'),
            img('portrait-6', 'Portrait de Jérôme', '', 'thumbnail'),
            p('portraits__plus', '+50'),
          ]),
          bs('', [b('Découvrir nos consultants', U('/nos-consultants/'), 'bouton--blanc')]),
        ]),
      ]),
      g('grille-3', [
        atout('icone-etoile', 'Compétences spécifiques', 'Chaque consultant apporte une expertise unique, pour des conseils et des solutions adaptés à vos problématiques.'),
        atout('icone-bouclier', 'Expérience et fiabilité', 'Nos membres possèdent une expérience solide et une réputation de fiabilité reconnue dans leurs secteurs respectifs.'),
        atout('icone-cible', 'Approche personnalisée', "Nous mettons un point d'honneur à comprendre vos besoins spécifiques pour vous proposer des solutions sur mesure."),
      ]),
      p('note-sombre', "Portraits publiés avec l'accord des consultants — la page « Nos consultants » présente chaque profil (expertises, filières, zone d'intervention)"),
    ]), { tag: 'section', ancre: 'consultants' }),

    // MÉTHODE
    g('section', g('enveloppe pile methode', [
      g('entete-section', [
        p('surtitre', 'Notre méthode'),
        t(2, 'titre-section', 'Pas un consultant isolé : une mission pilotée de bout en bout.'),
        p('chapeau', "Chaque projet confié à l'AEPC est porté par une cellule de coordination dédiée. Elle compose l'équipe d'experts, suit l'avancement, contrôle les livrables et rend compte au donneur d'ordre."),
      ]),
      g('etapes', [
        etape('01 · Vous', "Le donneur d'ordre", 'Région, collectivité, OPCO, chambre consulaire ou entreprise : vous fixez les objectifs.'),
        etape('02 · La cellule AEPC', 'Coordination dédiée', 'Chef de projet, PMO, interlocuteur spécialiste : pilotage, reporting, qualité, suivi administratif et financier.', true),
        etape('03 · Les experts', 'Consultants mobilisés', 'Choisis selon la filière et la proximité géographique, liés par une charte de déontologie commune.'),
        etape('04 · Le territoire', 'Entreprises accompagnées', 'Des interventions sur site, des résultats mesurés et un bilan partagé avec vous.'),
      ]),
      g('exemple', [
        g('exemple__bandeau', [
          g('', [p('surtitre', 'Exemple concret · Région Nouvelle-Aquitaine'), t(3, 'exemple__titre', 'Usine du Futur 4 : 30 experts coordonnés sur toute la région')]),
          img('logo-usine-du-futur', 'Usine du Futur Nouvelle-Aquitaine', 'exemple__logo'),
        ]),
        g('exemple__corps grille-2', [
          g('', [p('exemple__rubrique', 'La cellule de coordination'), g('exemple__roles', [
            miniCarte('Chef de projet', 'Pilotage et relation avec la Région'),
            miniCarte('PMO', 'Missions, livrables, échéances'),
            miniCarte('Spécialistes', 'Éco-Finance et AeroExcellence'),
          ])]),
          g('', [p('exemple__rubrique', 'Le programme'), p('exemple__texte', "Programme de la Région Nouvelle-Aquitaine pour accompagner les PME et ETI industrielles vers l'usine de demain. L'AEPC NA, lauréate en 2024 et reconduite en 2026, coordonne 30 experts intervenant sur l'ensemble de la région.")]),
        ]),
      ]),
    ]), { tag: 'section', ancre: 'methode' }),

    // TERRITOIRE
    g('section section--blanc territoire', g('enveloppe grille-2', [
      g('territoire__texte', [
        p('surtitre', 'Maillage territorial'),
        t(2, 'titre-section', 'Nous vivons ici. Nous connaissons vos entreprises.'),
        p('chapeau', 'Nos consultants vivent et travaillent en Nouvelle-Aquitaine. Ils connaissent les tissus économiques locaux, les particularités culturelles de chaque bassin et les dirigeants qui les font vivre. Résultat : des interventions de proximité, moins de déplacements, et une compréhension immédiate de votre contexte.'),
      ]),
      g('carte-region', [
        img('carte-nouvelle-aquitaine', 'Carte de la Nouvelle-Aquitaine : siège à Bordeaux, consultants présents dans les douze départements', '', 'full'),
        p('legende', "Plus de 50 consultants experts présents sur l'ensemble de la région"),
      ]),
    ]), { tag: 'section', ancre: 'territoire' }),

    sectionEcosysteme,

    // OFFRES
    g('section section--blanc', g('enveloppe pile offres', [
      g('entete-section entete-section--etroite', [p('surtitre', 'Nos offres'), t(2, 'titre-section', 'Quatre domaines, une même exigence de pilotage.')]),
      g('grille-4', [
        offre('icone-usine', 'Performance industrielle &amp; Usine du Futur', 'Diagnostic, Lean, organisation de production, financement de la modernisation.'),
        offre('icone-pousse', 'Transition RSE — Actionnable', 'Parcours référencé par la Région (Néo Terra), en partenariat avec le syndicat Cinov Nouvelle-Aquitaine.'),
        offre('icone-formation', 'Formation professionnelle', 'Négociation commerciale, management, intelligence artificielle : des formateurs praticiens.'),
        offre('icone-strategie', 'Stratégie &amp; nouveaux modèles économiques', 'Transformation des organisations, économie de la fonctionnalité, écologie industrielle.'),
      ]),
    ]), { tag: 'section', ancre: 'offres' }),

    // RÉALISATIONS
    g('section', g('enveloppe pile realisations', [
      g('entete-section entete-section--etroite', [p('surtitre', 'Réalisations'), t(2, 'titre-section', 'Des programmes régionaux confiés à notre collectif.')]),
      g('grille-3', [
        realisation('photo-robots-industriels', 'Robots industriels sur une ligne de production', 'Région Nouvelle-Aquitaine · depuis 2024', '', 'Usine du Futur 4', "Coordination de 30 experts sur l'ensemble de la région, par une cellule dédiée : chef de projet, PMO, spécialistes Éco-Finance et AeroExcellence."),
        realisation('photo-reunion-travail', "Atelier de travail autour d'un ordinateur", 'AMI RSE Région · 2026', 'vert', 'Actionnable', 'Parcours RSE retenu par la Région et référencé Néo Terra pour trois ans, avec le syndicat Cinov Nouvelle-Aquitaine.'),
        realisation('photo-ligne-agroalimentaire', "Ligne de conditionnement dans l'agroalimentaire", 'CMA · OCAPIAT–IFRIA', 'sarcelle', 'Négociation commerciale', "Marchés de formation triennaux remportés collectivement pour les artisans et l'agroalimentaire."),
      ]),
    ]), { tag: 'section', ancre: 'realisations' }),

    sectionGaranties,

    // CONTACT
    g('section', g('enveloppe pile contact', [
      g('entete-section', [
        p('surtitre', 'Nous contacter'),
        t(2, 'titre-section', 'Parlons de votre projet.'),
        p('chapeau', "Entreprise, collectivité, financeur ou consultant : décrivez-nous votre besoin, l'équipe de coordination vous répond et vous oriente vers les bons experts."),
      ]),
      blocContact,
    ]), { tag: 'section', ancre: 'contact' }),
  ].join('\n\n');

  const contact = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Contact`),
      p('surtitre', 'Nous contacter'),
      t(1, 'bandeau-page__titre', 'Parlons de votre projet.'),
      p('chapeau', "Entreprise, collectivité, financeur ou consultant : décrivez-nous votre besoin, l'équipe de coordination vous répond et vous oriente vers les bons experts."),
    ]), { tag: 'section' }),
    g('section contact-page', g('enveloppe', blocContact), { tag: 'section' }),
  ].join('\n\n');

  // ---------- Nos consultants ----------
  const nosConsultants = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Nos consultants`),
      p('surtitre', 'Nos consultants'),
      t(1, 'bandeau-page__titre', 'Des experts à votre service.'),
      p('chapeau', "L'AEPC NA regroupe des consultants hautement qualifiés et expérimentés dans divers domaines. Chaque membre est sélectionné pour son expertise spécifique et son engagement à fournir des solutions de qualité."),
    ]), { tag: 'section' }),

    g('chiffres', g('enveloppe grille-4', [
      chiffre('icone-equipe', '50+', 'consultants experts régionaux'),
      chiffre('icone-lieu', '30 ans', "d'ancrage régional de la CPC NA", true),
      chiffre('icone-filieres', '15', 'filières couvertes'),
      chiffre('icone-bouclier', '1', 'charte de déontologie commune', true),
    ]), { tag: 'section' }),

    g('section--sombre', g('enveloppe pile consultants', [
      g('consultants__entete', [
        g('entete-section', [
          p('surtitre', 'Pourquoi nous choisir'),
          t(2, 'titre-section', 'Pourquoi choisir nos consultants ?'),
          p('chapeau', 'Des experts régionaux, indépendants et engagés, réunis dans un collectif qui garantit leur sérieux.'),
        ]),
        g('consultants__droite', [
          g('portraits', [
            img('portrait-1', "Portrait d'Angélique", '', 'thumbnail'),
            img('portrait-2', 'Portrait de Pascal', '', 'thumbnail'),
            img('portrait-3', "Portrait d'Estelle", '', 'thumbnail'),
            img('portrait-4', "Portrait d'Éric", '', 'thumbnail'),
            img('portrait-5', "Portrait d'Audrey", '', 'thumbnail'),
            img('portrait-6', 'Portrait de Jérôme', '', 'thumbnail'),
            p('portraits__plus', '+50'),
          ]),
        ]),
      ]),
      g('grille-3', [
        atout('icone-etoile', 'Compétences spécifiques', 'Chaque consultant apporte une expertise unique, pour des conseils et des solutions adaptés à vos problématiques.'),
        atout('icone-bouclier', 'Expérience et fiabilité', 'Nos membres possèdent une expérience solide et une réputation de fiabilité reconnue dans leurs secteurs respectifs.'),
        atout('icone-cible', 'Approche personnalisée', "Nous mettons un point d'honneur à comprendre vos besoins spécifiques pour vous proposer des solutions sur mesure."),
      ]),
    ]), { tag: 'section' }),

    g('section section--blanc', g('enveloppe pile qui', [
      g('entete-section', [
        p('surtitre', "Domaines d'intervention"),
        t(2, 'titre-section', 'Une large gamme de compétences, mobilisables seules ou en équipe.'),
        p('chapeau', "Nos consultants couvrent l'ensemble des besoins des entreprises et des organisations, de la stratégie à la mise en œuvre."),
      ]),
      g('competences', [
        g('competences__entete', [t(3, 'competences__titre', 'Des compétences à 360°'), p('competences__sous-titre', 'et bien d\'autres expertises au sein du collectif')]),
        g('puces', [
          ...["Stratégie d'entreprise", "Pilotage d'entreprise", 'Modèles économiques', 'Marketing et communication', 'Ressources humaines', 'Management', 'Finance et comptabilité', 'Performance industrielle', 'Lean', 'Transformation', 'IT &amp; numérique', 'RSE et développement durable', 'Formation'].map(x => p('puce', x)),
        ]),
      ]),
    ]), { tag: 'section' }),

    g('section', g('enveloppe pile qui', [
      g('entete-section', [
        p('surtitre', 'Un collectif encadré'),
        t(2, 'titre-section', 'Des indépendants, un cadre commun.'),
      ]),
      g('grille-3', [
        carte('Notre origine', 'Tous issus de la CPC NA', "Nos consultants sont membres de la Chambre Professionnelle du Conseil de Nouvelle-Aquitaine, première instance représentative des consultants indépendants de la région depuis plus de 30 ans."),
        carte('Notre exigence', 'Une charte de déontologie', 'Partagée par tous nos membres et partenaires, avec formation continue obligatoire. Démarches Qualiopi et labellisation RSE LUCIE engagées.'),
        carte('Notre méthode', 'Une coordination dédiée', "Pour chaque mission, une cellule de coordination compose l'équipe d'experts selon la filière et la proximité géographique, suit l'avancement et contrôle les livrables."),
      ]),
      g('encart-sombre encart-sombre--large', [
        g('', [
          p('surtitre', 'Vous cherchez un expert ?'),
          t(3, 'encart-sombre__titre', "Décrivez votre besoin : l'équipe de coordination identifie les consultants adaptés à votre projet."),
        ]),
        bs('', [b('Parlons de votre projet', CONTACT, 'bouton--blanc')]),
      ]),
    ]), { tag: 'section' }),
  ].join('\n\n');

  // ---------- Qui sommes-nous ----------
  const valeur = (icone, titre_, texte) => g(`atout a-icone a-icone--petite ${icone}`, [t(3, 'atout__titre', titre_), p('atout__texte', texte)]);
  const quiSommesNous = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Qui sommes-nous`),
      p('surtitre', "L'association"),
      t(1, 'bandeau-page__titre', 'Qui sommes-nous ?'),
      p('chapeau', "Créée en 2023, l'AEPC Nouvelle-Aquitaine est une association loi 1901 à but non lucratif qui regroupe des consultants issus de la Chambre Professionnelle du Conseil de Nouvelle-Aquitaine, pour réaliser des actions collectives auprès des acteurs économiques de la région."),
    ]), { tag: 'section' }),

    g('chiffres', g('enveloppe grille-4', [
      chiffre('icone-valide', '2023', "création de l'association"),
      chiffre('icone-lieu', '30 ans', "d'ancrage régional de la CPC NA", true),
      chiffre('icone-equipe', '50+', 'consultants experts régionaux'),
      chiffre('icone-filieres', '15+', 'filières sectorielles', true),
    ]), { tag: 'section' }),

    g('section qui-section', g('enveloppe pile qui', [
      g('entete-section entete-section--large', [
        p('surtitre', 'Notre mission'),
        t(2, 'titre-section', 'Aider les entreprises régionales à se transformer et à durer.'),
        p('chapeau', "L'AEPC est l'émanation économique de la CPC Nouvelle-Aquitaine. Ses membres l'ont créée pour répondre ensemble aux appels d'offres, sans passer par de grands cabinets nationaux : l'association leur apporte un cadre juridique, technique et outillé."),
      ]),
      g('grille-3', [
        carte('Notre origine', 'La CPC Nouvelle-Aquitaine', "Depuis plus de 30 ans, la Chambre Professionnelle du Conseil est la première instance représentative des consultants indépendants de la région, membre de la FNCPC."),
        carte('Notre statut', 'Une association, pas un cabinet', "Pas d'actionnaire à rémunérer : une seule finalité, la réussite de vos projets et la pérennité des entreprises du territoire."),
        carte('Notre équipe', 'Une coordination salariée', "Une équipe salariée assure la coordination des programmes : chef de projet, PMO et interlocuteur spécialiste pour chaque mission."),
      ]),
    ]), { tag: 'section' }),

    g('section--sombre', g('enveloppe pile consultants', [
      g('entete-section', [
        p('surtitre', 'Nos valeurs'),
        t(2, 'titre-section', 'Ce qui nous engage.'),
      ]),
      g('grille-3', [
        valeur('icone-bouclier', 'Professionnalisme', 'Nous respectons la charte de déontologie de la CPC et appliquons une formation continue obligatoire à nos membres.'),
        valeur('icone-equipe', 'Collaboration', "Le collectif dans les missions et le partage de connaissances par l'entraide sont au cœur de notre association."),
        valeur('icone-pousse', 'Innovation', 'Nous accompagnons la transition de nos membres, comme de nos clients, vers des modèles économiques plus durables.'),
      ]),
    ]), { tag: 'section' }),

    g('section section--blanc', g('enveloppe pile qui', [
      g('entete-section', [
        p('surtitre', 'Pourquoi travailler avec nous'),
        t(2, 'titre-section', 'Un collectif pluridisciplinaire, présent sur toute la région.'),
      ]),
      g('grille-3', [
        carte('Pluridisciplinaire', 'Des consultants qui travaillent en équipe', 'Répartis sur toute la région, nos consultants savent travailler ensemble pour optimiser le temps et les solutions apportées à vos problématiques.'),
        carte('Expertise', 'Des compétences pointues', 'Nos membres sont experts dans leurs domaines respectifs et proposent des solutions personnalisées et efficaces.'),
        carte('Engagement', 'Dévoués à vos projets', 'Une équipe de coordination dédiée, un seul point de contact, des délais et une qualité tenus.'),
      ]),
      g('competences', [
        g('competences__entete', [t(3, 'competences__titre', 'Un réseau multisectoriel'), p('competences__sous-titre', 'des professionnels de plus de 15 filières')]),
        g('puces', [
          ...['Agroalimentaire', 'Bois', 'Aéronautique', 'Défense', 'Numérique et cybersécurité', 'Métallurgie', 'Traitement des déchets', 'BTP', 'Chimie', 'Plasturgie', 'Environnement', "Services à l'industrie"].map(x => p('puce', x)),
          p('puce puce--ouverte', "et bien d'autres…"),
        ]),
      ]),
    ]), { tag: 'section' }),

    sectionEcosysteme,

    sectionGaranties,

    g('section', g('enveloppe', [
      g('encart-sombre encart-sombre--large', [
        g('', [
          p('surtitre', 'Notre ambition'),
          t(3, 'encart-sombre__titre', "Devenir le champion de l'écologie industrielle sur le territoire, et accompagner les transitions vers des modèles économiques et organisationnels plus pérennes."),
        ]),
        bs('', [b('Parlons de votre projet', CONTACT, 'bouton--blanc')]),
      ]),
    ]), { tag: 'section' }),
  ].join('\n\n');

  return [
    { slug: 'qui-sommes-nous', title: 'Qui sommes-nous ?', content: quiSommesNous,
      description: "L'AEPC Nouvelle-Aquitaine, association loi 1901 émanation de la CPC NA, fédère des consultants experts régionaux pour accompagner la transformation des entreprises du territoire." },
    { slug: 'nos-consultants', title: 'Nos consultants', content: nosConsultants,
      description: "Plus de 50 consultants experts régionaux, indépendants et engagés, réunis dans le collectif de l'AEPC Nouvelle-Aquitaine." },
    { slug: 'accueil', title: 'Accueil', content: accueil,
      description: "L'AEPC Nouvelle-Aquitaine réunit plus de 50 consultants experts régionaux et place chaque projet sous la conduite d'une équipe de coordination dédiée." },
    { slug: 'contact', title: 'Contact', content: contact,
      description: "Entreprise, collectivité, financeur ou consultant : décrivez votre besoin, l'équipe de coordination de l'AEPC Nouvelle-Aquitaine vous répond." },
  ];
};

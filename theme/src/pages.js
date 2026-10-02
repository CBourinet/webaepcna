// Contenu des pages en blocs natifs, repris de la maquette validée.
const { groupe: g, para: p, titre: t, image: img, bouton: b, boutons: bs, liste, shortcode } = require('./blocs');

module.exports = function pages(BASE) {
  const U = chemin => `${BASE}${chemin}`;
  const CONTACT = U('/contact/');
  const ADHERER = U('/adherer/');
  const CHAPEAU_CONTACT = "Entreprise, collectivité, filière ou financeur : décrivez-nous votre enjeu. L'équipe de coordination vous répond et constitue l'équipe d'experts adaptée à votre projet.";

  // ---------- Bloc contact partagé (accueil + page Contact) ----------
  const blocContact = g('contact__grille', [
    g('formulaire', [
      t(2, 'formulaire__titre', 'Formulaire de contact'),
      shortcode('{{FORMULAIRE}}'),
      g('rgpd', [
        p('rgpd__titre', 'Protection de vos données personnelles'),
        p('', "Les informations recueillies via ce formulaire sont enregistrées par l'AEPC Nouvelle-Aquitaine, association loi 1901, 51-53 boulevard du Président Wilson, 33000 Bordeaux, responsable du traitement, dans le seul but de répondre à votre demande. Base légale : votre consentement."),
        p('', "Destinataires : l'équipe de coordination de l'AEPC NA et, si nécessaire, les consultants mobilisés pour votre demande. Vos données ne sont ni cédées ni vendues à des tiers. Durée de conservation : 3 ans à compter du dernier contact."),
        p('', "Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation du traitement, ainsi que du droit de retirer votre consentement, en écrivant à <a href=\"mailto:rgpd@aepcna.fr\">rgpd@aepcna.fr</a>. Vous pouvez également adresser une réclamation à la CNIL (www.cnil.fr)."),
        p('', `Pour en savoir plus : <a href="${U('/declaration-de-confidentialite-ue/')}">Déclaration de confidentialité (UE)</a> · <a href="${U('/mentions-legales/')}">Mentions légales</a> · <a href="${U('/politique-de-cookies-ue-2/')}">Politique de cookies (UE)</a>`),
      ]),
    ]),
    g('contact__aside', [
      g('coordonnees', [
        img('photo-consultant-telephone', "Un membre de l'équipe de coordination au téléphone", 'coordonnees__photo', 'large'),
        g('coordonnees__corps', [
          t(2, 'coordonnees__titre', 'Nos coordonnées'),
          g('coordonnee a-icone a-icone--mini icone-lieu', g('', [p('coordonnee__libelle', 'Siège'), p('coordonnee__valeur', '51-53 boulevard du Président Wilson<br>33000 Bordeaux')])),
          g('coordonnee a-icone a-icone--mini icone-telephone', g('', [p('coordonnee__libelle', 'Téléphone'), p('coordonnee__valeur', '<a href="tel:+33610501077">06 10 50 10 77</a>')])),
        ]),
      ]),
      g('encart-sombre', [
        p('surtitre', 'Vous êtes consultant ?'),
        t(3, 'encart-sombre__titre', "Rejoignez un collectif qui répond ensemble aux appels d'offres."),
        bs('', [b("Rejoindre l'AEPC", ADHERER, 'bouton--blanc bouton--petit')]),
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
  const offre = (icone, public_, titre_, texte, ancre, pme) => g(`offre ${icone}`, [p(`offre__public${pme ? ' offre__public--pme' : ''}`, public_), t(3, 'offre__titre', titre_), p('offre__texte', texte), p('offre__lien', `<a href="${U('/solutions/#' + ancre)}">${pme ? 'Voir le parcours' : 'Voir un exemple'} →</a>`)]);
  const pilier = (icone, titre_, texte) => g(`atout atout--bord a-icone a-icone--petite ${icone}`, [t(3, 'atout__titre', titre_), p('atout__texte', texte)]);
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
            img('logo-cpc-na', 'Chambre Professionnelle du Conseil Nouvelle-Aquitaine', 'logo-tuile', 'full', 'https://www.cpcna.org/'),
            img('logo-mpl-na', 'Maison des Professions Libérales Nouvelle-Aquitaine', 'logo-tuile logo-h64', 'full', 'https://www.araplna.org/'),
            img('logo-cinov-na', 'Cinov Nouvelle-Aquitaine', 'logo-tuile logo-h96', 'full', 'https://www.cinov.fr/regions/nouvelle-aquitaine'),
          ]),
        ]),
        g('logos__groupe', [p('logos__libelle', 'Membre de'), img('logo-adi-na', 'ADI Nouvelle-Aquitaine', 'logo-tuile', 'full', 'https://www.adi-na.fr/')]),
      ]),
      g('logos__groupe', [
        p('logos__libelle', 'Ils nous ont confié des missions'),
        g('grille-4 logos__clients', [
          img('logo-region-na', 'Région Nouvelle-Aquitaine', 'logo-tuile logo-tuile--basse', 'full', 'https://les-aides.nouvelle-aquitaine.fr/transition-energetique-et-ecologique/usine-du-futur-agissons-aujourd-hui-pour-une-industrie-durable-et-competitive'),
          img('logo-cma-na', "Chambre de Métiers et de l'Artisanat Nouvelle-Aquitaine", 'logo-tuile logo-tuile--basse logo-h72', 'full', 'https://cma-nouvelleaquitaine.fr/'),
          img('logo-ocapiat', 'OCAPIAT', 'logo-tuile logo-tuile--basse', 'full', 'https://www.ocapiat.fr/'),
          img('logo-ifria-na', 'IFRIA Nouvelle-Aquitaine', 'logo-tuile logo-tuile--basse logo-h64', 'full', 'https://www.ifria.fr/'),
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
    // HERO — que faisons-nous, pour qui (point 3) ; promesse (point 1)
    g('hero', [
      img('photo-plateforme-logistique', '', 'hero__photo', 'full'),
      g('enveloppe', [
        p('surtitre', 'Territoires · Entreprises · Transitions'),
        t(1, 'hero__titre', 'Réussir votre programme de transformation en Nouvelle-Aquitaine'),
        g('hero__corps grille-2', [
          g('hero__texte', [
            p('hero__accroche', "La rigueur d'un cabinet, l'agilité des indépendants, l'ancrage du territoire."),
            p('hero__intro', "Nous constituons et pilotons l'équipe de consultants adaptée à votre projet : plus de 50 experts indépendants de la région, une cellule de coordination dédiée et un interlocuteur unique. Pour les ETI, les grands groupes, les filières et les acteurs publics de Nouvelle-Aquitaine, avec un parcours RSE dédié aux PME."),
            bs('hero__actions', [b('Échanger sur mon projet', CONTACT, 'bouton--sarcelle'), b('Découvrir notre modèle', '#modele', 'bouton--contour-blanc')]),
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

    // CHIFFRES — la preuve d'emblée (points 3 et 4)
    g('chiffres', g('enveloppe grille-4', [
      chiffre('icone-equipe', '50+', 'consultants experts indépendants'),
      chiffre('icone-usine-s', '150+', 'entreprises industrielles accompagnées (Usine du Futur 4)', true),
      chiffre('icone-filieres', '15', 'filières couvertes'),
      chiffre('icone-valide', '1', 'équipe de coordination dédiée par mission', true),
    ]), { tag: 'section' }),

    // POURQUOI L'AEPC — la différence (points 1 et 2)
    g('section', g('enveloppe pile pourquoi', [
      g('entete-section entete-section--large', [
        p('surtitre', "Pourquoi l'AEPC"),
        t(2, 'titre-section', "On ne choisit pas l'AEPC pour un expert, mais pour la qualité d'un collectif."),
        p('chapeau', "Vous accédez à plus de 50 spécialistes indépendants de la région sans avoir à les chercher, les sélectionner ni les coordonner : l'AEPC constitue l'équipe, pilote la mission et s'engage sur les délais et la qualité."),
      ]),
      g('grille-3', [
        pilier('icone-bouclier', "La rigueur d'un cabinet", 'Une cellule de coordination dédiée — chef de projet, PMO, interlocuteur spécialiste —, un reporting régulier, un contrat et une facturation uniques.'),
        pilier('icone-equipe', "L'agilité des indépendants", 'Une équipe d’experts indépendants composée pour votre problématique, pluridisciplinaire si besoin, sans la lourdeur d’une grande structure.'),
        pilier('icone-lieu', "L'ancrage du territoire", 'Des consultants qui vivent et travaillent en Nouvelle-Aquitaine, au plus près de vos sites, de vos filières et de vos interlocuteurs.'),
      ]),
      g('equation', [
        t(3, 'equation__titre', 'Un modèle différent du cabinet traditionnel'),
        g('equation__ligne', [
          p('equation__terme', '50+ experts indépendants'),
          p('equation__plus', '+'),
          p('equation__terme', 'une gouvernance de mission unique'),
          p('equation__plus', '+'),
          p('equation__terme', 'un interlocuteur unique'),
        ]),
        p('equation__note', "Une association loi 1901 à but non lucratif, émanation de la CPC Nouvelle-Aquitaine : pas d'actionnaire à rémunérer, une seule finalité, la réussite de votre projet."),
      ]),
    ]), { tag: 'section', ancre: 'modele' }),

    // RÉALISATIONS — ce que nous avons déjà réussi (points 3 et 4)
    g('section section--blanc', g('enveloppe pile realisations', [
      g('entete-section entete-section--etroite', [p('surtitre', 'Réalisations'), t(2, 'titre-section', 'Des programmes régionaux confiés à notre collectif.')]),
      g('grille-3', [
        realisation('photo-robots-industriels', 'Robots industriels sur une ligne de production', 'Région Nouvelle-Aquitaine · depuis 2024', '', 'Usine du Futur 4', "<strong>Plus de 150 entreprises industrielles accompagnées</strong> par 30 experts coordonnés sur l'ensemble de la région, avec une cellule dédiée (chef de projet, PMO, spécialiste Éco-Finance) et des consultants labellisés AeroExcellence sur la filière aéronautique."),
        realisation('photo-reunion-travail', "Atelier de travail autour d'un ordinateur", 'AMI RSE Région · 2026', 'vert', 'Actionnable', 'Parcours RSE retenu par la Région et référencé Néo Terra pour un an renouvelable, avec le syndicat Cinov Nouvelle-Aquitaine.'),
        realisation('photo-ligne-agroalimentaire', "Ligne de conditionnement dans l'agroalimentaire", 'CMA · OCAPIAT–IFRIA', 'sarcelle', 'Négociation commerciale', "Marchés de formation triennaux remportés collectivement pour les artisans et l'agroalimentaire."),
      ]),
    ]), { tag: 'section', ancre: 'realisations' }),

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
        etape('03 · Les experts', 'L’équipe d’experts', 'Composée selon la filière et la proximité géographique, liée par une charte de déontologie commune.'),
        etape('04 · Le territoire', 'Entreprises accompagnées', 'Des interventions sur site, des résultats mesurés et un bilan partagé avec vous.'),
      ]),
      g('exemple', [
        g('exemple__bandeau', [
          g('', [p('surtitre', 'Exemple concret · Région Nouvelle-Aquitaine'), t(3, 'exemple__titre', 'Usine du Futur 4 : plus de 150 entreprises industrielles accompagnées')]),
          img('logo-usine-du-futur', 'Usine du Futur Nouvelle-Aquitaine', 'exemple__logo'),
        ]),
        g('exemple__corps grille-2', [
          g('', [p('exemple__rubrique', 'La cellule de coordination'), g('exemple__roles', [
            miniCarte('Chef de projet', 'Pilotage et relation avec la Région'),
            miniCarte('PMO', 'Missions, livrables, échéances'),
            miniCarte('Spécialistes', 'Éco-Finance, et consultants labellisés AeroExcellence pour l’aéronautique'),
          ])]),
          g('', [p('exemple__rubrique', 'Le programme'), p('exemple__texte', "Programme de la Région Nouvelle-Aquitaine pour accompagner les PME et ETI industrielles vers l'usine de demain. L'AEPC NA, lauréate en 2024 et reconduite en 2026, coordonne 30 experts intervenant sur l'ensemble de la région : plus de 150 entreprises industrielles accompagnées.")]),
        ]),
      ]),
    ]), { tag: 'section', ancre: 'methode' }),

    // SOLUTIONS (point 7) — synthèse, le détail est sur la page Solutions
    g('section section--blanc', g('enveloppe pile offres', [
      g('entete-section', [p('surtitre', 'Nos solutions'), t(2, 'titre-section', 'Quatre domaines, une même exigence de pilotage.'), p('chapeau', 'Des exemples de projets menés pour des ETI, des grands groupes, des filières et des acteurs publics, et un parcours RSE dédié aux PME.')]),
      g('grille-4', [
        offre('icone-usine', 'Programmes et filières', 'Performance industrielle &amp; Usine du Futur', 'Programmes régionaux et de filière : diagnostics, Lean, modernisation, jusqu’à 30 experts coordonnés.', 'performance-industrielle'),
        offre('icone-formation', 'ETI, groupes, OPCO', 'Programmes de formation', 'Des formations d’envergure mobilisant plus de cinq formateurs praticiens, coordonnés par une équipe unique.', 'formation'),
        offre('icone-strategie', 'ETI, groupes, filières', 'Stratégie &amp; transformation', 'Des transformations menées par une équipe pluridisciplinaire, sur plusieurs entités ou sites.', 'strategie-transformation'),
        offre('icone-pousse', 'Parcours PME', 'Trajectoire RSE — Actionnable', 'Le parcours RSE des PME, référencé par la Région (Néo Terra) : l’équipe projet vous conseille et vous aide dans votre projet.', 'trajectoire-rse', true),
      ]),
      bs('', [b('Voir toutes nos solutions', U('/solutions/'), 'bouton--contour')]),
    ]), { tag: 'section', ancre: 'offres' }),

    // LE COLLECTIF
    g('section--sombre', g('enveloppe pile consultants', [
      g('consultants__entete', [
        g('entete-section', [
          p('surtitre', 'Le collectif'),
          t(2, 'titre-section', 'Des experts indépendants, un même niveau d’exigence.'),
          p('chapeau', 'Plus de 50 consultants régionaux, issus de la CPC Nouvelle-Aquitaine, liés par une charte de déontologie commune et formés en continu.'),
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
          bs('', [b('Découvrir le collectif', U('/nos-consultants/'), 'bouton--blanc')]),
        ]),
      ]),
      g('grille-3', [
        atout('icone-etoile', 'Des compétences complémentaires', 'Chaque équipe réunit les expertises complémentaires dont votre projet a besoin, pour des solutions adaptées à vos problématiques.'),
        atout('icone-bouclier', 'Expérience et fiabilité', 'Nos membres possèdent une expérience solide et une réputation de fiabilité reconnue dans leurs secteurs respectifs.'),
        atout('icone-cible', 'Approche personnalisée', "Nous mettons un point d'honneur à comprendre vos besoins spécifiques pour vous proposer des solutions sur mesure."),
      ]),
      p('note-sombre', "Portraits publiés avec l'accord des consultants."),
    ]), { tag: 'section', ancre: 'consultants' }),

    // TERRITOIRE
    g('section section--blanc territoire', g('enveloppe grille-2', [
      g('territoire__texte', [
        p('surtitre', 'Maillage territorial'),
        t(2, 'titre-section', 'Nous vivons ici. Nous connaissons vos entreprises.'),
        p('chapeau', 'Nos consultants vivent et travaillent en Nouvelle-Aquitaine. Ils connaissent les tissus économiques locaux, les particularités culturelles de chaque bassin et les dirigeants qui les font vivre. Résultat : des interventions de proximité, moins de déplacements, et une compréhension immédiate de votre contexte.'),
      ]),
      g('carte-region', [
        img('carte-nouvelle-aquitaine', 'Carte de la Nouvelle-Aquitaine : siège à Bordeaux, consultants présents dans les douze départements', '', 'full'),
        p('legende', "Plus de 50 consultants experts présents sur l'ensemble de la région : Bordeaux, La Rochelle, Poitiers, Niort, Angoulême, Limoges, Guéret, Tulle, Périgueux, Agen, Mont-de-Marsan, Pau et Bayonne."),
      ]),
    ]), { tag: 'section', ancre: 'territoire' }),

    sectionEcosysteme,

    sectionGaranties,

    // CONTACT
    g('section', g('enveloppe pile contact', [
      g('entete-section', [
        p('surtitre', 'Nous contacter'),
        t(2, 'titre-section', 'Échangeons sur votre projet.'),
        p('chapeau', CHAPEAU_CONTACT),
      ]),
      blocContact,
    ]), { tag: 'section', ancre: 'contact' }),
  ].join('\n\n');

  const contact = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Contact`),
      p('surtitre', 'Nous contacter'),
      t(1, 'bandeau-page__titre', 'Échangeons sur votre projet.'),
      p('chapeau', CHAPEAU_CONTACT),
    ]), { tag: 'section' }),
    g('section contact-page', g('enveloppe', blocContact), { tag: 'section' }),
  ].join('\n\n');

  // ---------- Nos consultants ----------
  const nosConsultants = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Nos consultants`),
      p('surtitre', 'Nos consultants'),
      t(1, 'bandeau-page__titre', 'Un collectif d’experts à votre service.'),
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
          p('surtitre', 'Pourquoi le collectif'),
          t(2, 'titre-section', 'Pourquoi faire appel au collectif ?'),
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
        atout('icone-etoile', 'Des compétences complémentaires', 'Chaque équipe réunit les expertises complémentaires dont votre projet a besoin, pour des solutions adaptées à vos problématiques.'),
        atout('icone-bouclier', 'Expérience et fiabilité', 'Nos membres possèdent une expérience solide et une réputation de fiabilité reconnue dans leurs secteurs respectifs.'),
        atout('icone-cible', 'Approche personnalisée', "Nous mettons un point d'honneur à comprendre vos besoins spécifiques pour vous proposer des solutions sur mesure."),
      ]),
    ]), { tag: 'section' }),

    g('section section--blanc', g('enveloppe pile qui', [
      g('entete-section', [
        p('surtitre', "Domaines d'intervention"),
        t(2, 'titre-section', 'Une large gamme de compétences, réunies au sein d’une même équipe.'),
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
          p('surtitre', 'Votre projet'),
          t(3, 'encart-sombre__titre', "Décrivez votre enjeu : l'équipe de coordination compose le collectif adapté à votre projet."),
        ]),
        bs('', [b('Échanger sur mon projet', CONTACT, 'bouton--blanc')]),
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
        carte('Notre modèle', 'Un modèle différent du cabinet traditionnel', "Des experts indépendants, une gouvernance de mission unique et un interlocuteur unique, portés par une association à but non lucratif : pas d'actionnaire à rémunérer."),
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
        bs('', [b('Échanger sur mon projet', CONTACT, 'bouton--blanc')]),
      ]),
    ]), { tag: 'section' }),
  ].join('\n\n');

  // ---------- Pages légales ----------
  const pageLegale = (titre_, chapeau, corps) => [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › ${titre_}`),
      p('surtitre', 'Informations légales'),
      t(1, 'bandeau-page__titre', titre_),
      ...(chapeau ? [p('chapeau', chapeau)] : []),
    ]), { tag: 'section' }),
    g('section page-legale', g('enveloppe', g('document-legal', corps)), { tag: 'section' }),
  ].join('\n\n');
  const rubrique = (titre_, paras) => [t(2, '', titre_), ...paras.map(x => p('', x))];

  const mentionsLegales = pageLegale('Mentions légales', "Informations relatives à l'éditeur et à l'hébergeur du site aepcna.fr, conformément à la loi pour la confiance dans l'économie numérique (LCEN).", [
    ...rubrique('Éditeur du site', [
      "Le présent site est la propriété de l'<strong>Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine (AEPC NA)</strong>, association régie par la loi du 1er juillet 1901.",
      '<strong>Siège</strong> : 51-53 boulevard du Président Wilson, 33000 Bordeaux',
      '<strong>SIRET</strong> : 924 343 379 00021<br><strong>Code APE</strong> : 9499Z<br><strong>N° TVA intracommunautaire</strong> : FR66 924 343 379',
      '<strong>Téléphone</strong> : <a href="tel:+33610501077">06 10 50 10 77</a><br><strong>E-mail</strong> : <a href="mailto:contactweb@aepcna.fr">contactweb@aepcna.fr</a>',
    ]),
    ...rubrique('Directeur de la publication', ["Charles Bourinet, président de l'AEPC Nouvelle-Aquitaine."]),
    ...rubrique('Hébergement', [
      '<strong>OVH SAS</strong><br>2 rue Kellermann, 59100 Roubaix, France<br><a href="https://www.ovhcloud.com/fr/">www.ovhcloud.com</a>',
    ]),
    ...rubrique('Propriété intellectuelle', [
      "L'ensemble des contenus de ce site (textes, visuels, logos, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable de l'AEPC NA est interdite. Les logos des partenaires et clients restent la propriété de leurs titulaires respectifs.",
    ]),
    ...rubrique('Données personnelles', [
      `Les modalités de traitement de vos données personnelles sont décrites dans notre <a href="${U('/declaration-de-confidentialite-ue/')}">Déclaration de confidentialité (UE)</a>. Pour toute question ou pour exercer vos droits : <a href="mailto:rgpd@aepcna.fr">rgpd@aepcna.fr</a>.`,
    ]),
    ...rubrique('Cookies', [
      `L'utilisation des cookies sur ce site est détaillée dans notre <a href="${U('/politique-de-cookies-ue-2/')}">Politique de cookies (UE)</a>. Vous pouvez modifier vos choix à tout moment depuis cette page.`,
    ]),
  ]);

  const confidentialite = pageLegale('Déclaration de confidentialité (UE)', "Comment l'AEPC Nouvelle-Aquitaine collecte, utilise et protège vos données personnelles.",
    [shortcode('[cmplz-document type="privacy-statement" region="eu"]')]);
  const cookies = pageLegale('Politique de cookies (UE)', 'Les cookies utilisés sur ce site et la gestion de votre consentement.',
    [shortcode('[cmplz-document type="cookie-statement" region="eu"]')]);

  // ---------- Solutions (point 7 : offres « productisées ») ----------
  const solution = (ancre, icone, public_, titre_, besoin, rubrique, dispositif, reference, lien) => g(`solution ${icone}`, [
    p('solution__public', public_),
    t(2, 'solution__titre', titre_),
    p('solution__cible', besoin),
    p('solution__rubrique', rubrique),
    liste('liste-coches', dispositif),
    p('solution__reference', reference),
    p('solution__lien', `<a href="${CONTACT}">${lien} →</a>`),
  ], { ancre });

  // Actionnable : parcours RSE des PME, repris de la présentation « Actionnable · Offre RSE AEPC NA × Cinov NA ».
  // {{URL:…}} est résolu au déploiement (document importé depuis deploy/documents/).
  const PDF_ACTIONNABLE = '{{URL:actionnable-offre-rse-aepc-na-cinov-na}}';
  const repere = (valeur, libelle) => g('repere', [p('repere__valeur', valeur), p('repere__libelle', libelle)]);
  const module_ = (num, duree, titre_, complement, libelle = 'À la carte') => g('module', [
    p('module__num', `Module ${num} · ${duree}`),
    t(4, 'module__titre', titre_),
    ...(complement ? [g('module__carte', [p('module__carte-titre', libelle), p('module__carte-texte', complement)])] : []),
  ]);
  const tarif = (montant, libelle) => g('tarif', [p('tarif__montant', montant), p('tarif__libelle', libelle)]);
  const actionnable = g('section actionnable', g('enveloppe pile', [
    g('actionnable__intro', [
      g('actionnable__presentation', [
        p('surtitre', 'Vous êtes une PME ?'),
        t(2, 'titre-section', 'Actionnable : apprenez à vous adapter aux changements.'),
        p('chapeau', 'Un parcours RSE en cohorte, avec des consultants experts : en six mois, votre entreprise construit sa stratégie, son plan d’actions et son rapport RSE.'),
        g('actionnable__porteurs', [
          g('actionnable__logos', [
            img('logo-aepc-na', 'AEPC Nouvelle-Aquitaine', '', 'full'),
            img('logo-cinov-na', 'Cinov Nouvelle-Aquitaine', '', 'full'),
            img('logo-region-na', 'Région Nouvelle-Aquitaine', '', 'full'),
          ]),
          p('actionnable__mention', 'Offre portée par l’AEPC et Cinov Nouvelle-Aquitaine, en collaboration avec la CPC Nouvelle-Aquitaine. Référencée Néo Terra par la Région Nouvelle-Aquitaine.'),
        ]),
        bs('', [b('Télécharger la présentation (PDF)', PDF_ACTIONNABLE, 'bouton--vert', { nouvelOnglet: true })]),
      ]),
      img('photo-ardoise-possible', 'Une main cache les deux premières lettres du mot « impossible » écrit à la craie sur une ardoise : il reste « possible ».', 'actionnable__photo', 'large'),
    ]),
    g('reperes', [
      repere('3 à 8', 'entreprises non concurrentes par cohorte'),
      repere('6 jours', 'de parcours consolidé, plus 3 jours à la carte'),
      repere('6 mois', 'un module toutes les quatre semaines'),
      repere('25', 'consultants experts régionaux, AEPC et Cinov'),
    ]),
    g('actionnable__contexte', [
      img('photo-objectif-paysage', 'Un objectif photo tenu à la main rend net un lac de montagne, flou tout autour.', 'actionnable__contexte-photo', 'large'),
      g('actionnable__contexte-texte', [
        t(3, 'actionnable__citation', '« Nothing is certain, except change »'),
        p('actionnable__texte', 'Ces sujets vont transformer votre entreprise. Actionnable vous apprend à vous y adapter, avec une méthode, une cohorte de dirigeants et des experts à vos côtés.'),
        g('puces', ['IA', 'Vision', 'Démocratie', 'Santé', 'Climat', 'Alimentation', 'Politique', 'Impacts', 'Vivant', 'Économie', 'Eau', 'Tendance', 'Génération', 'Risques', 'Catastrophes', 'Image', 'Relations humaines'].map(x => p('puce', x))),
      ]),
    ]),
    g('parcours', [
      g('entete-section', [
        t(3, 'actionnable__soustitre', 'Neuf modules, de la compréhension des enjeux au rapport RSE'),
        p('actionnable__texte', 'Un parcours généraliste, avec du sur-mesure : des journées à la carte approfondissent les sujets propres à votre entreprise. Les séances ont lieu chez les participants, chaque entreprise accueillant la cohorte à son tour.'),
      ]),
      g('parcours__phase', [
        p('parcours__libelle', 'De la compréhension aux enjeux'),
        g('modules modules--5', [
          module_(1, '0,5 jour', 'Contexte'),
          module_(2, '0,5 jour', 'Questions centrales et principes de la norme ISO 26000'),
          module_(3, '1 jour', 'Identifier ses impacts, risques et opportunités', 'Bilan et décarbonation, eau, biodiversité, 7 piliers'),
          module_(4, '0,5 jour', 'Prioriser ses enjeux avec la double matérialité', 'Inclusion, RPPS, égalité homme-femme, discriminations'),
          module_(5, '0,5 jour', 'Modèle économique', 'Modèle d’affaires, économie circulaire'),
        ]),
      ]),
      g('parcours__phase', [
        p('parcours__libelle', 'De l’action au rapport RSE'),
        g('modules modules--4', [
          module_(6, '1 jour', 'Innover avec ses parties prenantes', 'Impliquer ses parties prenantes pour transformer'),
          module_(7, '1 jour', 'Transformer les métiers de son entreprise', 'SI, RH, commerce, achats, supply, performance industrielle, communication'),
          module_(8, '0,5 jour', 'Construction et pilotage des données', 'Tableau de bord global personnalisé'),
          module_(9, '0,5 jour', 'Faire son rapport RSE', 'Analyse du rapport RSE par un des chefs de projet, qui émet un avis extérieur.', 'Avis extérieur'),
        ]),
      ]),
    ]),
    g('actionnable__bas', [
      g('livrables', [
        t(3, 'actionnable__soustitre', 'Ce que votre entreprise construit'),
        liste('livrables__liste', [
          'Ses outils de dialogue et son plan de communication, sa stratégie et son plan d’actions',
          'Son plan d’actions par métier pour embarquer ses équipes',
          'Son tableau de bord et son plan de pilotage, global et par métier',
          'Son questionnaire de compétences, avant et après le parcours',
          'Ses atouts et ses points d’amélioration au regard de la norme ISO 26000',
          'Sa cartographie des parties prenantes et sa matrice impacts, risques et opportunités',
          'Ses enjeux posés dans une matrice de double matérialité',
          'Son business model Canvas durable et ses pistes d’économie de la fonctionnalité et d’économie circulaire',
          'Son rapport RSE',
        ], { numerotee: true }),
        p('livrables__note', 'Avis des experts tout au long du parcours, puis avis d’une évaluatrice RSE à la fin du programme.'),
      ]),
      g('inscription', [
        t(3, 'inscription__titre', 'Le coût par entreprise'),
        tarif('2 227,50 € HT', 'pour les 6 jours d’accompagnement collectif'),
        tarif('371,25 € HT', 'par module complémentaire à la carte'),
        p('inscription__lancement', 'Lancement de la cohorte « Impulse » le 12 janvier 2027'),
        p('inscription__texte', 'L’inscription se fait après un échange téléphonique avec Audrey Vautrin, responsable RSE et évaluatrice ICA en R.S., pour comprendre vos besoins et vous proposer le parcours qui vous correspond. Écrivez à <a href="mailto:actionnable@aepcna.fr">actionnable@aepcna.fr</a>.'),
        bs('', [b('Contacter l’équipe Actionnable', 'mailto:actionnable@aepcna.fr', 'bouton--blanc')]),
      ]),
    ]),
  ]), { tag: 'section', ancre: 'trajectoire-rse' });

  const solutions = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Solutions`),
      p('surtitre', 'Nos solutions'),
      t(1, 'bandeau-page__titre', 'Des projets d’envergure, portés par un collectif.'),
      p('chapeau', "Des exemples de projets menés pour des ETI, des grands groupes, des filières et des acteurs publics, et un parcours dédié aux PME. Pour chacun, l'AEPC constitue l'équipe d'experts adaptée et en assure la coordination, avec un interlocuteur unique."),
    ]), { tag: 'section' }),

    g('section page-legale', g('enveloppe pile solutions', [
      g('entete-section', [
        p('surtitre', 'Exemples de projets'),
        t(2, 'titre-section', 'Des besoins qui dépassent ce qu’un consultant peut porter seul.'),
        p('chapeau', "Programmes régionaux, projets de filière, formations mobilisant plus de cinq consultants ou formateurs : l'AEPC compose l'équipe, la coordonne et rend compte au donneur d'ordre."),
      ]),
      g('grille-3', [
        solution('performance-industrielle', 'icone-usine', 'Programmes régionaux et filières', 'Performance industrielle &amp; Usine du Futur',
          '<strong>Le besoin</strong> : déployer un programme d’accompagnement auprès de nombreuses entreprises industrielles, sur tout un territoire, avec une qualité homogène et un reporting consolidé.',
          'Le dispositif mobilisé',
          ['Une cellule de coordination dédiée : chef de projet, PMO, spécialistes', 'Jusqu’à 30 experts mobilisés au plus près des sites', 'Diagnostics terrain, Lean, organisation de production, plans d’investissement', 'Un reporting consolidé au donneur d’ordre : avancement, livrables, indicateurs'],
          '<strong>Référence</strong> : Usine du Futur 4, Région Nouvelle-Aquitaine — plus de 150 entreprises industrielles accompagnées par 30 experts coordonnés, dont des consultants labellisés AeroExcellence pour la filière aéronautique.',
          'Échanger sur ce besoin'),
        solution('formation', 'icone-formation', 'ETI, grands groupes, branches et OPCO', 'Programmes de formation',
          '<strong>Le besoin</strong> : former de nombreux collaborateurs, sur plusieurs sites ou territoires, avec un programme qui mobilise plus de cinq consultants ou formateurs.',
          'Le dispositif mobilisé',
          ['Une ingénierie de formation conçue avec le donneur d’ordre', 'Plus de cinq formateurs praticiens mobilisés et coordonnés', 'Négociation commerciale, management, intelligence artificielle…', 'Un interlocuteur unique, du cahier des charges au bilan'],
          '<strong>Référence</strong> : marchés de formation triennaux 2024-2026 remportés pour la CMA et pour OCAPIAT–IFRIA. Démarche de certification Qualiopi engagée.',
          'Échanger sur ce besoin'),
        solution('strategie-transformation', 'icone-strategie', 'ETI, grands groupes et filières', 'Stratégie &amp; transformation des organisations',
          '<strong>Le besoin</strong> : conduire une transformation qui mobilise plusieurs expertises — stratégie, organisation, RH, finance, numérique — sur plusieurs entités ou sites.',
          'Le dispositif mobilisé',
          ['Une équipe pluridisciplinaire composée pour votre projet', 'Diagnostic et feuille de route partagés avec la direction', 'Nouveaux modèles économiques : économie de la fonctionnalité, écologie industrielle', 'Pilotage centralisé et accompagnement du changement'],
          '<strong>Qualité des consultants</strong> : près de 50 % des consultants labellisés du parcours régional <a href="https://www.nouvelle-aquitaine.cci.fr/produit/parcours-organisation-industrielle-et-management-poim" target="_blank" rel="noreferrer noopener">POIM (Parcours Organisation Industrielle et Management)</a> sont consultants de l’AEPC. Nos membres sont aussi intervenus sur Appui Stratégique PME et Usine du Futur 3.',
          'Échanger sur ce besoin'),
      ]),
    ]), { tag: 'section' }),

    g('section section--blanc', g('enveloppe pile methode', [
      g('entete-section', [
        p('surtitre', 'Comment ça marche'),
        t(2, 'titre-section', 'De votre enjeu aux résultats, une seule équipe à piloter : la nôtre.'),
      ]),
      g('etapes', [
        etape('01 · Votre enjeu', 'Nous échangeons', 'Vous décrivez votre besoin, vos objectifs et vos contraintes à l’équipe de coordination.'),
        etape('02 · L’équipe', 'Nous la constituons', 'La cellule de coordination compose l’équipe d’experts adaptée à votre filière et à votre territoire.', true),
        etape('03 · Le pilotage', 'Nous en répondons', 'Chef de projet et PMO suivent l’avancement, les livrables, la qualité et vous rendent compte.'),
        etape('04 · Les résultats', 'Nous les mesurons', 'Interventions sur site, résultats mesurés et bilan partagé avec vous.'),
      ]),
      g('encart-sombre encart-sombre--large', [
        g('', [
          p('surtitre', 'Votre projet'),
          t(3, 'encart-sombre__titre', 'Votre projet ne correspond pas exactement à ces exemples ? Parlons-en : nous composons l’équipe adaptée.'),
        ]),
        bs('', [b('Échanger sur mon projet', CONTACT, 'bouton--blanc')]),
      ]),
    ]), { tag: 'section' }),

    actionnable,
  ].join('\n\n');

  // ---------- Rejoindre l'AEPC (point 10 : entrée secondaire des consultants) ----------
  const adherer = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `<a href="${U('/')}">Accueil</a> › Rejoindre l’AEPC`),
      p('surtitre', 'Vous êtes consultant'),
      t(1, 'bandeau-page__titre', 'Rejoindre l’AEPC Nouvelle-Aquitaine'),
      p('chapeau', "Répondez ensemble à des appels d'offres hors de portée d'un indépendant, sans passer par un grand cabinet national, dans un cadre juridique, technique et outillé."),
    ]), { tag: 'section' }),

    g('section page-legale', g('enveloppe pile qui', [
      g('entete-section', [
        p('surtitre', 'Ce que l’AEPC vous apporte'),
        t(2, 'titre-section', 'La force d’un collectif, en restant indépendant.'),
      ]),
      g('grille-3', [
        pilier('icone-cible', 'Des marchés collectifs', "Accédez à des programmes et des appels d'offres régionaux que l'on ne peut pas porter seul, aux côtés d'autres experts."),
        pilier('icone-bouclier', 'Un cadre sécurisé', "L'association porte le contrat, la facturation et la coordination : vous vous concentrez sur votre expertise."),
        pilier('icone-equipe', 'Une communauté active', 'Entraide, partage de connaissances, formations et visibilité auprès des acteurs économiques de la région.'),
      ]),
    ]), { tag: 'section' }),

    g('section section--blanc', g('enveloppe pile methode', [
      g('entete-section', [
        p('surtitre', 'Comment adhérer'),
        t(2, 'titre-section', 'Un parcours d’adhésion en trois étapes.'),
        p('chapeau', 'Les membres de l’AEPC sont des consultants indépendants issus de la CPC Nouvelle-Aquitaine, engagés à respecter sa charte de déontologie et à se former en continu.'),
      ]),
      g('etapes etapes--3', [
        etape('01 · Candidature', 'Présentez-vous', 'Écrivez-nous via le formulaire de contact (objet « Rejoindre l’AEPC NA ») : parcours, expertises, filières, territoire.'),
        etape('02 · Entretien', 'Faisons connaissance', 'Un entretien de validation pour échanger sur vos attentes et sur votre contribution au collectif.', true),
        etape('03 · Validation', 'Bienvenue', 'Une fois votre profil validé, vous accédez aux ressources et aux activités de l’association.'),
      ]),
      g('encart-sombre encart-sombre--large', [
        g('', [
          p('surtitre', 'Prêt à nous rejoindre ?'),
          t(3, 'encart-sombre__titre', 'Présentez votre candidature : l’équipe de l’AEPC vous recontacte pour organiser l’entretien.'),
        ]),
        bs('', [b('Présenter ma candidature', CONTACT, 'bouton--blanc')]),
      ]),
      p('legende', `Pas encore membre de la Chambre Professionnelle du Conseil ? <a href="https://www.cpcna.org/" target="_blank" rel="noreferrer noopener">Découvrir la CPC Nouvelle-Aquitaine</a>`),
    ]), { tag: 'section' }),
  ].join('\n\n');

  return [
    { slug: 'solutions', seo_title: "Performance industrielle, RSE, stratégie et formation | AEPC NA", title: 'Nos solutions', content: solutions,
      description: "Exemples de projets menés par l'AEPC Nouvelle-Aquitaine pour des ETI, grands groupes, filières et acteurs publics, et parcours RSE Actionnable pour les PME." },
    { slug: 'adherer', seo_title: "Consultant indépendant : rejoindre l'AEPC Nouvelle-Aquitaine", title: "Rejoindre l'AEPC", content: adherer,
      description: "Consultant indépendant en Nouvelle-Aquitaine ? Rejoignez l'AEPC pour répondre ensemble aux appels d'offres dans un cadre juridique, technique et outillé." },
    { slug: 'mentions-legales', seo_title: "Mentions légales | AEPC Nouvelle-Aquitaine", title: 'Mentions légales', content: mentionsLegales,
      description: "Mentions légales du site de l'AEPC Nouvelle-Aquitaine : éditeur, directeur de la publication, hébergeur." },
    { slug: 'declaration-de-confidentialite-ue', seo_title: "Déclaration de confidentialité | AEPC Nouvelle-Aquitaine", title: 'Déclaration de confidentialité (UE)', content: confidentialite,
      description: "Déclaration de confidentialité de l'AEPC Nouvelle-Aquitaine : traitement et protection de vos données personnelles." },
    { slug: 'politique-de-cookies-ue-2', seo_title: "Politique de cookies | AEPC Nouvelle-Aquitaine", title: 'Politique de cookies (UE)', content: cookies,
      description: "Politique de cookies du site de l'AEPC Nouvelle-Aquitaine et gestion de votre consentement." },
    { slug: 'qui-sommes-nous', seo_title: "Association de consultants de la CPC Nouvelle-Aquitaine | AEPC NA", title: 'Qui sommes-nous ?', content: quiSommesNous,
      description: "L'AEPC Nouvelle-Aquitaine, association loi 1901 émanation de la CPC NA, fédère des consultants experts régionaux pour accompagner la transformation des entreprises du territoire." },
    { slug: 'nos-consultants', seo_title: "Collectif de consultants experts en Nouvelle-Aquitaine | AEPC NA", title: 'Nos consultants', content: nosConsultants,
      description: "Plus de 50 consultants experts régionaux, indépendants et engagés, réunis dans le collectif de l'AEPC Nouvelle-Aquitaine." },
    { slug: 'accueil', seo_title: "Conseil en transformation d'entreprise en Nouvelle-Aquitaine | AEPC NA", title: 'Accueil', content: accueil,
      description: "Collectif de plus de 50 consultants indépendants en Nouvelle-Aquitaine : performance industrielle, Lean, RSE, stratégie et formation, pilotés par une équipe de coordination dédiée." },
    { slug: 'contact', seo_title: "Contact : consultants à Bordeaux et en Nouvelle-Aquitaine | AEPC NA", title: 'Contact', content: contact,
      description: "Entreprise, collectivité, financeur ou consultant : décrivez votre besoin, l'équipe de coordination de l'AEPC Nouvelle-Aquitaine vous répond." },
  ];
};

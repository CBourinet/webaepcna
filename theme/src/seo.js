// Contenus de référence (SEO, AEO, GEO) : actualités, page Usine du Futur, questions fréquentes.
// Les réponses des FAQ servent deux fois : affichées dans la page et décrites
// aux moteurs (FAQPage) par functions.php à partir de faq.json.
const { groupe: g, para: p, titre: t, image: img, bouton: b, boutons: bs, liste, details, requete } = require('./blocs');

const sansBalises = html => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');

module.exports = function seo(BASE, { carte, chiffre, CONTACT }) {
  const U = chemin => `${BASE}${chemin}`;
  const lien = (texte, url, ext) => `<a href="${url}"${ext ? ' target="_blank" rel="noreferrer noopener"' : ''}>${texte}</a>`;
  const PLACECO = 'https://share.google/k6e1c7yfVcSWLu2iu';
  const REGION_UDF = 'https://les-aides.nouvelle-aquitaine.fr/transition-energetique-et-ecologique/usine-du-futur-agissons-aujourd-hui-pour-une-industrie-durable-et-competitive';

  // ---------- Questions fréquentes ----------
  const FAQ = {
    accueil: [
      ["Qu'est-ce que l'AEPC Nouvelle-Aquitaine ?", "L'Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine (AEPC NA) est une association loi 1901 créée en 2023 par des consultants issus de la Chambre Professionnelle du Conseil de Nouvelle-Aquitaine. Elle réunit plus de 50 consultants indépendants et constitue, pour chaque projet de transformation, l'équipe d'experts adaptée, coordonnée par une équipe salariée."],
      ["En quoi l'AEPC est-elle différente d'un cabinet de conseil ?", "On ne choisit pas l'AEPC pour un expert, mais pour la qualité d'un collectif : une équipe pluridisciplinaire composée pour votre projet, une gouvernance de mission unique, un interlocuteur unique et une coordination salariée qui s'engage sur les délais et la qualité. Association à but non lucratif, l'AEPC n'a pas d'actionnaire à rémunérer."],
      ['Sur quels sujets intervenez-vous ?', `Performance industrielle, Lean et ${lien('Usine du Futur', U('/usine-du-futur/'))}, ${lien('RSE avec le parcours Actionnable', U('/rse-actionnable/'))}, stratégie et transformation des organisations (business model, gouvernance), et programmes de formation mobilisant plusieurs formateurs.`],
      ['Où intervenez-vous ?', "Dans toute la Nouvelle-Aquitaine. Le siège est à Bordeaux et nos consultants sont présents dans les douze départements, au plus près des sites des entreprises."],
      ["Qui fait appel à l'AEPC ?", "La Région Nouvelle-Aquitaine (Usine du Futur 4, plus de 150 entreprises industrielles accompagnées), la Chambre de Métiers et de l'Artisanat et OCAPIAT–IFRIA pour des marchés de formation, des ETI, des grands groupes, des filières et, avec Actionnable, des PME."],
      ['Comment démarrer un projet avec vous ?', `Décrivez votre enjeu via le ${lien('formulaire de contact', CONTACT)}. L'équipe de coordination vous répond, qualifie le besoin et constitue l'équipe d'experts adaptée à votre projet.`],
    ],
    'rse-actionnable': [
      ["À qui s'adresse le parcours Actionnable ?", "Aux PME de Nouvelle-Aquitaine qui veulent structurer leur démarche RSE et en faire un levier de performance et de résilience, sans programme à monter elles-mêmes."],
      ['Combien coûte Actionnable ?', "2 227,50 € HT par entreprise pour les 6 jours d'accompagnement collectif, et 371,25 € HT par module complémentaire à la carte."],
      ['Combien de temps dure le parcours ?', "Le parcours s'étale sur 6 mois, à raison d'un module toutes les 4 semaines : 6 jours de parcours consolidé et jusqu'à 3 jours à la carte. Le dispositif est d'un an renouvelable."],
      ["Qu'obtient l'entreprise à la fin du parcours ?", "Neuf livrables construits module après module, jusqu'au rapport RSE de l'entreprise, analysé par un chef de projet qui émet un avis extérieur."],
      ['Actionnable est-il reconnu par la Région ?', "Oui. Actionnable est une offre RSE référencée Néo Terra par la Région Nouvelle-Aquitaine, retenue dans le cadre de l'appel à manifestation d'intérêt RSE et portée avec la Fédération Cinov Nouvelle-Aquitaine. Elle figure dans le catalogue des offres et labels RSE reconnus par la Région et dans le catalogue en ligne des solutions RSE opéré par ADI Nouvelle-Aquitaine."],
      ["Comment s'inscrire ?", 'L\'inscription se fait après un échange téléphonique, pour comprendre vos besoins et vous proposer le parcours adapté. Écrivez à <a href="mailto:actionnable@aepcna.fr">actionnable@aepcna.fr</a>. Prochaine cohorte : « Impulse », lancée le 12 janvier 2027.'],
    ],
    'usine-du-futur': [
      ["Qu'est-ce que le programme Usine du Futur ?", "Un programme de la Région Nouvelle-Aquitaine qui accompagne les PME et ETI industrielles vers l'usine de demain : organisation de la production, Lean, numérique, investissements et compétitivité durable."],
      ["Quel est le rôle de l'AEPC Nouvelle-Aquitaine ?", "Lauréate en 2024, l'AEPC NA anime le dispositif Usine du Futur 4 ; la Région lui a renouvelé sa confiance pour la période 2026-2027. Une cellule de coordination (chef de projet, PMO, spécialistes) pilote une trentaine d'experts sur l'ensemble de la région."],
      ["Combien d'entreprises ont été accompagnées ?", "Plus de 150 entreprises industrielles de Nouvelle-Aquitaine ont été accompagnées dans le cadre d'Usine du Futur 4."],
      ['Quelles expertises sont mobilisées ?', "Diagnostic 360°, Lean et organisation de production, évolution vers l'industrie X.0, plans d'investissement, sensibilisation au risque cyber, RSE (consultants labellisés dans le cadre du partenariat Agence LUCIE) et, pour la filière aéronautique, une équipe labellisée Aero Excellence."],
      ['Comment une entreprise peut-elle en bénéficier ?', `Le dispositif est porté par la Région Nouvelle-Aquitaine. ${lien('Contactez-nous', CONTACT)} : l'équipe de coordination vous oriente et vous explique les modalités d'accès.`],
    ],
  };
  const sectionFaq = (cle, titre_, variante = 'section--blanc') => g(`section ${variante}`, g('enveloppe pile faq', [
    g('entete-section', [p('surtitre', 'Questions fréquentes'), t(2, 'titre-section', titre_)]),
    g('faq__liste', FAQ[cle].map(([q, r]) => details(q, r))),
  ]), { tag: 'section', ancre: 'faq' });

  // ---------- Actualités ----------
  const sectionActusAccueil = g('section', g('enveloppe pile actus-section', [
    g('entete-section', [
      p('surtitre', 'Actualités'),
      t(2, 'titre-section', 'Le collectif en action sur le territoire.'),
    ]),
    requete('actus actus--accueil', 3),
    p('actus__tout', lien('Toutes les actualités →', U('/actualites/'))),
  ]), { tag: 'section', ancre: 'actualites' });

  const actualites = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `${lien('Accueil', U('/'))} › Actualités`),
      p('surtitre', 'Actualités et presse'),
      t(1, 'bandeau-page__titre', 'Le collectif en action sur le territoire.'),
      p('chapeau', "Programmes régionaux, parcours RSE, prises de parole dans la presse : les dernières nouvelles de l'AEPC Nouvelle-Aquitaine et de ses consultants."),
    ]), { tag: 'section' }),
    g('section', g('enveloppe', requete('actus', 12)), { tag: 'section' }),
  ].join('\n\n');

  const article = (fil, surtitre, titre_, chapeau, corps, appel) => [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `${lien('Accueil', U('/'))} › ${lien('Actualités', U('/actualites/'))} › ${fil}`),
      p('surtitre', surtitre),
      t(1, 'bandeau-page__titre', titre_),
      p('chapeau', chapeau),
    ]), { tag: 'section' }),
    g('section page-legale', g('enveloppe', g('document-legal article', corps)), { tag: 'section' }),
    g('section section--sans-haut', g('enveloppe', g('encart-sombre encart-sombre--large', [
      g('', [p('surtitre', appel[0]), t(3, 'encart-sombre__titre', appel[1])]),
      bs('', [b(appel[2], appel[3], 'bouton--blanc')]),
    ])), { tag: 'section' }),
  ].join('\n\n');

  const articlePlaceco = article('Placéco, octobre 2026', 'Presse · Placéco · 19 octobre 2026',
    '« Il faut gagner en antifragilité » : les inquiétudes des dirigeants vues du terrain',
    "Dans Placéco, Charles Bourinet, président de l'AEPC Nouvelle-Aquitaine, synthétise ce que les consultants de l'association observent chez les dirigeants de la région : matières premières, attentisme politique, transmission, cybersécurité, IA. Et esquisse des pistes.",
    [
      img('photo-charles-bourinet', "Charles Bourinet, président de l'AEPC Nouvelle-Aquitaine", 'article__portrait', 'large'),
      p('', `Interrogé par Gaëlle Richard pour ${lien('Placéco', PLACECO, true)} (édition Nouvelle-Aquitaine, 19 octobre 2026), Charles Bourinet, consultant, président de l'AEPC Nouvelle-Aquitaine et membre de l'Institut Lean France, dresse le portrait des préoccupations des dirigeants accompagnés par les membres de l'association.`),
      t(2, '', 'Ce que nos consultants observent sur le terrain'),
      liste('', [
        "<strong>Instabilité géopolitique et matières premières.</strong> La rareté et la fluctuation des cours, le cuivre en tête, rendent le budget « impossible à prévoir ». Ce n'est plus la chaîne d'approvisionnement qui pose problème, mais des prix qui s'envolent durablement.",
        "<strong>Des filières contrastées.</strong> L'automobile et sa sous-traitance, les vins et spiritueux ou le BTP souffrent ; l'aéronautique et la défense restent porteuses. Au sein d'une même filière, le positionnement fait la différence.",
        "<strong>L'attentisme avant 2027.</strong> L'incertitude politique fige les décisions des dirigeants.",
        "<strong>La transmission.</strong> Face à une trésorerie devenue « un casse-tête permanent », des dirigeants de 60 ou 65 ans envisagent de céder plus tôt que prévu.",
        "<strong>Le « strabisme temps court ».</strong> Des stratégies de long terme deviennent des stratégies de survie à six, huit ou neuf mois.",
        "<strong>La cybersécurité, angle mort.</strong> Faute de culture informatique, le risque reste mal compris ; avec le Campus Cyber Nouvelle-Aquitaine, les consultants ont un rôle de sensibilisation.",
        "<strong>L'IA et la souveraineté.</strong> Des usages disparates, du « shadow IT », et des données qui peuvent être captées hors d'Europe sans que l'entreprise le sache.",
      ]),
      t(2, '', 'Les pistes : business model, fonds propres, gouvernance'),
      p('', "Pour Charles Bourinet, la question centrale reste celle du business model : tout dirigeant doit savoir s'il est au clair sur son modèle et si les transformations en cours doivent l'amener à se repositionner, se réinventer et se différencier."),
      p('', "Les réponses passent par la confiance, la délégation et « la création d'alliances pour être plus forts ensemble », autour d'un triptyque : business model, structuration des fonds propres et gouvernance, avec une vision de long terme claire, tout en gérant le court et le moyen terme."),
      t(2, '', "Comment l'AEPC accompagne ces enjeux"),
      liste('', [
        `<strong>Business model et gouvernance</strong> : ${lien('stratégie et transformation des organisations', U('/solutions/#strategie-transformation'))}, par une équipe pluridisciplinaire.`,
        `<strong>Industrie, Lean et cybersécurité</strong> : le programme ${lien('Usine du Futur', U('/usine-du-futur/'))}, avec le Campus Cyber Nouvelle-Aquitaine parmi les intervenants.`,
        `<strong>Résilience par la RSE</strong> : le parcours ${lien('Actionnable', U('/rse-actionnable/'))} pour les PME, référencé Néo Terra.`,
        `<strong>Alliances</strong> : un ${lien('collectif de plus de 50 consultants', U('/qui-sommes-nous/'))} qui répond ensemble aux besoins des entreprises.`,
      ]),
      p('article__source', `Source : ${lien('« Il faut gagner en antifragilité » : les inquiétudes des dirigeants vues du terrain', PLACECO, true)}, Gaëlle Richard, Placéco, 19 octobre 2026 (article réservé aux abonnés).`),
    ],
    ['Vous êtes dirigeant ?', 'Parlons de votre modèle, de vos fonds propres et de votre gouvernance.', 'Échanger sur mon projet', CONTACT]);

  const articleActionnable = article('Actionnable référencé Néo Terra', 'RSE · Région Nouvelle-Aquitaine · 28 septembre 2026',
    'Actionnable référencé « Offre RSE Néo Terra » par la Région Nouvelle-Aquitaine',
    "Le parcours de transformation Actionnable, porté par l'AEPC Nouvelle-Aquitaine avec la Fédération Cinov Nouvelle-Aquitaine, est référencé « Offre RSE Néo Terra » par la Région Nouvelle-Aquitaine, à la suite de l'appel à manifestation d'intérêt RSE.",
    [
      img('photo-signature-charte-rse-region', 'Signature de la charte d’engagement des partenaires de la RSE en Nouvelle-Aquitaine à la Région, le 28 septembre 2026', 'article__photo', 'large'),
      p('', "Le 28 septembre 2026, l'AEPC Nouvelle-Aquitaine a signé à la Région la charte d'engagement des partenaires de la RSE en Nouvelle-Aquitaine, aux côtés d'autres acteurs de la RSE (AFNOR, Agence LUCIE, B Lab, Fédération Cinov…). Le parcours Actionnable est désormais référencé « Offre RSE Néo Terra »."),
      p('', "L'AEPC Nouvelle-Aquitaine a été retenue comme porteur de solutions dans le cadre de l'appel à manifestation d'intérêt (AMI) RSE de la Région Nouvelle-Aquitaine, et a signé une convention avec la Région. L'objectif du dispositif : permettre aux entreprises du territoire de développer leur résilience par la RSE."),
      p('', "L'offre est née de l'initiative de Pierre Proietti et d'Audrey Vautrin, qui ont construit un parcours modulaire pour accompagner les entreprises néo-aquitaines dans les enjeux auxquels elles font face. Pour la déployer, l'AEPC s'est entourée d'acteurs locaux aux valeurs similaires et aux compétences complémentaires, à commencer par la Fédération Cinov Nouvelle-Aquitaine."),
      t(2, '', 'Le parcours en bref'),
      liste('', [
        'Une cohorte de 3 à 8 entreprises non concurrentes, avec une animation sur site chez chacune à tour de rôle.',
        '6 jours de parcours consolidé et jusqu’à 3 jours à la carte, sur 6 mois.',
        '25 consultants experts régionaux, AEPC et Cinov : RSE, HSE, RH, qualité, performance industrielle, modèle économique, bilan carbone, biodiversité…',
        'Neuf livrables, jusqu’au rapport RSE de l’entreprise, avec un avis extérieur en fin de parcours.',
        '2 227,50 € HT par entreprise pour les 6 jours d’accompagnement collectif.',
      ]),
      t(2, '', 'Prochaine étape : la cohorte « Impulse »'),
      p('', `La prochaine cohorte, « Impulse », sera lancée le 12 janvier 2027. L'inscription se fait après un échange téléphonique avec l'équipe projet : <a href="mailto:actionnable@aepcna.fr">actionnable@aepcna.fr</a>. Tout le détail du parcours : ${lien('RSE Actionnable', U('/rse-actionnable/'))}.`),
      t(2, '', 'Pour aller plus loin'),
      liste('', [
        `${lien('Catalogue des offres et labels RSE reconnus par la Région', 'https://www.calameo.com/read/0060092718ce69b679e0c?page=1', true)} (Région Nouvelle-Aquitaine, version définitive)`,
        `${lien('Un référencement régional pour structurer les démarches RSE', 'https://entreprises.nouvelle-aquitaine.fr/actualites/un-referencement-regional-pour-structurer-les-demarches-rse', true)} (portail des entreprises de Nouvelle-Aquitaine)`,
        `${lien('Les solutions RSE', 'https://events.adi-na.fr/content/les-solutions-rse?secteur=toussecteurs&amp;page=1', true)} (catalogue en ligne opéré par ADI Nouvelle-Aquitaine)`,
      ]),
      p('article__source', 'Offre RSE référencée Néo Terra – Région Nouvelle-Aquitaine.'),
    ],
    ['Vous êtes une PME ?', 'Rejoignez la cohorte « Impulse » le 12 janvier 2027.', 'Découvrir le parcours', U('/rse-actionnable/')]);

  const articleFage = article('Usine du Futur 4, année 2026-2027', 'Usine du Futur · Septembre 2026',
    'Usine du Futur 4 : une nouvelle année démarre à Château Fage',
    "Le 15 septembre 2026, les consultants de l'AEPC Nouvelle-Aquitaine engagés dans Usine du Futur se sont réunis toute la journée près de Libourne avec les partenaires du dispositif, pour lancer l'année 2026-2027.",
    [
      p('', "Cette rencontre marquait le lancement de la nouvelle année du dispositif, dans le cadre de la confiance renouvelée par la Région Nouvelle-Aquitaine envers l'AEPC NA en tant qu'animateur d'Usine du Futur 4 pour la période 2026-2027."),
      p('', "Plus d'une vingtaine de participants, experts et représentants de la Région Nouvelle-Aquitaine, d'ADI Nouvelle-Aquitaine (Agence de Développement et d'Innovation) et d'Aero Excellence, se sont retrouvés pour réfléchir ensemble aux évolutions du dispositif et de sa méthodologie."),
      img('udf4-fage-ateliers', 'Séminaire Usine du Futur 4 à Château Fage : ateliers entre consultants', 'article__photo', 'full'),
      t(2, '', 'Des interventions de spécialistes'),
      liste('', [
        "<strong>Cybersécurité.</strong> Olivier Grall, du Campus Régional de Cybersécurité et de Confiance Numérique Nouvelle-Aquitaine, a ouvert le sujet de la cybersécurité, un enjeu que l'AEPC considère comme stratégique pour les entreprises du territoire.",
        "<strong>Lean et industrie X.0.</strong> Anne Zouggar Amrani, spécialiste en ingénierie industrielle à Arts et Métiers (ENSAM Bordeaux) et au laboratoire IMS, a abordé les modèles Lean pour l'optimisation industrielle de la supply chain (aéronautique et automobile), l'impact de l'industrie 4.0 sur la transformation Lean et l'évolution vers l'industrie X.0 pour les PME du territoire.",
        '<strong>Pilotage.</strong> Un point de suivi des missions par Estelle Bouchs, chef de projet Usine du Futur 4.',
      ]),
      img('udf4-fage-cybersecurite', 'Intervention d’Olivier Grall, Campus Cyber Nouvelle-Aquitaine, au séminaire Usine du Futur 4', 'article__photo', 'full'),
      t(2, '', "Des ateliers pour harmoniser nos méthodes"),
      p('', "Plusieurs ateliers ont permis d'approfondir ces sujets : certains dédiés aux spécificités de l'Usine du Futur, d'autres à l'analyse 360° des entreprises, toutes filières confondues. Une attention particulière a été portée à la filière aéronautique, notamment dans le cadre de notre équipe labellisée Aero Excellence."),
      img('udf4-fage-collectif', 'Les consultants de l’AEPC Nouvelle-Aquitaine réunis à Château Fage', 'article__photo', 'full'),
      p('', `Une belle dynamique collective pour accompagner les entreprises de la région vers l'industrie de demain et la compétitivité du territoire. Découvrir ${lien('notre rôle dans Usine du Futur', U('/usine-du-futur/'))}.`),
    ],
    ['Vous êtes industriel ?', 'Préparez votre usine de demain avec un collectif d’experts.', 'Découvrir Usine du Futur', U('/usine-du-futur/')]);

  // ---------- Page Usine du Futur ----------
  const usineDuFutur = [
    g('bandeau-page', g('enveloppe', [
      p('fil-ariane', `${lien('Accueil', U('/'))} › ${lien('Solutions', U('/solutions/'))} › Usine du Futur`),
      p('surtitre', 'Programme régional · Région Nouvelle-Aquitaine'),
      t(1, 'bandeau-page__titre', 'Usine du Futur Nouvelle-Aquitaine : un collectif d’experts pour l’industrie de demain.'),
      p('chapeau', "Lauréate en 2024 et reconduite pour 2026-2027, l'AEPC Nouvelle-Aquitaine anime le dispositif Usine du Futur 4 de la Région : plus de 150 entreprises industrielles accompagnées par une trentaine d'experts coordonnés."),
      bs('', [b('Échanger sur mon projet', CONTACT, 'bouton--sarcelle')]),
    ]), { tag: 'section' }),

    g('chiffres', g('enveloppe grille-4', [
      chiffre('icone-usine-s', '150+', 'entreprises industrielles accompagnées'),
      chiffre('icone-equipe', '30', 'experts coordonnés sur toute la région', true),
      chiffre('icone-valide', '2024', 'lauréate du dispositif'),
      chiffre('icone-etoile', '2026', 'confiance renouvelée par la Région pour 2026-2027', true),
    ]), { tag: 'section' }),

    g('section', g('enveloppe pile', [
      g('entete-section', [
        p('surtitre', 'Le programme'),
        t(2, 'titre-section', 'Accompagner les PME et ETI industrielles vers l’usine de demain.'),
        p('chapeau', `${lien('Usine du Futur', REGION_UDF, true)} est un programme de la Région Nouvelle-Aquitaine pour une industrie durable et compétitive. L'AEPC NA en assure l'animation : constitution des équipes, diagnostics sur site, accompagnement et reporting consolidé à la Région.`),
      ]),
      g('grille-3', [
        carte('Cellule de coordination', 'Un pilotage unique', "Chef de projet, PMO et spécialistes : pilotage, relation avec la Région, suivi des missions, des livrables et des échéances."),
        carte('Les experts', 'Au plus près des sites', "Une trentaine de consultants mobilisés selon la filière et la proximité géographique, liés par une charte de déontologie commune."),
        carte('La méthode', 'Une analyse 360°', "Diagnostic global de l'entreprise, toutes filières confondues, puis plan d'actions et accompagnement de la transformation."),
      ]),
    ]), { tag: 'section' }),

    g('section section--blanc', g('enveloppe pile', [
      g('entete-section', [
        p('surtitre', 'Les expertises mobilisées'),
        t(2, 'titre-section', 'Des compétences complémentaires, réunies dans une même équipe.'),
      ]),
      g('grille-3', [
        carte('Performance', 'Lean et organisation de production', 'Flux, productivité, organisation des ateliers et modèles Lean appliqués à la supply chain.'),
        carte('Industrie X.0', 'Numérique et industrie 4.0', 'Évolution vers l’industrie X.0 pour les PME, avec les apports de la recherche (Arts et Métiers, laboratoire IMS).'),
        carte('Investissement', 'Plans d’investissement', 'Modernisation des outils de production et priorisation des investissements.'),
        carte('Cybersécurité', 'Sensibilisation au risque cyber', 'Un enjeu stratégique pour les entreprises du territoire, traité avec le Campus Cyber Nouvelle-Aquitaine.'),
        carte('RSE', 'Consultants labellisés RSE', 'Nos consultants intervenants sont labellisés RSE dans le cadre du partenariat avec l’Agence LUCIE.'),
        carte('Aéronautique', 'Équipe labellisée Aero Excellence', 'Une équipe dédiée à la filière aéronautique, labellisée Aero Excellence.'),
      ]),
    ]), { tag: 'section' }),

    g('section--sombre', g('enveloppe pile consultants', [
      g('entete-section', [
        p('surtitre', 'Un écosystème qui nous fait confiance'),
        t(2, 'titre-section', 'Lancement de l’année 2026-2027 à Château Fage.'),
        p('chapeau', `Le 15 septembre 2026, nos consultants ont réuni la Région Nouvelle-Aquitaine, ADI Nouvelle-Aquitaine, Aero Excellence, le Campus Cyber Nouvelle-Aquitaine et Arts et Métiers autour des évolutions du dispositif. ${lien('Lire le compte rendu', U('/actualites/usine-du-futur-4-lancement-2026-2027-chateau-fage/'))}.`),
      ]),
      g('grille-3 galerie', [
        img('udf4-fage-ateliers', 'Ateliers entre consultants Usine du Futur 4 à Château Fage', 'galerie__photo', 'full'),
        img('udf4-fage-cybersecurite', 'Intervention du Campus Cyber Nouvelle-Aquitaine', 'galerie__photo', 'full'),
        img('udf4-fage-collectif', 'Le collectif de consultants de l’AEPC Nouvelle-Aquitaine', 'galerie__photo', 'full'),
      ]),
    ]), { tag: 'section' }),

    sectionFaq('usine-du-futur', 'Usine du Futur : vos questions.'),

    g('section', g('enveloppe', g('encart-sombre encart-sombre--large', [
      g('', [p('surtitre', 'Vous êtes industriel ?'), t(3, 'encart-sombre__titre', 'Préparez votre usine de demain avec un collectif d’experts.')]),
      bs('', [b('Échanger sur mon projet', CONTACT, 'bouton--blanc')]),
    ])), { tag: 'section' }),
  ].join('\n\n');

  // ---------- La parole du président (page Qui sommes-nous) ----------
  const sectionPresident = g('section section--blanc', g('enveloppe grille-2 president', [
    img('photo-charles-bourinet', "Charles Bourinet, président de l'AEPC Nouvelle-Aquitaine", 'president__photo', 'large'),
    g('president__texte', [
      p('surtitre', 'La parole du président'),
      t(2, 'titre-section', '« Créer des alliances pour être plus forts ensemble. »'),
      p('chapeau', "Charles Bourinet, consultant, président de l'AEPC Nouvelle-Aquitaine et membre de l'Institut Lean France, synthétise les observations des consultants de l'association sur les préoccupations des dirigeants : business model, fonds propres, gouvernance, cybersécurité."),
      p('president__lien', lien('Lire son analyse dans Placéco →', U('/actualites/antifragilite-inquietudes-dirigeants-nouvelle-aquitaine/'))),
    ]),
  ]), { tag: 'section' });

  const posts = [
    { type: 'post', slug: 'usine-du-futur-4-lancement-2026-2027-chateau-fage', date: '2026-09-15 18:00:00', image: 'udf4-fage-collectif',
      title: 'Usine du Futur 4 : une nouvelle année démarre à Château Fage', content: articleFage,
      seo_title: 'Usine du Futur 4 : lancement 2026-2027 à Château Fage | AEPC NA',
      description: "Séminaire Usine du Futur 4 du 15 septembre 2026 : l'AEPC NA, animateur du dispositif, réunit Région, ADI, Aero Excellence, Campus Cyber et Arts et Métiers.",
      excerpt: "Le 15 septembre 2026, nos consultants Usine du Futur ont lancé l'année 2026-2027 avec la Région, ADI, Aero Excellence, le Campus Cyber NA et Arts et Métiers." },
    { type: 'post', slug: 'actionnable-offre-rse-neo-terra-region-nouvelle-aquitaine', date: '2026-09-28 18:00:00', image: 'photo-signature-charte-rse-region',
      title: 'Actionnable référencé « Offre RSE Néo Terra » par la Région Nouvelle-Aquitaine', content: articleActionnable,
      seo_title: 'Actionnable, offre RSE référencée Néo Terra en Nouvelle-Aquitaine | AEPC NA',
      description: "Le parcours RSE Actionnable de l'AEPC NA et de Cinov NA est référencé Offre RSE Néo Terra par la Région Nouvelle-Aquitaine. Prochaine cohorte le 12 janvier 2027.",
      excerpt: "Le 28 septembre 2026, l'AEPC NA a signé la charte d'engagement des partenaires de la RSE en Nouvelle-Aquitaine : le parcours Actionnable est référencé Offre RSE Néo Terra." },
    { type: 'post', slug: 'antifragilite-inquietudes-dirigeants-nouvelle-aquitaine', date: '2026-10-19 12:00:00', image: 'photo-charles-bourinet',
      title: '« Il faut gagner en antifragilité » : les inquiétudes des dirigeants vues du terrain', content: articlePlaceco,
      seo_title: 'Inquiétudes des dirigeants en Nouvelle-Aquitaine : l’analyse de l’AEPC NA',
      description: "Dans Placéco, Charles Bourinet, président de l'AEPC Nouvelle-Aquitaine, décrypte les inquiétudes des dirigeants : matières premières, 2027, transmission, cyber, IA.",
      excerpt: "Matières premières, attentisme avant 2027, transmission, cybersécurité, IA : dans Placéco, Charles Bourinet dresse le portrait des préoccupations des dirigeants." },
  ];

  const faqSchema = Object.fromEntries(Object.entries(FAQ).map(([cle, items]) => [cle, items.map(([q, r]) => ({ q, r: sansBalises(r) }))]));

  return { actualites, usineDuFutur, posts, sectionFaq, sectionActusAccueil, sectionPresident, faqSchema };
};

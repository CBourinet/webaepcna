<?php
/**
 * Fonctions du thème AEPC Nouvelle-Aquitaine.
 *
 * @package aepcna
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'custom-logo' );
		// editor.css corrige ce que le canevas de Gutenberg casse (position:relative
		// forcé sur chaque bloc) : sans lui, l'aperçu s'effondre.
		add_editor_style( array( 'style.css', 'assets/editor.css' ) );
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		$version = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'aepcna', get_stylesheet_uri(), array(), $version );
		// Apparitions au défilement et ombre de l'en-tête : petit script, chargé en différé.
		wp_enqueue_script( 'aepcna-anime', get_theme_file_uri( 'assets/anime.js' ), array(), $version, array( 'in_footer' => true, 'strategy' => 'defer' ) );
	}
);

// Avant le premier affichage : signale que les apparitions sont possibles
// (jamais si le visiteur a demandé de réduire les animations).
add_action(
	'wp_head',
	function () {
		echo "<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-anime')</script>\n";
	},
	0
);

// Classe « page-<slug> » sur le corps de page : choisit l'illustration du bandeau.
add_filter(
	'body_class',
	function ( $classes ) {
		if ( is_page() ) {
			$classes[] = 'page-' . sanitize_html_class( get_post_field( 'post_name', get_queried_object_id() ) );
		}
		return $classes;
	}
);

// La police Figtree est auto-hébergée et déclarée dans theme.json (fontFace) :
// elle s'applique au site comme à l'éditeur, sans appel à Google Fonts.
add_action(
	'wp_head',
	function () {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( get_theme_file_uri( 'assets/fonts/figtree-latin.woff2' ) )
		);
	},
	1
);

// Contact Form 7 : pas de <p> automatiques, le gabarit porte les classes du thème.
add_filter( 'wpcf7_autop_or_not', '__return_false' );

/**
 * Anciennes adresses (site précédent) : redirection permanente vers l'accueil,
 * pour ne pas laisser d'anciennes pages indexées ni de 404.
 */
add_action(
	'template_redirect',
	function () {
		if ( ! is_404() ) {
			return;
		}
		$chemin    = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' );
		$base      = trim( (string) wp_parse_url( home_url(), PHP_URL_PATH ), '/' );
		$chemin    = $base && str_starts_with( $chemin, $base ) ? trim( substr( $chemin, strlen( $base ) ), '/' ) : $chemin;
		$anciennes = array(
			'au-service-de-la-transformation-des-acteurs-du-territoire',
			'2024/05/05/bonjour-tout-le-monde',
			'category/non-classe',
			'politique-de-confidentialite',
			'politique-de-cookies-ue',
			'hello-world',
			'sample-page',
			'page-d-exemple',
			'actualites/hello-world',
		);
		if ( in_array( $chemin, $anciennes, true ) ) {
			wp_safe_redirect( home_url( '/' ), 301 );
			exit;
		}
		// Archives de l'ancien site (auteurs, catégories, dates) : la rubrique Actualités les remplace.
		if ( preg_match( '#^(author|category|tag|\d{4})(/|$)#', $chemin ) ) {
			wp_safe_redirect( home_url( '/actualites/' ), 301 );
			exit;
		}
	}
);

/**
 * Données structurées (Yoast) : l'organisation décrite pour les moteurs de
 * recherche — adresse, contact, zone d'intervention, domaines d'expertise.
 */
add_filter(
	'wpseo_schema_organization',
	function ( $data ) {
		$data['alternateName'] = 'Association Économique des Professionnels du Conseil de Nouvelle-Aquitaine';
		$data['description']   = "Collectif de plus de 50 consultants indépendants de Nouvelle-Aquitaine, issus de la CPC NA : l'AEPC constitue et pilote l'équipe d'experts adaptée à chaque projet de transformation.";
		$data['foundingDate']  = '2023';
		$data['email']         = 'contactweb@aepcna.fr';
		$data['telephone']     = '+33610501077';
		$data['address']       = array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => '51-53 boulevard du Président Wilson',
			'postalCode'      => '33000',
			'addressLocality' => 'Bordeaux',
			'addressRegion'   => 'Nouvelle-Aquitaine',
			'addressCountry'  => 'FR',
		);
		$data['areaServed']    = array( '@type' => 'AdministrativeArea', 'name' => 'Nouvelle-Aquitaine' );
		$data['sameAs']        = array_values( array_unique( array_merge( (array) ( $data['sameAs'] ?? array() ), array( 'https://www.linkedin.com/company/aepcna' ) ) ) );
		$data['knowsAbout']    = array( 'Performance industrielle', 'Lean', 'Usine du futur', 'RSE', 'Stratégie d\'entreprise', 'Transformation des organisations', 'Formation professionnelle', 'Management' );
		return $data;
	}
);

/**
 * Le président, auteur des articles : sa fonction et ses appartenances,
 * pour que moteurs et assistants IA relient l'expert à l'association.
 */
add_filter(
	'wpseo_schema_person',
	function ( $data ) {
		if ( false === stripos( (string) ( $data['name'] ?? '' ), 'bourinet' ) ) {
			return $data;
		}
		$data['name']       = 'Charles Bourinet';
		$data['jobTitle']   = 'Président de l\'AEPC Nouvelle-Aquitaine, consultant';
		$data['worksFor']   = array( '@id' => trailingslashit( home_url() ) . '#organization' );
		$data['memberOf']   = array( '@type' => 'Organization', 'name' => 'Institut Lean France' );
		$data['knowsAbout'] = array( 'Lean', 'Business model', 'Gouvernance', 'Transformation d\'entreprise', 'Performance industrielle' );
		return $data;
	}
);

/**
 * Données structurées propres au thème, ajoutées au graphe Yoast :
 * questions fréquentes (FAQPage), offre Actionnable (Service, Offer, Event)
 * et programme Usine du Futur (Service).
 */
add_filter(
	'wpseo_schema_graph',
	function ( $graph ) {
		if ( ! is_singular( 'page' ) && ! is_front_page() ) {
			return $graph;
		}
		$slug  = is_front_page() ? 'accueil' : get_post_field( 'post_name', get_queried_object_id() );
		$url   = is_front_page() ? trailingslashit( home_url() ) : get_permalink( get_queried_object_id() );
		$orga  = array( '@id' => trailingslashit( home_url() ) . '#organization' );
		$zone  = array( '@type' => 'AdministrativeArea', 'name' => 'Nouvelle-Aquitaine' );
		$faq   = json_decode( (string) @file_get_contents( get_theme_file_path( 'donnees/faq.json' ) ), true );

		if ( ! empty( $faq[ $slug ] ) ) {
			$graph[] = array(
				'@type'      => 'FAQPage',
				'@id'        => $url . '#faq',
				'url'        => $url,
				'inLanguage' => 'fr-FR',
				'isPartOf'   => array( '@id' => $url ),
				'mainEntity' => array_map(
					function ( $item ) {
						return array(
							'@type'          => 'Question',
							'name'           => $item['q'],
							'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $item['r'] ),
						);
					},
					$faq[ $slug ]
				),
			);
		}

		if ( 'rse-actionnable' === $slug ) {
			$graph[] = array(
				'@type'       => 'Service',
				'@id'         => $url . '#service',
				'name'        => 'Actionnable — parcours RSE pour les PME de Nouvelle-Aquitaine',
				'serviceType' => 'Accompagnement RSE',
				'description' => 'Parcours RSE en cohorte de 3 à 8 entreprises : 6 jours de parcours consolidé et jusqu\'à 3 jours à la carte sur 6 mois, 25 consultants experts, neuf livrables jusqu\'au rapport RSE. Offre RSE référencée Néo Terra – Région Nouvelle-Aquitaine, portée par l\'AEPC NA avec la Fédération Cinov Nouvelle-Aquitaine.',
				'provider'    => $orga,
				'areaServed'  => $zone,
				'audience'    => array( '@type' => 'BusinessAudience', 'audienceType' => 'PME' ),
				'subjectOf'   => array(
					array( '@type' => 'CreativeWork', 'name' => 'Catalogue des offres et labels RSE reconnus par la Région', 'url' => 'https://www.calameo.com/read/0060092718ce69b679e0c', 'publisher' => array( '@type' => 'GovernmentOrganization', 'name' => 'Région Nouvelle-Aquitaine' ) ),
					array( '@type' => 'WebPage', 'name' => 'Un référencement régional pour structurer les démarches RSE', 'url' => 'https://entreprises.nouvelle-aquitaine.fr/actualites/un-referencement-regional-pour-structurer-les-demarches-rse' ),
					array( '@type' => 'WebPage', 'name' => 'Les solutions RSE', 'url' => 'https://events.adi-na.fr/content/les-solutions-rse', 'publisher' => array( '@type' => 'Organization', 'name' => 'ADI Nouvelle-Aquitaine' ) ),
				),
				'url'         => $url,
				'offers'      => array(
					array( '@type' => 'Offer', 'name' => '6 jours d\'accompagnement collectif', 'price' => '2227.50', 'priceCurrency' => 'EUR', 'priceSpecification' => array( '@type' => 'UnitPriceSpecification', 'price' => '2227.50', 'priceCurrency' => 'EUR', 'valueAddedTaxIncluded' => false ), 'url' => $url ),
					array( '@type' => 'Offer', 'name' => 'Module complémentaire à la carte', 'price' => '371.25', 'priceCurrency' => 'EUR', 'priceSpecification' => array( '@type' => 'UnitPriceSpecification', 'price' => '371.25', 'priceCurrency' => 'EUR', 'valueAddedTaxIncluded' => false ), 'url' => $url ),
				),
			);
			$graph[] = array(
				'@type'               => 'Event',
				'@id'                 => $url . '#cohorte-impulse',
				'name'                => 'Lancement de la cohorte « Impulse » du parcours RSE Actionnable',
				'description'         => 'Première session de la cohorte « Impulse » : 3 à 8 PME de Nouvelle-Aquitaine engagées dans le parcours RSE Actionnable, avec une animation sur site chez chaque entreprise à tour de rôle.',
				'startDate'           => '2027-01-12',
				'eventStatus'         => 'https://schema.org/EventScheduled',
				'eventAttendanceMode' => 'https://schema.org/OfflineEventAttendanceMode',
				'location'            => array(
					'@type'   => 'Place',
					'name'    => 'Nouvelle-Aquitaine — sur site, dans les entreprises de la cohorte',
					'address' => array( '@type' => 'PostalAddress', 'addressRegion' => 'Nouvelle-Aquitaine', 'addressCountry' => 'FR' ),
				),
				'organizer'           => $orga,
				'offers'              => array( '@type' => 'Offer', 'price' => '2227.50', 'priceCurrency' => 'EUR', 'url' => $url, 'availability' => 'https://schema.org/InStock' ),
				'url'                 => $url,
			);
		}

		if ( 'usine-du-futur' === $slug ) {
			$graph[] = array(
				'@type'       => 'Service',
				'@id'         => $url . '#service',
				'name'        => 'Usine du Futur Nouvelle-Aquitaine — animation et accompagnement des entreprises industrielles',
				'serviceType' => 'Conseil en performance industrielle',
				'description' => 'L\'AEPC NA anime le dispositif Usine du Futur 4 de la Région Nouvelle-Aquitaine : plus de 150 entreprises industrielles accompagnées par une trentaine d\'experts coordonnés (Lean, organisation de production, industrie X.0, investissements, sensibilisation cyber, RSE, filière aéronautique labellisée Aero Excellence).',
				'provider'    => $orga,
				'areaServed'  => $zone,
				'audience'    => array( '@type' => 'BusinessAudience', 'audienceType' => 'PME et ETI industrielles' ),
				'url'         => $url,
			);
		}
		return $graph;
	}
);

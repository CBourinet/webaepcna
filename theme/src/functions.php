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
		);
		if ( in_array( $chemin, $anciennes, true ) ) {
			wp_safe_redirect( home_url( '/' ), 301 );
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

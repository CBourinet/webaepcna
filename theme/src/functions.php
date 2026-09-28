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

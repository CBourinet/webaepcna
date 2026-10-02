<?php
/**
 * Déploiement du thème AEPC NA et du contenu (phase 5 de la méthode).
 *
 * Appelé depuis novamira/execute-php après extraction de l'archive du dépôt :
 *   require "$source/deploy/deploy.php"; return aepcna_deploy($source, $etapes);
 * $source contient theme/aepcna/ et deploy/. Chaque étape est idempotente.
 */

function aepcna_deploy( $source, $etapes = array( 'sauvegarde', 'theme', 'medias', 'formulaire', 'pages', 'accueil', 'purge' ), $seulement = array() ) {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$rapport = array();
	$base    = wp_parse_url( home_url(), PHP_URL_PATH );
	$base    = $base ? untrailingslashit( $base ) : '';
	$slug    = 'aepcna';

	// 0 · Sauvegarde de l'existant (une seule fois : on ne l'écrase jamais).
	if ( in_array( 'sauvegarde', $etapes, true ) ) {
		// Nom non devinable : le dossier uploads est servi publiquement.
		$deja    = glob( wp_upload_dir()['basedir'] . '/sauvegarde-avant-theme-aepcna-*.json' );
		$fichier = $deja ? $deja[0] : wp_upload_dir()['basedir'] . '/sauvegarde-avant-theme-aepcna-' . wp_generate_password( 16, false ) . '.json';
		if ( ! $deja ) {
			global $wpdb;
			$rows  = $wpdb->get_results( "SELECT ID, post_name, post_title, post_status, post_type, post_content FROM {$wpdb->posts} WHERE post_type IN ('page','post') AND post_status NOT IN ('auto-draft','revision')", ARRAY_A );
			$metas = array();
			foreach ( $rows as $r ) {
				$metas[ $r['ID'] ] = array(
					'_elementor_edit_mode' => get_post_meta( $r['ID'], '_elementor_edit_mode', true ),
					'_wp_page_template'    => get_post_meta( $r['ID'], '_wp_page_template', true ),
				);
			}
			file_put_contents(
				$fichier,
				wp_json_encode(
					array(
						'date'          => current_time( 'mysql' ),
						'theme_avant'   => get_stylesheet(),
						'show_on_front' => get_option( 'show_on_front' ),
						'page_on_front' => get_option( 'page_on_front' ),
						'custom_logo'   => get_theme_mod( 'custom_logo' ),
						'contenus'      => $rows,
						'metas'         => $metas,
					),
					JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
				)
			);
			$rapport['sauvegarde'] = 'écrite : ' . $fichier;
		} else {
			$rapport['sauvegarde'] = 'déjà présente : ' . $fichier;
		}
	}

	// 1-2 · Copier le thème et l'activer.
	if ( in_array( 'theme', $etapes, true ) ) {
		global $wp_filesystem;
		WP_Filesystem();
		$cible = get_theme_root() . '/' . $slug;
		if ( is_dir( $cible ) ) {
			$wp_filesystem->delete( $cible, true ); // pas d'anciens fichiers survivants
		}
		wp_mkdir_p( $cible );
		$r = copy_dir( $source . '/theme/aepcna', $cible );
		if ( is_wp_error( $r ) ) {
			return array( 'erreur' => $r->get_error_message() );
		}
		wp_clean_themes_cache();
		if ( get_stylesheet() !== $slug ) {
			switch_theme( $slug );
		}
		$rapport['theme'] = get_stylesheet() . ' ' . wp_get_theme()->get( 'Version' );
	}

	// 3 · Visuels du thème et documents PDF du dépôt dans la médiathèque (réutilisés s'ils existent déjà).
	$ids = array();
	if ( in_array( 'medias', $etapes, true ) || in_array( 'pages', $etapes, true ) ) {
		$dossier  = get_theme_root() . '/' . $slug . '/assets/img';
		$fichiers = array_merge( glob( $dossier . '/*.{jpg,png}', GLOB_BRACE ) ?: array(), glob( $source . '/deploy/documents/*.pdf' ) ?: array() );
		foreach ( $fichiers as $f ) {
			$nom      = pathinfo( $f, PATHINFO_FILENAME );
			$existant = get_posts(
				array(
					'post_type'   => 'attachment',
					'post_status' => 'inherit',
					'meta_key'    => '_aepcna_source',
					'meta_value'  => $nom,
					'numberposts' => 1,
					'fields'      => 'ids',
				)
			);
			if ( $existant ) {
				$ids[ $nom ] = (int) $existant[0];
				continue;
			}
			if ( ! in_array( 'medias', $etapes, true ) ) {
				continue;
			}
			$tmp = wp_tempnam( $nom );
			copy( $f, $tmp );
			$id = media_handle_sideload( array( 'name' => basename( $f ), 'tmp_name' => $tmp ), 0 );
			if ( is_wp_error( $id ) ) {
				$rapport['medias_erreurs'][ $nom ] = $id->get_error_message();
				continue;
			}
			update_post_meta( $id, '_aepcna_source', $nom );
			$ids[ $nom ] = (int) $id;
		}
		if ( isset( $ids['logo-aepc-na'] ) ) {
			set_theme_mod( 'custom_logo', $ids['logo-aepc-na'] );
			update_post_meta( $ids['logo-aepc-na'], '_wp_attachment_image_alt', 'AEPC Nouvelle-Aquitaine' );
		}
		$rapport['medias'] = count( $ids );
	}

	// 4 · Formulaire Contact Form 7 (réutilisé s'il existe).
	$formulaire = '';
	if ( in_array( 'formulaire', $etapes, true ) || in_array( 'pages', $etapes, true ) ) {
		if ( class_exists( 'WPCF7_ContactForm' ) ) {
			$titre     = 'AEPC NA — Demande de contact';
			$existants = get_posts( array( 'post_type' => 'wpcf7_contact_form', 'title' => $titre, 'posts_per_page' => 1, 'post_status' => 'any' ) );
			$form      = $existants ? WPCF7_ContactForm::get_instance( $existants[0]->ID ) : WPCF7_ContactForm::get_template( array( 'title' => $titre ) );
			if ( in_array( 'formulaire', $etapes, true ) ) {
				$gabarit = str_replace( '{{BASE}}', $base, file_get_contents( $source . '/deploy/formulaire.txt' ) );
				$domaine = wp_parse_url( home_url(), PHP_URL_HOST );
				$form->set_properties(
					array(
						'form' => $gabarit,
						'mail' => array(
							'active'             => true,
							'subject'            => '[AEPC NA] [_raw_objet] — [prenom] [nom] ([organisation])',
							'sender'             => 'AEPC Nouvelle-Aquitaine <wordpress@' . preg_replace( '/^www\./', '', $domaine ) . '>',
							'recipient'          => '[objet]', // chaque objet porte son adresse (pipes) : candidature consultant → secretaire@, Actionnable → actionnable@, le reste → contactweb@
							'body'               => "Nom : [prenom] [nom]\nOrganisation : [organisation]\nFonction : [fonction]\nE-mail : [email]\nTéléphone : [telephone]\nObjet : [_raw_objet]\nDépartement : [departement]\n\nMessage :\n[message]\n\n-- \nEnvoyé depuis le formulaire de contact de [_site_url]",
							'additional_headers' => 'Reply-To: [email]',
							'attachments'        => '',
							'use_html'           => false,
							'exclude_blank'      => false,
						),
					)
				);
				$form->save();
			}
			if ( $form->id() ) {
				$formulaire = sprintf( '[contact-form-7 id="%s" title="%s"]', $form->hash() ?: $form->id(), $form->title() );
			}
			$rapport['formulaire'] = $formulaire;
		} else {
			$formulaire            = '[contact-form-7 id="0" title="AEPC NA — Demande de contact"]';
			$rapport['formulaire'] = 'Contact Form 7 absent';
		}
	}

	// 5 · Pages.
	if ( in_array( 'pages', $etapes, true ) ) {
		$pages = json_decode( file_get_contents( $source . '/deploy/content.json' ), true );
		foreach ( $pages as $pg ) {
			if ( $seulement && ! in_array( $pg['slug'], $seulement, true ) ) {
				continue; // ne pas écraser les pages non concernées
			}
			$contenu = str_replace( '{{FORMULAIRE}}', $formulaire, $pg['content'] );
			$contenu = preg_replace_callback(
				'/\{\{(ID|SRC|URL):([a-z0-9-]+)(?::([a-z_]+))?\}\}/',
				function ( $m ) use ( $ids, &$rapport ) {
					$id = $ids[ $m[2] ] ?? 0;
					if ( ! $id ) {
						$rapport['images_manquantes'][ $m[2] ] = true;
					}
					if ( 'ID' === $m[1] ) {
						return (string) $id;
					}
					if ( 'URL' === $m[1] ) {
						return (string) wp_get_attachment_url( $id ); // lien vers un document (PDF)
					}
					$src = wp_get_attachment_image_src( $id, $m[3] ?: 'full' );
					return $src ? $src[0] : '';
				},
				$contenu
			);
			$contenu = str_replace( '"/site/', '"' . $base . '/', $contenu );
			$existe  = get_page_by_path( $pg['slug'] );
			$data    = array(
				'post_type'    => 'page',
				'post_title'   => $pg['title'],
				'post_name'    => $pg['slug'],
				'post_status'  => 'publish',
				'post_content' => $contenu,
			);
			if ( $existe ) {
				$data['ID'] = $existe->ID;
				$id         = wp_update_post( wp_slash( $data ), true );
			} else {
				$id = wp_insert_post( wp_slash( $data ), true );
			}
			if ( is_wp_error( $id ) ) {
				$rapport['pages'][ $pg['slug'] ] = $id->get_error_message();
				continue;
			}
			// Une page Elementor garderait son rendu Elementor : on la rend à l'éditeur de blocs.
			// Les données Elementor (_elementor_data) restent en base pour un retour arrière.
			delete_post_meta( $id, '_elementor_edit_mode' );
			delete_post_meta( $id, '_wp_page_template' );
			update_post_meta( $id, '_yoast_wpseo_metadesc', $pg['description'] );
			if ( ! empty( $pg['seo_title'] ) ) {
				update_post_meta( $id, '_yoast_wpseo_title', $pg['seo_title'] );
			}
			$rapport['pages'][ $pg['slug'] ] = $id;
		}
	}

	// 5 bis · SEO seul : titres et descriptions Yoast, sans toucher aux contenus.
	if ( in_array( 'seo', $etapes, true ) ) {
		foreach ( json_decode( file_get_contents( $source . '/deploy/content.json' ), true ) as $pg ) {
			$page = get_page_by_path( $pg['slug'] );
			if ( ! $page ) {
				continue;
			}
			update_post_meta( $page->ID, '_yoast_wpseo_metadesc', $pg['description'] );
			if ( ! empty( $pg['seo_title'] ) ) {
				update_post_meta( $page->ID, '_yoast_wpseo_title', $pg['seo_title'] );
			}
			$rapport['seo'][ $pg['slug'] ] = $pg['seo_title'] ?? '';
		}
	}

	// 6 · Page d'accueil statique.
	if ( in_array( 'accueil', $etapes, true ) ) {
		$accueil = get_page_by_path( 'accueil' );
		if ( $accueil ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $accueil->ID );
			$rapport['accueil'] = $accueil->ID;
		}
	}

	// 7 · Purge des caches.
	if ( in_array( 'purge', $etapes, true ) ) {
		wp_clean_themes_cache( true );
		if ( class_exists( 'WP_Theme_JSON_Resolver' ) ) {
			WP_Theme_JSON_Resolver::clean_cached_data();
		}
		wp_cache_flush();
		do_action( 'litespeed_purge_all' );
		// xSpeed Cache : seule la méthode de l'extension vide réellement ses deux
		// niveaux de cache (pages statiques et rendu PHP).
		if ( class_exists( '\\XSpeed\\Cache' ) && is_callable( array( '\\XSpeed\\Cache', 'purge_all' ) ) ) {
			@\XSpeed\Cache::purge_all();
		}
		$rapport['purge'] = 'ok';
	}

	$rapport['ids'] = $ids;
	return $rapport;
}

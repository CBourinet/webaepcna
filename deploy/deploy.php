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

	// 3 · Visuels dans la médiathèque (réutilisés s'ils existent déjà).
	$ids = array();
	if ( in_array( 'medias', $etapes, true ) || in_array( 'pages', $etapes, true ) ) {
		$dossier = get_theme_root() . '/' . $slug . '/assets/img';
		foreach ( glob( $dossier . '/*.{jpg,png}', GLOB_BRACE ) as $f ) {
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
				// Visuel modifié dans le thème : on remplace le fichier de la médiathèque (même identifiant, mêmes liens).
				$actuel = get_attached_file( $existant[0] );
				if ( in_array( 'medias', $etapes, true ) && $actuel && is_file( $actuel ) && md5_file( $actuel ) !== md5_file( $f ) ) {
					copy( $f, $actuel );
					foreach ( (array) get_post_meta( $existant[0], '_wp_attachment_metadata', true )['sizes'] ?? array() as $t ) {
						@unlink( dirname( $actuel ) . '/' . $t['file'] );
					}
					wp_update_attachment_metadata( $existant[0], wp_generate_attachment_metadata( $existant[0], $actuel ) );
					$rapport['medias_remplaces'][] = $nom;
				}
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
				'/\{\{(ID|SRC):([a-z0-9-]+)(?::([a-z_]+))?\}\}/',
				function ( $m ) use ( $ids, &$rapport ) {
					$id = $ids[ $m[2] ] ?? 0;
					if ( ! $id ) {
						$rapport['images_manquantes'][ $m[2] ] = true;
					}
					if ( 'ID' === $m[1] ) {
						return (string) $id;
					}
					$src = wp_get_attachment_image_src( $id, $m[3] ?: 'full' );
					return $src ? $src[0] : '';
				},
				$contenu
			);
			$contenu = str_replace( '"/site/', '"' . $base . '/', $contenu );
			$type    = $pg['type'] ?? 'page';
			$existe  = get_page_by_path( $pg['slug'], OBJECT, $type );
			$data    = array(
				'post_type'    => $type,
				'post_title'   => $pg['title'],
				'post_name'    => $pg['slug'],
				'post_status'  => 'publish',
				'post_content' => $contenu,
			);
			if ( 'post' === $type ) {
				// Articles : signés par le président, classés en Actualités, datés à leur première publication.
				$auteur               = get_user_by( 'login', 'charles.bourinet' );
				$categorie            = get_category_by_slug( 'actualites' );
				if ( ! $categorie ) {
					wp_insert_term( 'Actualités', 'category', array( 'slug' => 'actualites' ) );
					$categorie = get_category_by_slug( 'actualites' );
				}
				$data['post_excerpt'] = $pg['excerpt'] ?? '';
				if ( $auteur ) {
					$data['post_author'] = $auteur->ID;
				}
				if ( $categorie ) {
					$data['post_category'] = array( $categorie->term_id );
				}
				if ( ( ! $existe || 'future' === $existe->post_status ) && ! empty( $pg['date'] ) ) {
					// Jamais dans le futur (sinon l'article serait programmé, pas publié) ;
					// l'ordre du fichier est conservé, une minute d'écart entre articles.
					$restants = count( array_filter( array_slice( $pages, array_search( $pg, $pages, true ) + 1 ), function ( $x ) { return 'post' === ( $x['type'] ?? 'page' ); } ) );
					$horaire  = min( strtotime( $pg['date'] ), current_time( 'timestamp' ) - 60 * ( $restants + 1 ) );
					$data['post_date']     = gmdate( 'Y-m-d H:i:s', $horaire );
					$data['post_date_gmt'] = get_gmt_from_date( $data['post_date'] );
				}
			}
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
			if ( ! empty( $pg['noindex'] ) ) {
				update_post_meta( $id, '_yoast_wpseo_meta-robots-noindex', '1' );
			}
			if ( ! empty( $pg['image'] ) && ! empty( $ids[ $pg['image'] ] ) ) {
				set_post_thumbnail( $id, $ids[ $pg['image'] ] );
			}
			$rapport['pages'][ $pg['slug'] ] = $id;
		}
	}

	// 5 bis · SEO seul : titres et descriptions Yoast, sans toucher aux contenus.
	if ( in_array( 'seo', $etapes, true ) ) {
		foreach ( json_decode( file_get_contents( $source . '/deploy/content.json' ), true ) as $pg ) {
			$page = get_page_by_path( $pg['slug'], OBJECT, $pg['type'] ?? 'page' );
			if ( ! $page ) {
				continue;
			}
			update_post_meta( $page->ID, '_yoast_wpseo_metadesc', $pg['description'] );
			if ( ! empty( $pg['seo_title'] ) ) {
				update_post_meta( $page->ID, '_yoast_wpseo_title', $pg['seo_title'] );
			}
			if ( ! empty( $pg['noindex'] ) ) {
				update_post_meta( $page->ID, '_yoast_wpseo_meta-robots-noindex', '1' );
			}
			$rapport['seo'][ $pg['slug'] ] = $pg['seo_title'] ?? '';
		}
	}

	// 5 ter · Réglages de référencement : adresses des actualités, catégorie,
	// profil LinkedIn, pages sans valeur hors index, llms.txt pour les assistants IA.
	if ( in_array( 'reglages', $etapes, true ) ) {
		if ( '/actualites/%postname%/' !== get_option( 'permalink_structure' ) ) {
			global $wp_rewrite;
			$wp_rewrite->set_permalink_structure( '/actualites/%postname%/' );
			flush_rewrite_rules( false );
		}
		if ( ! get_category_by_slug( 'actualites' ) ) {
			wp_insert_term( 'Actualités', 'category', array( 'slug' => 'actualites' ) );
		}
		$categorie = get_category_by_slug( 'actualites' );
		update_option( 'default_category', $categorie->term_id );
		if ( class_exists( 'WPSEO_Options' ) ) {
			WPSEO_Options::set( 'linkedin_url', 'https://www.linkedin.com/company/aepcna' );
			$defaut = get_posts( array( 'post_type' => 'attachment', 'post_status' => 'inherit', 'meta_key' => '_aepcna_source', 'meta_value' => 'photo-reunion-travail', 'numberposts' => 1, 'fields' => 'ids' ) );
			if ( $defaut ) {
				WPSEO_Options::set( 'og_default_image', wp_get_attachment_url( $defaut[0] ) );
				WPSEO_Options::set( 'og_default_image_id', $defaut[0] );
			}
		}
		foreach ( array( 'avertissement', 'espace-adherents' ) as $sans_valeur ) {
			$p = get_page_by_path( $sans_valeur );
			if ( $p ) {
				update_post_meta( $p->ID, '_yoast_wpseo_meta-robots-noindex', '1' );
			}
		}
		$llms = file_get_contents( $source . '/deploy/llms.txt' );
		$ecrits = array();
		foreach ( array_unique( array( ABSPATH, trailingslashit( dirname( ABSPATH ) ) ) ) as $dossier ) {
			if ( is_writable( $dossier ) && false !== file_put_contents( $dossier . 'llms.txt', $llms ) ) {
				$ecrits[] = $dossier . 'llms.txt';
			}
		}
		$rapport['reglages'] = array( 'permaliens' => get_option( 'permalink_structure' ), 'categorie' => $categorie->term_id, 'llms' => $ecrits );
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

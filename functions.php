<?php
/**
 * ben functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package ben
 */

// Require the composer autoload for getting conflict-free access to enqueue
require_once __DIR__ . '/vendor/autoload.php';
require_once("controllers/Header.php");
require_once("controllers/Footer.php");
require_once("controllers/Contact.php");

wp_enqueue_style('site_main_css', get_template_directory_uri() . '/assets/styles/main.css', array(), '1.0', false);
wp_enqueue_script('site_main_js', get_template_directory_uri() . '/assets/scripts/main.js', array(), '1.0', true);

// Timber init
$timber = new Timber\Timber();

// Ajout des pages d'options
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
	acf_add_options_sub_page("Header");
	acf_add_options_sub_page("Footer");
	acf_add_options_sub_page("Contact");
}

// SVG
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
   }
add_filter('upload_mimes', 'cc_mime_types');

// Ajout d'un menu Wordpress
function register_menu() {
	register_nav_menu('menu_header',__( 'Menu Header' ));
}

add_action( 'init', 'register_menu' );

// Ajout au contexte global de Timber
function add_to_context($context)
{
    $context['menu'] = new \Timber\Menu('menu_header');
    $context['header'] = new Header();
	$context['footer'] = new Footer();
	$context['contact'] = new Contact();	

    return $context;
}

add_filter('timber/context', 'add_to_context');
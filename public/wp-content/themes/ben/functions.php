<?php
/**
 * ben functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package ben
 */
use App\App;

// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {  
	// Define the style_formats array
	$style_formats = array(  
		// Each array child is a format with it's own settings
		array(
            'title' => 'Text de titre bordure',
            'inline' => 'span',
            'classes' => 'text--border'
        ),
	);  
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = wp_json_encode( $style_formats );  
	
	return $init_array;  
} 

// Attach callback to 'tiny_mce_before_init' 
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );  

function enqueue_scripts() {
	wp_enqueue_style('site_main_css', get_template_directory_uri() . '/assets/styles/main.css', array(), '1.0', false);
	wp_enqueue_script('site_main_js', get_template_directory_uri() . '/assets/scripts/main.js', array(), '1.0', true);
}

add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );

// Ajout des pages d'options
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
	acf_add_options_sub_page("Header");
	acf_add_options_sub_page("Footer");
	acf_add_options_sub_page("Contact");
	acf_add_options_sub_page("Utilitaires");
	acf_add_options_sub_page("Transition");
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

add_action( 'after_setup_theme', 'wpse3882_after_setup_theme' );
function wpse3882_after_setup_theme()
{
    add_editor_style();
}

// Ajout au contexte global de Timber
add_filter('timber/context', 'add_to_context');
function add_to_context($context)
{
    $context['menu'] = new \Timber\Menu('menu_header');
    $context['header'] = new \App\Entities\Header();
	$context['footer'] = new \App\Entities\Footer();
	$context['contact'] = new \App\Entities\Contact();
	$context['utils'] = new \App\Entities\Utilitaires();
	$context['transition'] = new \App\Entities\Transition();

    return $context;
}

if (is_admin()) {
	$editor = new \App\Controllers\Editor();
}

function image_description_shortcode( $atts, $content = null ) {
	return '<span class="imagedescription">' . $content . '</span>';
}
add_shortcode( 'imagedescription', 'image_description_shortcode' );
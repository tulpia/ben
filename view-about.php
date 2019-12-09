<?php
/**
 * Template Name: About
 */
<?php
/**
 * Template Name: Travaux
 */

// require_once("controllers/PageTravaux.php");

$context = Timber::get_context();
// $context["fields"] = new PageTravaux();

Timber::render( 'views/about.twig', $context );
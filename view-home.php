<?php
/**
 * Template Name: Home. West Virginia.
 */
include_once("controllers/PageHome.php");

$context = Timber::get_context();
$context["fields"] = new PageHome();

Timber::render( 'views/home.twig', $context );
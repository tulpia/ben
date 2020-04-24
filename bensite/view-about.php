<?php
/**
 * Template Name: About
 */
include_once("controllers/PageAbout.php");
$context = Timber::get_context();
$context["fields"] = new PageAbout();

Timber::render( 'views/about.twig', $context );
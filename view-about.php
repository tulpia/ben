<?php
/**
 * Template Name: About
 */

$context = Timber::get_context();
// $context["fields"] = new PageTravaux();

Timber::render( 'views/about.twig', $context );
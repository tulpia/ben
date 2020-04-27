<?php
/**
 * Template Name: Home. West Virginia.
 */
use App\App;
use Timber\Timber;

$context = Timber::get_context();
$context["fields"] = new \App\Entities\PageHome();

Timber::render( 'views/home.twig', $context );
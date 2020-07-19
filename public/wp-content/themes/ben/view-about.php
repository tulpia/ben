<?php
/**
 * Template Name: About
 */
use App\App;
use Timber\Timber;

$context = Timber::get_context();
$context["fields"] = new \App\Entities\PageAbout();

Timber::render( 'views/about.twig', $context );
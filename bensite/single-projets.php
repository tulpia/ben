<?php
/**
 * Template Name: Single projets
 */
include_once("controllers/SingleProjets.php");

$context = Timber::get_context();
$context["fields"] = new SingleProjets();

Timber::render( 'views/single-projets.twig', $context );
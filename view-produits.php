<?php
/**
 * Template Name: Travaux
 */

require_once("controllers/PageTravaux.php");

$context = [];
$context["fields"] = new PageTravaux();

Timber::render( 'views/listing-travaux.twig', $context );
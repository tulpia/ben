<?php
/**
 * Template Name: Home. West Virginia.
 */
include_once("controllers/PageHome.php");

$context = [];
$context["test"] = "hello";
$context["fields"] = new PageHome();

Timber::render( 'views/home.twig', $context );
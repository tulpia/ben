<?php
/**
 * Template Name: Contact
 */
require_once("controllers/PageContact.php");

$context = [];
$context["fields"] = new PageContact();

Timber::render( 'views/contact.twig', $context );
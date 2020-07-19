<?php
/**
 * Template Name: Travaux
 */
namespace App\Entities;

use App\App;
use Timber\Timber;

$context = Timber::get_context();
$context["fields"] = new PageTravaux();

Timber::render( 'views/listing-travaux.twig', $context );
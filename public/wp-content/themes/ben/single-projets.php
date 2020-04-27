<?php
/**
 * Template Name: Single projets
 */
namespace App\Entities;

use App\App;
use Timber\Timber;

$context = Timber::get_context();
$context["fields"] = new SingleProjets();

Timber::render( 'views/single-projets.twig', $context );
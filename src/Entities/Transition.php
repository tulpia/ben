<?php
namespace App\Entities;

class Transition {
    public $images;

    public function __construct() {
        $this->images = $this->getImages();
    }

    private function getImages() {
        $block = get_field("transition_images", "option");
    
        return $block;
    }
};
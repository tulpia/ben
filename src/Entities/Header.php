<?php
namespace App\Entities;

class Header {
    public $logo;
    public $links;

    public function __construct() {
        $this->logo = $this->getLogo();
        $this->links = $this->getLinks();
    }

    private function getLogo() {
        $block = get_field("header_logo", "option");

        return $block;
    }

    private function getLinks() {
        $block = get_field("header_links", "option");
    
        return $block;
    }
}
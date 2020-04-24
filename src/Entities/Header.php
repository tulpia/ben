<?php
namespace App\Entities;

class Header {
    public $logo;

    public function __construct() {
        $this->logo = $this->getLogo();
    }

    private function getLogo() {
        $block = get_field("header_logo", "option");

        return $block;
    }
}
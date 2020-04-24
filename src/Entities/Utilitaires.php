<?php
namespace App\Entities;

class Utilitaires {
    public $btn_contact;
    public $btn_grand;

    public function __construct() {
        $this->btn_contact = $this->getBtnContact();
        $this->btn_grand = $this->getBtnGrand();
    }

    private function getBtnContact() {
        $block = get_field("utils_btn_contact", "option");

        return $block;
    }

    private function getBtnGrand() {
        $block = get_field("utils_btn_grand", "option");
    
        return $block;
    }
}
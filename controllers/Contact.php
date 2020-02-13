<?php

class Contact {
    public $block_introduction;
    public $block_reseaux;
    public $block_contact;

    public function __construct() {
        $this->block_introduction = $this->getBlockIntroduction();
        $this->block_reseaux = $this->getBlockReseaux();
        $this->block_contact = $this->getBlockContact();
    }

    private function getBlockIntroduction() {
        $block = get_field("contact_titre", "option");

        return $block;
    }

    private function getBlockReseaux() {
        $block = new \StdClass();

        $block->title = get_field("contact_reseaux_titre", "option");
        $block->contacts = get_field("contact_reseaux_contacts", "option");

        return $block;
    }

    private function getBlockContact() {
        $block = new \StdClass();

        $block->title = get_field("contact_contact_titre", "option");
        $block->contacts = get_field("contact_contact_contacts", "option");

        return $block;
    }
}
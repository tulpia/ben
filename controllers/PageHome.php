<?php

class PageHome {
    public $block_landing;
    public $block_about;
    public $block_works;

    public function __construct() {
        $this->block_landing = $this->getLanding();
        $this->block_about = $this->getAbout();
        $this->block_works = $this->getWorks();
    }

    private function getLanding() {
        $block = new \StdClass();

        $block->title = get_field("landing_herotext");
        $block->sidetext = get_field("landing_sidetext");

        return $block;
    }

    private function getAbout() {
        $block = new \StdClass();

        $block->image = get_field("about_image");
        $block->title = get_field("about_titre");
        $block->description = get_field("about_description");
        $block->link = get_field("about_contact_link");

        return $block;
    }

    private function getWorks() {
        $block = new \StdClass();

        $block->title = get_field("works_title");
        $block->description = get_field("works_description");
        $block->link = get_field("works_link");

        return $block;
    }
}
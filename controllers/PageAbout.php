<?php

class PageAbout {
    public $block_introduction;
    public $block_contenu;

    public function __construct() {
        $this->block_introduction = $this->getBlockIntroduction();
        $this->block_contenu = $this->getBlockContenu();
    }

    private function getBlockIntroduction() {
        $block = new \StdClass();

        $block->image = get_field('introduction_photo');
        $block->title = get_field('introduction_title');
        $block->subtitle = get_field('introduction_subtitle');
        $block->description = get_field('introduction_description');
        $block->link = get_field('introduction_cv');
        $block->post_title = get_the_title();

        return $block;
    }

    private function getBlockContenu() {
        $block = new \StdClass();
    
        $block->identite = get_field('contenu_identite');
        $block->illustration = get_field('contenu_illustration');
        $block->webdesign = get_field('contenu_webdesign');
        $block->motion = get_field('contenu_motion');

        return $block;
    }
}
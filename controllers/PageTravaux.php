<?php

class PageTravaux {
    public $block_introduction;

    public function __construct() {
        $this->block_introduction = $this->getBlockIntroduction();
    }

    private function getBlockIntroduction() {
        $block = new \StdClass();

        $block->title = get_field("introduction_title");

        return $block;
    }
}
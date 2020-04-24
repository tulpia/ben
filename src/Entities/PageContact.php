<?php
namespace App\Entities;

class PageContact extends Post  {
    public $block_introduction;

    public function __construct() {
        $this->block_introduction = $this->getBlockIntroduction();
    }

    private function getBlockIntroduction() {
        $block = new \StdClass();

        $block->title = get_field("title");
        $block->description = get_field("description");

        return $block;
    }
}
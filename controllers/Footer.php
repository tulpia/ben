<?php

class Footer {
    public $copyright;
    public $developer;

    public function __construct() {
        $this->copyright = $this->getCopyright();
        $this->developer = $this->getDeveloper();
    }

    private function getCopyright() {
        $block = get_field("footer_copyright", "option");

        return $block;
    }

    private function getDeveloper() {
        $block = get_field("footer_developer", "option");

        return $block;
    }
}
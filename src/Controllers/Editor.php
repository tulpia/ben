<?php

namespace App\Controllers;

class Editor extends Controller {
    public function __construct() {
        self::initCustomTinyMCE();
    }

    private static function initCustomTinyMCE() {
        // Register our callback to the appropriate filter
        add_filter( 'mce_buttons_2', function($buttons) {
            array_unshift( $buttons, 'styleselect' );
            return $buttons;
        });
    }
}
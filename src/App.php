<?php

namespace App;

use Timber\Timber;

class App {
    private static $instance = null;

    public function __construct() {
        $this->loadTimber();
    }

    public static function getInstance() {
        if (is_null(self::$instance)) {
            self::$instance = new App();
        }

        return self::$instance;
    }

    private static function loadTimber() {
        $timber = new Timber();
    }
}
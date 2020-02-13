<?php

class PageTravaux {
    public $block_introduction;
    public $block_contenu;

    public function __construct() {
        $this->block_introduction = $this->getBlockIntroduction();
        $this->block_contenu = $this->getBlockContenu();
    }

    private function getBlockIntroduction() {
        $block = new \StdClass();

        $block->title = get_field("introduction_title");

        return $block;
    }
    
    private function getBlockContenu() {
        $block = new \StdClass();

        $args = [
            "post_type" => "projets",
            "posts_per_page" => -1,
            "order" => "DESC"
        ];

        $block->posts = get_posts($args);

        $i = 0;
        foreach ($block->posts as $post) {
            $i++;
            if ($i < 10) {
                $i = "0" . $i;
            }
            $post->permalink = get_permalink($post->ID);
            $post->image = get_field("images", $post->ID);
            $post->category = get_the_category($post->ID);
            $post->index = $i;
        }

        $block->categories = get_categories(array(
            'orderby' => 'name',
            'order'   => 'DESC'
        ));
    
        return $block;
    }
}
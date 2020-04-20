<?php

class SingleProjets {
    public $block_introduction;
    public $block_contenu;
    public $block_otherworks;

    public function __construct() {
        $this->block_introduction = $this->getBlockIntroduction();
        $this->block_contenu = $this->getBlockContenu();
        $this->block_otherworks = $this->getBlockOtherWorks();
    }

    private function getBlockIntroduction() {
        $block = new \StdClass();
        
        $block->post_title = get_the_title();
        $block->image = get_field("images");
        $block->category = get_the_category();
        $block->date = get_the_date("d/m/y");
        
        return $block;
    }

    private function getBlockContenu() {
        $block = new \StdClass();

        $block->blocks = get_field("blocks");
        
        return $block;
    }

    private function getBlockOtherWorks() {
        $block = new \StdClass();
        
        $block->title = "Autres travaux";

        $args = [
            "post_type" => "projets",
            "posts_per_page" => -1,
            "orderby" => "date",
            "order" => "DESC",
            'post__not_in' => array(get_the_ID())
        ];
        $block->posts = get_posts($args);

        foreach ($block->posts as $post) {
            $post->image = get_field("images", $post->ID);
            $post->permalink = get_permalink($post->ID);
        }
        
        return $block;
    }
}
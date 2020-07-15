<?php
namespace App\Entities;

class PageHome extends Post {
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
        $block->image = get_field("landing_image");
        $block->picto_1 = get_field("landing_picto_1");
        $block->picto_2 = get_field("landing_picto_2");

        return $block;
    }

    private function getAbout() {
        $block = new \StdClass();
        
        $block->description = get_field("about_description");
        $block->link = get_field("about_link");

        return $block;
    }

    private function getWorks() {
        $block = new \StdClass();
        $args = [
            "post_type" => "projets",
            "posts_per_page" => -1,
            "order" => "DESC"
        ];

        $block->title = get_field("works_title");
        $block->link = get_field("works_link");
        $block->posts = get_posts($args);
        $block->categories = get_categories(array(
            'orderby' => 'name',
            'order'   => 'ASC'
        ));

        foreach ($block->posts as $post) {
            $post->permalink = get_permalink($post->ID);
            $post->image = get_field("images", $post->ID);
            $post->category = get_the_category($post->ID)[0];
        }

        return $block;
    }
}
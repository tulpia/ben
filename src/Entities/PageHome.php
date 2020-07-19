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
        $block->images = get_field("about_images");

        return $block;
    }

    private function getWorks() {
        $block = new \StdClass();

        $block->title = get_field("works_title");
        $block->gameboy = get_field("works_gameboy");
        $block->image = get_field("works_parallax_image");
        
        // Recup des posts par categorie
        $categories = [];
        $allcats = get_categories();

        if (count($allcats) > 1) {
            foreach($allcats as $cat) {
                $catobject = new \StdClass();
                
                $catobject->title = $cat->name;
                $catobject->link = get_category_link($cat->cat_ID);
                $catobject->slug = $cat->slug;

                $posts = get_posts([
                    "post_type" => "projets",
                    "category" => $cat->cat_ID,
                    "numberposts" => 3,
                    "orderby" => "date",
                    "order" => "DESC"
                ]);

                // Recuperation des permalinks et autre data de chaque post
                foreach($posts as $post) {
                    $image = get_field("photo_une", $post->ID);

                    if ($image) {
                        $post->image = $image;
                    } else {
                        $post->image = get_field("images", $post->ID);
                    }

                    $post->permalink = get_permalink($post->ID);
                }
                
                $catobject->posts = $posts;

                $categories[] = $catobject;
            }
        }

        $block->categories = $categories;

        return $block;
    }
}
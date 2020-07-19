import Highway from "@dogstudio/highway";
import LinkAnimation from "../_animation/_linkAnimation";
import WorksHover from "../_animation/_workshover";
import AboutHover from "../_animation/_aboutHover";

class Home extends Highway.Renderer {
  onEnter() {
    /**
     * ABOUT
     */
    const aboutContainer = document.querySelector(".block-about");
    const aboutTexts = [
      ...aboutContainer.querySelectorAll(".imagedescription"),
    ];
    const aboutImages = [...document.querySelectorAll(".block-about-image")];
    const aboutAnim = new AboutHover(aboutTexts, aboutImages);

    aboutAnim.init();

    /**
     * WORKS
     */
    const worksContainer = document.querySelector(".block-works");
    const categoryLinks = [
      ...worksContainer.querySelectorAll(".categories__category"),
    ];

    // HOVER
    if (categoryLinks.length) {
      const hoverMenu = new LinkAnimation(categoryLinks);
      hoverMenu.init();
    }

    // TRAVAUX
    const worksImages = [
      ...worksContainer.querySelectorAll(".images__images-container"),
    ];
    const hoverWorks = new WorksHover(categoryLinks, worksImages);
    hoverWorks.init();
  }

  onEnterCompleted() {}
}

export default Home;

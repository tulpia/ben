import Highway from "@dogstudio/highway";
import Swiper from "swiper";

class SingleProjets extends Highway.Renderer {
  onEnter() {
    if (!document.body.classList.contains("is-landing-animated")) {
      document.body.classList.add("is-landing-animated");
    }
  }

  onEnterCompleted() {
    /**
     * OTHER WORKS
     */
    // OTHER TRAVAUX - SLIDER
    const sliderOtherContainer = document.querySelector(
      ".block-other-works__slider-container"
    );
    // eslint-disable-next-line
    const sliderOther = new Swiper(sliderOtherContainer, {
      loop: true,
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 240,
    });
  }

  onLeave() {}
}

export default SingleProjets;

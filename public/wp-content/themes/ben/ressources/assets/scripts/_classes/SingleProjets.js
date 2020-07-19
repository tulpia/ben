import Highway from "@dogstudio/highway";
import Swiper from "swiper";
import TextSplit from "../_animation/_textsplit";
import { gsap } from "gsap";
import ClassWatcher from "../_animation/_classwatcher";

class SingleProjets extends Highway.Renderer {
  onEnterCompleted() {
    /**
     * ANIMATIONS
     */
    // LANDING
    const introductionContainer = document.querySelector(".block-introduction");
    const introductionTitleContainer = introductionContainer.querySelector(
      ".content-container__title-container"
    );
    const introductionTitle = new TextSplit(introductionTitleContainer);
    const introductionImage = introductionContainer.querySelector(
      ".block-introduction__image-container img"
    );
    const introductionImageOverlay = introductionContainer.querySelector(
      ".image-container__overlay"
    );
    const introductionDetails = [
      ...introductionContainer.querySelectorAll(".details-container"),
    ];
    const introductionScroll = introductionContainer.querySelector(
      ".block-introduction__scroll"
    );
    const introductionTl = gsap.timeline({ paused: true });

    introductionTl
      .fromTo(
        introductionImageOverlay,
        {
          yPercent: 0,
        },
        {
          yPercent: 100,
          duration: 0.5,
          ease: "circ.inOut",
        }
      )
      .fromTo(
        introductionImage,
        {
          scale: 1.2,
        },
        {
          scale: 1,
          duration: 0.5,
          ease: "circ.inOut",
        },
        0
      )
      .fromTo(
        introductionDetails,
        {
          opacity: 0,
          y: 5,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.075,
        },
        ">0.05"
      )
      .fromTo(
        introductionScroll,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        ">0.6"
      );

    setTimeout(() => {
      introductionTitleContainer.classList.remove("is-hidden");

      introductionTitle.play();
      setTimeout(() => {
        introductionTl.play();
      }, 200);
    }, 150);

    // CONTENU
    const blocks = document.querySelectorAll(".contenu");
    const sectionBlocks = [];

    blocks.forEach((block) => {
      let tl = gsap.timeline({ paused: true });

      if (block.querySelector(".contenu__title-container")) {
        tl.fromTo(
          block,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          }
        ).fromTo(
          block.querySelector(".title-container__line"),
          {
            width: "0%",
          },
          {
            width: "100%",
            duration: 0.6,
            ease: "circ.inOut",
          },
          0.05
        );
      } else {
        tl.fromTo(
          block,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          }
        );
      }

      sectionBlocks.push({ trigger: block, timeline: tl });
    });

    sectionBlocks.forEach(
      (block) => new ClassWatcher(block.trigger, block.timeline)
    );

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
      on: {
        init: () => {
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent("updateScroll", {}));
          }, 350);
        },
      },
    });
  }

  onLeave() {}
}

export default SingleProjets;

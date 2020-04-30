import Highway from "@dogstudio/highway";
import WorksFilter from "../_tools/_worksfilter";
import TextSplit from "../_animation/_textsplit";
import { gsap } from "gsap";
import ClassWatcher from "../_animation/_classwatcher";

class Travaux extends Highway.Renderer {
  onEnterCompleted() {
    /**
     * ANIMATIONS
     */
    // LANDING
    const introContainer = document.querySelector(".block-title");
    const introTitle = new TextSplit(
      introContainer.querySelector(".title-container")
    );
    const introCategory = document.querySelectorAll(".category__text");
    const introFirstWork = document.querySelector(".is-first-shown");
    const introTl = gsap.timeline({ paused: true });

    introTl
      .fromTo(
        introCategory,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.075,
        }
      )
      .fromTo(
        introFirstWork,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        "<0.45"
      );

    // TRAVAUX
    const works = [...document.querySelectorAll(".is-first-shown")];
    // on enleve le premier element vu qu'il est deja anime en haut
    works.shift();

    works.forEach((work) => {
      const tl = gsap.timeline({ paused: true });

      tl.from(
        work,
        {
          opacity: 0,
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        }
      );

      new ClassWatcher(work, tl);
    });

    setTimeout(() => {
      introContainer.classList.remove("is-hidden");
      introTitle.play();

      setTimeout(() => {
        introTl.play();
      }, 200);
    }, 500);

    /**
     * FITLRE
     */
    const filtreContainer = document.querySelector(".select-category");
    const filtreArguments = filtreContainer.querySelectorAll(
      ".select-category__category"
    );
    const filtrePosts = document.querySelectorAll(".travaux-post");

    const filtre = new WorksFilter(
      filtreContainer,
      filtreArguments,
      filtrePosts,
      true
    );
    filtre.init();
  }
}

export default Travaux;

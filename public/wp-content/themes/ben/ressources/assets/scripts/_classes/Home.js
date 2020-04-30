import Highway, { async } from "@dogstudio/highway";
import WorksFilter from "../_tools/_worksfilter";
import TextSplit from "../_animation/_textsplit";
import { gsap } from "gsap";
import SplitText from "../_tools/_splittext";
import ClassWatcher from "../_animation/_classwatcher";

class Home extends Highway.Renderer {
  onEnter() {}

  onEnterCompleted() {
    /**
     * FITLRE
     */
    const filtreContainer = document.querySelector(".select-category");
    const filtreArguments = filtreContainer.querySelectorAll(
      ".select-category__category"
    );
    const filtrePosts = document.querySelectorAll(".work-post");

    const filtre = new WorksFilter(
      filtreContainer,
      filtreArguments,
      filtrePosts
    );
    filtre.init();

    /**
     * ANIMATIONS
     */

    // LANDING
    const landingTitleContainer = document.querySelector(".title-home");
    const landingTitleSplit = new TextSplit(landingTitleContainer);
    const landingImageContainer = document.querySelector(
      ".block-introduction__image-container"
    );
    const landingHeaderContainer = document.querySelector("header");
    const landingLinksContainer = document.querySelectorAll(
      ".side-texts__list"
    );
    const landingScrollBtn = document.querySelector(
      ".block-introduction__scroll-container"
    );
    const tlLanding = gsap.timeline({ paused: true });

    tlLanding
      .from(landingImageContainer, {
        opacity: 0,
        duration: 0.5,
      })
      .fromTo(
        landingHeaderContainer,
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "expo.inOut",
          duration: 0.6,
        },
        "<0.3"
      )
      .fromTo(
        landingLinksContainer,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.35,
          stagger: 0.05,
        },
        "<0.4"
      )
      .from(
        landingScrollBtn,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
        },
        "<0.2"
      );

    setTimeout(() => {
      if (
        document
          .querySelector(".block-introduction")
          .classList.contains("is-hidden")
      ) {
        document
          .querySelector(".block-introduction")
          .classList.remove("is-hidden");
        landingTitleSplit.play();

        document.addEventListener("splitFinished", () => {
          setTimeout(() => {
            tlLanding.play();
          }, 250);
        });
      }
    }, 500);

    const sectionWatchers = [];

    // ABOUT
    const aboutContainer = document.querySelector(".block-about");
    const aboutImage = aboutContainer.querySelector(
      ".block-about__img-container"
    );
    const aboutText = new SplitText(
      aboutContainer.querySelector(".content-container__text"),
      { type: "words" }
    );
    const aboutTl = gsap.timeline({ paused: true });

    aboutTl
      .from(aboutImage, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "circ.inOut",
      })
      .fromTo(
        aboutText.words,
        {
          y: 11,
          x: 7,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          ease: "circ.inOut",
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
        },
        "<0.15"
      );

    sectionWatchers.push({ trigger: aboutContainer, timeline: aboutTl });

    // WORKS
    const worksContainer = document.querySelector(".block-works");
    const worksCategories = worksContainer.querySelectorAll(".category__text");
    const worksProjects = [...worksContainer.querySelectorAll(".work-post")];
    const worksTl = gsap.timeline({ paused: true });

    worksTl
      .fromTo(
        worksCategories,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
        }
      )
      .fromTo(
        worksProjects,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
        }
      );

    sectionWatchers.push({ trigger: worksContainer, timeline: worksTl });

    // TITRES
    const allTitles = document.querySelectorAll(".title-container");

    allTitles.forEach((title) => {
      if (title.getAttribute("data-animation") === "true") {
        const split = new TextSplit(title);
        split.watch();
      }
    });

    // Run les anims
    sectionWatchers.forEach(
      (section) => new ClassWatcher(section.trigger, section.timeline)
    );
  }
}

export default Home;

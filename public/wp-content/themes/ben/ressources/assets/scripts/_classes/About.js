import Highway from "@dogstudio/highway";
import TextSplit from "../_animation/_textsplit";
import SplitText from "../_tools/_splittext";
import { gsap } from "gsap";
import ClassWatcher from "../_animation/_classwatcher";
import throttle from "lodash.throttle";

class About extends Highway.Renderer {
  onEnterCompleted() {
    /**
     * ANIMATIONS
     */
    const introductionContainer = document.querySelector(".block-introduction");
    const introductionTitleContainer = introductionContainer.querySelector(
      ".content-container__title-container"
    );
    const introductionTitle = new TextSplit(introductionTitleContainer);
    const introductionImage = introductionContainer.querySelector(
      ".upper__image-container img"
    );
    const introductionSubtitleContainer = introductionContainer.querySelector(
      ".upper__content-container .text--white"
    );
    const introductionSubtitle = new SplitText(introductionSubtitleContainer, {
      type: "lines",
    });
    const introductionScrollingTitle = introductionContainer.querySelector(
      ".scrolling-title"
    );
    const introductionTl = gsap.timeline({ paused: true });

    introductionTl
      .fromTo(
        introductionSubtitle.lines,
        {
          y: 10,
          x: 5,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.075,
        }
      )
      .fromTo(
        introductionImage,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        0.1
      )
      .fromTo(
        introductionScrollingTitle,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
        },
        "<0.4"
      );

    if (introductionSubtitle) {
      setTimeout(() => {
        introductionTitleContainer.classList.remove("is-hidden");
        introductionSubtitleContainer.classList.remove("is-hidden");

        introductionTitle.play();
        setTimeout(() => {
          introductionTl.play();
        }, 350);
      }, 150);
    }

    // CONTENU
    const blocks = [...document.querySelectorAll(".block-about-content")];
    const sections = [];
    const splits = [];
    let isResized = false;

    blocks.forEach((block) => {
      const tl = gsap.timeline({ paused: true });
      const frontTextSplit = new SplitText(
        block.querySelector(".title-container__main"),
        {
          type: "chars",
        }
      );
      const backTextSplit = new SplitText(
        block.querySelector(".title-container__back"),
        {
          type: "chars",
        }
      );
      const index = block.querySelector(".content-container__count");
      const text = new SplitText(
        block.querySelector(".content-container__text"),
        { type: "lines" }
      );

      tl.fromTo(
        index,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
        }
      )
        .fromTo(
          frontTextSplit.chars,
          {
            y: 10,
            x: 10,
          },
          {
            y: 0,
            x: 0,
            duration: 0.65,
            stagger: 0.02,
            ease: "back.inOut(6)",
          },
          "<0.15"
        )
        .fromTo(
          backTextSplit.chars,
          {
            y: 10,
            x: 10,
          },
          {
            y: 0,
            x: 0,
            duration: 0.65,
            stagger: 0.02,
            ease: "back.inOut(6)",
          },
          0.1
        )
        .fromTo(
          frontTextSplit.chars,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.015,
          },
          0.1
        )
        .fromTo(
          backTextSplit.chars,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.015,
          },
          0.3
        )
        .fromTo(
          text.lines,
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.025,
          },
          "<0.025"
        );

      sections.push({ trigger: block, timeline: tl });
      splits.push(frontTextSplit, backTextSplit, text);
    });

    sections.forEach(
      (section) => new ClassWatcher(section.trigger, section.timeline)
    );

    window.addEventListener(
      "resize",
      throttle(() => {
        if (!isResized) {
          splits.forEach((split) => split.revert());
          isResized = true;
        }
      }, 250)
    );
  }

  onLeaveCompleted() {}
}

export default About;

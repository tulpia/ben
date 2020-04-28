// Import de Highway
import Highway from "@dogstudio/highway";

// Import des dépendances
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

// INIT DES ANIMS
const transitionContainer = document.querySelector(".transition-default");
const transitionLayer = document.querySelector(".transition-layer");
const transitionIllustrationContainer = transitionContainer.querySelector(
  ".transition-default__images-container"
);
const allIllustrations = [
  ...transitionContainer.querySelectorAll(
    ".transition-default__images-container img"
  ),
];
let intervalTransition = null;

class DefaultTransition extends Highway.Transition {
  in({ from, done }) {
    document.body.classList.remove("page-loading");

    from.remove();

    clearInterval(intervalTransition);

    const tl = gsap.timeline();

    setTimeout(() => {
      tl.to(transitionIllustrationContainer, {
        duration: 1,
        opacity: 0,
      })
        .fromTo(
          transitionContainer,
          {
            top: "0%",
          },
          {
            top: "-100%",
            duration: 0.75,
            ease: "circ.inOut",
          },
          0.4
        )
        .fromTo(
          transitionLayer,
          {
            top: "0%",
          },
          {
            top: "-100%",
            duration: 0.75,
            ease: "circ.inOut",
            onComplete: () => {
              done();
            },
          },
          0.55
        );
    }, 500);
  }

  out({ done }) {
    document.body.classList.add("page-loading");

    intervalTransition = setInterval(() => {
      const startIndex = Math.floor(
        Math.random() * (allIllustrations.length - 1 - 0 + 1) + 0
      );

      allIllustrations.forEach((illus) => {
        illus.classList.remove("is-shown");
      });

      allIllustrations[startIndex].classList.add("is-shown");
    }, 100);

    const tl = gsap.timeline({
      onComplete: () => {
        // quand le done est appelé, la transition
        done();
      },
    });

    tl.fromTo(
      transitionLayer,
      {
        top: "100%",
      },
      {
        top: "0%",
        duration: 0.75,
        ease: "circ.inOut",
      }
    )
      .fromTo(
        transitionContainer,
        {
          top: "100%",
        },
        {
          top: "0%",
          duration: 0.75,
          ease: "circ.inOut",
        },
        0.15
      )
      .fromTo(
        transitionIllustrationContainer,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
        },
        0.55
      );
  }
}

export default DefaultTransition;

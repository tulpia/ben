// Import de Highway
import Highway from "@dogstudio/highway";

// Import des dépendances
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

class DefaultTransition extends Highway.Transition {
  in({ from, done }) {
    document.body.classList.remove("page-loading");

    from.remove();

    const tl = gsap.timeline();
    tl.fromTo(
      ".transition-loader",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          done();
        },
      }
    );
  }

  out({ done }) {
    document.body.classList.add("page-loading");

    const tl = gsap.timeline({
      onComplete: () => {
        // quand le done est appelé, la transition
        done();
      },
    });

    tl.fromTo(
      ".transition-loader",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
      }
    );
  }
}

export default DefaultTransition;

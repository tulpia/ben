// Import de Highway
import Highway from "@dogstudio/highway";

// Import des dépendances
import { TimelineLite, TweenMax } from "gsap";
import "gsap/ScrollToPlugin";

class DefaultTransition extends Highway.Transition {
  in({ from, to, done }) {
    document.body.classList.remove("page-loading");

    from.remove();
    // TweenMax.set(window, {
    //   scrollTo: 0
    // });

    console.log("transition");

    const tl = new TimelineLite();
    tl.fromTo(
      to,
      0.4,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        onComplete: () => {
          done();
        },
      }
    );
  }

  out({ from, done }) {
    document.body.classList.add("page-loading");

    const tl = new TimelineLite({
      onComplete: () => {
        // quand le done est appelé, la transition
        done();
      },
    });
    tl.fromTo(
      from,
      0.4,
      {
        opacity: 1,
      },
      {
        opacity: 0,
      }
    );
  }
}

export default DefaultTransition;

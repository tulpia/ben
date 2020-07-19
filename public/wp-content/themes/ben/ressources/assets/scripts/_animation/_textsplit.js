import throttle from "lodash.throttle";
import SplitText from "../_tools/_splittext";
import { gsap } from "gsap";
import ClassWatcher from "../_animation/_classwatcher";

class TextSplit {
  constructor(text) {
    this.frontText = text.querySelector(".title-container__main");
    this.backText = text.querySelector(".title-container__back");
    this.target = text;

    this.timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        document.dispatchEvent(new CustomEvent("splitFinished", {}));
      },
    });
    this.frontTextSplit = null;
    this.backTextSplit = null;
    this.isResized = false;

    this.init();
  }

  init() {
    this.initSplit();
    this.createTimeline();
    this.resize();
  }

  initSplit() {
    this.frontTextSplit = new SplitText(this.frontText, {
      type: "chars",
    });
    this.backTextSplit = new SplitText(this.backText, {
      type: "chars",
    });
  }

  createTimeline() {
    this.timeline
      .fromTo(
        this.frontTextSplit.chars,
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
        }
      )
      .fromTo(
        this.backTextSplit.chars,
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
        this.frontTextSplit.chars,
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
        this.backTextSplit.chars,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.015,
        },
        0.3
      );
  }

  play() {
    this.timeline.play();
  }

  resize() {
    window.addEventListener(
      "resize",
      throttle(() => {
        if (!this.isResized) {
          this.frontTextSplit.revert();
          this.backTextSplit.revert();

          this.isResized = true;
        }
      }, 200)
    );
  }

  watch() {
    // eslint-disable-next-line
    const watcher = new ClassWatcher(this.target, this.timeline);
  }
}

export default TextSplit;

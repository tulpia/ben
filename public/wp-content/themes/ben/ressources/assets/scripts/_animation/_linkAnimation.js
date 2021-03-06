import SplitText from "../_tools/_splittext";
import { gsap } from "gsap";

class LinkAnimation {
  constructor(links) {
    this.links = links;
    this.splits = [];
  }

  init() {
    this.initSplits();
    this.linkEvents();
  }

  initSplits() {
    this.links.forEach((link) => {
      const splitLink = new SplitText(
        link.querySelector(".title-container__main"),
        { type: "chars" }
      );
      this.splits.push(splitLink);

      new SplitText(link.querySelector(".title-container__back"), {
        type: "chars",
      });
    });
  }

  linkEvents() {
    this.links.forEach((item, index) => {
      // mouseover
      item.addEventListener("mouseenter", () => {
        if (!item.classList.contains("is-hovered")) {
          item.classList.add("is-hovered");

          gsap.to(this.splits[index].chars, {
            duration: 0.2,
            y: -10,
            x: -10,
            ease: "back.easeInOut",
            stagger: 0.02,
          });
        }
      });

      // mouseleave
      item.addEventListener("mouseleave", () => {
        if (item.classList.contains("is-hovered")) {
          item.classList.remove("is-hovered");

          gsap.to(this.splits[index].chars, {
            duration: 0.2,
            y: 0,
            x: 0,
            ease: "back.easeInOut",
            stagger: 0.02,
          });
        }
      });
    });
  }
}

export default LinkAnimation;

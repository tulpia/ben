import MathUtils from "../_tools/_mathutils";
import { gsap } from "gsap";

class AboutHover {
  constructor(texts, images) {
    this.texts = texts;
    this.images = images;

    this.clientX = 0;
    this.clientY = 0;
    this.lastX = 0;
    this.lastY = 0;
  }

  init() {
    this.initEvents();
    this.getMouseCoords();
    this.render();
  }

  initEvents() {
    this.texts.forEach((link, index) => {
      link.addEventListener("mouseenter", () => {
        this.handleMouseEnter(index);
      });

      link.addEventListener("mouseleave", () => {
        this.handleMouseLeave(index);
      });
    });
  }

  handleMouseEnter(index) {
    gsap.fromTo(
      this.images[index],
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.4,
      }
    );
  }

  handleMouseLeave(index) {
    gsap.to(this.images[index], {
      opacity: 0,
      duration: 0.4,
    });
  }

  getMouseCoords() {
    document.addEventListener("mousemove", (e) => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.lastX = MathUtils.lerp(this.lastX, this.clientX, 0.05);
      this.lastY = MathUtils.lerp(this.lastY, this.clientY, 0.05);

      this.images.forEach((image) => {
        image.style.transform = `translate3d(${this.lastX}px, ${this.lastY}px, 0)`;
      });

      this.render();
    });
  }
}

export default AboutHover;

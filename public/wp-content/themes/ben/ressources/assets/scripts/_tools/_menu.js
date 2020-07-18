import { gsap } from "gsap";
import LinkAnimation from "../_animation/_linkAnimation";

class Menu {
  constructor(container, items, links, header) {
    this.container = container;
    this.items = items;
    this.links = links;
    this.header = header;
    this.btnOpenMenu = this.header.querySelector(".btn-menu");
    this.btnCloseMenu = this.header.querySelector(".btn-close");
    this.tlMenu = gsap.timeline({ paused: true });
  }

  init() {
    this.initHover(this.links);
    this.initTimelineMenu();
    this.events();
    this.closeOnTransition();
  }

  initHover(links) {
    const hoverMenu = new LinkAnimation(links);
    hoverMenu.init();
  }

  events() {
    this.btnOpenMenu.addEventListener("click", (e) => {
      e.preventDefault();

      if (!this.container.classList.contains("is-shown")) {
        this.container.classList.add("is-shown");
        this.header.classList.add("is-menu-opened");
        setTimeout(() => {
          this.animateMenuIn();
          this.animateBtnClose();
        }, 200);
      }
    });

    this.btnCloseMenu.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.container.classList.contains("is-shown")) {
        this.animateMenuOut();
        this.animateBtnClose(false);
        setTimeout(() => {
          this.container.classList.remove("is-shown");
          this.header.classList.remove("is-menu-opened");
        }, 900);
      }
    });
  }

  initTimelineMenu() {
    const line = this.container.querySelector(".details-container__line");
    const detailsElements = this.container.querySelectorAll(".menu-animate");
    const scrollingTitle = this.container.querySelector(".scrolling-title");
    const firstLine = this.btnCloseMenu.querySelector(".first-line");
    const secondLine = this.btnCloseMenu.querySelector(".second-line");

    this.tlMenu
      .from(this.items, {
        duration: 1.35,
        ease: "power2.inOut",
        y: 90,
        stagger: 0.15,
      })
      .from(
        line,
        {
          duration: 0.6,
          width: "0px",
          ease: "circ.inOut",
        },
        "<0.45"
      )
      .from(
        detailsElements,
        {
          duration: 0.5,
          y: 20,
          opacity: 0,
          stagger: 0.075,
        },
        "<0.35"
      )
      .from(
        scrollingTitle,
        {
          duration: 1.2,
          ease: "circ.inOut",
          y: 100,
          opacity: 0,
        },
        0.7
      );

    this.tlBtn = gsap.timeline({ paused: true });
    this.tlBtn
      .from(firstLine, {
        duration: 0.15,
        width: "0px",
      })
      .from(
        secondLine,
        {
          duration: 0.15,
          width: "0px",
        },
        "<0.05"
      );
  }

  animateMenuIn() {
    this.tlMenu.timeScale(1).play();
  }

  animateMenuOut() {
    this.tlMenu.timeScale(1.6).reverse();
  }

  animateBtnClose(reverse = true) {
    if (reverse === true) {
      if (!this.btnCloseMenu.classList.contains("is-active")) {
        this.btnCloseMenu.classList.add("is-active");
      }

      this.tlBtn.play();
    } else {
      this.tlBtn.timeScale(1.6).reverse();
      this.btnCloseMenu.classList.remove("is-active");
    }
  }

  closeOnTransition() {
    document.addEventListener("menuOpen", () => {
      this.animateMenuOut();
      this.animateBtnClose(false);
      setTimeout(() => {
        this.container.classList.remove("is-shown");
        this.header.classList.remove("is-menu-opened");
        document.dispatchEvent(new CustomEvent("menuClosed", {}));
      }, 900);
    });
  }
}

export default Menu;

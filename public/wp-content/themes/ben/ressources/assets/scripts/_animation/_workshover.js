import { gsap } from "gsap";

class WorksHover {
  constructor(links, images) {
    this.links = links;
    this.images = images;

    this.lastImages = null;
    this.currentLink = null;
    this.timeout = null;
  }

  init() {
    this.initHovers();
  }

  initHovers() {
    this.links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        this.handleHoverLink(link);
      });
    });
  }

  handleHoverLink(link) {
    const images = this.getImages(link);
    clearTimeout(this.timeout);

    if (!this.lastImages) {
      gsap.fromTo(
        images,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.075,
        }
      );

      this.lastImages = images;
      this.currentLink = link;
    } else {
      if (this.currentLink !== link) {
        gsap.to(this.lastImages, {
          duration: 0.5,
          y: -45,
          opacity: 0,
          stagger: 0.05,
          onComplete: () => {
            this.lastImages = images;
            this.currentLink = link;
          },
        });

        this.timeout = setTimeout(function () {
          gsap.fromTo(
            images,
            {
              y: 45,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
            }
          );
        }, 550);
      }
    }
  }

  getImages(link) {
    const imageContainer = this.images.filter(
      (image) =>
        image.getAttribute("data-category") ===
        link.getAttribute("data-category")
    );

    return [
      ...imageContainer[0].querySelectorAll(
        ".images-container__work-container"
      ),
    ];
  }
}

export default WorksHover;

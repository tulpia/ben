import imagesLoaded from "imagesloaded";

class Loader {
  constructor(images) {
    this.images = images;
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    if (this.images.length) {
      this.images.forEach((image, index) => {
        imagesLoaded(image, () => {
          console.log(`${image} loaded`);

          if (index === this.images.length - 1) {
            this.imagesLoaded();
          }
        });
      });
    } else {
      this.imagesLoaded();
    }
  }

  imagesLoaded() {
    document.dispatchEvent(new CustomEvent("imagesLoaded", {}));
  }
}

export default Loader;

import { gsap } from "gsap";

class WorksFilter {
  constructor(container, filtres, posts, counter = false) {
    this.container = container;
    this.filtres = filtres;
    this.posts = posts;
    this.counter = counter;

    this.categorySelected = "graphisme";
  }

  init() {
    this.filtresEvent();
  }

  /**
   * Ajoute un event handler sur les filtres
   */
  filtresEvent() {
    this.filtres.forEach((filtre) => {
      filtre.addEventListener("click", () => {
        const filtreData = filtre.getAttribute("data-category");

        if (filtreData !== this.categorySelected) {
          this.animateOut(filtreData);
          this.changeSelectedCategory(filtreData);
          this.makeInactive();
        }
      });
    });
  }

  /**
   * Cache les posts ne correspondant pas au filtre clicker
   * @param {String} filter - le filtre clicker
   */
  animateOut(filter) {
    const postsToAnimate = [];

    // On ajoute d'abord les posts correspondant au filtre dans une array qu'on va animer plus tard
    this.posts.forEach((post) => {
      if (post.getAttribute("data-category") !== filter) {
        postsToAnimate.push(post);
      }
    });

    gsap.to(postsToAnimate, {
      duration: 0.35,
      y: 20,
      opacity: 0,
      stagger: 0.15,
      onComplete: () => {
        postsToAnimate.forEach((post) => {
          if (!post.classList.contains("is-hidden")) {
            post.classList.add("is-hidden");
          }
        });

        // On enleve la classe qui permet d'aligner les postes a droite
        this.posts.forEach((post) => {
          if (post.classList.contains("is-aligned-right")) {
            post.classList.remove("is-aligned-right");
          }
        });

        this.animateIn(filter);
      },
    });
  }

  /**
   * Permet d'animer les elements correspondant a la categorie selectionnee
   * @param {String} filter - le filtre selectionne
   */
  animateIn(filter) {
    const postsToAnimate = [];

    let counter = 1;

    this.posts.forEach((post) => {
      if (post.classList.contains("is-first-shown")) {
        post.classList.remove("is-first-shown");
      }
      if (post.getAttribute("data-category") === filter) {
        post.classList.remove("is-hidden");
        postsToAnimate.push(post);

        if (this.counter) {
          const postCounter = post.querySelector(".travaux-count");

          if (counter < 9) {
            postCounter.textContent = `0${counter}`;
          } else {
            postCounter.textContent = counter;
          }
          counter++;
        }
      }
    });

    // Sur la page travaux, il faut aligner a droite tous les posts pair
    // (impossible de le faire en css normal)
    if (this.counter) {
      for (let i = 1; i < postsToAnimate.length; i++) {
        if (i % 2 === 1) {
          postsToAnimate[i].classList.add("is-aligned-right");
        }
      }
    }

    gsap.fromTo(
      postsToAnimate,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.15,
      }
    );

    this.makeActive();
    this.sendEvent();
  }

  changeSelectedCategory(filter) {
    this.filtres.forEach((btn) => {
      if (btn.classList.contains("select-category__category--active")) {
        btn.classList.remove("select-category__category--active");
      }

      if (btn.getAttribute("data-category") === filter) {
        btn.classList.add("select-category__category--active");
      }
    });

    this.categorySelected = filter;
  }

  sendEvent() {
    document.dispatchEvent(new CustomEvent("categoryLoaded", {}));
  }

  makeInactive() {
    this.container.classList.add("is-inactive");
  }

  makeActive() {
    this.container.classList.remove("is-inactive");
  }
}

export default WorksFilter;

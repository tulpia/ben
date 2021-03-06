// Import de Highway
import Highway from "@dogstudio/highway";

// Import des Renderers
import Home from "./_classes/Home";
import About from "./_classes/About";
import Travaux from "./_classes/Travaux";
import SingleProjets from "./_classes/SingleProjets";

// Import des Transitions
import DefaultTransition from "./_transitions/DefaultTransition";

// Import des outils/animations
import Menu from "./_tools/_menu.js";
import Cursor from "./_animation/_cursor";
import Loader from "./_tools/_loader";

// Import des dependances
import LocomotiveScroll from "locomotive-scroll";

// eslint-disable-line
const H = new Highway.Core({
  renderers: {
    home: Home,
    about: About,
    travaux: Travaux,
    single_projets: SingleProjets,
  },
  transitions: {
    default: DefaultTransition,
  },
});

let scroll = null;
let cursor = null;

H.on("NAVIGATE_OUT", () => {
  cursor.destroyLinks();
  scroll.scrollTo(".page");
});

H.on("NAVIGATE_END", () => {
  scroll.update();
  const links = document.querySelectorAll("a");
  cursor.hoverEffects(links);
});

document.addEventListener("DOMContentLoaded", function () {
  // MENU
  const menuContainer = document.querySelector(".menu");
  const menuItems = menuContainer.querySelectorAll(".item__wrapper");
  const menuLinks = menuContainer.querySelectorAll(".title-container");
  const menuHeader = document.querySelector("header");

  const menu = new Menu(menuContainer, menuItems, menuLinks, menuHeader);
  menu.init();

  // SMOOTHSCROLL + LOADER
  const loader = new Loader(document.querySelectorAll("img"));
  loader.init();

  this.addEventListener("imagesLoaded", () => {
    scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      inertia: 0.75,
    });
  });

  // CURSEUR
  const bigCursor = document.querySelector(".big-cursor");
  const smallCursors = [...document.querySelectorAll(".inner-cursor")];
  const links = document.querySelectorAll("a");
  cursor = new Cursor(bigCursor, smallCursors, links);

  cursor.init();

  // SCROLL TO CONTACT
  const btnContact = document.querySelector(".btn-mail");

  btnContact.addEventListener("click", (e) => {
    e.preventDefault();

    if (document.querySelector(".block-contact")) {
      scroll.scrollTo(document.querySelector(".block-contact"));
    }
  });
});

document.addEventListener("categoryLoaded", () => {
  scroll.update();
});

document.addEventListener("updateScroll", () => {
  scroll.update();
});

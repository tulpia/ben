// Import de Highway
import Highway from "@dogstudio/highway";

// Import des Renderers
import Home from "./_classes/Home";
import About from "./_classes/About";
import Travaux from "./_classes/Travaux";
import SingleProjets from "./_classes/SingleProjets";

// Import des Transitions
import DefaultTransition from "./_transitions/DefaultTransition";

// Import des outils
import Menu from "./_tools/_menu.js";

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

H.on("NAVIGATE_OUT", () => {
  scroll.scrollTo(".page");
});

H.on("NAVIGATE_END", () => {
  scroll.update();
});

document.addEventListener("DOMContentLoaded", () => {
  // MENU
  const menuContainer = document.querySelector(".menu");
  const menuItems = menuContainer.querySelectorAll(".item__wrapper");
  const menuLinks = menuContainer.querySelectorAll(".title-container");
  const menuHeader = document.querySelector("header");

  const menu = new Menu(menuContainer, menuItems, menuLinks, menuHeader);
  menu.init();

  // SMOOTHSCROLL
  scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    inertia: 0.5,
  });
});

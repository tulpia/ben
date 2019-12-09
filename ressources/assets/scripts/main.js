// Import de Highway
import Highway from "@dogstudio/highway";

// Import des Renderers
import Home from "./_classes/Home";
import Contact from "./_classes/Contact";
import About from "./_classes/About";
import Travaux from "./_classes/Travaux";

// Import des Transitions
import DefaultTransition from "./_transitions/DefaultTransition";

// eslint-disable-line
const H = new Highway.Core({
  renderers: {
    home: Home,
    about: About,
    contact: Contact,
    travaux: Travaux
  },
  transitions: {
    default: DefaultTransition
  }
});

console.log(H);

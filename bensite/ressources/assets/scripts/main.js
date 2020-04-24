// Import de Highway
import Highway from "@dogstudio/highway";

// Import des Renderers
import Home from "./_classes/Home";
import About from "./_classes/About";
import Travaux from "./_classes/Travaux";
import SingleProjets from "./_classes/SingleProjets";

// Import des Transitions
import DefaultTransition from "./_transitions/DefaultTransition";

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

H.on("NAVIGATE_IN", () => {
  console.log("sds");
});

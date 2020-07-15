import Highway, { async } from "@dogstudio/highway";
import WorksFilter from "../_tools/_worksfilter";
import TextSplit from "../_animation/_textsplit";
import { gsap } from "gsap";
import SplitText from "../_tools/_splittext";
import ClassWatcher from "../_animation/_classwatcher";

class Home extends Highway.Renderer {
  onEnter() {}

  onEnterCompleted() {
    /**
     * FITLRE
     */
    const filtreContainer = document.querySelector(".select-category");
    const filtreArguments = filtreContainer.querySelectorAll(
      ".select-category__category"
    );
    const filtrePosts = document.querySelectorAll(".work-post");

    const filtre = new WorksFilter(
      filtreContainer,
      filtreArguments,
      filtrePosts
    );
    filtre.init();
  }
}

export default Home;

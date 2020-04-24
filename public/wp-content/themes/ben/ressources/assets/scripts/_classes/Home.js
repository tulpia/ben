import Highway from "@dogstudio/highway";
import WorksFilter from "../_tools/_worksfilter";

class Home extends Highway.Renderer {
  onEnter() {
    console.log("home");
  }

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

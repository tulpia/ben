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
    const fitlreArguments = filtreContainer.querySelectorAll(
      ".select-category__category"
    );
    const fitlreResultsContainer = filtreContainer.querySelector(
      ".block-works__posts-container"
    );

    const filtre = new WorksFilter(
      filtreContainer,
      fitlreArguments,
      fitlreResultsContainer
    );
    filtre.init();
  }
}

export default Home;

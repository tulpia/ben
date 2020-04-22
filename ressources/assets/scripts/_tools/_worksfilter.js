/**
 * FITLRE
 * 1/ Au click sur un des fitlres, recuperer la categorie dans le data-category
 * 2/ Recuperer l'URL du controller axios qui va recuperer les posts dans le BO
 * 3/ envoyer une requete fetch vers ce controller, .JSON() le resultat et mettre le tout dans le results container
 * 4/ d'abord cacher les anciens posts
 * 5/ Envoyer un event dans le DOM, qui va etre recupere dans le main.js et regenerer les liens highway pour qu'on ait une transition propre
 */

class WorksFilter {
  constructor(container, filtres, resultsContainer) {
    this.container = container;
    this.filtres = filtres;
    this.resultsContainer = resultsContainer;
  }

  init() {
    this.filtresEvent();
  }

  filtresEvent() {
    this.filtres.forEach((filtre) => {
      filtre.addEventListener("click", () => {
        const filtreData = filtre.getAttribute("data-category");

        this.getData(filtreData);
      });
    });
  }

  getData(filtre) {
    console.log(filtre);
  }
}

export default WorksFilter;

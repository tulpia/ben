import Highway from "@dogstudio/highway";

class About extends Highway.Renderer {
  onEnter() {
    if (!document.body.classList.contains("is-landing-animated")) {
      document.body.classList.add("is-landing-animated");
    }
  }

  onEnterCompleted() {}

  onLeaveCompleted() {}
}

export default About;

/**
 * TODO : HOVER CURSEUR
 * 1/ Faire un effet "stick" sur les elements du menu
 * 2/ Faire disparaitre les pastilles curseur lorsqu'on hover un link normal
 */

import MathUtils from "../_tools/_mathutils";

class Cursor {
  constructor(bigCursor, smallCursors, links) {
    this.bigCursor = bigCursor;
    this.smallCursors = smallCursors;
    this.links = links;

    this.clientX = 0;
    this.clientY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.lastCursors = [];
  }

  init() {
    this.getMouseCoords();
    this.setLastCursorCoords();
    this.render();
    this.hoverEffects(this.links);
  }

  getMouseCoords() {
    document.addEventListener("mousemove", (e) => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });
  }

  setLastCursorCoords() {
    this.smallCursors.forEach((cursor) => {
      this.lastCursors.push({ id: cursor.className, lastX: 0, lastY: 0 });
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.lastX = MathUtils.lerp(this.lastX, this.clientX, 0.1);
      this.lastY = MathUtils.lerp(this.lastY, this.clientY, 0.1);

      this.bigCursor.style.transform = `translate3d(${this.lastX}px, ${this.lastY}px, 0)`;

      this.smallCursors.forEach((cursor, index) => {
        const coefficient = (index + 1.5) / 10;

        if (!this.isStuck) {
          this.lastCursors[index].lastX = MathUtils.lerp(
            this.lastCursors[index].lastX,
            this.clientX,
            coefficient
          );
          this.lastCursors[index].lastY = MathUtils.lerp(
            this.lastCursors[index].lastY,
            this.clientY,
            coefficient
          );
        } else {
          this.lastCursors[index].lastX = MathUtils.lerp(
            this.lastCursors[index].lastX,
            this.stuckX,
            coefficient
          );
          this.lastCursors[index].lastY = MathUtils.lerp(
            this.lastCursors[index].lastY,
            this.stuckY,
            coefficient
          );
        }
        cursor.style.transform = `translate3d(${this.lastCursors[index].lastX}px, ${this.lastCursors[index].lastY}px, 0)`;
      });

      this.render();
    });
  }

  hoverEffects(links) {
    links.forEach((link) => {
      link.addEventListener("mouseenter", (e) => this.handleMouseEnter(e));
      link.addEventListener("mouseleave", (e) => this.handleMouseLeave(e));
    });

    this.oldLinks = links;
  }

  destroyLinks() {
    this.oldLinks.forEach((link) => {
      link.addEventListener("mouseenter", (e) => this.handleMouseEnter(e));
      link.addEventListener("mouseleave", (e) => this.handleMouseLeave(e));
    });
  }

  handleMouseEnter(e) {
    if (e.target.classList.contains("menu-hover")) {
      const navItem = e.currentTarget;
      const navItemBox = navItem.getBoundingClientRect();
      this.stuckX = navItemBox.left - 25;
      this.stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
      this.isStuck = true;

      this.bigCursor.classList.add("is-hidden");
    } else if (e.target.classList.contains("menu-btn-hover")) {
      if (!this.bigCursor.classList.contains("is-big")) {
        this.bigCursor.classList.add("is-big");
      }
      this.smallCursors.forEach((cursor) => {
        if (!cursor.classList.contains("is-hovered")) {
          cursor.classList.add("is-hovered");
        }
      });
    } else {
      if (!this.bigCursor.classList.contains("is-hovered")) {
        this.bigCursor.classList.add("is-hovered");
      }
      this.smallCursors.forEach((cursor) => {
        if (!cursor.classList.contains("is-hovered")) {
          cursor.classList.add("is-hovered");
        }
      });
    }
  }

  handleMouseLeave(e) {
    if (e.target.classList.contains("menu-hover")) {
      this.isStuck = false;
      this.bigCursor.classList.remove("is-hidden");
    } else if (e.target.classList.contains("menu-btn-hover")) {
      if (this.bigCursor.classList.contains("is-big")) {
        this.bigCursor.classList.remove("is-big");
      }
      this.smallCursors.forEach((cursor) => {
        if (cursor.classList.contains("is-hovered")) {
          cursor.classList.remove("is-hovered");
        }
      });
    } else {
      if (this.bigCursor.classList.contains("is-hovered")) {
        this.bigCursor.classList.remove("is-hovered");
      }
      this.smallCursors.forEach((cursor) => {
        if (cursor.classList.contains("is-hovered")) {
          cursor.classList.remove("is-hovered");
        }
      });
    }
  }
}

export default Cursor;

import Carousel from "./carousel.js";
import SwipeCarousel from "./swipe.js";

let carousel = new SwipeCarousel({
  // containerId: "#carousel",
  // slideId: ".slides__item",
  interval: 3000,
  isPlaying: true,
});
carousel.init();

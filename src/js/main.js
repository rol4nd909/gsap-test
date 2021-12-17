import "../scss/style.scss";

import gsap from "gsap";
import { preloadImages, calcDrawImage } from "./utils";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sequence trigger animation
(() => {
  // get all images
  const urls = [...new Array(147)].map((value, index) => `img-sequence/${index + 1}.jpg`);

  // load images async
  const images = preloadImages(urls);

  const container = document.querySelector(".cb-sequence");
  const canvas = container.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  // create "scrub" ScrollTrigger effect with pin of main block
  const tl = new gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scrub: true,
      start: "top top",
      end: "200%", // scene duration
      pin: true,
    },
  });

  // canvas resize handler
  window.addEventListener(
    "resize",
    (function resize() {
      ctx.canvas.width = document.documentElement.clientWidth;
      ctx.canvas.height = document.documentElement.clientHeight;
      return resize;
    })()
  );

  // when all images ready
  images.then((imgs) => {
    const counter = { i: 0 }; // iteration object

    tl.to(
      counter,
      {
        i: imgs.length - 1, // increment counter to frames length
        roundProps: "i", // round, only int
        ease: "none", // ease provided by smooth-scroll momentum
        immediateRender: true, // render first frame immediately
        onUpdate: () => calcDrawImage(ctx, imgs[counter.i]), // draw image in canvas when timeline update
      },
      0
    );

    // draw current frame again when scroll stopped and resize happened
    window.addEventListener("resize", () => calcDrawImage(ctx, imgs[counter.i]));
  });
})();

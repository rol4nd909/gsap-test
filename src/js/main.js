import "../scss/style.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadImages, calcDrawImage } from "./utils";

gsap.registerPlugin(ScrollTrigger);

// Sequence trigger animation
(() => {
  // generate array of images paths. length = frames length, see: /src/assets/img
  const urls = [...new Array(147)].map((value, index) => `/${index + 1}.jpg`);

  // load images async
  const images = preloadImages(urls);

  const container = document.querySelector(".cb-sequence");
  const canvas = container.querySelector(".airpods");
  const ctx = canvas.getContext("2d");

  // create "scrub" ScrollTrigger effect with pin of main block
  // pinType: transform is required when use pin with smooth scrollbar
  const tl = new gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scrub: true,
      start: "top top",
      end: "200%", // scene duration
      pin: true,
      pinType: "transform",
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

// (() => {
//   gsap.to(".box", {
//     scrollTrigger: {
//       trigger: ".gsap-trigger",
//       start: "top top",
//       end: "200%",
//       scrub: true,
//       pin: true,
//       pinType: "transform",
//       //   markers: true,
//     },
//     // xPercent: "100",
//     x: "30rem",
//   });
// })();

// (() => {
//   gsap.from(".gsap-stagger", {
//     scrollTrigger: {
//       trigger: ".gsap-stagger",
//     },
//     y: 20,
//     opacity: 0,
//     stagger: 0.2,
//   });
// })();

// let tl = gsap.timeline({
//   // yes, we can add it to an entire timeline!
//   scrollTrigger: {
//     trigger: ".trigger",
//     snap: {
//       snapTo: "labels", // snap to the closest label in the timeline
//       duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
//       delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
//       ease: "power1.inOut",
//     },
//   },
// });

// // add animations and labels to the timeline
// tl.addLabel("start").from(".gsap-stagger", {
//   y: 20,
//   opacity: 0,
//   stagger: 0.2,
// });

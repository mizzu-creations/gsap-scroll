const showDemo = () => {
  gsap.to(".loader", { autoAlpha: 0 });
  document.body.style.overflow = "auto";
  document.scrollingElement.scrollTo(0, 0);

  gsap.utils.toArray("section").forEach((section, index) => {
    const w = section.querySelector(".wrapper");
    if (w) {
      const [x, xEnd] =
        index % 2
          ? ["100%", -(w.scrollWidth - innerWidth)]
          : [-w.scrollWidth, 0];
      gsap.fromTo(
        w,
        { x },
        {
          x: xEnd,
          scrollTrigger: {
            trigger: section,
            scrub: 0.5,
          },
        }
      );
    }
  });
};

const awsome = () => {
  const tl = gsap
    .timeline({
      defaults: {
        ease: "none",
      },
    })
    .from(".awsome .text", { x: innerWidth })
    .to(".awsome .text", { scale: 50, xPercent: -200 })
    .to("body", { duration: 0.3, backgroundColor: "black" }, "-=0.5");
  ScrollTrigger.create({
    trigger: ".awsome",
    start: "top top",
    end: "+=3000",
    animation: tl,
    pin: true,
    scrub: true,
  });
};

const tryNow = () => {
  ScrollTrigger.create({
    trigger: ".try",
    start: "top top",
    end: "+=2000",
    animation: gsap.from(".try .text", { y: 50, opacity: 0 }),
    pin: true,
    scrub: true,
  });
};

function init() {
  showDemo();
  awsome();
  tryNow();
}

const img = gsap.utils.toArray("img");
const loader = document.querySelector(".loader--text");
const updateProgress = ({ progressedCount }) => {
  const percents = Math.round((progressedCount / img.length) * 100);
  loader.textContent = `${percents}%`;
};

imagesLoaded(img).on("progress", updateProgress).on("always", init);

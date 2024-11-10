/// Loading Function

let windowsTes = window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.querySelector(".loading");
    loader.classList.add("loading-last");
    loader.addEventListener("animationend", () => {
      document.body.removeChild(loader);
    });
  }, 2000);
});

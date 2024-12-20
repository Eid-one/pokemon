let windowsTes = window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.querySelector(".loading");
    loader.classList.add("loading-last");
    loader.addEventListener("animationend", () => {
      document.body.removeChild(loader);
    });
  }, 4000);
});

function slideLeft() {
  currentPokemon = currentPokemon > 1 ? currentPokemon - 1 : maxPokemonId;
  selectCard(currentPokemon);
}

function slideRight() {
  currentPokemon = currentPokemon < maxPokemonId ? currentPokemon + 1 : 1;
  selectCard(currentPokemon);
}

async function loadingMore() {
  showSpinner();
  setTimeout(async () => {
    offset += limit;
    await dataFetch();
    hideSpinner();

    if (offset >= 100) {
      loadMoreButton.style.display = "none";
    }
  }, 4000);
}

function showSpinner() {
  const spinner = document.getElementById("loading_spinner");
  spinner.classList.remove("hidden");
}

function hideSpinner() {
  const spinner = document.getElementById("loading_spinner");
  spinner.classList.add("hidden");
}

let closePopup = () => {
  const popupCard = document.querySelector(".popupCard");
  if (popupCard) popupCard.remove();
};

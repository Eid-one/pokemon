let maxmalPokemon = `https://pokeapi.co/api/v2/pokemon?limit=30`;

let url = `https://pokeapi.co/api/v2/pokemon?limit=10`;
let pokemonContent = document.getElementById("pokomenContent");
let searchBar = document.getElementById("searchBar");
let missingElemen = document.getElementById("noFound");
let loadMore = document.getElementById("moreLoading");
let pureData = [];
let offset = 18;
const limit = 20;
let currentPokemon = 1;
const maxPokemonId = 1400;
let pokeCashe = [];

function init() {
  dataFetch();
}

async function dataFetch() {
  try {
    let dataUrl = await fetch(url);
    let response = await dataUrl.json();

    let pokemon = await Promise.all(
      response.results.map(async (result, index) => {
        let pokeDetails = await fetch(result.url);
        let pokeData = await pokeDetails.json();
        const types = pokeData.types;

        return {
          Name: result.name,
          Id: index + 1,
          Image: pokeData.sprites.other["official-artwork"].front_default,
          Types: pokeData.types.map((typeObj) => typeObj.type.name),
        };
      })
    );

    pureData = pokemon;
    displayPokos(pokemon);
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
  }
}

let displayPokos = (pokeman) => {
  const getBackgroundColor = (types) => {
    if (types.includes("fire")) return "red";
    if (types.includes("grass")) return "green";
    if (types.includes("normal")) return "#98d048";
    if (types.includes("poison")) return "#2a3049";
    if (types.includes("water")) return "blue";
    if (types.includes("electric")) return "#c1121f";
    if (types.includes("fighting")) return "#faedcd";
    if (types.includes("psychic")) return "#6a4c93";
    return "gray";
  };

  pokemonContent.innerHTML = pokeman
    .map((pokeman) => returnHTMLCard(pokeman))
    .join("");
};

function loadingMore() {
  showSpinner();
  setTimeout(() => {
    console.log(" Please Waite Just Minite!!");
    hideSpinner();

    loadMore.addEventListener("click", async () => {
      offset += limit;
      url = maxmalPokemon;
      await dataFetch();

      if (limit == 100) {
        loadMore.style.display = "none";
      }
    });
  }, 2000);
}

async function selectCard(id) {
  showSpinner();
  if (!pokeCashe[id]) {
    currentPokemon = id;
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resUrl = await fetch(url);

    let pokeman = await resUrl.json();
    displayPopup(pokeman);
    pokeCashe[id] = pokeman;
    console.log(pokeCashe);
  }

  displayPopup(pokeCashe[id]);
  setTimeout(() => {
    hideSpinner();
  }, 500);
}

let displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;
  const statData = pokeman.stats.map((stattype) => ({
    statName: stattype.stat.name,
    value: stattype.base_stat,
  }));

  const contentPopup = contentHTMLPopup(pokeman);

  const existingPopup = document.querySelector(".popupCard");
  if (existingPopup) {
    existingPopup.outerHTML = contentPopup;
  } else {
    pokemonContent.innerHTML = contentPopup + pokemonContent.innerHTML;
  }
};

function slideLeft() {
  currentPokemon = currentPokemon > 1 ? currentPokemon - 1 : maxPokemonId;
  selectCard(currentPokemon);
}

function slideRight() {
  currentPokemon = currentPokemon < maxPokemonId ? currentPokemon + 1 : 1;
  selectCard(currentPokemon);
}

let closePopup = () => {
  const popupCard = document.querySelector(".popupCard");
  if (popupCard) popupCard.remove();
};

searchBar.addEventListener("keyup", (e) => {
  let searchingBar = e.target.value;
  const filterSearch = pureData.filter((pokemon) => {
    return (
      pokemon.Name.toLowerCase().includes(searchingBar.toLowerCase()) ||
      pokemon.Id.toString().includes(searchingBar.toLowerCase())
    );
  });

  if (filterSearch.length === 0) {
    missingElemen.innerHTML = `<div id="noData">404 not found no data</div>`;
  } else {
    missingElemen.innerHTML = "";
  }

  displayPokos(filterSearch);
});

function showSpinner() {
  const spinner = document.getElementById("loading_spinner");
  spinner.classList.remove("hidden");
}

function hideSpinner() {
  const spinner = document.getElementById("loading_spinner");
  spinner.classList.add("hidden");
}

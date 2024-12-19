const baseUrl = "https://pokeapi.co/api/v2/pokemon";
let offset = 0;
const limit = 10; // Number of Pokémon to fetch per request
let pokemonContent = document.getElementById("pokomenContent");
let searchBar = document.getElementById("searchBar");
let missingElement = document.getElementById("noFound");
const loadMoreButton = document.getElementById("moreLoading");
let pureData = [];

let missingElemen = document.getElementById("noFound");

let currentPokemon = 1;
const maxPokemonId = 1400;
let pokeCashe = [];

function init() {
  dataFetch();
}

async function dataFetch() {
  let url = `${baseUrl}?offset=${offset}&limit=${limit}`;
  let response = await fetch(url);
  let data = await response.json();

  let pokemon = await Promise.all(
    data.results.map(async (result) => {
      let pokeDetails = await fetch(result.url);
      let pokeData = await pokeDetails.json();

      return {
        Name: result.name,
        Id: pokeData.id,
        Image: pokeData.sprites.other["official-artwork"].front_default,
        Types: pokeData.types.map((typeObj) => typeObj.type.name),
        Abilities: pokeData.abilities.map(
          (abilityInfo) => abilityInfo.ability.name
        ),
      };
    })
  );

  pureData = [...pureData, ...pokemon];
  displayPokos(pureData);
}

// Display Pokémon cards
function displayPokos(pokemonList) {
  pokemonContent.innerHTML = pokemonList
    .map((poke) => returnHTMLCard(poke))
    .join("");
}

// Load more Pokémon
function loadingMore() {
  showSpinner();
  setTimeout(async () => {
    offset += limit; // Increment offset for next batch
    await dataFetch();
    hideSpinner();

    // Hide button after fetching all Pokémon
    if (offset >= 100) {
      loadMoreButton.style.display = "none";
    } else {
      offset++;
    }
  }, 4000);
}

// Spinner functionality
function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
}

function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

// Event listeners
loadMoreButton.addEventListener("click", loadingMore);

// Testt-----

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
  abilities: pokeman.abilities.map((abilityInfo) => abilityInfo.ability.name);
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

async function findOutStatus(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const dataJson = await response.json();

  const pokemonStatus = dataJson.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  renderStatus(pokemonStatus);
}

function renderStatus(pokemonStatus) {
  const container = document.getElementById("status-container");
  container.innerHTML = pokemonStatus
    .map((stat) => statusHTMLTemplate(stat))
    .join("");
  console.log(container);
}

/* async function extraInfo(id) {
  const infoContainer = document.getElementById("info-container");

  infoContainer.innerHTML = informationFunc();
} */

async function extraInfo(id) {
  const infoContainer = document.getElementById("status-container");

  try {
    // Fetch Pokémon data by ID (adjust URL as per your API)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await response.json();

    // Extract relevant details
    const abilities = pokeman.abilities
      .map((abilityInfo) => abilityInfo.ability.name)
      .join(", ");
    const types = pokeman.types
      .map((typeInfo) => typeInfo.type.name)
      .join(", ");
    const height = pokeman.height;
    const weight = pokeman.weight;

    // Update the container with the information
    infoContainer.innerHTML = informationFunc(abilities, types, height, weight);
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
    infoContainer.innerHTML = `<p>Error loading Pokémon information.</p>`;
  }
}

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

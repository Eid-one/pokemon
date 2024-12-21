const baseUrl = "https://pokeapi.co/api/v2/pokemon";
let offset = 0;
const limit = 8;
let pokemonContent = document.getElementById("pokomenContent");
let searchBar = document.getElementById("searchBar");
let missingElement = document.getElementById("noFound");
const loadMoreButton = document.getElementById("moreLoading");
let currentPokemon = 1;
const maxPokemonId = 100;
let pureData = [];

let missingElemen = document.getElementById("noFound");

let pokeCashe = [];

function init() {
  dataFetch();
}

async function dataFetch(id) {
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

function displayPokos(pokemonList) {
  pokemonContent.innerHTML = pokemonList
    .map((poke) => returnHTMLCard(poke))
    .join("");
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

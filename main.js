let url = `https://pokeapi.co/api/v2/pokemon?limit=100`;
let pokemonContent = document.getElementById("pokomenContent");
let searchBar = document.getElementById("searchBar");
let missingElemen = document.getElementById("noFound");
let pureData = [];

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

let currentPokemon = 1;

async function selectCard(id) {
  try {
    currentPokemon = id;
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resUrl = await fetch(url);

    let pokeman = await resUrl.json();
    displayPopup(pokeman);
  } catch (error) {
    console.error("Failed to fetch Pokémon details:", error);
  }
}

let displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;
  const stats = pokeman.stats.map((stat) => ({
    statName: stat.stat.name,
    value: stat.base_stat,
  }));

  const contentPopup = contentHTMLPopup(pokeman);

  const existingPopup = document.querySelector(".popupCard");
  if (existingPopup) {
    existingPopup.outerHTML = contentPopup;
  } else {
    pokemonContent.innerHTML = contentPopup + pokemonContent.innerHTML;
  }
};

const maxPokemonId = 1010;

function slideLeft() {
  currentPokemon = currentPokemon > 1 ? currentPokemon - 1 : maxPokemonId;
  selectCard(currentPokemon);
}

function slideRight() {
  currentPokemon = currentPokemon < maxPokemonId ? currentPokemon + 1 : 1;
  selectCard(currentPokemon);
}

let closePopup = () => {
  const popup = document.querySelector(".popupCard");
  if (popup) popup.remove();
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

init();

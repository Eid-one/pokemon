let urlData = `https://pokeapi.co/api/v2/pokemon/ditto`;
let pokemonContent = document.getElementById("pokemon");
let searchBar = document.getElementById("searchBar");

let missingElemen = document.getElementById("noFound");
let pureData = [];

function init() {
  fetchData();
}

let pokemonUrl = `https://pokeapi.co/api/v2/pokemon?limit=100`;

async function fetchData() {
  let response = await fetch(pokemonUrl);
  let data = await response.json();
  console.log(data.results);

  let pokemon = data.results.map((result, index) => ({
    Name: result.name,
    Id: index + 1,
    Image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      index + 1
    }.png`,
  }));
  pureData = pokemon;
  displayPokemon(pokemon);
}

function displayPokemon(pokemon) {
  let contentHTML = pokemon.map((pokeman) => HTMLRetern(pokeman)).join("");
  pokemonContent.innerHTML = contentHTML;
}

async function selectPokemon(id) {
  let urlSelect = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let fetchDb = await fetch(urlSelect);
  let responseData = await fetchDb.json();
  displaypopop(responseData);
}

function displaypopop(pokeman) {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;
  const baseStatEffort = pokeman.stats[0].base_stat;
  const baseStatEffort1 = pokeman.stats[1].base_stat;
  const baseStatEffort2 = pokeman.stats[2].base_stat;
  const baseStatEffort3 = pokeman.stats[3].base_stat;
  const baseStatEffort4 = pokeman.stats[4].base_stat;
  const baseStatEffort5 = pokeman.stats[5].base_stat;

  let contentHTML = templateHTM(
    pokeman,
    type,
    baseStatEffort,
    baseStatEffort1,
    baseStatEffort2,
    baseStatEffort3,
    baseStatEffort4,
    baseStatEffort4,

    pokeman.height,
    pokeman.weight
  );
  pokemonContent.innerHTML = contentHTML + pokemonContent.innerHTML;
}

searchBar.addEventListener("keyup", (e) => {
  let searchingBar = e.target.value;
  const filterSearch = pureData.filter((pokemon) => {
    return (
      pokemon.Name.toLowerCase().includes(searchingBar.toLowerCase()) ||
      pokemon.Id.toString().includes(searchingBar.toLowerCase())
    );
  });

  if (filterSearch.length === 0) {
    console.log("Here is Nothing Found...");
    missingElemen.innerHTML = `<div id="noData"> 404 not found no data</div>`;
  }

  displayPokemon(filterSearch);
});

function closePopup() {
  const popup = document.querySelector(".cardTwo");
  if (popup) {
    popup.remove();
  }
}

init();

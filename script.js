let urlData = `https://pokeapi.co/api/v2/pokemon/ditto`;
let pokemonContent = document.getElementById("pokemon");
let searchBar = document.getElementById("searchBar");
let pureData = []; // To store fetched Pokémon data

function init() {
  fetchData();
}

let pokemonUrl = `https://pokeapi.co/api/v2/pokemon?limit=10`;

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
  pureData = pokemon; // Store data for search functionality
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

/* function displaypopop(pokeman) {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;
  const baseStatEffort = pokeman.stats[0].base_stat;

  let contentHTML = templateHTM(pokeman, type, baseStatEffort);

  pokemonContent.innerHTML = contentHTML + pokemonContent.innerHTML;
}

function templateHTM(pokeman) {
  const image = pokeman.sprites.other["official-artwork"].front_default;
  return `
    <div class="cardTwo">
      <p onclick="closePopup()">Close</p>
      <br>
      <img id="imgtwo" src="${image}" alt="${pokeman.name}">
      <p>${pokeman.name} ${pokeman.id}  <u>${type}</u></p>
      <p>Effort: ${baseStatEffort}</p>
    </div>
  `;
} */

function displaypopop(pokeman) {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;
  const baseStatEffort = pokeman.stats[0].base_stat;

  let contentHTML = templateHTM(pokeman, type, baseStatEffort);

  pokemonContent.innerHTML = contentHTML + pokemonContent.innerHTML;
}

function templateHTM(pokeman, type, baseStatEffort) {
  const image = pokeman.sprites.other["official-artwork"].front_default;
  return `
      <div class="cardTwo">
        <p onclick="closePopup()">Close</p>
        <br>
        <img id="imgtwo" src="${image}" alt="${pokeman.name}">
        <p>${pokeman.name} ${pokeman.id}  <u>${type}</u></p>
        <p>Effort: ${baseStatEffort}</p>
      </div>
    `;
}

// Search Bar Function
searchBar.addEventListener("keyup", (e) => {
  let searchingBar = e.target.value;
  const filterSearch = pureData.filter((pokemon) => {
    return (
      pokemon.Name.toLowerCase().includes(searchingBar.toLowerCase()) ||
      pokemon.Id.toString().includes(searchingBar.toLowerCase())
    );
  });
  displayPokemon(filterSearch);
});

function closePopup() {
  document.querySelector(".cardTwo").remove();
}

init();

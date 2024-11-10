let urlData = `https://pokeapi.co/api/v2/pokemon/ditto`;
let pokemonContent = document.getElementById("pokemon");
let searchBar = document.getElementById("searchBar");

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
  console.log(pokemon);

  displayPokemon(pokemon);
}

let displayPokemon = (pokemon) => {
  let contentHTML = pokemon.map((pokeman) => HTMLRetern(pokeman)).join("");

  pokemonContent.innerHTML = contentHTML;
};

/* 
function displayPokemon(allData) {
  let contenString = allData.map((pokeman) => HTMLRetern(pokeman)).join("");

  pokemonContent.innerHTML = contenString;
}

let selectPokemon = async (id) => {
  let urlpokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let pokeman = await fetch(urlpokemon);
  let resPokeman = await pokeman.json();
  console.log(id);
  displaypopop(resPokeman);
  console.log(resPokeman);
};

let displaypopop = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;

  const baseStatEffort = pokeman.stats[0].base_stat;
  console.log(type);
  let contentHTML = `
    <div class="cardTwo">
      <ponclick="close">  Close </p>

      <br>
      <img id="imgtwo" src="${image}" alt="${pokeman.name}">

      <p>${pokeman.name} ${pokeman.id}  <u>${type}</u> </p>
      <p>Effort: ${baseStatEffort}</p>
       
     
     
      
    </div>
  `;

  pokemonContent.innerHTML = contentHTML + pokemonContent.innerHTML;
};

/// Search Bar Function----

searchBar.addEventListener("keyup", (e) => {
  let searchingBar = e.target.value;
  const filterSearch = pureData.filter((dater) => {
    return (
      dater.name.toLowerCase().includes(searchingBar.toLowerCase()) ||
      dater.id.toString().includes(searchingBar.toLowerCase())
    );
  });

  displayPokemon(filterSearch);
});

init();

/*  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`, */

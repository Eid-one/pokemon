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
}

async function extraInfo(id) {
  const infoContainer = document.getElementById("status-container");

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeman = await response.json();

  const abilities = pokeman.abilities
    .map((abilityInfo) => abilityInfo.ability.name)
    .join(", ");
  const types = pokeman.types.map((typeInfo) => typeInfo.type.name).join(", ");
  const height = pokeman.height;
  const weight = pokeman.weight;

  infoContainer.innerHTML = informationFunc(abilities, types, height, weight);
}

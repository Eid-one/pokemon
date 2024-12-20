function renderTypes() {
  const typeIcons = {
    fire: "flame.png",
    grass: "grass.png",
    water: "drop.png",
    bug: "bug-catcher.png",
    poison: "potion.png",
    electric: "flash.png",
    psychic: "mental.png",
    normal: "green-tea.png",
    fight: "option.png",
    ground: "ground.png",
  };

  return Object.entries(typeIcons)
    .map(([type, icon]) =>
      pokeman.Types.includes(type)
        ? `<p class="typeColor">
             <img id="${type}" src="img/${icon}" alt="${type}">
           </p>`
        : ""
    )
    .join("");
}

const getBackgroundColor = (types) => {
  const colors = {
    fire: "#AA4203",
    grass: "green",
    normal: "#98d048",
    poison: "#2a3049",
    water: "#d4f1f9",
    electric: "#c1121f",
    fighting: "#faedcd",
    psychic: "#6a4c93",
    bug: "#e9b477",
    ground: "#b57f2b",
    rock: "#8a7f8d",
    fairy: "#f4b1f4",
    steel: "#b8b8d0",
    dark: "#705848",
    ghost: "#705898",
    ice: "#51c4e7",
    dragon: "#7038f8",
  };
  return colors[types[0]] || "gray";
};

const getTypeIcons = (types) => {
  const icons = {
    fire: "img/flame.png",
    grass: "img/grass.png",
    water: "img/drop.png",
    bug: "img/bug-catcher.png",
    poison: "img/potion.png",
    electric: "img/flash.png",
    psychic: "img/mental.png",
    normal: "img/green-tea.png",
    fight: "img/option.png",
    ground: "img/ground.png",
    rock: "img/rock.png",
    fairy: "img/fairy.png",
    steel: "img/steel.png",
    dark: "img/dark.png",
    ghost: "img/ghost.png",
    ice: "img/ice.png",
    dragon: "img/dragon.png",
  };
  return types
    .map((type) =>
      icons[type]
        ? `<img class="type-icon" src="${icons[type]}" alt="${type}">`
        : ""
    )
    .join("");
};

function returnHTMLCard(pokeman) {
  const typeString = pokeman.Types.join(" / ");
  const backgroundColor = getBackgroundColor(pokeman.Types);
  const typeIcons = getTypeIcons(pokeman.Types);

  return `
    <div class="pokemon-card-container" onclick="selectCard(${pokeman.Id})">
      <div class="pokemon-header">
        <p>#${pokeman.Id}</p>
        <p>${pokeman.Name}</p>
      </div>
      <div class="pokemon-card" style="background-color: ${backgroundColor};">
        <img class="pokemon-image bounce" src="${pokeman.Image}" alt="${pokeman.Name}">
        <div class="pokemon-types">${typeIcons}</div>
      </div>
    </div>
  `;
}

function contentHTMLPopup(pokeman, stattype, id) {
  let abilitytype = pokeman.abilities.map(
    (abilityInfo) => abilityInfo.ability.name
  );
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;

  let statData = pokeman.stats.map((stattype) => ({
    statName: stattype.stat.name,
    value: stattype.base_stat,
  }));

  return `
    <div class="popupCard">
      <div class="cardPopup">
        <div class="idAndName">
          <b>#${pokeman.id}</b>
          <b><strong>${pokeman.name}</strong></b>
          <b onclick="closePopup()" class="btnX">Close</b>
        </div>
        <div class="ImgCard">
          <img class="imgWidth bounce secondImagCard" 
            src="${image}" 
            alt="${pokeman.name}">
        </div>
        <div class="h1lsides">
          <h1 onclick="slideLeft()">
            <img class="leftArrow" src="img/left-arrow.png" alt="Slide Left">
          </h1>
          <h1 onclick="slideRight()">
            <img class="rightArrow" src="img/next.png" alt="Slide Right">
          </h1>
        </div>
        <div class="btn-Buttons">
          <button onclick="extraInfo(${pokeman.id})" class="btn-card">Show Info</button>
          <button onclick="findOutStatus(${pokeman.id})" id="btn-Stats" class="btn-card">Show Stats</button>
        </div>
        <div id="info-container"></div>
        <div id="status-container"></div>
      </div>
    </div>
  `;
}

function statusHTMLTemplate(stat) {
  return `
    <ul>
      <li>
        <label for="${stat.name}">${stat.name}</label>
        <progress id="${stat.name}" value="${stat.value}" max="100"></progress>
      </li>
    </ul>
  `;
}

function informationFunc(abilities, types, height, weight) {
  return `
    <div id="infoId">
      <p>Abilities: ${abilities}</p>
      <p>Types: ${types}</p>
      <p>Height: ${height}</p>
      <p>Weight: ${weight}</p>
    </div>
  `;
}

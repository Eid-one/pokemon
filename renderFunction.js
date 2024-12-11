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

function returnHTMLCard(pokeman) {
  // Helper to get background color by type
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
    };
    // Return the color of the first type found or default to gray
    return types.map((type) => colors[type]).find((color) => color) || "gray";
  };

  // Helper to generate type icon HTML
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
    };
    return types
      .map((type) =>
        icons[type]
          ? `<img class="type-icon" src="${icons[type]}" alt="${type}">`
          : ""
      )
      .join("");
  };

  const typeString = pokeman.Types.join(" / "); // Join types for display
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

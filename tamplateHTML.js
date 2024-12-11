/* 

function returnHTMLCard(pokeman) {
  const getBackgroundColor = (types) => {
    if (types.includes("fire")) return "#AA4203";
    if (types.includes("grass")) return "green";
    if (types.includes("normal")) return "#98d048";
    if (types.includes("poison")) return "#2a3049";
    if (types.includes("water")) return "#d4f1f9";
    if (types.includes("electric")) return "#c1121f";
    if (types.includes("fighting")) return "#faedcd";
    if (types.includes("psychic")) return "#6a4c93";
    if (types.includes("bug")) return "#e9b477";
    return "gray";
  };

  const typeString = pokeman.Types.join(" / "); // Join types for display

  return `
            <div onclick="selectCard(${pokeman.Id})">
              <div id="idname"> 
                <p>#${pokeman.Id}</p>
                <p>${pokeman.Name}</p>  
              </div>
              <div 
                class="pokemon-card" 
                style="background-color: ${getBackgroundColor(pokeman.Types)};"
                id="cardColors">
                <img class="imgcardOne bounce" src="${pokeman.Image}" alt="${
    pokeman.Nam
  }">
                  <p class="typeColor">
          ${
            pokeman.Types.includes("fire")
              ? '<img id="flame" src="img/flame.png" alt="flame">'
              : ""
          }
         
              
                </p>
                <p class="typeColor">
                  ${
                    pokeman.Types.includes("grass")
                      ? '<img id="flame" src="img/grass.png" alt="flame">'
                      : ""
                  }

              
                </p>
                <p class="typeColor">
                  ${
                    pokeman.Types.includes("water")
                      ? '<img id="flame" src="img/drop.png" alt="flame">'
                      : ""
                  }
             
                </p>
                <p class="typeColor">
                  ${
                    pokeman.Types.includes("bug")
                      ? '<img id="flame" src="img/bug-catcher.png" alt="flame">'
                      : ""
                  }
          
              
                </p>

                <p class="typeColor">
           

                  ${
                    pokeman.Types.includes("poison")
                      ? '<img id="flame" src="img/potion.png" alt="flame"> '
                      : " "
                  }
                  
              
                </p>

               
                <p class="typeColor">
           

                  ${
                    pokeman.Types.includes("electric")
                      ? '<img id="flame" src="img/flash.png" alt="flame"> '
                      : " "
                  }
                  
              
                </p>

               
                <p class="typeColor">
           

                  ${
                    pokeman.Types.includes("psychic")
                      ? '<img id="flame" src="img/mental.png" alt="flame"> '
                      : " "
                  }
                  
              
                </p>
                <p class="typeColor">
           

                  ${
                    pokeman.Types.includes("normal")
                      ? '<img id="flame" src="img/green-tea.png" alt="flame"> '
                      : " "
                  }
                  
              
                </p>
                <p class="typeColor">
           

                  ${
                    pokeman.Types.includes("fight")
                      ? '<img id="flame" src="img/option.png" alt="flame"> '
                      : " "
                  }
                  
              
                </p>
                </p>
                <p class="typeColor">
           

                  ${
                    pokeman.Types.includes("ground")
                      ? '<img id="flame" src="img/ground.png" alt="flame"> '
                      : " "
                  }
                  
              
                </p>


               
               
              </div>
            </div>
            
           
          `;
} */

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

function contentHTMLPopup(pokeman, stattype) {
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
                  <b onclick="closePopup()"class="btnX">Close</b>
                  </div> 


             <div class="ImgCard">
                <img class="imgWidth bounce secondImagCard" 
                  src="${image}" 
                  alt="${pokeman.name}">
                  </div>
                  <div class="infoCard">
                 <p class="typeInfo">
                  <small>Type:</small> ${type}
                </p> 
                <p class="typeInfo">
                  <small>Height:</small> ${pokeman.height}
                </p> 
                <p class="typeInfo">
                  <small>Weight:</small> ${pokeman.weight}
                </p> 
                </div>
                <div class="h1lsides">
                  <h1 onclick="slideLeft()">
                    <img class="leftArrow" src="img/left-arrow.png" alt="Slide Left">
                  </h1>
                  <h1 onclick="slideRight()">
                    <img class="rightArrow" src="img/next.png" alt="Slide Right">
                  </h1>
                </div>
               
                
                <ul class="statsList">
                  ${statData
                    .map(
                      (stat) => `
                        <li>
                          <label for="${stat.statName}">${stat.statName}</label>
                          <progress 
                            id="${stat.statName}" 
                            value="${stat.value}" 
                            max="100"
                          ></progress>
                        </li>


                      `
                    )
                    .join("")}
                </ul>



  </div>
  </div>
        `;
}

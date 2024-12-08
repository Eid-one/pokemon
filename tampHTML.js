function returnHTMLCard(pokeman) {
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

  return `
    <div onclick="selectCard(${pokeman.Id})"">
            <div id="idname"> 
              <p>#${pokeman.Id}</p>
              <p>${pokeman.Name}</p>  
            </div>
            <div 
              class="pokemon-card" 
              style="background-color: ${getBackgroundColor(pokeman.Types)};"
              id="cardColors"> <img class="imgcardOne bounce" src="${
                pokeman.Image
              }" alt="${pokeman.Name}">
              <p class="typeColor">${pokeman.Types}</p>
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

                  <div class="idAndName">
                  <b>#${pokeman.id}</b>
                  <b><strong>${pokeman.name}</strong></b>
                  <b onclick="closePopup()"class="btnX">Close</b>
                  </div> 
                 
             <div class="cardPopup">
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

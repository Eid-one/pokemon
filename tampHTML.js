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
      
    <div onclick="selectCard(${pokeman.Id})">
    <div id="idname"> 
      <p>#${pokeman.Id}</p>
       <p> ${pokeman.Name}</p>  
      </div>
      <div class="pokemon-card" style="background-color: ${getBackgroundColor(
        pokeman.Types
      )}; id="cardColors">
      <img class="imgWidth" src="${pokeman.Image}">
         <p>TYPE: ${pokeman.Types.join(", ")}</p>
        </div>
      </div>
      `;
}

function contentHTMLPopup(pokeman) {
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const image = pokeman.sprites.other["official-artwork"].front_default;
  let stats = pokeman.stats.map((stat) => ({
    statName: stat.stat.name,
    value: stat.base_stat,
  }));

  return `
    <div class="popupCard">
      <b onclick="closePopup()" class="btnX">Close</b>
      <div class="popupInner">
        <div class="cardIdName">
          <b>#${pokeman.id}</b>
          <p><strong>${pokeman.name}</strong></p>
        </div>
        <div class="secondCard">
          <img class="imgWidth" src="${image}" alt="${pokeman.name}">
          <div class="h1lsides">
            <h1 onclick="slideLeft()"> <img class="leftArrow" src="img/left-arrow.png" alt=""></h1>
            <h1 onclick="slideRight()"> <img   class="rightArrow"src="img/next.png" alt=""> </h1>
          </div>
          <p><strong>Height:</strong> ${pokeman.height}</p>
          <p><strong>Weight:</strong> ${pokeman.weight}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Stats:</strong></p>
          <ul>
            ${stats
              .map(
                (stat) => `
                <li class="listClass">
                   <label for="${stat.statName}"> ${stat.statName}:</label> 
                  <progress id="${stat.statName}" value="${stat.value}" max="200"></progress>
                </li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

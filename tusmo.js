function generateCard(pokemon, pokemonCard) {
  const typImgLinks = getTypeImage(pokemon.type);

  const cardHTML = `
    <div class="pokemon_card bg_${
      pokemon.type[0]
    }" onclick="showDetailedInformation(${pokemon.id})">
        <div class="img_div">
            <img class="pokemon_card_image" src="${pokemon.imageUrl}" alt="${
    pokemon.name
  }">
            <h3>${pokemon.name.toUpperCase()} (#${pokemon.id})</h3>
        </div>
        <div class="pokemon_types">
            <h4>Type(s):</h4>
            <div id="types_div_${divID}"></div>
        </div>
    </div>`;

  pokemonCard.innerHTML += cardHTML;

  loadImages(typImgLinks, pokemon.type, divID);
  divID++;
}

function loadImages(typImgLinks, typNames, divID) {
  let contentRef = document.getElementById(`types_div_${divID}`);
  for (let index = 0; index < typImgLinks.length; index++) {
    let img = typImgLinks[index];
    let name = typNames[index];
    contentRef.innerHTML += `
        <img src="${img}" alt="">
        <span>${name.toUpperCase()}</span>
    `;
  }
}

// Detailansicht

function htmlDisplayDetailedPokemon(data) {
  let nextPokemon = data.id + 1;
  let previousPokemon = data.id - 1;
  document.getElementById("content").classList.add("hidden");
  document.getElementById("detail_card_div_id").classList.remove("hidden");
  document.getElementById("detail_card_div_id").classList.add("flex");
  let contentRef = document.getElementById("detail_card_div_id");
  contentRef.innerHTML = ``;
  contentRef.innerHTML += `
<div class="detail_card displayed_card  bg_${
    data.type[0]
  }" id="displayed_card_id">
        <div class="div_sizing_details">
            <h1>${data.name.toUpperCase()} (#${data.id})</h1>
        </div>
        <div>
            <img class="img_hover arrow_img" src="./assets/img/left-297787_1280.png" onclick="showDetailedInformation(${previousPokemon})" alt="">
            <img src="${data.imageUrl}" alt="bild">
            <img class="img_hover arrow_img" src="./assets/img/right-297788_1280.png" onclick="showDetailedInformation(${nextPokemon})" alt="">
        </div>
        <div class="decision_div">
            <div class="decision_div_seperate" onclick="changeToInfo()">Infos</div>
            <div class="decision_div_seperate" onclick="changeToAttack()">Attack</div>
        </div>
        <div class="detail_view" id="detail_view_id">
            <div id="placholderID" class="my_table_container">
                <table id="infosTable" class="my_table">
                    <tbody>
                        <tr>
                            <th>Abilities:</th>
                            <td>${data.abilities}</td>
                        </tr>
                        <tr>
                            <th>Height:</th>
                            <td>${data.height}</td>
                        </tr>
                        <tr>
                            <th>Weight:</th>
                            <td>${data.weight}</td>
                        </tr>                        
                    </tbody>
                </table>
                <div class="hidden" id="attackTable">
                    <b>HP:<br>  </b><input type="range" min="0" max="100" value="${
                      data.HP
                    }" step="0"><br>
                    <b>ATTACK:<br>  </b><input type="range" min="0" max="100" value="${
                      data.attack
                    }" step="0"><br>                       
                    <b>DEFENSE:<br>  </b><input type="range" min="0" max="100" value="${
                      data.defense
                    }" step="0"><br>                    
                    <b>SPECIAL:<br>  </b><input type="range" min="0" max="100" value="${
                      data.special
                    }" step="0"><br>                     
                    <b>SPEED:<br>  </b><input type="range" min="0" max="100" value="${
                      data.speed
                    }" step="0">
                    
                </div>
            </div>
        </div>
    </div>
`;
}

// async function generateCard(pokemon, pokemonCard) {
//     try{
//         const typImgLinks = getTypeImage(pokemon.type);

//     pokemonCard.innerHTML += `
//         <div class="pokemon_card bg_${pokemon.type[0]}" onclick="showDetailedInformation(${pokemon.id})">
//             <div class="img_div">
//                 <img class="pokemon_card_image" src="${pokemon.imageUrl}" alt="">
//                 <h3>${pokemon.name.toUpperCase()} (#${pokemon.id})</h3>
//             </div>
//             <div class="pokemon_types">
//                 <h4>Type(s):</h4>
//                 <div id="types_div_${divID}"></div>
//             </div>
//         </div>`;

//         await loadImages(typImgLinks, pokemon.type, divID);
//         divID++;
//     } catch (error){
//         console.error("Error generating Pokemon card:", error);
//     }
// }

function changeToAttack() {
  let attackCard = document.getElementById("attackTable");
  let infocard = document.getElementById("infosTable");
  attackCard.classList.remove("hidden");
  infocard.classList.add("hidden");
}

function changeToInfo() {
  let attackCard = document.getElementById("attackTable");
  let infocard = document.getElementById("infosTable");
  attackCard.classList.add("hidden");
  infocard.classList.remove("hidden");
}

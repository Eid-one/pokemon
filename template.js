function HTMLRetern(pokeman) {
  return `
          <div class="card"onclick="selectPokemon(${pokeman.Id})" class="grass">
            <div class="CardInfo">
              <h4> #${pokeman.Id}</h4>
              <h3>${pokeman.Name}</h3>
            </div>
            <br>
            <img id='imgCard' src="${pokeman.Image}" alt="">
          </div>
          `;
}

function templateHTM(
  pokeman,
  type,
  baseStatEffort,
  baseStatEffort1,
  baseStatEffort2,
  baseStatEffort3,
  baseStatEffort4,
  baseStatEffort5,
  height,
  weight
) {
  const image = pokeman.sprites.other["official-artwork"].front_default;
  return `
        <div class="cardTwo">
   
          <div class="popupCard">
           <p onclick="closePopup()"class="close"><img id="iconX" src="img/icons8-close-24.png" alt=""></p>
            <div class="imgCon">
            <img id="imgtwo" src="${image}" alt="${pokeman.name}">
            <div class="buttons">
            <button> Static</button>
            <button>Evoltion</button>
            </div>
            </div>
            <div textContainer>
          <h3><small>#${pokeman.id}</small></h3>
            <p><small>Name:</small> ${pokeman.name}</p>
            <p><small>Type:</small> ${type}</p>
            <p><small>Height:</small>${height} |H</p>
            <p><small>Weight:</small> ${weight} |g</p>

         
            </div>

           
          </div>
          
        </div>
      `;
}
/*  <div class="tusmo">
            <label for="file">hp:</label>
            <progress id="file" value="${baseStatEffort}" max="100"> 52% </progress>
              <label for="file">attack:</label>
            <progress id="file" value="${baseStatEffort1}" max="100"> 32% </progress>
            <label for="file">defense:</label>
            <progress id="file" value="${baseStatEffort2}" max="100"> 82% </progress>
            <label for="file">special-attack:</label>
            <progress id="file" value="${baseStatEffort3}" max="100"> 82% </progress>
            <label for="file">special-defense:</label>
            <progress id="file" value="${baseStatEffort4}" max="100"> 82% </progress>
             <label for="file">Speed:</label>
            <progress id="file" value="${baseStatEffort5}" max="100"> 82% </progress>

            </div> */

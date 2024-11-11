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

function templateHTM(pokeman, type, baseStatEffort) {
  const image = pokeman.sprites.other["official-artwork"].front_default;
  return `
      <div class="cardTwo">
        <p onclick="closePopup()" class="close">Close</p>
        <br>
        <div class="containerPopup">
        <img id="imgtwo" src="${image}" alt="${pokeman.name}">
        <div  class="infoCard">
        <p>  <small>${pokeman.id}</small>  </p>

        <div><small> Name:${pokeman.name} </small></div>
        <p> <i> Type:${type}</i></p>
<p>Effort: ${baseStatEffort}</p>
         </div>
         </div>
      </div>
    `;
}

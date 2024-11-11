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

function templateHTM(pokeman, type, baseStatEffort, height, weight) {
  const image = pokeman.sprites.other["official-artwork"].front_default;
  return `
        <div class="cardTwo">
          <p onclick="closePopup()"class="close">Close</p>
          <br>
          <div class="InfoCard">
            <img id="imgtwo" src="${image}" alt="${pokeman.name}">
            <h3><small>#${pokeman.id}</small></h3>
            <p><small>Name:</small> ${pokeman.name}</p>
            <p><small>Type:</small> ${type}</p>
            <p><small>Height:</small>${height} |H</p>
            <p><small>Weight:</small> ${weight} |g</p>
            <p><small>Effort: </small>${baseStatEffort}</p>
          </div>
        </div>
      `;
}

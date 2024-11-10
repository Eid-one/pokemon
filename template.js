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
        <p onclick="closePopup()">Close</p>
        <br>
        <img id="imgtwo" src="${image}" alt="${pokeman.name}">
        <p>${pokeman.name} ${pokeman.id}  <u>${type}</u></p>
        <p>Effort: ${baseStatEffort}</p>
      </div>
    `;
}

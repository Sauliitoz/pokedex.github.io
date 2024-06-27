const pokeName = document.querySelector(".pokeName");
const pokeNumber = document.querySelector(".pokeNumber");
const pokeImg = document.querySelector(".pokeImg");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPoke = 1;

async function getPoke(pokemon) {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const response = await APIResponse.json();
    return response;
  }
}

async function renderPoke(pokemon) {
  pokeName.innerHTML = "Loading...";
  pokeNumber.innerHTML = "";
  const data = await getPoke(pokemon);
  if (data) {
    pokeImg.style.display = "block";
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = data.id;
    pokeImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = "";
    searchPoke = data.id
  } else {
    pokeName.innerHTML = "Not found";
    pokeNumber.innerHTML = "";
    pokeImg.style.display = "none";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPoke(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPoke > 1) {
    searchPoke -= 1;
    renderPoke(searchPoke);
  }
});

buttonNext.addEventListener("click", () => {
    if(searchPoke < 649 ){
  searchPoke += 1;
  renderPoke(searchPoke);}
});

renderPoke(searchPoke);

(() => {
  class Pokemonager {
    // This should return an array of all the names of n Pokemon from the Pokemon API.
    findNames(n) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${n}/`)
        .then((value) => value.json())
        .then((value) => value.results)
        .then((valueResult) => valueResult.map((item) => item.name));
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    findUnderWeight(weight) {
      // Your code here.
      // ** LIMIT TO THE FIRST 10 POKEMON
      // We don't want to make too many unnecessary calls to the Pokemon API

      return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10/`)
        .then((value) => value.json())
        .then((value) => value.results.map((item) => item.url))
        .then((urlArray) =>
          Promise.all(urlArray.map(async (url) => await fetch(url)))
        )
        .then((itemArray) =>
          Promise.all(
            itemArray.map(async (itemArray) => await itemArray.json())
          )
        )
        .then((pokemonAll) =>
          pokemonAll.filter((pokemon) => pokemon.weight < weight)
        );
    }
  }

  window.Pokemonager = Pokemonager;
})();

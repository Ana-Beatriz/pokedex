const pokemonList = document.getElementById('pokemonList')
const btnPoke = document.getElementById('btnPoke')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <section class="detail">
               <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}" alt="${pokemon.name}" >
            </section>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

btnPoke.addEventListener('click', () => {
    offset += limit

    const qntRecordNextPage = offset + limit

    if (qntRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        btnPoke.parentElement.removeChild(btnPoke)
    } else {
        loadPokemonItens(offset, limit)
    }

})


/* //MULTIPLOS CALLBACKS (não recomendado)
fetch(url)
    .then(function (response) {
        response
            .json()
            .then(function (responseBody) {
                console.log(responseBody)
            })

    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
        console.log('Requisição concluída!')
    }) */

/* //ELIMINANDO CALLBACKS (hereança de encaminhamento THEN)
fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (jsonbody) {
        console.log(jsonbody)
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
        console.log('Requisição concluída!')
    }) */

/* //REDUÇÃO DE SINTAXE POR ARROW FUNCTION
fetch(url)
    .then((response) => response.json())
    .then((Jsonbody) => Jsonbody.results)
    .then((pokemons) => {

        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            pokemonList.innerHTML += convertPokemonToLi(pokemon)

        }
    })
    .catch((error) => console.log(error))
 */

/* //CONVERTENDO LISTA DE POKEMONS DE OBJETO PARA HTML USANDO FOR
pokeApi.getPokemons().then((pokemons = []) => {
    const listPoke = []

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listPoke.push(convertPokemonToLi(pokemon))
    }
    console.log(listPoke)
}) */

/* //CONVERTENDO LISTA DE POKEMONS DE OBJETO PARA HTML USANDO MAP
pokeApi.getPokemons().then((pokemons = []) => {
    const newList = pokemons.map((pokemon) => {
        return convertPokemonToLi(pokemon)
    })

    const newHtml = newList.join(' ')
    pokemonList.innerHTML += newList
})
 */

/* //REDUÇÃO DE SINTAXE CONVERTENDO LISTA DE OBJ PARA HTML USANDO MAP
pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
}) */


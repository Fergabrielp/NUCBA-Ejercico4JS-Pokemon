const input = document.getElementById('input')
const form = document.getElementById('form')
const cardContainer = document.getElementById('card-container')


const getPoke = async (id) => {
    pokeSpinner()
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const res = await fetch(url)
        const poke = await res.json()
        return poke
    } catch (error) {
        msgError("Todavía no atrapamos ese Pokémon 😥")
        form.reset()
    }

}

const pokeSpinner = () => {
    cardContainer.innerHTML = `<div class="wrapper">
                                    <div class="pokeball">
                                    </div>
                                </div>`
}

const renderCard = (poke) => {
    const correctHeight = poke.height / 10
    const correctWeight = poke.weight / 10

    cardContainer.innerHTML = `<div class="card">
                                    <div class="img-container">
                                        <img src=${poke.sprites.other.home.front_default} alt="pokemon image" />
                                    </div>
                                    <div class="info-container">
                                        <h2 class="name">${poke.name}</h2>
                                        <div class="columns">
                                            <div class="data-container">
                                                <h3><span class="info">Tipo:</span> ${poke.types[0].type.name}</h3>
                                                <h3><span class="info">Altura:</span> ${correctHeight} mts</h3>
                                                <h3><span class="info">Peso:</span> ${correctWeight} kg</h3>
                                            </div>
                                            <div class="data-container">
                                                <h3><span class="attack">Ataque 1:</span> ${poke.moves[0].move.name}</h3>
                                                <h3><span class="attack">Ataque 2:</span> ${poke.moves[1].move.name}</h3>
                                                <h3><span class="attack">Ataque 3:</span> ${poke.moves[2].move.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
}


const msgError = (msg) => {
    cardContainer.innerHTML = `<p class="error">${msg}</p>`
}


const searchPoke = async (e) => {
    e.preventDefault()

    const id = input.value

    if (id === "") {
        msgError("Por favor, ingrese un número")
    } else {
        const poke = await getPoke(id)
        renderCard(poke)
    }
    form.reset()
}


const init = () => {
    form.addEventListener('submit', searchPoke)
}

init()
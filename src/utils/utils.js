export const finalPokeId = 493

export const chunkSize = 12;

export const statHeightUnit = 17;

export const statHeightMeasure = 0.75;

export const zeroFront = (num, places) => String(num).padStart(places, '0')

export const capFirstLetter = (string) => String(string?.charAt(0).toUpperCase() + string?.slice(1));

export const calcStatHeight = (stat) => (Math.ceil(stat / statHeightUnit)) * 0.75

export const extractIdFromURL = (url) => url?.substring('https://pokeapi.co/api/v2/pokemon/'.length).replace('/', '')

export const extractIdFromURLSpecies = (url) => url.substring('https://pokeapi.co/api/v2/pokemon-species/'.length).replace('/', '')

export const getWeaknessInfo = async (url) => {
    let data = await fetch(url)
    data = await data.json()
    return data
}

const arrangeEvoData = (result, data, stage) => {
    if (parseInt(extractIdFromURLSpecies(data.species.url)) > finalPokeId) return
    const newElement = { name: data.species.name, id: parseInt(extractIdFromURLSpecies(data.species.url)), stage: stage, route: result[stage] ? result[stage].length : 0 }
    result[stage] = result[stage] ? [...result[stage], newElement] : [newElement]
    stage = stage + 1
    if (data.evolves_to.length === 0) return
    for (let i = 0; i < data.evolves_to.length; i++) {
        arrangeEvoData(result, structuredClone(data.evolves_to[i]), stage)
    }
    return
}

export const getEvoData = (jsonData) => {
    let newData = jsonData.chain
    let route = 0
    let stage = 0
    const result = []
    arrangeEvoData(result, newData, stage, route)
    //getPokeImg(result)
    return result
}

export const getChunk = async (newData) => {
    const pokeData = [];
    for (let i = 0; i <= newData.length - 1; i++) {
        try {
            let data = await fetch(newData[i].url)
            data = await data.json()
            pokeData.push(data)
        } catch (err) {
            console.log(err)
        }
    }
    return pokeData
}

export const typeInfo = {
    "bug": "#729F3F",
    "dark": "#707070",
    "dragon": "#FF0000",
    "electric": "#EED535",
    "fairy": "#FDB9E9",
    "fighting": "#D56723",
    "fire": "#FD7D24",
    "flying": "#3DC7EF",
    "ghost": "#7B62A3",
    "grass": "#9BCC50",
    "ground": "#AB9842",
    "ice": "#94E6FF",
    "normal": "#A4ACAF",
    "poison": "#B97FC9",
    "psychic": "#F366B9",
    "rock": "#A28B20",
    "steel": "#9EB7B8",
    "water": "#4592C4",
}
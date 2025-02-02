export const zeroFront = (num, places) => String(num).padStart(places, '0')

export const capFirstLetter = (string) => String(string?.charAt(0).toUpperCase() + string?.slice(1));

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
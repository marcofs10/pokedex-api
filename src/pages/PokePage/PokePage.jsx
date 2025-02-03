import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Evolution } from '../../components/Evolution/Evolution.jsx'
import { Stats } from '../../components/Stats/Stats.jsx'
import { Details } from '../../components/Details/Details.jsx'
import { TypeWeakness } from '../../components/TypeWeakness/TypeWeakness.jsx'
import { Navigation } from '../../components/Navigation/Navigation.jsx'
import * as utils from '../../utils/utils.js'
import './PokePage.css'

export const PokePage = ({ isMobile }) => {

    const [pokeInfo, setPokeInfo] = useState()
    const [previous, setPrevious] = useState()
    const [next, setNext] = useState()
    const [pokeDetails, setPokeDetails] = useState()
    const [weaknesses, setWeaknesess] = useState()
    const [evoChain, setEvoChain] = useState()
    const id = useParams()
    const idInt = parseInt(id.id)

    useEffect(() => {
        const getPokeInfo = async () => {
            let newData 
            try{
                newData = await fetch(`https://pokeapi.co/api/v2/pokemon/${idInt}`)
                newData = await newData.json()
            }catch (err) {
                console.log(err)
            }
            return newData
        }
        getPokeInfo().then(data => setPokeInfo(data))

        const getPreviousAndNext = async () => {
            try{
                let newData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=${idInt <= 2 ? 0 : (idInt - 2)}`)
                newData = await newData.json()
                setPrevious(newData.results[0])
                setNext(idInt === 1 ? newData.results[1] : newData.results[2])
            }catch (err) {
                console.log(err)
            }
        }
        getPreviousAndNext()

        const getDescription = async () => {
            try{
                let newData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idInt}/`)
                newData = await newData.json()
                let evolutionData = await fetch(newData.evolution_chain.url)
                evolutionData = await evolutionData.json()
                evolutionData = utils.getEvoData(evolutionData)
                setEvoChain(evolutionData)
                setPokeDetails(newData)
            }catch (err) {
                console.log(err)
            }   
        }
        getDescription()
    }, [id])

    useEffect(() => {
        if (pokeInfo) {
            let weakness = [];
            let halfDamage = [];
            let noDamage = [];
            const getWeaknesses = async () => {
                for (let i = 0; i < pokeInfo.types.length; i++) {
                    let data = await utils.getWeaknessInfo(pokeInfo.types[i].type.url)
                    weakness = [...weakness, ...data.damage_relations.double_damage_from]
                    halfDamage = [...halfDamage, ...data.damage_relations.half_damage_from]
                    noDamage = [...noDamage, ...data.damage_relations.no_damage_from]
                }
            }
            getWeaknesses().then(() => {
                weakness = weakness.map(el => el.name)
                halfDamage = halfDamage.map(el => el.name)
                noDamage = noDamage.map(el => el.name)
                weakness =weakness.filter(el => !(noDamage.includes(el) || halfDamage.includes(el)))
                setWeaknesess([...new Set(weakness)])
            })
        }
    }, [pokeInfo])

    document.title = `${utils.capFirstLetter(pokeInfo?.name)} | Pokédex`;

    if (isMobile) {
        return (
            <div className='pokePage'>
                <Navigation previous={previous} next={next} pokeInfo={pokeInfo} id={idInt} isMobile={isMobile} />
                <div className='info vertical'>
                    <img src={pokeInfo?.sprites.other["official-artwork"].front_default} alt="" />
                    <p>{pokeDetails?.flavor_text_entries[0].flavor_text.replace('', ' ')}</p>
                    <TypeWeakness pokeInfo={pokeInfo} weaknesses={weaknesses} />
                    <Details className='sectionVertical' pokeInfo={pokeInfo} pokeDetails={pokeDetails} />
                    <Stats stats={pokeInfo?.stats} isMobile={isMobile} />
                    <Evolution evoChain={evoChain} />
                </div>
                <div className='exploreVertical'>
                    <button onClick={() => navigate('/pokedex')}>Explore More Pokémon</button>
                </div>
            </div>
        )
    }

    return (
        <div className='pokePage'>
            <Navigation previous={previous} next={next} pokeInfo={pokeInfo} id={idInt} />
            <div className='info'>
                <div>
                    <img src={pokeInfo?.sprites.other["official-artwork"].front_default} alt="" />
                    <Stats stats={pokeInfo?.stats} />
                </div>
                <div>
                    <p>{pokeDetails?.flavor_text_entries[0].flavor_text.replace('', ' ')}</p>
                    <Details pokeInfo={pokeInfo} pokeDetails={pokeDetails} />
                    <TypeWeakness pokeInfo={pokeInfo} weaknesses={weaknesses} />
                </div>
            </div>
            <div>
                <Evolution evoChain={evoChain} />
            </div>
            <div>
                <button>Explore More Pokémon</button>
            </div>
        </div>
    )
}

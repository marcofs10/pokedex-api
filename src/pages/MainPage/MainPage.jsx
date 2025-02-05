import React, { useEffect, useState } from 'react'
import { Search } from '../../components/Search/Search'
import { Content } from '../../components/Content/Content'
import { AdvancedFilters } from '../../components/AdvancedFilters/AdvancedFilters.jsx'
import * as utils from '../../utils/utils.js'
import './MainPage.css'

export const MainPage = () => {

    const [openWrapper, setOpenWrapper] = useState(false);
    const [pokeListTotal, setPokeListTotal] = useState([])
    const [pokeAdvancedFilterTotal, setPokeAdvancedFilterTotal] = useState()
    const [trigger, setTrigger] = useState(false)
    const [searchFilter, setSearchFilter] = useState()
    const [advFilters, setAdvFilters] = useState({
        typeFilter: '',
        abilityFilter: 'all',
        initialRange: 1,
        finalRange: utils.finalPokeId,
    })

    const fireTrigger = () => {
        setTrigger(!trigger)
    }

    useEffect(() => {
        const getFilteredPokemon = async () => {
            let newData = [...pokeListTotal];
            if (advFilters.initialRange != 1 || advFilters.finalRange != utils.finalPokeId) {
                newData = newData.slice(advFilters.initialRange >= 1 ? advFilters.initialRange - 1 : 0, advFilters.finalRange)
            }
            if (advFilters.abilityFilter !== 'all') {
                let dataAbility = await fetch(`https://pokeapi.co/api/v2/ability/${advFilters.abilityFilter}`)
                dataAbility = await dataAbility.json()
                dataAbility = dataAbility.pokemon.map(el => el.pokemon.name)
                newData = newData.filter(el => dataAbility.includes(el.name))
            }
            if (advFilters.typeFilter !== '') {
                let dataFilter = await fetch(`https://pokeapi.co/api/v2/type/${advFilters.typeFilter}`)
                dataFilter = await dataFilter.json()
                dataFilter = dataFilter.pokemon.map(el => el.pokemon.name)
                newData = newData.filter(el => dataFilter.includes(el.name))
            }
            if (searchFilter !== undefined) {
                let namesFiltered = [...searchFilter].map(el => el.name)
                newData = newData.filter(el => namesFiltered.includes(el.name))
            }
            setPokeAdvancedFilterTotal([...newData])
        }
        getFilteredPokemon()
    }, [trigger])

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${utils.finalPokeId}}&offset=0.`)
            .then(response => response.json())
            .then(data => setPokeListTotal(data.results))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='mainPage'>
            <div>
                <h1>Pokédex</h1>
            </div>
            <Search pokeListTotal={pokeListTotal} setSearchFilter={setSearchFilter} fireTrigger={fireTrigger} />
            <section style={{ height: `${openWrapper ? '0px' : '24px'}` }} className='closedWrapper'></section>
            <section style={{ height: `${openWrapper ? '520px' : '0px'}` }} className='openWrapper'>
                <AdvancedFilters 
                    pokeListTotal={pokeListTotal}
                    setAdvFilters={setAdvFilters} 
                    setSearchFilter={setSearchFilter} 
                    fireTrigger={fireTrigger} />
            </section>
            <div>
                <div className='handler' onClick={() => setOpenWrapper(!openWrapper)}>
                    <span className={`${openWrapper ? 'openHandler' : 'closedHandler'}`}>{`${openWrapper ? 'Hide' : 'Show'} Advanced Search`}</span>
                </div>
            </div>
            <Content pokeListTotal={pokeListTotal} pokeAdvancedFilterTotal={pokeAdvancedFilterTotal} />
            <section>Built by <span>marcofs10</span> using React<br />Page inspired by <span>Pokémon Official Website</span>. Images and assets belong to their respective owners<br />Credits of used icons in the README.md file of the <span>repository</span>. </section>
        </div>
    )
}

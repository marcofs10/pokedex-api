import React, { useEffect, useState } from 'react'
import { Search } from '../../components/Search/Search'
import { Content } from '../../components/Content/Content'
import { AdvancedFilters } from '../../components/AdvancedFilters/AdvancedFilters.jsx'
import * as utils from '../../utils/utils.js'
import './MainPage.css'

export const MainPage = () => {

    const [openWrapper, setOpenWrapper] = useState(false);
    const [pokeListTotal, setPokeListTotal] = useState([])


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
            <Search pokeListTotal={pokeListTotal} />
            <section style={{ height: `${openWrapper ? '0px' : '24px'}` }} className='closedWrapper'></section>
            <section style={{ height: `${openWrapper ? '520px' : '0px'}` }} className='openWrapper'>
                <AdvancedFilters/>
            </section>
            <div>
                <div className='handler' onClick={() => setOpenWrapper(!openWrapper)}>
                    <span className={`${openWrapper ? 'openHandler' : 'closedHandler'}`}>{`${openWrapper ? 'Hide' : 'Show'} Advanced Search`}</span>
                </div>
            </div>
            <Content pokeListTotal={pokeListTotal}/>
            <section>Built by <span>marcofs10</span> using React<br />Page inspired by <span>Pokémon Official Website</span>. Images and assets belong to their respective owners<br />Credits of used icons in the README.md file of the <span>repository</span>. </section>
        </div>
    )
}

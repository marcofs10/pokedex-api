import React, { useEffect, useState, useRef } from 'react'
import { Pokemon } from '../../components/Pokemon/Pokemon'
import * as utils from '../../utils/utils.js'
import './Content.css'

export const Content = ({ pokeListTotal }) => {

    const [openList, setOpenList] = useState(false);
    const [pokeTotalFetch,setPokeTotalFetch] = useState()
    const [pokeContent, setPokeContent] = useState([])
    const [pokeContentTotal, setPokeContentTotal] = useState([])
    const sortRef = useRef();


    useEffect(() => {
        if (pokeListTotal) {
            setPokeTotalFetch([...pokeListTotal])
            const newData = pokeListTotal.slice(0, utils.chunkSize)
            utils.getChunk(newData).then(data => setPokeContent(data))
        }
    }, [pokeListTotal])

    const getNextChunk = async () => {
        const firstElement = pokeContent.length
        //TODO: retirar validacion y tratar que el boton desaparezca cuando ya no haya mas en la lista
        if (firstElement !== pokeContentTotal.length) {
            let newData = [...pokeContentTotal].slice(firstElement, firstElement + utils.chunkSize)
            newData = await utils.getChunk(newData)
            setPokeContent([...pokeContent, ...newData])
        }
    }

    useEffect(() => {
        const onClickOutside = (e) => {
            if (!sortRef.current.contains(e.target)) {
                setOpenList(false)
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    })

    return (
        <div>
            <section className='content'>
                <div>
                    <button><span>Surprise Me!</span></button>
                    <div>
                        <span>Sort By</span>
                        <div ref={sortRef} className={openList ? 'openListGrid' : 'closedListGrid'} onClick={() => setOpenList(!openList)}>
                            <span>Lowest Number(First)</span>
                            {openList && <ul>
                                <li>Lowest Number(First)</li>
                                <li>Highest Number(First)</li>
                                <li>A-Z</li>
                                <li>Z-A</li>
                            </ul>}
                        </div>
                    </div>
                </div>
                {pokeContent.length===0 ? <span>No Pokémon Matched Your Search!</span> : ''}
                <section className='pokemonGrid'>
                    {pokeContent.map((pokemon, index) => (<Pokemon
                        key={index}
                        name={pokemon.forms[0].name}
                        id={pokemon.id}
                        image={pokemon.sprites.other["official-artwork"].front_default}
                        types={pokemon.types}
                    />))}
                </section>
                {pokeContent.length !== pokeContentTotal.length && <button onClick={() => getNextChunk()}>Load more Pokémon</button>}
            </section>
        </div>
    )
}

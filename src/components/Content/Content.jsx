import React, { useEffect, useState, useRef } from 'react'
import { Pokemon } from '../../components/Pokemon/Pokemon'
import * as utils from '../../utils/utils.js'
import './Content.css'

export const Content = ({ pokeListTotal }) => {

    const [openList, setOpenList] = useState(false);
    const [sorting, setSorting] = useState('Lowest Number(First)')
    const [pokeTotalFetch,setPokeTotalFetch] = useState()
    const [pokeContent, setPokeContent] = useState([])
    const [pokeContentTotal, setPokeContentTotal] = useState([])
    const sortRef = useRef();

    const randomize = () => {
        let newData = [...pokeTotalFetch]
        for (let i = newData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newData[i], newData[j]] = [newData[j], newData[i]];
        }
        setPokeContentTotal([...newData]);
        newData = newData.slice(0, utils.chunkSize)
        utils.getChunk(newData).then(data => setPokeContent(data))
    };

    useEffect(() => {
        if (pokeListTotal) {
            setPokeTotalFetch([...pokeListTotal])
            if (sorting === 'A-Z' || sorting === 'Z-A') {
                sortContentAZ(pokeListTotal, sorting, true)
            } else {
                sortContentNum(pokeListTotal, sorting, true)
            }
        }
    }, [pokeListTotal])

    const sortContentNum = (array, string, isEffect) => {
        if (string !== sorting || isEffect === true) {
            let newData = [...array].sort((a, b) => parseInt(a.url.substring('https://pokeapi.co/api/v2/pokemon/'.length).replace('/', '')) > parseInt(b.url.substring('https://pokeapi.co/api/v2/pokemon/'.length).replace('/', '')) ? 1 : -1)
            if (string === 'Highest Number(First)') newData.reverse()
            setPokeContentTotal([...newData])
            newData = newData.slice(0, utils.chunkSize)
            utils.getChunk(newData).then(data => setPokeContent(data))
        }
    }

    const sortContentAZ = (array, string, isEffect) => {
        if (string !== sorting || isEffect === true) {
            let newData = [...array].sort((a, b) => a.name > b.name ? 1 : -1)
            if (string === 'Z-A') newData.reverse()
            setPokeContentTotal([...newData])
            newData = newData.slice(0, utils.chunkSize)
            utils.getChunk(newData).then(data => setPokeContent(data))
        }
    }

    const getNextChunk = async () => {
        const firstElement = pokeContent.length
        //TODO: retirar validacion y tratar que el boton desaparezca cuando ya no haya mas en la lista
        if (firstElement !== pokeContentTotal.length) {
            let newData = [...pokeContentTotal].slice(firstElement, firstElement + utils.chunkSize)
            newData = await utils.getChunk(newData)
            setPokeContent([...pokeContent, ...newData])
        }
    }

    const handleSortNum = (array, string, isEffect) => {
        setSorting(string)
        sortContentNum(array, string, isEffect)
    }

    const handleSortAZ = (array, string, isEffect) => {
        setSorting(string)
        sortContentAZ(array, string, isEffect)
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
                    <button onClick={() => randomize()}><span>Surprise Me!</span></button>
                    <div>
                        <span>Sort By</span>
                        <div ref={sortRef} className={openList ? 'openListGrid' : 'closedListGrid'} onClick={() => setOpenList(!openList)}>
                            <span>{sorting}</span>
                            {openList && <ul>
                                <li onClick={() => handleSortNum(pokeContentTotal, 'Lowest Number(First)', false)}>Lowest Number(First)</li>
                                <li onClick={() => handleSortNum(pokeContentTotal, 'Highest Number(First)', false)}>Highest Number(First)</li>
                                <li onClick={() => handleSortAZ(pokeContentTotal, 'A-Z', false)}>A-Z</li>
                                <li onClick={() => handleSortAZ(pokeContentTotal, 'Z-A', false)}>Z-A</li>
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

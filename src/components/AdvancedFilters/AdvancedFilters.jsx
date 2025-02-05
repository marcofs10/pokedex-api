import React, { useState, useEffect, useRef } from 'react'
import * as utils from '../../utils/utils.js'
import './AdvancedFilters.css'

export const AdvancedFilters = ({ pokeListTotal, setAdvFilters, setSearchFilter, fireTrigger }) => {

    const [openList, setOpenList] = useState(false);
    const [abilities, setAbilities] = useState([])

    const [typeFilter, setTypeFilter] = useState('')
    const [abilityFilter, setAbilityFilter] = useState('all')
    const [initialRange, setInitialRange] = useState(1)
    const [finalRange, setFinalRange] = useState(utils.finalPokeId)
    const abilityRef = useRef()

    const resetAdvancedFilters = () => {
        setTypeFilter('')
        setAbilityFilter('all')
        setInitialRange(1)
        setFinalRange(utils.finalPokeId)
        setSearchFilter([...pokeListTotal])
    }

    const sendAdvancedFilters = () => {
        setAdvFilters({
            typeFilter: typeFilter,
            abilityFilter: abilityFilter,
            initialRange: initialRange,
            finalRange: finalRange,
        })
        fireTrigger()
    }

    useEffect(() => {
        async function getAbilities() {
            try {
                let data = await fetch('https://pokeapi.co/api/v2/ability?offset=0&limit=367"')
                data = await data.json()
                data = [...data.results].sort((a, b) => a.name > b.name ? 1 : -1)
                data = [{ name: 'all', url: '' }, ...data]
                return data
            } catch (err) {
                console.log(err)
            }
        }
        getAbilities().then(data => setAbilities(data))
    }, [])

    useEffect(() => {
        const onClickOutside = (e) => {
            if (!abilityRef.current.contains(e.target)) {
                setOpenList(false)
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    })

    return (
        <div className='advancedFilters'>
            <div className='typeFilter'>
                <h2>Type</h2>
                <div>
                    {Object.keys(utils.typeInfo).map(el => (<span
                        key={el}
                        style={{ backgroundColor: `${utils.typeInfo[el]}`, borderColor: typeFilter === el ? '#53F700' : '' }}
                        onClick={() => setTypeFilter(el)}>{utils.capFirstLetter(el)}</span>))}
                </div>
            </div>
            <div className='otherFilters'>
                <h2>Ability</h2>
                <div ref={abilityRef} name="" id="" className='abilityList' onClick={() => setOpenList(!openList)}>
                    <span className={openList ? 'openList' : 'closedList'}>{utils.capFirstLetter(abilityFilter)}</span>
                    {openList &&
                        <ul>
                            {abilities.map(el => (<li key={el.name} onClick={() => setAbilityFilter(el.name)}>{utils.capFirstLetter(el.name)}</li>))}
                        </ul>}
                </div>
                <h2>Number Range</h2>
                <div className='numberRange'>
                    <input type="text" value={initialRange} onChange={(e) => setInitialRange(parseInt(e.target.value))} />
                    <span>-</span>
                    <input type="text" value={finalRange} onChange={(e) => setFinalRange(parseInt(e.target.value))} />
                </div>
                <section>
                    <div onClick={() => resetAdvancedFilters()}>Reset</div>
                    <button onClick={() => sendAdvancedFilters()}>Search</button>
                </section>
            </div>
        </div>
    )
}

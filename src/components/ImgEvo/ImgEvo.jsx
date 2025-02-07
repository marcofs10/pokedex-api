import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as utils from '../../utils/utils.js'

export const ImgEvo = ({ id, name, ...delegated }) => {

    const [types, setTypes] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getPokeImg = async () => {
            try {
                let newData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                newData = await newData.json()
                setTypes(newData.types.map(el => el.type.name))
            } catch (err) {
                console.log(err)
            }
        }
        getPokeImg()

        
    }, [])

    return (
        <div
            {...delegated}
            className='pokeIconEvo'
            onClick={() => navigate(`/pokedex-api/pokemon/${id}`)}>
            <div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt='' />
            </div>
            <h3>{utils.capFirstLetter(name)}<span>{`#${utils.zeroFront(id, 4)}`}</span></h3>
            <div>
                {types && types.map(type => <span
                    key={type}
                    style={{ backgroundColor: `${utils.typeInfo[type]}` }}>{utils.capFirstLetter(type)}</span>)}
            </div>
        </div>
    )
}

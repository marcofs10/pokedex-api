import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as utils from '../../utils/utils.js'
import './Pokemon.css'

export const Pokemon = ({ name, id, image, types }) => {

    const navigate = useNavigate()

    return (
        <div className='pokemonThumbnail' onClick={()=>navigate(`/pokedex/pokemon/${id}`)}>
            <div>
                <img src={image} alt="" />
            </div>
            <span>{`#${utils.zeroFront(id, 4)}`}</span>
            <h2>{utils.capFirstLetter(name)}</h2>
            <section>
                {types.map(type => (<span key={type.slot} style={{ backgroundColor: `${utils.typeInfo[type.type.name]}` }}
                >{utils.capFirstLetter(type.type.name)}</span>))}
            </section>
        </div>
    )
}

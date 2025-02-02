import React from 'react'
import * as utils from '../../utils/utils.js'
import './Pokemon.css'

export const Pokemon = ({ name, id, image, types }) => {


    return (
        <div className='pokemonThumbnail'>
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

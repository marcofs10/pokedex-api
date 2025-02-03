import React from 'react'
import * as utils from '../../utils/utils.js'
import './TypeWeakness.css'

export const TypeWeakness = ({pokeInfo,weaknesses}) => {
    return (
        <section className='typeweakness'>
            <h2>Type</h2>
            <div>
                {pokeInfo?.types.map(type =>
                    <span
                        className='type'
                        key={type.slot}
                        style={{ backgroundColor: `${utils.typeInfo[type.type.name]}` }}
                    >{utils.capFirstLetter(type.type.name)}</span>)}
            </div>
            <h2>Weakness</h2>
            <div>
                {weaknesses?.map(weakness =>
                    <span
                        className='type'
                        key={weakness}
                        style={{ backgroundColor: `${utils.typeInfo[weakness]}` }}
                    >{utils.capFirstLetter(weakness)}</span>)}
            </div>
        </section>
    )
}

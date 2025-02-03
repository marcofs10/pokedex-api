import React from 'react'
import * as utils from '../../utils/utils.js'
import './Details.css'

export const Details = ({pokeInfo,pokeDetails}) => {
    return (
        <section className='details'>
            <div>
                <span>Height</span>
                <span>{pokeInfo?.height}</span>
            </div>
            <div>
                <span>Shape</span>
                <span>{utils.capFirstLetter(pokeDetails?.shape.name)}</span>
            </div>
            <div>
                <span>Weight</span>
                <span>{pokeInfo?.weight}</span>
            </div>
            <div>
                <span>Abilities</span>
                <span>{utils.capFirstLetter(pokeInfo?.abilities[0].ability.name)}</span>
            </div>
            <div>
                <span>PixelArt</span>
                <img src={pokeInfo?.sprites.versions['generation-vii'].icons.front_default} />
            </div>
        </section>
    )
}

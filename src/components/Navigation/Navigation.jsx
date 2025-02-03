import React from 'react'
import { NavLink } from 'react-router-dom'
import * as utils from '../../utils/utils.js'
import './Navigation.css'

export const Navigation = ({previous, next, pokeInfo, id, isMobile}) => {
    return (
        <section className='navigation'>
            <div>
                <NavLink
                    className='link previous'
                    to={`/pokedex/pokemon/${id === 1 ? utils.finalPokeId : id - 1}`}
                ><span>{isMobile ? '' : `#${utils.zeroFront(id === 1 ? utils.finalPokeId : utils.extractIdFromURL(previous?.url), 4)}`}
                    </span>{`${id === 1 ? 'Arceus' : utils.capFirstLetter(previous?.name)}`}
                </NavLink>
                <NavLink
                    className='link next'
                    to={`/pokedex/pokemon/${id === utils.finalPokeId ? 1 : id + 1}`}
                >{`${id === utils.finalPokeId ? 'Bulbasaur' : utils.capFirstLetter(next?.name)}`}
                    <span>
                        {isMobile ? '' : `#${utils.zeroFront(id === utils.finalPokeId ? 1 : utils.extractIdFromURL(next?.url), 4)}`}
                    </span>
                </NavLink>
            </div>
            <div>
                {`${utils.capFirstLetter(pokeInfo?.name)}`}<span>{`#${utils.zeroFront(pokeInfo?.id, 4)}`}</span>
            </div>
        </section>
    )
}

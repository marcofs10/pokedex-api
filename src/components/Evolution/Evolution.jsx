import React from 'react'
import { ImgEvo } from '../ImgEvo/ImgEvo.jsx'
import './Evolution.css'

export const Evolution = ({ evoChain }) => {

    return (
        <section className='evolution'>
            <h2>Evolutions</h2>
            <ul>
                {
                    evoChain?.map((stage, index) =>
                        <li key={index} className={index !== 0 ? 'lateStage' : ''}>
                            <ul>
                                {stage.map(el =>
                                (<ImgEvo 
                                    key={el.id}
                                    id={el.id}
                                    name ={el.name}
                                    />))}
                            </ul>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}

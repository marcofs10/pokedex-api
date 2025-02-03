import React, { useState, useEffect } from 'react'
import { ImgEvo } from '../ImgEvo/ImgEvo.jsx'
import './Evolution.css'

export const Evolution = ({ evoChain }) => {

    const [isSmallWindow, setIsSmallWindow] = useState(window.innerWidth <= 1321);

    const ulWidth = isSmallWindow ? 14 : 17
    const imgWidth = isSmallWindow ? 9: 12

    useEffect(() => {
        const handleResizeSmallWindow = () => {
            window.innerWidth <= 1321 ? setIsSmallWindow(true) : setIsSmallWindow(false)
        };
        window.addEventListener('resize', handleResizeSmallWindow);
        return () => {
            window.removeEventListener('resize', handleResizeSmallWindow);
        }
    }, [])

    return (
        <section className='evolution'>
            <h2>Evolutions</h2>
            <ul>
                {
                    evoChain?.map((stage, index) =>
                        <li key={index} className={index !== 0 ? 'lateStage' : ''}>
                            <ul style={{width:`${evoChain?.length*ulWidth+(evoChain?.length-1)*3}rem`}}>
                                {stage.map(el =>
                                (<ImgEvo 
                                    key={el.id}
                                    id={el.id}
                                    name ={el.name}
                                    style={{width:`${imgWidth}rem`}}/>))}
                            </ul>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}

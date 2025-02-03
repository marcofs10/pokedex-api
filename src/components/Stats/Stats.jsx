import React, { useEffect, useState } from 'react'
import * as utils from '../../utils/utils.js'
import './Stats.css'

export const Stats = ({stats}) => {
    const [show, setShow] = useState(false)

    useEffect(()=>{
        let timer = setTimeout(() => {
            setShow(true)
        }, 500)
        return () => clearTimeout(timer)
    },[])

    return (
        <section className='stats'>
            <span>Stats</span>
            <div>
                {stats?.map(el =>
                    <div key={el.stat.name}>
                        <ul>
                            <li className='filler' style={{ transform: `translateY(-${show ? utils.calcStatHeight(el.base_stat) : 0}em)` }}></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <span>{utils.capFirstLetter(el.stat.name)}</span>
                    </div>
                )}
            </div>
        </section>
    )
}

import React from 'react'
import * as utils from '../../utils/utils.js'
import './Suggestion.css'

export const Suggestion = ({ suggestion, selected, index, setSelectedItem }) => {

    return (
        <div
            onMouseEnter={() => setSelectedItem(index)}
            className={`suggestion ${selected ? 'selected' : ''}`}>{utils.capFirstLetter(suggestion.name)}
        </div>
    )
}
import React from 'react'
import * as utils from '../../utils/utils.js'
import { useNavigate } from 'react-router-dom'
import './Suggestion.css'

export const Suggestion = ({ suggestion, selected, index, setSelectedItem }) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/pokedex/pokemon/${utils.extractIdFromURL(suggestion.url)}`)}
            onMouseEnter={() => setSelectedItem(index)}
            className={`suggestion ${selected ? 'selected' : ''}`}>{utils.capFirstLetter(suggestion.name)}
        </div>
    )
}
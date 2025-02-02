import React, { useState, useEffect, useRef } from 'react'
import { Suggestion } from '../Suggestion/Suggestion';
import './Search.css'

export const Search = ({ pokeListTotal }) => {

    const [backUpText, setBackUpText] = useState('');
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([...pokeListTotal]);
    const [suggestionsShown, setSuggestionsShown] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const searchRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleKeyDown = (e) => {
        if (text === '') return;
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (selectedItem === 0) {
                setSelectedItem(-1)
                setText(backUpText)
            } else {
                setSelectedItem(selectedItem > 0 ? selectedItem - 1 : suggestions.length - 1)
                setText(suggestions[selectedItem > 0 ? selectedItem - 1 : suggestions.length - 1].name)
            }
        } else if (e.key === 'ArrowDown') {
            if (selectedItem === suggestions.length - 1) {
                setSelectedItem(-1)
                setText(backUpText)
            } else {
                setSelectedItem(selectedItem + 1)
                setText(suggestions[selectedItem + 1].name)
            }
            return;
        }

        if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    const handleChangeText = (e) => {
        setOpen(true)
        setBackUpText(e.target.value)
        setText(e.target.value)
        setTrigger(!trigger)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        let newSuggestions = [...pokeListTotal].filter(poke => poke.name.toLowerCase().includes(text.toLowerCase()))
        setSuggestions([...newSuggestions])
        newSuggestions = newSuggestions.slice(0, 5)
        setSuggestionsShown([...newSuggestions])
        if (text === '') setSelectedItem(-1)
    }, [trigger])

    useEffect(() => {
        const onClickOutside = (e) => {
            if (!searchRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    })

    return (
        <section className='search'>
            <div ref={searchRef}>
                <span>Name or Number</span>
                <section>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <input
                            type="text"
                            value={text}
                            onChange={handleChangeText}
                            onKeyDown={handleKeyDown}
                            onClick={handleOpen} />

                        <div className='suggestions'>
                            {text != '' && open &&
                                suggestionsShown.map((suggestion, index) =>
                                    <Suggestion key={index}
                                        index={index}
                                        selected={selectedItem === index}
                                        suggestion={suggestion}
                                        setSelectedItem={setSelectedItem} />)
                            }
                        </div>
                    </form>
                    <button className='buttonSubmit'>
                        <img src='/images/search.webp' />
                    </button>
                </section>
            </div>
            <span>Search for a Pokémon by name or using its National Pokédex number.</span>
        </section>
    )
}

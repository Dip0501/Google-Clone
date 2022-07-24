import React, { useState } from 'react'
import './Search.css'
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer'

function Search({ hideButtons = false}) {
    const [state, dispatch] = useStateValue()

    const [input, setInput] = useState('')
    const navigate = useNavigate();

    const search = e => {
        e.preventDefault()
        console.log(input);
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: input
        })

        navigate("/search")
    }



    return (
        <form className="search">
            <div className="search__input">
                <SearchIcon className="search__input--icon"/>
                <input value={input} onChange={event => setInput(event.target.value)}/>
                <MicIcon />
            </div>

            {!hideButtons ? (
                <div className="search__buttons">
                    <Button type='submit' onClick={search}>Google Search</Button>
                    <Button>I'm Feeling Lucky</Button>
                </div>
            ) : (
                <div className="search__buttons">
                    <Button className='search__button--hidden' type='submit' onClick={search}>Google Search</Button>
                    <Button className='search__button--hidden'>I'm Feeling Lucky</Button>
                </div>
            )}

            
        </form>
    )
}

export default Search
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../redux/action";
import s from "../styles/SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    function handleNamePokemon(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNamePokemon(name))
        setCurrentPage(1)
    }


    return(
        <div className={s.bar}>
            <input type={"text"} placeholder={"Search..."} onChange={(e) => handleNamePokemon(e)}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>

    )
}
import React from "react";
import style from "../styles/Filter.module.css"

export default function Filter({handleFilterTypes, handleFilterCreated,handleOrderName, handleOrderByAttack}){
    return(
        <div className={style.filter}>
            <select className={style.select} onChange={e => handleFilterTypes(e)}>
                <option >Select Types</option>
                <option value={"allType"}>all Types</option>
                <option value={"normal"}>normal</option>
                <option value={"fighting"}>fighting</option>
                <option value={"flying"}>flying</option>
                <option value={"poison"}>poison</option>
                <option value={"ground"}>ground</option>
                <option value={"rock"}>rock</option>
                <option value={"bug"}>bug</option>
                <option value={"ghost"}>ghost</option>
                <option value={"steel"}>steel</option>
                <option value={"fire"}>fire</option>
                <option value={"water"}>water</option>
                <option value={"grass"}>grass</option>
                <option value={"electric"}>electric</option>
                <option value={"psychic"}>psychic</option>
                <option value={"ice"}>ice</option>
                <option value={"dragon"}>dragon</option>
                <option value={"dark"}>dark</option>
                <option value={"fairy"}>fairy</option>
                <option value={"unknown"}>unknown</option>
                <option value={"shadow"}>shadow</option>
            </select>
            <select className={style.select} onChange={(e) => handleFilterCreated(e)}>
                <option > Filter by origin </option>
                <option value={"allPoke"}>All Pokemons</option>
                <option value={"api"}>Api pokemons</option>
                <option value={"db"}>Db pokemons</option>
            </select>
            <select className={style.select} onChange={(e) => handleOrderName(e)}>
                <option > Order alphabetically </option>
                <option value={"asc"}>A to Z</option>
                <option value={"desc"}>Z to A</option>
            </select>
            <select className={style.select} onChange={(e) => handleOrderByAttack(e)}>
                <option > Order by strength </option>
                <option value={"max"}>High attack</option>
                <option value={"min"}>Low attack</option>
            </select>
        </div>
    )
}
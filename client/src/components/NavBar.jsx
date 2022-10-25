import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "../styles/NavBar.module.css"
import poke from "../img/poke.png"

export default function NavBar({handleClick}){
    return(
        <nav className={style.nav}>
            <div className={style.menu}>
                <Link to={"/create"} ><button className={style.link}>Create</button></Link>
                <button onClick={e=> {handleClick(e)}} className={style.btn}>Home</button>
            </div>           
            <div className={style.poke}>
                <img src={poke} alt="Not found" className={style.img}/>
            </div>
            <div className={style.search}>
                <SearchBar/>
            </div>
            
        </nav>
    )
}
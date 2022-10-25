import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import style from "../styles/Card.module.css"

export default function({currentPokemons}){
    return(
        <div className={style.container}>
            {currentPokemons?.map(poke => {
                        return(
                            <Fragment key={poke.id}>
                                <Link to={"/pokemons/" + poke.id}>
                                    <Card name={poke.name} image={poke.image} types={poke.types.map(t=> t.name).join(" ")} attack={poke.attack} key={poke.id}/>
                                </Link>
                            </Fragment>     
                        )
                    })}
        </div>
    )
}
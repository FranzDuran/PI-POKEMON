import React from "react";
import "../styles/Paginado.css"

export default function Paginado({allPokes, pokemonsPerPage, paginado}){
    const pageNumbers = [];
    for(let i = 0; i <= Math.floor(allPokes / pokemonsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className="Paginado">
                    {
                        pageNumbers && pageNumbers.map(number => (
                            <li className="Number" key={number.toString()}>
                                <button onClick={() => paginado(number)}>{number}</button>
                            </li>
                        ))
                    }
            </ul>
        </nav>
    )
}
import React from "react";
import style from "../styles/Card.module.css"

export default function Card({image, name, types, attack}){
    return(
        <div className={style.card}>
            <img className={style.image} src={image} alt="img not found" height="100px" width="100px"/>
            <div className={style.text}>
            <h4 className={style.h4}>{name}</h4>
            <p className={style.p}>{types}</p>
            <p className={style.p}>Attack: {attack}</p>
            </div>
                 
        </div>
    )
}
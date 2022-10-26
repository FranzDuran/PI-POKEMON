import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, delay } from "../redux/action";
import Loading from "./Loading";
import style from "../styles/Detail.module.css"


export default function Detail(props){
    
    const dispatch = useDispatch()
    const { id } = useParams()
    const myPokemon = useSelector((state) => state.detail)
    console.log(myPokemon)
    useEffect(()=>{
        dispatch(delay())
    },[])

    useEffect(()=>{
        dispatch(getDetail(id))
    },[])

    return(
        <div className={style.body}>
            {    
            myPokemon.hasOwnProperty("name") ? 
            <div className={style.container}>
                <div className={style.image}>
                    <img src={myPokemon.image} alt="img not found" height="250px"/>
                </div>
                <div className={style.text}>
                <div className={style.title}>
                    <h2 className={style.title}>{myPokemon.name}</h2>
                </div>          
                <div className={style.id}>
                    <h3>Pokemon Namber: {myPokemon.id}</h3>
                </div>     
                <div className={style.data}>
                    <div className={style.tabla1}>
                        <h3>Hp: {myPokemon.life}</h3>
                        <h3>Attack: {myPokemon.attack}</h3>
                        <h3>Defending: {myPokemon.defending}</h3>
                    </div>
                    <div className={style.tabla2}>
                        <h3>Speed: {myPokemon.speed}</h3>
                        <h3>Height: {myPokemon.height}</h3>
                        <h3>Weight: {myPokemon.weight}</h3>
                    </div>
                </div>  
                    <div className={style.type}>
                        <h4>Types: {!myPokemon.createdInDb ? myPokemon.types + " " : myPokemon.types.map(h => h.name + (" "))}</h4>
                    </div>
                <div className={style.btn}>
                    <Link to={"/home/"}>
                        <button>Go back</button>
                    </Link>
                </div>
                </div>
            </div>  : <Loading/>          
            }   
        </div>    
    )
}
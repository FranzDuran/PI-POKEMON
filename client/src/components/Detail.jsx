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
        <div className={style.container}>
            {    
            myPokemon.hasOwnProperty("name") ? 
            <div className={style.detail}>
                <h2>{myPokemon.name}</h2>
                <img src={myPokemon.image} alt="img not found" height="150px" width="100px"/>
                <h3>ID: {myPokemon.id}</h3>
                <h3>Hp: {myPokemon.life}</h3>
                <h3>Attack: {myPokemon.attack}</h3>
                <h3>Defending: {myPokemon.defending}</h3>
                <h3>Speed: {myPokemon.speed}</h3>
                <h3>Height: {myPokemon.height}</h3>
                <h3>Weight: {myPokemon.weight}</h3>
                <h4>Types: {!myPokemon.createdInDb ? myPokemon.types + " " : myPokemon.types.map(h => h.name + (" "))}</h4>
            </div>  : <Loading/>
            }
            <Link to={"/home/"}>
                <button>Back</button>
            </Link>
        </div>    
    )
}
import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons, filterPokemonsByTypes, filterPokemonsCreated, orderByName, orderByAttack} from "../redux/action"
import Paginado from "./Paginado";
import Cards from "./Cards";
import NavBar from "./NavBar";
import Filter from "./Filter";
import Loading from "./Loading";
import style from "../styles/Home.module.css"

const Home = () => {
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.allPokemons);
    const [order, setOrder] = useState("")
    const [attack, setAttack] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemons = currentPage * pokemonsPerPage;
    const indexOfFirstPokemons = indexOfLastPokemons - pokemonsPerPage;
    const currentPokemons = allPokes.slice(indexOfFirstPokemons, indexOfLastPokemons);


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
    },[dispatch])
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    } 

    function handleFilterTypes(e){
        e.preventDefault();
        dispatch(filterPokemonsByTypes(e.target.value))
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterPokemonsCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    function handleOrderByAttack(e){
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setAttack(`ordenado ${e.target.value}`)   
    }

    return(
        
            <div>             
                <NavBar handleClick={handleClick}/>
                <div className={style.body}>
                    <div>
                        <Filter 
                        handleFilterTypes={handleFilterTypes}
                        handleFilterCreated={handleFilterCreated}
                        handleOrderName={handleOrderName}
                        handleOrderByAttack={handleOrderByAttack}
                        />
                    </div>
                    <br/>
                    { allPokes.length ?
                    <div>
                        <div>
                            <Paginado 
                                allPokes={allPokes.length} 
                                pokemonsPerPage={pokemonsPerPage} 
                                paginado={paginado} 
                            />  
                        </div>
                        <br/> 
                        <div>
                            <Cards currentPokemons={currentPokemons}/>
                        </div> 
                    </div> : <Loading/>}
                </div>
            </div>  
        
    )
}

export default Home;
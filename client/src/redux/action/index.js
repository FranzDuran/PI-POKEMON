import axios from "axios"

export function getPokemons(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: "GET_POKEMONS",
            payload: response.data
        })
    }
}
export function getNamePokemon(name){
    return async function(dispatch){
        try{
            const response = await axios.get("http://localhost:3001/pokemons?name="+ name)
            return dispatch({
                type: "GET_NAME_POKEMON",
                payload: response.data
            })
        }catch(error){
            console.log(error)
        }   
    }
}
export function getDetail(id){
    return async function(dispatch){
        try{
            const response = await axios.get("http://localhost:3001/pokemons/" + id)
            //console.log(response)
            return dispatch({
                type: "GET_DETAIL",
                payload: response.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export function getTypes(){
    return async function(dispatch){
        try{
            const response = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: "GET_TYPES",
                payload: response.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export function postPokemon(payload){
    return async function(dispatch){
        try{
            const response = await axios.post("http://localhost:3001/pokemons", payload)
            return response;
        }catch(error){
            console.log(error)
        }
    }
}
export function filterPokemonsByTypes(payload){
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}
export function filterPokemonsCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}
export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByAttack(payload){
    return{
        type: "ORDER_BY_ATTACK",
        payload
    }
}
export function delay(){
    return{
        type: "DELAY"
    }
}
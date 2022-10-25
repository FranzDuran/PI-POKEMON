const Router = require("express");
const { getAllPokemons, getPokemonApiByName, getPokemonDbByName, getPokemonApiById, getPokemonDbById } = require("../controllers/index")
const axios = require("axios")
const { Pokemon, Type } = require("../db")
const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    const allPokemons = await getAllPokemons();
    try{
        if(name){
            const pokemonApi = await getPokemonApiByName(name);
            if(pokemonApi.error){
                const pokemonDb = await getPokemonDbByName(name);
                if(!pokemonDb.length){
                    return res.status(404).json({message: "Pokemon not found"});
                }
                console.log(pokemonDb)
                return res.status(200).json(pokemonDb);
            }
            return res.status(200).json(pokemonApi);     
        }  
        return res.status(200).json(allPokemons);
    }catch(error){
        res.status(400).send({error: error.message});
    };
});


router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        if(id){
            const pokemonApi = await getPokemonApiById(id);
            if(pokemonApi.error){
                const pokemonDb = await getPokemonDbById(id);
                if(!pokemonDb || pokemonDb.error){
                    return res.status(400).send({message: "Id in database and api not found"});
                }
                return res.send(pokemonDb);
            }
            return res.status(200).send(pokemonApi);   
        }
        return res.status(400).send({message: "Id not found"});
    }catch(error){
        res.status(400).send({error: error.message});
    };
});


router.post("/", async (req, res) => {
    try{
        const { name, image, types, life, attack, defending, speed, height, weight } = req.body;
        if(name){
            const pokemon = await Pokemon.create({ name, image, life, attack, defending, speed, height, weight })

            types.forEach(async(t) => {
                await pokemon.addType(t.id)              
            });
            return res.status(200).send(pokemon)
        }
        return res.status(400).send({message: "Name is required"}) 
    }catch(error){
        res.status(400).send({error: error.message})
    }  
})


module.exports = router;

/* try {       
        const {id} = req.params;
        console.log(id)
        if (id){
            let pokemonSearch = null;
            if (isNaN(id)){
                pokemonSearch = await getPokemonDbById(id);
            } else {
                pokemonSearch = await getPokemonApiById(id);
            }
            if (pokemonSearch){ 
                return res.status(200).json(pokemonSearch);
            }
            return res.status(400).send({message: "Id not found"});
        }
        return res.status(400).send({message: "Id not found"});
    } catch (error) {
        res.status(400).send({error: error.message});
    } */
const axios = require("axios");
const { Pokemon, Type } = require("../db")

const getInfoApi = async () => {
    const arrayPromises = [];
    const arrayPoke = []

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0");
    const result = response.data.results;
    result.map(r => arrayPromises.push(axios.get(r.url))); 
    await Promise.all(arrayPromises)                        
    .then((pokemons) => {
        arrayPoke.push(pokemons.map(p => {
            return {
                id: p.data.id,
                image: p.data.sprites.other.dream_world.front_default,
                name: p.data.name,
                life: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defending: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map(t => {
                    return {
                        name: t.type.name
                    }
                })
            };
        }));
    }).catch((error)=>{
        return error;
    });
    return arrayPoke.flat();
}

const getInfoBd = async () => {
    return await Pokemon.findAll({
        include: { 
            model: Type,
            attributes: ["name"],
            through: { attributes: []}
        }
    });
};

const getAllPokemons = async () => {
    const apiData = await getInfoApi();
    const dbData = await getInfoBd();
    const data = apiData.concat(dbData);
    return data;
}

////////////////////////////////////// GET NAME /////////////////////////////////////////////////////////

const getPokemonApiByName = async (name) => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        if(response){
            return {
                id: response.data.id,
                image: response.data.sprites.other.dream_world.front_default,
                name: response.data.name,
                life: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defending: response.data.stats[2].base_stat,
                speed: response.data.stats[5].base_stat,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.map(t => {
                    return {
                        name: t.type.name
                    }
                })
            };
        };
    }catch(error){
        return ({error});
    };
};

const getPokemonDbByName = async (name) => {
    try{
        return await Pokemon.findAll({
            where: {
                name: name
            },
            include:{
                model: Type,
                attributes: ["name"],
                through: { attributes: [] }
            }
        });
    }catch(error){
        return ({error});
    };
};

/////////////////////////////////////// GET ID ////////////////////////////////////////////////////////

const getPokemonDbById = async (id) => {
    try{
        const uuid = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
        if (uuid.test(id)){
            return await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            });
        };
    }catch(error){
        return ({error});
    };
};

const getPokemonApiById = async (id) => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if(response){
            return {
                id: response.data.id,
                image: response.data.sprites.other.dream_world.front_default,
                name: response.data.name,
                life: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defending: response.data.stats[2].base_stat,
                speed: response.data.stats[5].base_stat,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.map(t => t.type.name).join(" - ")
            };
        };
    }catch(error){
        return ({error})
    };
};




module.exports = {
    getAllPokemons,
    getPokemonApiByName,
    getPokemonDbByName,
    getPokemonApiById,
    getPokemonDbById
}
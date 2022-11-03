import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../redux/action";
import style from "../styles/Create.module.css"

export default function Create(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.allTypes)
    const allPokes = useSelector((state) => state.allPokemons).map(n => n.name)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        life: null,
        attack: null,
        defending: null,
        speed: null,
        height: null,
        weight: null,
        image: "",
        types: []
    })

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelectTypes(e){
        if(input.types.includes(e.target.value)){
            alert("The pokemon already has that type");
        } else{
            if (input.types.length < 2) {
              setInput({
                ...input,
                types: [...input.types, e.target.value],
            });
            } else {
              alert("Choose only two types, please");
            }
        } 
    }

    function handleDelete(t){
        setInput({
            ...input,
            types: input.types.filter(ty => ty !== t)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!errors.name && !errors.image && input.types.length > 0) {
            postPokemon(input);
            alert('Poke created!')
            history.push('/home')
        }else {
            if (input.types.length <= 0) {
              alert("Types are missing");
            } else {
              alert("Incomplete required fields!");
            }
        }
    }

    function validate(input){
        let error = {}
        if(!input.name){
            error.name = "Name is required"
        }else if (!/^[a-zA-Z]+$/.test(input.name)) {
            error.name = "Invalid name. The name must contain letters";
        }else if (input.name.length < 3 || input.name.length > 10){
            error.name= "At least 3 letters, less than 10"
        }else if(allPokes.includes(input.name.toLowerCase())){
            error.name = "The pokemon already exists, use another name";
        }    

        if(!input.image){
            error.image = "Your pokemon needs a image"
        }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
            error.image = "Img must be a valid URL";
        }
        if(!input.attack){
            error.attack = "el ataque tiene que tener un rango de 0 a 100"
        } else if(input.attack < 0){
            error.attack= "no se permite numero negativos"
        }
        return error
    }
    function handleError(e){
        e.preventDefault();
        alert("Complete the form");
      };
    
    return(
        <div className={style.container}>
            <div className={style.nav}>
                <Link to={"/home"}>
                    <button className={style.btn}>Back to Home</button>
                </Link>
            </div>
            <div className={style.form}>
                <h1 className={style.h1}>Create your Pokemon</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={style.div}>
                        <label className={style.title}>Name: </label>
                        <input placeholder="Name..." type={"text"} name={"name"} value={input.name}  onChange={(e) => handleChange(e)} />
                    </div>
                        {errors.name && ( <p className={style.p}>{errors.name}</p> )}
                    <div className={style.div}>
                        <label className={style.title}>Image: </label>
                        <input placeholder="Image..." type={"text"} name={"image"} value={input.image}  onChange={(e) => handleChange(e)} />
                    </div>
                        <p className={style.p} >{errors.image}</p>

                    <div className={style.caracter}>
                        <div className={style.min}>
                            <div className={style.div}>
                                <label className={style.title}>Hp: </label>
                                <input className={style.input} type="number" name={"life"}   value={input.life} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className={style.div}>
                                <label className={style.title}>Attack: </label>
                                <input  type={"number"} name={"attack"}  value={input.attack}   onChange={(e) => handleChange(e)} />
                            </div>
                            <p>{errors.attack}</p>
                            <div className={style.div}>
                                <label className={style.title}>Defending: </label>
                                <input  type={"number"} name={"defending"} value={input.defending}  onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className={style.min}>
                            <div className={style.div}>
                                <label className={style.title}>Speed: </label>
                                <input  type={"number"} name={"speed"}  value={input.speed}  onChange={(e) => handleChange(e)} />
                            </div>
                            <div className={style.div}>
                                <label className={style.title}>Height: </label>
                                <input  type={"number"} name={"height"}  value={input.height}  onChange={(e) => handleChange(e)} />
                            </div>
                            <div className={style.div}>
                                <label className={style.title}>Weight: </label>
                                <input  type={"number"} name={"weight"}  value={input.weight}  onChange={(e) => handleChange(e)} /> 
                            </div>
                        </div>
                    </div>
                    <div className={style.containers}>
                        <div className={style.floatSelect}>
                            <select className={style.select} onChange={(e) => handleSelectTypes(e)}> 
                            <option disabled selected>Select Types</option>
                            {types.map((t) =>(
                            <option key={t.id} name="types" value={t.name}>{t.name}</option>
                             ))}
                            </select>
                        </div>

                            {input.types.map(t => 
                        <div className={style.delete}>
                            <p className={style.type}>{t}</p>
                            <button className={style.btn1} type="button" onClick={() => handleDelete(t)}>X</button>
                            
                        </div>)} 
                    </div>
                    <div>
                        {input.name !== ""? 
                        (<button className={style.btn2} type="submit">Create!</button>) : 
                        (<button className={style.btn2} onClick={handleError}>Create!</button>)}
                    </div>       
                </form> 

                
            </div>
        </div>
    )
}
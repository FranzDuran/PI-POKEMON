import React from "react";
import { NavLink} from "react-router-dom";

const LandingPage = () =>{
    return(
        <React.Fragment>
            <h1>Bienvenidos a mi pagina de POKEMON</h1>
            <NavLink to={"/home"}><button>Ingresar</button></NavLink>
        </React.Fragment>        
    )
}
export default LandingPage;
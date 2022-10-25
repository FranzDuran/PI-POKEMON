import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Route, Switch} from "react-router-dom"
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path={"/"} component={LandingPage}></Route>
            <Route exact path={"/home"} component={Home}></Route>
            <Route path={"/create"} component={Create}></Route>
            <Route path={"/pokemons/:id"} component={Detail}></Route>
            <Route path={"/nuevo"} component={Form}></Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;

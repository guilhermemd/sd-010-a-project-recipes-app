import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './pages/Perfil';
import Login from './pages/Login';
import Explorar from './pages/Explorar';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import EmProgComidas from './pages/EmProgComidas';
import EmProgBebidas from './pages/EmProgBebidas';
import ExpBebidas from './pages/ExpBebidas';
import ExpComidas from './pages/ExpComidas';
import ExpBebidasIng from './pages/ExpBebidasIng';
import ExpComidasIng from './pages/ExpComidasIng';
import ExpComidasOri from './pages/ExpComidasOri';
import ExpBebidasOri from './pages/ExpBebidasOri';
import DetComidas from './pages/DetComidas';
import DetBebidas from './pages/DetBebidas';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/perfil" component={ Profile } />
            <Route exact path="/explorar" component={ Explorar } />
            <Route exact path="/explorar/bebidas" component={ ExpBebidas } />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExpBebidasIng }
            />
            <Route exact path="/explorar/comidas" component={ ExpComidas } />
            <Route exact path="/comidas/:id" component={ DetComidas } />
            <Route exact path="/bebidas/:id" component={ DetBebidas } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExpComidasIng }
            />
            <Route exact path="/comidas/:id/in-progress" component={ EmProgComidas } />
            <Route exact path="/bebidas/:id/in-progress" component={ EmProgBebidas } />
            <Route exact path="/explorar/comidas/area" component={ ExpComidasOri } />
            <Route exact path="/explorar/bebidas/area" component={ ExpBebidasOri } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

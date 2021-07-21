import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SearchMealOrDrink from './pages/SearchMealOrDrink';
import SearchIngredients from './pages/SearchIngredients';
import SearchArea from './pages/SearchArea';
import NotFound from './pages/NotFound';
import InProgressRecipe from './pages/InProgressRecipe';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favorite from './pages/Favorite';
import DoneFilters from './pages/components/DoneRecipesPages/DoneFilters';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id" component={ RecipeDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgressRecipe } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas/:id" component={ RecipeDetails } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgressRecipe } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/perfil" component={ Profile } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ SearchIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ SearchIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ SearchArea } />
        <Route exact path="/explorar/comidas" component={ SearchMealOrDrink } />
        <Route exact path="/explorar/bebidas" component={ SearchMealOrDrink } />
        <Route exact path="/explorar" component={ Search } />
        <Route exact path="/receitas-feitas" component={ DoneFilters } />
        <Route exact path="/receitas-favoritas" component={ Favorite } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}
export default App;

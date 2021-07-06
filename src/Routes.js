import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/recipes-main/Foods/Foods';
// import DetailsOfFoods from './pages/recipes-main/Foods/DetailsOfFood';
import DetailsFoodRecipe from './pages/DetailsPages/DetailsFoodRecipe';
// import DetailsOfDrinks from './pages/recipes-main/Drinks/DetailsOfDrinks';
import DetailsDrinkRecipe from './pages/DetailsPages/DetailsDrinkRecipe';
import Drinks from './pages/recipes-main/Drinks/Drinks';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import Login from './pages/LoginPage/Login';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';
import ExploreFoodArea from './pages/ExplorePage/ExploreFoodArea';
import Explore from './pages/ExplorePage/Explore';
import ExploreFood from './pages/ExplorePage/ExploreFood';
import ExploreBeverage from './pages/ExplorePage/ExploreBeverage';
import ExplFoodIng from './pages/ExplorePage/ExplFoodIng';
import ExplBeverageIng from './pages/ExplorePage/ExplBeverageIng';
// import FoodInProgress from './pages/recipes-main/Foods/FoodInProgess';
import DetailsInProgressFood from './pages/DetailsPages/DetailsInProgressFood';
// import DrinksInProgress from './pages/recipes-main/Drinks/DrinksInProgress';
import DetailsInProgressDrink from './pages/DetailsPages/DetailsInProgressDrink';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas/:id" component={ DetailsFoodRecipe } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas/:id" component={ DetailsDrinkRecipe } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/perfil" component={ ProfileScreen } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RecipesFav } />
      <Route exact path="/comidas/:id/in-progress" component={ DetailsInProgressFood } />
      <Route exact path="/bebidas/:id/in-progress" component={ DetailsInProgressDrink } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreBeverage } />
      <Route exact path="/explorar/comidas/ingredientes" component={ ExplFoodIng } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ ExplBeverageIng } />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodArea } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ ProfileScreen } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RecipesFav } />
    </Switch>
  );
}

export default Routes;

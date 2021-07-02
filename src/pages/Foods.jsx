import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';
import FilterContext from '../context/FilterContext';

function Foods() {
  const { filteredRecipes, fullRecipes } = useContext(SearchContext);
  const { mealsCategories, filterButton, mealsByCategory } = useContext(FilterContext);
  const CARDS_NUMBER = 11;
  const CATEGORIES_NUMBER = 5;
  const [showRecipe, setShowRecipe] = useState([]);

  useEffect(() => {
    if (filterButton !== '') {
      setShowRecipe(mealsByCategory);
    } else if (!filteredRecipes || filteredRecipes.length > 0) {
      setShowRecipe(filteredRecipes);
    } else { setShowRecipe(fullRecipes); }
  }, [fullRecipes, filteredRecipes, mealsByCategory]);

  return (
    <div>
      <Header title="Comidas" searchImg="true" />
      {mealsCategories.map((category, index) => (
        index < CATEGORIES_NUMBER ? (
          <FilterButtons
            key={ index }
            categoryName={ category.strCategory }
            testId={ `${category.strCategory}-category-filter` }
          />
        ) : (null)
      ))}
      {showRecipe ? showRecipe.map((recipes, index) => (
        index <= CARDS_NUMBER ? (
          <MealCard
            key={ recipes.idMeal }
            mealName={ recipes.strMeal }
            mealImg={ recipes.strMealThumb }
            testImgId={ `${index}-card-img` }
            testNameId={ `${index}-card-name` }
            testCardId={ `${index}-recipe-card` }
          />
        ) : null
      )) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')}
      <Footer />
    </div>
  );
}

export default Foods;

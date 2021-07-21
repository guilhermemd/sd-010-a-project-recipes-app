import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import MealIngredientsMeasure from '../compenents/MealIngredientsMeasure';
import RecipesContext from '../contexts/RecipesContext';
import ShareButton from '../compenents/ShareButton';
import FavoriteBtn from '../compenents/FavoriteBtn';
import Loading from '../compenents/Loading';
import checkInProgress from '../services/checkInProgress';

function MealsRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const { allChecked, setIsFavorite } = useContext(RecipesContext);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  console.log(recepiID);

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    const getRecepi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recepiID}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setDetailsRecepie(meals[0]);
    };
    getRecepi();
  }, []);

  const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let checkLocalStr;

  if (getLocalStr !== null) {
    // procura o recipeId no LS
    checkLocalStr = Object.values(getLocalStr)
      .find(({ id: strId }) => strId === recepiID);
  }

  function saveLS() {
    // Esta função não esta sendo chamada, e precisa ser duplicada para o MealsRecepiesProgress
    console.log('chamou a função de salvar');
    console.log(detailsRecepie);
    const getLS = localStorage.getItem('doneRecipes');
    const desStringGetLS = JSON.parse(getLS);
    // desStringGetLS é um array de objetos
    const { strMeal, strCategory, strArea, strMealThumb, strTags } = detailsRecepie;
    const firstTag = strTags !== null ? strTags.split(',')[0] : ' ';
    const secondTag = strTags !== null ? strTags.split(',')[1] : '';
    const date = new Date();
    const newDoneRecepi = {
      id: recepiID,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: `${date.getDate()} - ${date.getTime()}`,
      tags: [firstTag, secondTag],
    };
    if (desStringGetLS === null) {
      const newDoneRecepiString = JSON.stringify([newDoneRecepi]);
      return localStorage.setItem('doneRecipes', newDoneRecepiString);
    }
    const allInfo = [...desStringGetLS, newDoneRecepi];
    const stringNewArrayOfObjects = JSON.stringify(allInfo);
    return localStorage.setItem('doneRecipes', stringNewArrayOfObjects);
  }

  if (checkLocalStr) {
    setIsFavorite(true);
  } else {
    setIsFavorite(false);
  }

  checkInProgress();

  if (detailsRecepie === undefined) {
    return <Loading />;
  }
  const {
    strArea, strCategory, strMeal, strMealThumb, strInstructions,
  } = detailsRecepie;

  return (
    <div className="main-inProgress">
      <img
        data-testid="recipe-photo"
        className="recomendation-image"
        alt="meals recepi"
        src={ strMealThumb }
        width="50px"
      />
      <section className="title-and-buttons">
        <h1 data-testid="recipe-title" className="title-description">{ strMeal }</h1>
        <section className="interaction-buttons">
          <ShareButton
            idRecipe={ `comidas/${recepiID}` }
          />
          <FavoriteBtn
            id={ recepiID }
            type="comida"
            area={ strArea }
            category={ strCategory }
            alcoholicOrNot=""
            name={ strMeal }
            image={ strMealThumb }
          />
        </section>
      </section>
      <h4 data-testid="recipe-category" className="category">{ strCategory }</h4>
      <section className="main-inProgress">
        <MealIngredientsMeasure
          detailsRecepie={ detailsRecepie }
        />
        <div className="ingredients-box">
          <h3 className="inProgress-title">Instruções</h3>
          <p
            data-testid="instructions"
            className="inProgress-instruction"
          >
            { strInstructions }
          </p>
        </div>
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ allChecked }
            onClick={ () => saveLS() }
            className="inProgress-btn"
          >
            Finalizar receita
          </button>
        </Link>
      </section>
    </div>
  );
}

export default MealsRecepiesProgress;

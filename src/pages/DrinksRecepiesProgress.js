import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DrinkIngredientsMeasure from '../compenents/DrinkIngredientsMeasure';
import RecipesContext from '../contexts/RecipesContext';
import ShareButton from '../compenents/ShareButton';
import FavoriteBtn from '../compenents/FavoriteBtn';
import Loading from '../compenents/Loading';
import checkInProgress from '../services/checkInProgress';

function DrinksRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const { allChecked, setIsFavorite } = useContext(RecipesContext);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    const getRecepi = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recepiID}`;
      const returnFetch = await fetch(endpoint);
      const dataJson = await returnFetch.json();
      const { drinks } = dataJson;
      setDetailsRecepie(drinks[0]);
    };
    getRecepi();
  }, []);

  function saveLS() {
  // Resolver problema caso seja null
    console.log('chamou a função de salvar');
    const getLS = localStorage.getItem('doneRecipes');
    const desStringGetLS = JSON.parse(getLS);
    console.log(desStringGetLS);
    const { strDrink, strDrinkThumb, strAlcoholic, strTags } = detailsRecepie;
    const date = new Date();

    const newDoneRecepi = {
      id: recepiID,
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: `${date.getDate()} - ${date.getTime()}`,
      tags: strTags,
    };

    if (desStringGetLS === null) {
      const newDoneRecepiString = JSON.stringify([newDoneRecepi]);
      return localStorage.setItem('doneRecipes', newDoneRecepiString);
    }
    const allInfo = [...desStringGetLS, newDoneRecepi];
    const stringNewArrayOfObjects = JSON.stringify(allInfo);
    return localStorage.setItem('doneRecipes', stringNewArrayOfObjects);
  }

  const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let checkLocalStr;

  if (getLocalStr !== null) {
    // procura o recipeId no LS
    checkLocalStr = Object.values(getLocalStr)
      .find(({ id: strId }) => strId === recepiID);
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
    strDrink, strDrinkThumb,
    strAlcoholic, strInstructions,
  } = detailsRecepie;

  return (
    <div className="main-inProgress">
      <img
        data-testid="recipe-photo"
        className="recomendation-image"
        alt="drinks recepi"
        src={ strDrinkThumb }
        width="50px"
      />
      <section className="title-and-buttons">
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <section className="interaction-buttons">
          <ShareButton
            idRecipe={ `bebidas/${recepiID}` }
          />
          <FavoriteBtn
            id={ recepiID }
            type="bebida"
            area=""
            category="Cocktail"
            alcoholicOrNot={ strAlcoholic }
            name={ strDrink }
            image={ strDrinkThumb }
          />
        </section>
      </section>
      <h4 data-testid="recipe-category" className="category">{ strAlcoholic }</h4>
      <section className="main-inProgress">
        <DrinkIngredientsMeasure
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

export default DrinksRecepiesProgress;

import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { fetchFoodForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodId() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [foodForId, setFoodForId] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const index = 0;
  const style = {
    bottom: '0px',
    position: 'fixed',
  };

  const handleClick = () => {
    setShouldRedirect(true);
  };

  useEffect(() => {
    fetchFoodForId(id)
      .then((res) => {
        if (res.meals) setFoodForId(res.meals[0]);
      });
  }, [id]);

  if (!foodForId) return <div>Loading...</div>;

  const {
    strMeal,
    strYoutube,
    strCategory,
    strInstructions,
    strMealThumb } = foodForId;

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="receita pronta"
        data-testid="recipe-photo"
      />
      <section>
        <p data-testid="recipe-title">{strMeal}</p>
        <p data-testid="recipe-category">{strCategory}</p>
        <button
          type="button"
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        </button>
        <button
          type="button"
        >
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />
        </button>
      </section>
      <section>
        <p>Ingredients</p>
        <ul>
          <li data-testid={ `${index}-ingredient-name-and-measure` }>penne rigate</li>
        </ul>
      </section>
      <section>
        <p>Instructions</p>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      <section>
        <p>Video</p>
        <iframe
          title="video"
          width="420"
          height="315"
          data-testid="video"
          src={ strYoutube }
        />
      </section>
      <section>
        <p>Recomendadas</p>
        <div data-testid={ `${index}-recomendation-card` } />
      </section>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
        style={ style }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default FoodId;

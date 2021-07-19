import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import getIngredients from '../../services/getIngredients';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

function FoodsInProgress({ data }) {
  const { state: { ingredients } } = useLocation();
  // const ingredients = getIngredients(data, 'strIngredient').map((e) => e[1]);
  const { pathname } = useLocation();
  const { id } = useParams();
  const [keys, setKeys] = useState([]);
  const [checkedIngredients, setChecked] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    function saveState() {
      if (pathname.includes('/comidas')) {
        const { strMealThumb, strMeal, strCategory } = data;
        const obj = [{
          image: strMealThumb,
          title: strMeal,
          category: strCategory,
        }];
        setKeys(obj);
      }
    }
    saveState();
  }, [data, pathname]);

  const handleButton = () => {
    setRedirect(true);
  };

  const handleCheked = ({ target }) => {
    if (checkedIngredients.includes(target.name)) {
      const filtered = checkedIngredients.filter((element) => element !== target.name);
      setChecked(filtered);
    } else {
      const newArr = [...checkedIngredients, target.name];
      setChecked(newArr);
    }
  };

  if (keys.length > 0) {
    return (
      <div>
        <h1>teste</h1>
        <img src={ keys[0].image } alt="thumb" data-testid="recipe-photo" width="200px" />
        <h3 data-testid="recipe-title">{ keys[0].title }</h3>
        <ShareButton urlCopied={ `http://localhost:3000/comidas/${id}` } />
        <FavoriteButton data={ data } path={ id } />
        <p data-testid="recipe-category">{ keys[0].category }</p>
        <ul>
          { Object.values(ingredients).map((element, index) => (
            <li
              key={ element }
              data-testid={ `data-testid=${index}-ingredient-step` }
            >
              <label htmlFor={ `${index}-${element}` }>
                { element }
                <input
                  type="checkbox"
                  id={ `${index}-${element}` }
                  name={ element }
                  onChange={ handleCheked }
                  checked={ checkedIngredients.includes(element) }
                />
              </label>
            </li>)) }
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ handleButton }
          disabled={ checkedIngredients.length < ingredients.length }
        >
          Finalizar Receita!
        </button>
        { redirect ? <Redirect to="/receitas-feitas" /> : null }
      </div>
    );
  }

  return (
    null
  );
}

FoodsInProgress.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodsInProgress;

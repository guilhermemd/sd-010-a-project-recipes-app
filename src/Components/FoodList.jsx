import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';
import Card from './Card';
import useRenderList from '../Services/useRenderList';

function FoodList({ page }) {
  const { foods, identifier, category } = React.useContext(FoodContext);
  const maxLength = 11;
  const history = useHistory();
  useRenderList(page);

  const redirectRecipe = (foodsParam, identifierParam) => {
    let recipe = '';
    const idKey = `id${identifierParam}`;
    const idValue = foodsParam[0][idKey];
    if (identifierParam === 'Drink') recipe = 'bebidas';
    if (identifierParam === 'Meal') recipe = 'comidas';
    history.push(`/${recipe}/${idValue}`);
  };

  return (
    <div className="foodlist">
      {foods.map((food, index) => {
        if (foods.length === 1 && !category) {
          redirectRecipe(foods, identifier);
        } if (index <= maxLength) {
          return (
            <Card
              thumb={ food[`str${identifier}Thumb`] }
              name={ food[`str${identifier}`] }
              key={ food[`str${identifier}`] }
              index={ index }
              id={ food[`id${identifier}`] }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

FoodList.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default FoodList;

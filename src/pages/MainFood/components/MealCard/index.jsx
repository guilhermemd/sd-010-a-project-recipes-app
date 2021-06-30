import React from 'react';
import PropTypes from 'prop-types';

function MealCard({ meals }) {
  return (
    <>
      {meals.map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{meal.strMeal}</h1>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </>
  );
}

MealCard.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MealCard;

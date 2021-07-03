import React from 'react';
import { shape } from 'prop-types';

import SearchBar from '../../components/SearchBar';
import RecipesProvider from '../../context/recipesContext/recipesProvider';

function Drinks({ location }) {
  return (
    <RecipesProvider>
      <button type="button" data-testid="search-top-btn">Search</button>
      <SearchBar location={ location } />
      <p>Bebidas</p>
    </RecipesProvider>
  );
}

Drinks.propTypes = {
  location: shape({}).isRequired,
};

export default Drinks;

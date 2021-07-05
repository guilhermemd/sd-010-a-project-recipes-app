const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOOD_API_FILTER_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_API_FIRST_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export async function fetchFoods() {
  const fetchURL = await fetch(FOOD_API_URL);
  return fetchURL.json();
}

export async function fetchFoodCategories() {
  const fetchURL = await fetch(FOOD_CATEGORIES_API_URL);
  return fetchURL.json();
}

export async function fetchFoodsByName(name) {
  const fetchURL = await fetch(`${FOOD_API_URL}${name}`);
  return fetchURL.json();
}

export async function fetchFoodsByIngredient(ingredient) {
  const fetchURL = await fetch(`${FOOD_API_FILTER_URL}${ingredient}`);
  return fetchURL.json();
}

export async function fetchFoodsByFirstLetter(first) {
  const fetchURL = await fetch(`${FOOD_API_FIRST_URL}${first}`);
  return fetchURL.json();
}

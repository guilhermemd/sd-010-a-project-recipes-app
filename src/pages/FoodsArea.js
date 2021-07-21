import React, { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import Loading from '../compenents/Loading';
import MealCards from '../compenents/MealCards';
import SearchbarContext from '../contexts/SearchbarContext';
import '../styles/MealAndDrinkCards.css';

function FoodsArea() {
  const [areas, setAreas] = useState([]);
  const [mealsRecepies, setMealsRecepies] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [showRecepies, setShowRecepies] = useState(mealsRecepies);
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);
  const lastRecipe = 12;

  useEffect(() => {
    const getAreas = async () => {
      const fetchArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json())
        .then((respo) => respo);
      const allAreas = fetchArea.meals.map((country) => (
        country.strArea
      ));
      setAreas(allAreas);
      setHideSearchBtn(true);
    };
    getAreas();

    const getMealsRecepies = async () => {
      const fetchRecepies = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((responses) => responses.json())
        .then((respos) => respos.meals);
      setMealsRecepies(fetchRecepies);

      setShowRecepies(fetchRecepies.slice(0, lastRecipe));
    };
    getMealsRecepies();
    setPageName('Explorar Origem');
  }, []);

  useEffect(() => {
    async function getFiltredFetch() {
      const filteredFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
        .then((responses) => responses.json())
        .then((respos) => respos.meals);
      console.log(filteredFetch);
      const fils = filteredFetch.filter((element, index) => index < lastRecipe);
      setShowRecepies(fils);
    }

    console.log(selectedArea);
    if (selectedArea === 'All') {
      setShowRecepies(mealsRecepies.slice(0, lastRecipe));
    } else {
      getFiltredFetch();
    }
  }, [selectedArea, mealsRecepies]);

  const renderRecipesByArea = () => (
    <main className="main-area">
      <section className="recipes-area">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setSelectedArea(e.target.value) }
          value={ selectedArea }
          className="select-area"
        >
          <option data-testid="All-option">All</option>
          {areas.map((area, index) => (
            <option key={ index } data-testid={ `${area}-option` }>{area}</option>
          ))}
        </select>
      </section>
      <section className="recipes-container">
        <MealCards
          data={ showRecepies }
        />
      </section>
    </main>
  );

  return (
    <>
      <Header />
      { showRecepies.length !== 0 ? renderRecipesByArea() : <Loading />}
      <Footer />
    </>
  );
}

export default FoodsArea;

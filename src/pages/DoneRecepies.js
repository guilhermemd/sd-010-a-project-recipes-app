import React, { useEffect, useState, useContext } from 'react';
import CardMealDoneFav from '../compenents/CardMealDoneFav';
import CardDrinkDoneFav from '../compenents/CardDrinkDoneFav';
import SearchbarContext from '../contexts/SearchbarContext';
import Header from '../compenents/Header';

function DoneRecepies() {
  const [myDoneRecepies, setMyDoneRecepies] = useState();
  const [showDoneRecepies, setShowRecepies] = useState();
  const [validRecipes, setValidRecipes] = useState(false);
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);

  // funções para pegar as receitas do local storage
  const getDoneRecepies = () => {
    const doneRecepiesString = localStorage.getItem('doneRecipes');
    const allDoneRecepies = JSON.parse(doneRecepiesString);
    return allDoneRecepies;
  };

  useEffect(() => {
    setPageName('Receitas Feitas');
    // função que checa se há receitas no local storage
    const recepiesStorage = getDoneRecepies();
    if (recepiesStorage === null) {
      global.alert('Você ainda não concluiu nenhuma receita!');
    } else {
      setMyDoneRecepies(recepiesStorage);
      setShowRecepies(recepiesStorage);
      setValidRecipes(true);
    }
    setHideSearchBtn(false);
  }, []);

  function setMealOrDrink(recepie, index) {
    console.log(index);
    if (recepie.type === 'comida') {
      console.log(recepie);
      return (
        <CardMealDoneFav
          recepie={ recepie }
          index={ index }
        />
      );
    } return (
      <CardDrinkDoneFav
        recepie={ recepie }
        index={ index }
      />
    );
  }

  function handleContent(param) {
    const recepiesStorage = getDoneRecepies();
    if (recepiesStorage === null) {
      global.alert('Você ainda não concluiu nenhuma receita!');
    } else if (param === 'all') {
      setShowRecepies(myDoneRecepies);
    } else if (param === 'food') {
      console.log('entrou no filtro de comidas');
      const mealsRecepi = myDoneRecepies.filter((recepi) => recepi.type === 'comida');
      setShowRecepies(mealsRecepi);
    } else if (param === 'drink') {
      const drinksRecepi = myDoneRecepies.filter((recepi) => recepi.type === 'bebida');
      setShowRecepies(drinksRecepi);
    }
  }

  return (
    <>
      <Header />
      <div className="main-done-recipes">
        <section className="button-container button-container-done-recipes">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => handleContent('all') }
            className="button button-filter"
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => handleContent('food') }
            className="button button-filter"
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => handleContent('drink') }
            className="button button-filter"
          >
            Drinks
          </button>
        </section>
        <main className="main-done-recipe">
          {validRecipes && showDoneRecepies.map((recepie, index) => (
            setMealOrDrink(recepie, index)))}
        </main>

      </div>
    </>
  );
}

export default DoneRecepies;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

function ExploreFood() {
  const [randomMeal, setRandomMeal] = useState([]);
  async function requestRandomMeal() {
    const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const response = await fetchAPI.json();
    // console.log(response);
    setRandomMeal(response.meals[0].idMeal);
  }

  useEffect(() => {
    requestRandomMeal();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {/* {console.log(random)} */}
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredients
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            By Origin
          </button>
        </Link>
        <Link to={ randomMeal !== undefined ? `/comidas/${randomMeal}` : null }>
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Surprise me!
          </button>
        </Link>
      </Container>
      <LowerMenu />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  a button {
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 6px;
    border: 0.5px solid gray;
    width: 322px;
    font-family: Montserrat;
    font-size: 30px;
  }

  a + a {
    margin-top: 20px;
  }
`;

export default ExploreFood;

import React from 'react';
import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import SwiperCore, {
  Autoplay, EffectCoverflow, Pagination,
} from 'swiper/core';
import RecipeImage from './RecipeComponents/RecipeImage';
import RecipeTitle from './RecipeComponents/RecipeTitle';
import ShareBtn from './RecipeComponents/ShareButton';
import FavBtn from './RecipeComponents/FavoriteButton';
import RecipeCatg from './RecipeComponents/RecipeCategory';
import BottomBtn from './RecipeComponents/BottomButton';
import RecipeInst from './RecipeComponents/RecipeInstructions';
import VideoCtn from './RecipeComponents/VideoContainer';

function ComponentGen(props) {
  const { info, listCreator, recomendList } = props;
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = info;
  const { strDrinkThumb, strDrink, strAlcoholic, idDrink, idMeal, strArea } = info;
  SwiperCore.use([Autoplay, EffectCoverflow, Pagination]);

  let currentInfo = [];

  if (idDrink !== undefined) {
    currentInfo = [{
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }];
  } else {
    currentInfo = [{
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }];
  }
  return (
    <>
      <div className="recipe_details">
        <RecipeTitle className="title" title={ strMeal || strDrink } />
        { strAlcoholic !== undefined
          ? <RecipeCatg category={ `${strCategory} ${strAlcoholic}` } />
          : <RecipeCatg category={ strCategory } />}
        <div>
          <aside className="image">
            <RecipeImage origin={ strMealThumb || strDrinkThumb } />
            <div>
              <ShareBtn dataTest="share-btn" />
              <FavBtn info={ currentInfo } />
            </div>
          </aside>
          <aside className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {listCreator}
            </ul>
          </aside>
        </div>
        <h3 className="h3">Instructions</h3>
        <div className="instructions">
          <RecipeInst instructions={ strInstructions } />
          { strMeal !== undefined && <VideoCtn className="video" src={ strYoutube } /> }
        </div>
        <h3 className="h3">Recommended</h3>
      </div>
      <Swiper
        effect="coverflow"
        coverflowEffect={ {
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        } }
        slidesPerView={ 4 }
        spaceBetween={ 0 }
        breakpoints={ {
          320: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
        } }
        loop
        freeMode
        autoplay={ {
          delay: 4000,
          disableOnInteraction: false,
        } }
        grabCursor
        pagination={ {
          clickable: true,
        } }
        className="swiper"
      >
        {recomendList}
      </Swiper>
      <BottomBtn info={ info } />
    </>
  );
}

ComponentGen.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  listCreator: PropTypes.func.isRequired,
  recomendList: PropTypes.func.isRequired,
};

export default ComponentGen;

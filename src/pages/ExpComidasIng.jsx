import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { handleCurrentSearch } from '../actions';

class ExpComidasIng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientList: [],
    };

    this.returnSrcImg.this = this.returnSrcImg.bind(this);
    this.setGlobalRedirect.this = this.setGlobalRedirect.bind(this);
  }

  componentDidMount() {
    this.getIngredientsList();
  }

  async getIngredientsList() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const limitNumber = 12;
    const request = await fetch(endpoint).then((response) => response.json());
    // console.log(request);
    const ingredients = request.meals.slice(0, limitNumber);
    this.setState({
      ingredientList: ingredients,
    });
  }

  setGlobalRedirect(e) { // readequedar logica para fazer a chamada da api de pesquisa e settar no global
    e.preventDefault();
    const { handleSearch, history } = this.props;
    const { target } = e;
    const getCickName = target.alt || target.innerText;
    handleSearch(getCickName, 'ingrendient');
    return history.push('/comidas');
  }

  returnSrcImg(ingredient) {
    return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
  }

  render() {
    const { history } = this.props;
    const { ingredientList } = this.state;
    return (
      <>
        <Header title="Explorar Ingredientes" />
        {ingredientList.map((eachIngredient, index) => (
          <div
            key={ eachIngredient.idIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => this.setGlobalRedirect(e) }
            role="button"
            aria-hidden
          >
            <h6
              data-testid={ `${index}-card-name` }
            >
              {eachIngredient.strIngredient}
            </h6>
            <img
              src={ this.returnSrcImg(eachIngredient.strIngredient) }
              alt={ eachIngredient.strIngredient }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
        <Footer history={ history } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (currentSearch, type) => (
    dispatch(handleCurrentSearch(currentSearch, type))),
});

ExpComidasIng.propTypes = {
  history: PropTypes.shape().isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpComidasIng);

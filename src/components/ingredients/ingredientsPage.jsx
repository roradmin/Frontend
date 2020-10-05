import React from 'react';
import './ingredientsStyle.scss';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {connect} from 'react-redux';
import {IngredientContextProvider} from './IngredientContext';
import {loadIngredients} from '../../redux/actions/ingredientActions';
import Dashboard from '../dashboard/dashboard';
import MainTextField from '../common/inputs/mainTextField';
import IngredientMainPage from './ingredientMainPage';

class IngredientsPage extends React.Component {
  constructor(props, context){
    super(props, context);
      this.state = {
        currentIng: null
      }
      this.openIngredient = this.openIngredient.bind(this);
      this.changeIngredient = this.changeIngredient.bind(this);
  }
  componentDidMount(){
    const {ingredientsList} = this.props;
    console.log(ingredientsList);
    _.isEmpty(ingredientsList) && this.props.getAndStoreIngredients();
  }
  async openIngredient(ingredient = null,dataHasChanged = false){
    if(ingredient){
      const {ingredientsList} = this.props;
      const initCurrentIng = ingredientsList.find(ing => ing.id === ingredient.id);
      initCurrentIng && this.setState({currentIng:initCurrentIng});
    }else{
      // when closing pop up
      //dataHasChanged && this.getAllIngredients(); 
      this.setState({currentIng:ingredient})
    }
  }
  changeIngredient(currentIng){
    this.setState({currentIng});
  }

  render(){
    const {currentIng} = this.state;
    const {ingredientsList} = this.props;
    return(
            <IngredientContextProvider value={{
              ingredientsList,
              changeIngredient: this.changeIngredient,
              currentIng
            }}>
            <Dashboard 
                Intro = {() => <MainTextField
                  color = '#fff'
                  value = 'Ingredients Area'
                  width = '100%'
                />}
                MainComponent = {
                  () => <IngredientMainPage openIngredient = {this.openIngredient}/>
                }
            />
          </IngredientContextProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientsList: state.ingredients.ingredientsList
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAndStoreIngredients: () => { dispatch(loadIngredients()) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(IngredientsPage));


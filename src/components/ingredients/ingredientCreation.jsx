import React from 'react';
import Dashboard from '../dashboard/dashboard';
import MainTextField from '../common/inputs/mainTextField';
import IngForm from './ingredientForm';
import IngredientDataComponent from './ingredientDataComponent';

const IngredientCreation = props => {

    return <Dashboard 
          Intro = {() => <MainTextField
            type = "text"
            name = "name"
            color = '#fff'
            value = 'Create New Ingredient'
            width = '100%'
          />}
          MainComponent = {() =>  <IngredientDataComponent isCreation = {true}/>}
        />
}
 
export default IngredientCreation;
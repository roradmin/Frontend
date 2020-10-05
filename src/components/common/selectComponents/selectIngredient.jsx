import React,{useState,useEffect,useContext} from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import {loadIngredients} from '../../../redux/actions/ingredientActions';
import AsyncCreatableSelect from 'react-select/async-creatable';
import _ from 'lodash';

const SelectIngredient = ({setSelectedIngredient}) => {    
    const ingredientsList = useSelector(state => state.ingredients.ingredientsList);
    const [ingredientsOptions,setIngredientsOptions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        _.isEmpty(ingredientsList) && dispatch(loadIngredients())
    },[]);

    useEffect(() => {
        if(!_.isEmpty(ingredientsList)){
            // TODO - need to change the list to represent actual ingredients
            const ingredients = ingredientsList.map(pr => ({label:pr.name,value:pr.id}));
            setIngredientsOptions(ingredients);
        }
    },[ingredientsList]);

    const filterIngredients = (inputValue) => {
        return ingredientsOptions.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      };
      
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(filterIngredients(inputValue));
        }, 1000);
    });

    const styles = {
        control: base => ({
          ...base,
          fontSize: 'calc(12px + 0.4vw)'
        }),
        menu: base => ({
          ...base,
          fontSize: 'calc(12px + 0.4vw)'
        })
      };
    return <div className="selectIngredientWrapper">
        <AsyncCreatableSelect
            onChange={(val) => setSelectedIngredient(val)}
            loadOptions={promiseOptions}
            isClearable
            styles={styles}
            className="menu-outer-top"
            cacheOptions={ingredientsOptions}
            placeholder = 'Ingredient Name...'
        /></div>
}

export default SelectIngredient;
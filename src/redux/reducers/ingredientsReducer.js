

import initialState from './initialState';

const IngredientsReducer = (state = initialState.ingredientsList,action) => {
    //console.log('IngredientsReducer', state,action);
    switch(action.type){
        case 'SET_INGREDIENTS_LIST':
            return { 
                ...state,
                ingredientsList: action.data
            }
        case 'ADD_INGREDIENT_TO_LIST':
            return { 
                ...state,
                ingredientsList: state.ingredientsList.concat(action.data)
            }
        default:
            return state;
    }
}

export default IngredientsReducer;
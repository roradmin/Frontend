

import initialState from './initialState';

const DishesReducer = (state = initialState.dishesList,action) => {
  //  console.log(action);
    switch(action.type){
        case 'SET_DISHES_LIST':
            return { 
                ...state,
                dishesList: action.data
            }
        case 'SET_Catagories_LIST':
            return { 
                ...state,
                catagoriesList: action.data
            }  
        case 'ADD_DISH_TO_LIST':
            return { 
                ...state,
                dishesList: state.dishesList.concat(action.data)
            }
        default:
            return state;
    }
}

export default DishesReducer;
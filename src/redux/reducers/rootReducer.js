

import {combineReducers} from 'redux';
import ProvidersReducer from './providersReducer';
import LoadingReducer from './loaderReducer';
import IngredientsReducer from './ingredientsReducer';
import UserReducer from './userReducer';
import DishesReducer from './dishesReducer';
import { formsReducer } from './formReducer';
import CurrentPathReducer from './currentPathReducer';
import BasicConfigurationReducer from './basicConfigurationReducer';


const rootReducer = combineReducers({
    providers: ProvidersReducer,
    ingredients: IngredientsReducer,
    dishes: DishesReducer,
    loader: LoadingReducer,
    user: UserReducer,
    forms: formsReducer,
    path: CurrentPathReducer,
    basicConfiguration: BasicConfigurationReducer
});

export default rootReducer;
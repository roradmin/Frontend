import {setLoading} from './loaderActions';
import { getAllIngredients } from '../../apiConnector/ingredient.api';
import { clearError } from '../../components/common/systemAlerts/clearError';
import _ from 'lodash';

  const storeIngredients = (data) => ({type: "SET_INGREDIENTS_LIST",data});
  export const loadIngredients = () => {
    return async (dispatch) => {
      try{
          dispatch(setLoading(true));
          const res = await getAllIngredients();
          const dishes = _.get(res,['data','data'],[]);
          dispatch(storeIngredients(dishes));
      }
      catch(err){
        clearError(err,'Cannot load Ingredients')
      }
      finally{
        dispatch(setLoading(false));
      }
    }
  }
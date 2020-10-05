import {setLoading} from './loaderActions';
import {getAllDishes,getCatagoriesOptions} from '../../apiConnector/dishes.api';
import _ from 'lodash';
import { clearError } from '../../components/common/SystemAlerts/clearError';

  const storeDishes = (data) => ({type: "SET_DISHES_LIST",data});
  const storeCatagories = (data) => ({type:"SET_Catagories_LIST",data});
  
  export const loadAndStoreCatagories = () => {
     return (dispatch) => {
       dispatch({type:"SET_Catagories_LIST",data:['a']});
     }
  }

export const loadAndStoreDishes = () => {
    return async (dispatch) => {
      try{
          dispatch(setLoading(true));
          const res = await getAllDishes();
            const dishes = _.get(res,['data','data'],[]);
            dispatch(storeDishes(dishes));
      }
      catch(err){
        clearError(err,'Cannot load dishes')
      }
      finally{
        dispatch(setLoading(false));
      }
    }
  }


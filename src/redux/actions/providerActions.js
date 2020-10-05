import {setLoading} from './loaderActions';
import {getAllProviders} from '../../apiConnector/provider.api';
import _ from 'lodash';
import { clearError } from '../../components/common/SystemAlerts/clearError';

const storeProviders = (data) => ({type: "SET_PROVIDERS_LIST",data});
  
export const loadProviders = () => {
    return async (dispatch) => {
      try{
          dispatch(setLoading(true));
          const res = await getAllProviders();
          const providers = _.get(res,['data','data'],[]);
          dispatch(storeProviders(providers));
      }
      catch(err){
        clearError(err,'Cannot load Providers')
      }
      finally{
        dispatch(setLoading(false));
      }
    }
  }

  export default loadProviders;
import React from 'react';
import ProviderReduxForm from './form/providerReduxForm';
import ProviderIngredients from './providerIngredients';
import { addForm } from '../../redux/reducers/formReducer';
import ProviderBase from './common/providerBase';
import {useDispatch} from "react-redux";
import ProviderIngCreation from './providerIngCreation';

const ProviderPage = ({providerInfo = null}) => {
  const dispatch = useDispatch();
  const initialProvider = providerInfo || ProviderBase({});     // provider 
  const currentId = providerInfo?.id ?? null;
  const creationMode = providerInfo?.id ? true : false;

  dispatch(
    addForm({
      key: "PROVIDER_FORM",
      initialState: initialProvider
    }),               // addForm => dispatch data
      initialProvider       
  );
    
  return React.useMemo(() => <div className='ProviderPageWrapper'>
    {/* {creationMode ? <ProviderIngredients currentProviderId = {currentId} /> :
      <ProviderIngCreation/>
    } */}
        <ProviderReduxForm currentProvider = {providerInfo} />
    </div>
  ,[currentId])
}
 
export default ProviderPage;
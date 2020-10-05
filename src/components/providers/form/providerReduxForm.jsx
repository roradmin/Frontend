import React,{useState,useContext,useEffect} from "react";
import _ from 'lodash';
import { useDispatch } from "react-redux";
import { loadProviders } from '../../../redux/actions/providerActions';
import AppContext from '../../appContext';
import {createNewProvider,updateCurrentProvider} from '../../../apiConnector/provider.api';
import ProviderForm from './providerForm';
import { useHistory } from 'react-router-dom';
import {checkProviderFields} from '../common/providerBase';
import {ProviderInfoContext} from '../providerComponent';

const ProviderReduxForm = ({currentProvider = null}) => {
  const {openPopupMessage,setLoading} = useContext(AppContext);
  const setProviderInfo = useContext(ProviderInfoContext)?.setProviderInfo;

  const [invalidInputs,setInvalidInputs] = useState({});
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if(!_.isEmpty(invalidInputs)){
      //openPopupMessage({type: 'warning',header:'Invalid Input',errorsList:invalidInputs})
      //setInvalidInputs([]);
    }
  }, [invalidInputs]);

const handleCreation = async values => {
  console.log(values);
  if(checkFormValidation(values)){
    try{
        setLoading(true);
        const res = await createNewProvider(values);
        console.log(res);
        openPopupMessage({type:'success',msg:'Provider Created Successfully'});
        dispatch(loadProviders());
        // history.push('newProviderId');
        // add ingredients if needed
      }
      catch(err){
        openPopupMessage({err});
      }
      finally{
        setLoading(false);
      }
  }
}
const updateProvider = async values => {
  console.log(values);
    if(JSON.stringify(currentProvider) !== JSON.stringify(values)){// && checkFormValidation(values)){
        try{
          setLoading(true);
          const res = await updateCurrentProvider(currentProvider.id,values);
          console.log(res?.data?.data);
          setProviderInfo(res?.data?.data)
          openPopupMessage({type:'success',msg:'Provider Updated',header:  res?.data?.result});
        }
        catch(err){
          openPopupMessage({err});
        }
        finally{
          setLoading(false);
        }
    }
  };
  const checkFormValidation = (values) => {
    const validation = checkProviderFields({provider:values});
    const findInvalidFields = validation.filter(row => row.isValid !== true).map(row => ({[row.key]: row.reason}));
    if(_.isEmpty(findInvalidFields)){
      return true;
    }else{
      setInvalidInputs(findInvalidFields);
      return false;
    }   
  }
  return React.useMemo(() => (
    <>
      <ProviderForm
            currentProvider = {currentProvider}
            handleCreation = {handleCreation}
            updateProvider = {updateProvider}
            invalidInputs = {invalidInputs}
      />
    </>),[currentProvider,invalidInputs]);
}

export default ProviderReduxForm;

// import React,{useState,useContext,useEffect} from "react";
// import _ from 'lodash';
// import { useDispatch } from "react-redux";
// import AppContext from '../AppContext';
// import { useHistory } from 'react-router-dom';
// import {checkProviderFields} from './ProviderBase';
// import IngredientDataComponent from './ingredientDataComponent';
// import {loadIngredients} from '../../redux/actions/ingredientActions';
// import { createNewIngredient,updateIngredient as updateCall} from '../../apiConnector/Ingredient.api';

// const IngredientReduxForm = ({currentIngredient = null}) => {
//   const {openPopupMessage,setLoading} = useContext(AppContext);
//   const dispatch = useDispatch();
//   let history = useHistory();

// const handleCreation = async values => {
//   if(checkFormValidation(values)){
//     try{
//         setLoading(true);
//         const res = await createNewIngredient(values);
//         console.log(res);
//         openPopupMessage({type:'success',msg:'Ingredient Created Successfully'});
//         dispatch(loadIngredients());
//       }
//       catch(err){
//         openPopupMessage({err});
//       }
//       finally{
//         setLoading(false);
//       }
//   }
// }
// const updateIngredient = async values => {
//     console.log(values);
//     if(JSON.stringify(currentIngredient) !== JSON.stringify(values)){// && checkFormValidation(values)){
//         try{
//           setLoading(true);
//           const res = await updateCall(currentIngredient.id,values);
//           openPopupMessage({type:'success',msg:'Provider Updated',header:  res?.data?.result});
//         }
//         catch(err){
//           openPopupMessage({err});
//         }
//         finally{
//           setLoading(false);
//         }
//     }
//   };
//   const checkFormValidation = (values) => {
//     const validation = checkProviderFields({provider:values});
//     const findInvalidFields = validation.filter(row => row.isValid !== true).map(row => ({[row.key]: row.reason}));
//     if(_.isEmpty(findInvalidFields)){
//       return true;
//     }else{
//       setInvalidInputs(findInvalidFields);
//       return false;
//     }   
//   }
//   return React.useMemo(() => (
//     <>
//       <IngredientDataComponent
//             handleCreation = {handleCreation}
//             updateIngredient = {updateIngredient}
//             data = {currentIngredient}
//       />
//     </>),[currentIngredient,invalidInputs]);
// }

// export default IngredientReduxForm;

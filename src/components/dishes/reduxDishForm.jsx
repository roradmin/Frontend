import React,{useContext,useMemo} from "react";
import {useDispatch} from "react-redux";
import {addForm} from '../../redux/reducers/formReducer';
import DishBase from './dishBase';
import _ from 'lodash';
import useStoreForm from '../common/reduxForm/useStoreForm';
import {InputLabel,LabelSelect,LabelInputSelect} from '../common/forms/inputsHandling';
import { StyledButton } from '../common/forms/styledButton';
import {OrderSelect} from '../ingredients/ingredientForm';
import CatagorySelect from '../common/selectComponents/catagorySelect';
import AddIngredientsComponent from './addIngredientComponent';
import AppContext from '../appContext';
import { createNewDish } from '../../apiConnector/dishes.api';


const ReduxDishForm = ({onClose,currentDish = null}) => {
  const dispatch = useDispatch();
  const initialDish = currentDish || DishBase({});     // provider 
  const {setLoading,openPopupMessage} = useContext(AppContext);

    dispatch(
      addForm({key: "DISH_FORM",initialState: initialDish}), // addForm => dispatch data
      initialDish       
    );   

  const onSubmit = async values => {
    console.log(values);
      try{
        setLoading(true,'Creating Dish...');
        const res = await createNewDish({data:values});
        console.log(res);
        //successAlert(res);
      }
      catch(err){
        openPopupMessage({err});
      }
      finally{
        setLoading(false,'Creating Dish...');
      }
  };

  return <>
          <DishForm onSubmit={onSubmit} creation={currentDish}/>
    </>;
}

export default ReduxDishForm;

const DishForm = ({onSubmit,creation}) => {
    const {values, handleChange, handleSubmit} = useStoreForm("DISH_FORM", onSubmit);  // USE STORE FORM = dispatch changes + submit

    const handleInputsChange = ({target:{name,value}}) => {
        handleChange(name, value);
    };
    const handleObjChange = (name,objVal) => {
        handleChange(name, objVal);
    };
    const handleNestedInputsChange = (val,parent,type) => {
        const currentVal = _.get(val,'value',val);
        handleChange(parent,currentVal,type);
        //handleChange = (name -> key,value,nestedKey = null -> child of key if exists,multiValuesIndex = null -> if there is multiple values (array of ingredients for instance))
    };
  console.log(values.category);
    const DishFormComponent = (formValues) => (
      <form className="dishForm" onSubmit={handleSubmit}>
        <InputLabel
          type="text"
          name="name"
          label='Name'
          value={formValues.name}
          onChange={handleInputsChange}
        /> 
        <InputLabel
          type="text"
          name="description"
          label='Description'
          value={formValues.description}
          onChange={handleInputsChange}
        /> 
        <LabelSelect label={'Category'} SelectComponent = {
          <CatagorySelect 
              category = {formValues.category}
              onChange = {(categoryObj) => handleObjChange('category',categoryObj)}
            />  
        } />     
          <LabelInputSelect
            type = "text"
            name = "price"
            label = 'Price'
            value = {formValues.cost.price}
            onChange = {(e) => handleNestedInputsChange(e.target.value,'cost','price')}
            SelectComponent = {
            <OrderSelect
              setCurrentValue = {handleNestedInputsChange} 
              parent = {'cost'}
              currentValue={formValues.cost}
              type = {'currency'}
              />
            }
            />
            <AddIngredientsComponent submitArray = {(arrOfString) => handleObjChange('ingredients',arrOfString)}/>
        <StyledButton type="submit" title={creation?'Update Dish':'Create Dish'} width='100%' height='35px'/>
      </form>
    );

    const MemoDishFormComponent = useMemo(() => DishFormComponent(values), [values]);
    
    return MemoDishFormComponent;
  }                                                 

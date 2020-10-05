import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import Select from 'react-select';
import {loadIngredients} from '../../redux/actions/ingredientActions';
import _ from 'lodash';

const AddIngredientsComponent = ({submitArray}) => {
    const dispatch = useDispatch();
    const [selectedIngredients,setSelectedIngredients] = useState([]);
    const ingredientsList = useSelector(state => state.ingredients.ingredientsList) || [];
    const [counter,setCounter] = useState(0); // to count the ingredients (special key instead of the ing id that can show up twice)

    useEffect(() => {
      _.isEmpty(ingredientsList) && dispatch(loadIngredients())
    },[]);

    useEffect(() => {
        const arrayOfString = selectedIngredients.map(ing => ({id:ing.value,quantity:ing.quantityPerDish}));
        submitArray(arrayOfString);
    },[selectedIngredients]);

    // by selecting the relevant ING, the orderValue.scale will show up+
    const editIngredient = ({inputValue = null,ingredient = null}) => {
        // ingredient - value = id,label = name | inputValue = id, value = input value
        const currIngs = [...selectedIngredients];
        const currentId = inputValue ? inputValue.id : ingredient.id ;
        const findIngIdx = currIngs.findIndex(t => t.id === currentId);
        if(ingredient){
            _.set(currIngs[findIngIdx],['value'],ingredient.value.value);
            _.set(currIngs[findIngIdx],['label'],ingredient.value.label);
            _.set(currIngs[findIngIdx],['quantityCapacity'],ingredient.value.quantityCapacity);

        }else if(inputValue){
            _.set(currIngs[findIngIdx],['quantityPerDish'],inputValue.value);
        }
        setSelectedIngredients(currIngs);
        //currIngs.splice(findIngIdx, 1, {id: 100, name: 'New object.'});
    }
    const addIngredient = () => {
        console.log(ingredientsList);
        setCounter(counter => counter + 1);
        const newIng = {
            // value label for select (value = id)
            id: counter,
            value: ingredientsList[0].id,
            label: ingredientsList[0].name,
            quantityPerDish: 0,
            quantityCapacity: ingredientsList[0].orderValue.scale
        }
        setSelectedIngredients(selectedIngredients => [...selectedIngredients,newIng])
    }
    const removeIngredient = (requestedId) => {
        const currIngs = [...selectedIngredients];
        const findIndex = currIngs.findIndex(t => t.id === requestedId);
        findIndex !== -1 && currIngs.splice(findIndex,1); 
        setSelectedIngredients(currIngs);
    }
    return <div className = "selectedIngredients">
        <div className="addNew">
            <label>Add relevants ingredients</label>
            <div className="addIngToDish" onClick = {addIngredient}><span>+</span></div>
        </div>
        {
              selectedIngredients.map((Ing,idx) => {
                return <div className="ingHolder" key={Ing.id}> 
                <Select
                        onChange={(val) => editIngredient({ingredient: {id:Ing.id,value:val}})}
                        value = {Ing}
                        //defaultValue={{ label: "Select Dept", value: 0 }}
                        options = {ingredientsList.map(ing => ({label:ing.name ,value: ing.id,quantityCapacity: ing.orderValue.scale}))}
                        placeholder = 'Select Ingredient...'
                />
                <div className="quantityVolume">
                    <input value={Ing.quantityPerDish} onChange={(e) => editIngredient({inputValue: {id: Ing.id,value: e.target.value}})} />
                    <span>{Ing.quantityCapacity}</span>
                </div>
                <span className='removeIngToDish' onClick={() => removeIngredient(Ing.id)}>-</span>
              </div>
            })
        }
    </div>
  }

  export default AddIngredientsComponent;
import React,{useState,useContext,useEffect} from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import MainPageList from '../providers/providersList/mainPageList';
import { useHistory } from 'react-router-dom';

const IngredientMainPage = props => {
    const ingredientsList = useSelector(state => state.ingredients.ingredientsList);
    let history = useHistory();

    const onRowClicked = (ing) => {
        console.log('onRowClicked: ',ing);
        ing?.id && history.push(`Ingredients/Ingredient/${ing.id}`);
    }
    // const Ingredients = () => {
    //     return ingredientsList.map(ing => {
    //         const inStock = _.get(ing,'amountInStock',100) || 72;
    //         return  <IngredientBox
    //             className="ingredientRow"
    //             inStock={inStock}
    //             key={ing.id}
    //             onClick={() => props?.openIngredient(ing)}>
    //         <label className="ingName">{ing?.name?.toUpperCase()}</label>
    //         <div className="ingProvider">
    //             <label>{ing?.provider?.name}</label>
    //             <div className="orderVal">60</div>
    //         </div>
    //     </IngredientBox>
    //     });
    // }

    return React.useMemo(
        () => _.isEmpty(ingredientsList) ? [] : <div className='IngredientMainPageWrapper'>
            <MainPageList
                  list = {ingredientsList}
                  type='ingredient'
                  onRowClicked = {onRowClicked}
              />
    </div>,[ingredientsList]);
}
export default IngredientMainPage;
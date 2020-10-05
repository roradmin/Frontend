import React,{useState,useEffect,useContext} from 'react';
import * as providerApi from '../../apiConnector/provider.api';
import * as IngredientApi from '../../apiConnector/ingredient.api';
import _ from 'lodash';
import AppContext from '../appContext';
import styled from 'styled-components';
import {loadIngredients} from '../../redux/actions/ingredientActions';
import { useDispatch, useSelector } from "react-redux";
import SearchInput from '../common/inputs/searchInput';


const ProviderIngCreation = () => {
    const {setLoading,openPopupMessage} = useContext(AppContext);
    const ingredientsList = useSelector(state => state.ingredients.ingredientsList);
    const [ingredientsOptions,setIngredientsOptions] = useState(ingredientsList ?? []);
    const [filterName,setFilterName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        _.isEmpty(ingredientsList) && dispatch(loadIngredients())
    },[]); 
    return _.isEmpty(ingredientsOptions) ? [] : <AddingIngList>
        <span className="ingredientsHeader">
            <h4>Add Ingredients</h4>
            <SearchInput
                value = {filterName}
                onChange={(value) => setFilterName(value)}
            />
        </span>
        <div className="externalList">
            {
                ingredientsOptions.map(ing => <IngStyle
                    ing = {ing}
                    key={ing.id}
                    external = {true}
                    BGcolor = '#0a2835'
                >
                <span className="name">{ing?.name}</span>
                <span className="icon"> + </span>
                </IngStyle>)
            }
        </div>
        <div className="selectedList">
        {
            ingredientsOptions.map(ing => <IngStyle
                    ing = {ing}
                    key={ing.id}
                    external = {false}
                    BGcolor = '#610b31'
                >
                <span className="name">{ing?.name}</span>
                <span className="icon"> - </span>
                </IngStyle>)
        }
                {
            ingredientsOptions.map(ing => <IngStyle
                    ing = {ing}
                    key={ing.id}
                    external = {false}
                    BGcolor = '#610b31'
                >
                <span className="name">{ing?.name}</span>
                <span className="icon"> - </span>
                </IngStyle>)
        }
        </div>
    </AddingIngList>
}
const AddingIngList = styled.div`
    width:430px;
    *{
        user-select: none;
    }
    .ingredientsHeader{
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        justify-content: space-around;
        color: #eee;
    }
    color: #eee;
    background-color: rgb(45, 52, 54);
    display: grid;
    grid-template-rows: auto 1fr 3fr;
    .externalList{
        
    }
    .selectedList{
        background: #252a2b;
    }
    .selectedList,.externalList{
        display:flex;
        flex-wrap:wrap;
        justify-content: space-around;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 9pt;
        align-items: center;
    
    }
`;
const IngStyle = styled.div`
    height: 27px;
    background-color: #000;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 1px 0px #eee;
    cursor: pointer;
    .icon{
        width:30px;
        background-color:${props => props.BGcolor ?? '#333'};
        height: 100%;
        align-items: center;
        font-weight: bold;
        display: grid;
    }
    .name{
        flex-grow: 1;
    }
`;
export default ProviderIngCreation;
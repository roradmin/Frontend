import React, { useState, useEffect, useContext, useMemo } from 'react';
import _ from 'lodash';
import PieChart from '../common/charts/PieChart';
import { CircleChart } from '../common/charts/CircleChart';
import { updateIngredient, createNewIngredient } from '../../apiConnector/ingredient.api';
import AppContext from '../appContext';
import IngredientCreation from './ingredientCreation';
import { useDispatch, useSelector } from "react-redux";
import IngredientBase from './ingredeintBase';
import IngForm from './ingredientForm';
import { StyledButton } from '../common/forms/styledButton';
import { loadIngredients } from '../../redux/actions/ingredientActions';

const IngredientDataComponent = ({ data, isCreation = false }) => {
    const { setLoading, openPopupMessage } = useContext(AppContext);
    const [dataHasChanged, setDataHasChanged] = useState(false);
    const [ingredientData, setIngredientData] = useState(data);
    const [fullStock, setFullStock] = useState(100);
    const [inStock, setInStock] = useState(0);
    const [creationData, setCreationData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setFullStock(_.get(ingredientData, 'desiredInStock', 0) || 58);
        setInStock(_.get(ingredientData, 'amountInStock', 0) || 27);
    }, [ingredientData]);

    const basicInfoSetForCreation = (ingredient, provider) => {
        const creationData = IngredientBase({
            name: ingredient.name,
            provider,
        });
        setCreationData(creationData);
        setIngredientData(creationData);
    }

    const ProviderChart = () => {
        if (inStock && fullStock) {
            const Percentage = Math.round((inStock / fullStock) * 100);
            const lineColor = Percentage < 30 ? "#dc3535" : Percentage < 50 ? "#FF8800" : "#1ae268";

            return <div className="ingCharts">
                <CircleChart
                    width={"240px"}
                    fontSize={'16px'}
                    fontColor={'#fff'}
                    series={Percentage}
                    label={'In Stock'}
                    lineColor={lineColor}
                />
            </div>
        } else return []
    }
    const dataOnChange = (key, val, parent = null) => {
        console.log(key, val, parent);
        const tempObj = { ...ingredientData };
        const path = parent ? [parent, key] : [key];
        _.set(tempObj, path, val);
        setIngredientData(tempObj);
    }

    const updateIngredientData = async () => {
        console.log('update: ', ingredientData);
        // setLoading(true,"Update Ingredient Info..");
        // try{
        //   const data = await updateIngredient(ingredientData,ingredientId);
        //   //successAlert(data);
        //   setDataHasChanged(true);
        // }catch(err){
        //     openPopupMessage({err});
        // }finally{
        //     setLoading(false,"Update Ingredient Info..");
        // }
    }
    const handleCreation = async () => {
        console.log('creation: ', ingredientData);
        // try{
        //     setLoading(true);
        //     const res = await createNewIngredient(ingredientData);
        //     console.log(res);
        //     openPopupMessage({type:'success',msg:'Ingredient Created Successfully'});
        //     dispatch(loadIngredients());
        // }
        // catch(err){
        //     openPopupMessage({err});
        // }
        // finally{
        //     setLoading(false);
        // }
    }

    return <div className="ingredientDataWrapper">
        <IngForm
            dataOnChange={dataOnChange}
            ingredientData={ingredientData}
            isCreation={isCreation}
            handleForm={isCreation ? handleCreation : updateIngredientData}
        />
        {!isCreation && <div className="stockWrapper">
            <div className="ingCharts">
                <PieChart
                    labels={['In Stock', 'Ran Out']}
                    series={[inStock, fullStock - inStock]}
                    width="200px"
                    fontColor='#eee'
                />
            </div>
            <div className="providerDetails">
                {console.log('--RTL:', ingredientData)}
                <label>{ingredientData.providerName}</label>
                <ProviderChart />
                <h4>{`Heads-up: ${_.get(ingredientData, 'minimumInStock', '3%')}`}</h4>
            </div>
        </div>}
    </div>
}

export default IngredientDataComponent
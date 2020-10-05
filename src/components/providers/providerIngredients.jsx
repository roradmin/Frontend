import React,{useState,useEffect,useContext} from 'react';
import * as providerApi from '../../apiConnector/provider.api';
import * as IngredientApi from '../../apiConnector/ingredient.api';
import _ from 'lodash';
import AppContext from '../appContext';
import IngredientDataComponent from '../ingredients/ingredientDataComponent';
import styled from 'styled-components';
import {FaStream,FaStar,FaRegStar} from 'react-icons/fa';
import SearchInput from '../common/inputs/searchInput';

const ProviderIngredients = ({currentProviderId}) => {
    const [providerIngredients,setProviderIngredients] = useState([]);
    const {setLoading,openPopupMessage} = useContext(AppContext);
    const [currentIngredient,setCurrentIngredient] = useState(null);
    const [creationStatus,setCreationStatus] = useState(false);
    const [filterName,setFilterName] = useState('');

    useEffect(() => {getProviderIngredients()},[currentProviderId]);
    // useEffect(() => {
    //     isHovered && setCurrentIngOptions(ingredient);
    // },[isHovered]);

    const getProviderIngredients = async () => {
        if(currentProviderId){
            try{
                setLoading(true,'Loading Provider Ingredients');
                const {data:{data}} = await providerApi.getProviderIngredient(currentProviderId);
                //console.log(data);
                data && setProviderIngredients(data);
            }
            catch(err){
                openPopupMessage({err});
            }
            finally{
                setLoading(false,'Loading Provider Ingredients');
            }
        }
    }
    const getIngredient = async (ingId) => {
        try{
            const {data:{data}} = await IngredientApi.getIngredientData(ingId);
            data && console.log(data);
            setCreationStatus(false);   //  will prevent the add popup
            data && setCurrentIngredient(data);
        }
        catch(err){
            openPopupMessage({err});
        }
    }
    const onCloseIngredientPopup = (updatedObj = null,dataHasChanged = false) => {
        // control dependencies when close ingredient popup if needed
        setCurrentIngredient();
        dataHasChanged && getProviderIngredients();
        creationStatus && setCreationStatus(false);
    }
    const providerIngredientsInputs = () => !_.isEmpty(providerIngredients) && providerIngredients
        .filter(t => t.name.includes(filterName))
        .map((procIng,idx) => {
                return <IngRow key={procIng.id} idx={idx * 3}>
                <div className="tahles">
                    <span className="starWrapper" style={{color: '#ff9800'}}>
                        {
                            idx !== 2 ? <FaRegStar style={{color: '#b3b3b3'}}/> : <FaStar/>
                        }
                    </span>
                    <span className='name'>
                        {procIng.name}
                    </span>
                    <span className='extradetails' onClick = {() => getIngredient(procIng.id)}>
                        <FaStream/>
                    </span>
                </div>
            </IngRow>}
        );
    const openCreationMode = () => setCreationStatus(true);

    return <div className="providerIngredientsWrapper">
        <span className="ingredientsHeader">
            <h4>Ingredients</h4>
            <SearchInput
                value = {filterName}
                onChange={(value) => setFilterName(value)}
            />
        </span>
        <div className="providerData">
            {
                providerIngredientsInputs()
            }
            {
                (creationStatus || currentIngredient) && <IngredientDataComponent
                    data={currentIngredient}
                    onClosePopup={onCloseIngredientPopup}
                />
            }
        </div>
    </div>
}
const IngRow = styled.div`
margin-bottom: 2pt;
max-height: 44px;
animation: 0.${props => props.idx < 10 ? props.idx : 9}s fadeIn;
&:hover{
    max-height: 100px;
    transition: all 0.6s ease-in;
    .extradetails{    
        flex-grow: 1;
        color: #8a1046
    }
}
transition: all 0.6s east-out;

.tahles{
    color: #fff
    align-items: center;
    display: flex;
    border-radius: 0;
    align-items: stretch;
    cursor: pointer;
    position: relative;
    .name{
        flex-grow: 1;
    }
    .extradetails{
        background: #072532;
        transition: .6s all;
    
        svg{
            justify-self: center;
            font-size: 0.7em;
            cursor:pointer;
        }
    }
    span{
        background: #0f3748;
        font-weight: bold;
        font-size: 15pt;
        font-family: 'Titillium Web', sans-serif;
        font-variant-caps: all-petite-caps;
        display: flex;
        align-items: center;
        padding: 3%;
    }
}
`;
export default ProviderIngredients;
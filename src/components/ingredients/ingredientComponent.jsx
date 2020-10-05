import React,{useContext,useState,useEffect} from 'react';
import Dashboard from '../dashboard/dashboard';
import _ from 'lodash';
import TopBox from '../dashboard/topBox';
import {useSelector,useDispatch} from 'react-redux';
import MainTextField from '../common/inputs/mainTextField';
import AppContext from '../appContext';
import { useHistory } from 'react-router-dom';
import * as IngredientAPI from '../../apiConnector/ingredient.api';
import {loadIngredients} from '../../redux/actions/ingredientActions';
import IngredientDataComponent from './ingredientDataComponent';
import styled from 'styled-components';

const IngredientComponent = () => {
  const [currentIngredientId,] = useState(window.location.pathname.split('/Ingredient/')[1]);
  const [ingredientInfo,setIngredientInfo] = useState(null);
  const ingredientsList = useSelector(state => state.providers.ingredientsList);
  const {setLoading,openPopupMessage} = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {_.isEmpty(ingredientsList) && dispatch(loadIngredients())},[]);
  useEffect(() => {getIngredient()} ,[currentIngredientId]);

  const getIngredient = async () => {
      if(currentIngredientId){
          setLoading(true);
          try{
              const {data:{data}} = await IngredientAPI.getIngredientData(currentIngredientId);
              console.log(data);
              data && setIngredientInfo(data);
          }
          catch(err){
              openPopupMessage({err});
              history.push("/ErrorPage");
          }
          finally{
              setLoading(false);
          }
      }else{
          history.push("/ErrorPage");
          openPopupMessage({header: 'Cannot Find Ingredient'});
      }
  }

    return React.useMemo(() => ingredientInfo ? <Dashboard 
          Intro = {() => <MainTextField
            type = "text"
            name = "name"
            color = '#fff'
            value = {ingredientInfo.name}
            width = '100%'
          />}
          //Top = {() => <ProviderMiniStats currentProvider={ingredientInfo}/>}
          MainComponent = {() => <IngredientDataComponent
            data = {ingredientInfo}
            onClosePopup = {() => console.log('close')}
          />}
          DashRight = {()=> <LastActions>
            <h3>Last Actions</h3>
              <div className="content" id="basicScroller">
                {[1,2,3,4,5,6,7,8,9].map(t => <TopBox key = {t} width='auto' backgroundColor="#8d9598">{t}</TopBox>)}
              </div>
            </LastActions>
        }
    /> : [],[ingredientInfo]);
}

const LastActions = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
  h3{
    font-size: 16pt;
    color: #eee;
    font-family: Merriweather;
  }
  .content{
    max-height: 100%;
    overflow: auto;
    display: grid;
    justify-content: center;
  }
`;
export default IngredientComponent;



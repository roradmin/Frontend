import React,{useContext,useState,useEffect} from 'react';
import Dashboard from '../dashboard/dashboard';
import _ from 'lodash';
import TopBox from '../dashboard/topBox';
import {useSelector,useDispatch} from 'react-redux';
import loadProviders from '../../redux/actions/providerActions';
import MainTextField from '../common/inputs/mainTextField';
import * as providerApi from '../../apiConnector/provider.api';
import AppContext from '../appContext';
import { useHistory } from 'react-router-dom';
import ProviderPage from './providerPage';
import styled from 'styled-components';
import ProviderMiniStats from './providerStats/providerMiniStats';

export const ProviderInfoContext = React.createContext();

const ProviderComponent = () => {
  const [currentProviderId,] = useState(window.location.pathname.split('/Provider/')[1]);
  const [providerInfo,setProviderInfo] = useState(null);
  const providersList = useSelector(state => state.providers.providersList);
  const {setLoading,openPopupMessage} = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {_.isEmpty(providersList) && dispatch(loadProviders())},[]);
  useEffect(() => {getProvider()} ,[currentProviderId]);

  const getProvider = async () => {
      if(currentProviderId){
          setLoading(true);
          try{
              const {data:{data}} = await providerApi.getProviderData(currentProviderId);
              console.log(data);
              data && setProviderInfo(data);
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
          openPopupMessage({header: 'Cannot Find Provider'});
      }
  }

    return React.useMemo(
      () => providerInfo ? <ProviderInfoContext.Provider value={{setProviderInfo}}>
        <Dashboard 
          Intro = {() => <MainTextField
            type = "text"
            name = "name"
            color = '#fff'
            value = {providerInfo.name}
            width = {'100%'}
          />}
          Top = {() => <ProviderMiniStats currentProvider={providerInfo}/>}
          MainComponent = {() => <ProviderPage providerInfo={providerInfo}/>}
          DashRight = {() => <LastActions>
            <h3>Last Actions</h3>
              <div className="content" id="basicScroller">
                {[1,2,3,4,5,6,7,8,9].map(t => <TopBox key = {t} width='auto' backgroundColor="#8d9598">{t}</TopBox>)}
              </div>
            </LastActions>
        }
    /></ProviderInfoContext.Provider> : [],[providerInfo]);
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
export default ProviderComponent;
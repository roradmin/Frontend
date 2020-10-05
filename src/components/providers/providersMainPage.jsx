import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MainPageList from './providersList/mainPageList';
import _ from 'lodash';

const ProvidersMainPage = () => {
    let history = useHistory();
    const providersList = useSelector(state => state.providers.providersList);
    console.log(providersList);
    const redirectProvider = (selectedId) => history.push(`/Providers/Provider/${selectedId}`);

    const onRowClicked = (rowData) => {
        console.log(rowData);
        rowData.id && redirectProvider(rowData.id);
    }
  return (
    <div className='ProvidersWrapper'> 
          {
            !_.isEmpty(providersList) && <MainPageList
                  list = {providersList}
                  type='provider'
                  onRowClicked = {onRowClicked}
              />
          }
    </div>
  )
}

export default ProvidersMainPage;
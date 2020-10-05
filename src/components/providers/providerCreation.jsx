import React from 'react';
import Dashboard from '../dashboard/dashboard';
import MainTextField from '../common/inputs/mainTextField';
import ProviderPage from './providerPage';

const ProviderCreation = props => {
    
    return <Dashboard 
          Intro = {() => <MainTextField
            type = "text"
            name = "name"
            color = '#fff'
            value = 'Create New Provider'
            width = '100%'
          />}
          MainComponent = {() => <ProviderPage />}
        />
}
 
export default ProviderCreation;
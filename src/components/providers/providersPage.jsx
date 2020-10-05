import React from 'react';
import './ProviderStyles.scss';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import loadProviders from '../../redux/actions/providerActions';
import Dashboard from '../dashboard/dashboard';
import ProvidersMainPage from './providersMainPage';
import MainTextField from '../common/inputs/mainTextField';
import _ from 'lodash';

export const ProviderContext = React.createContext();

class ProvidersPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.reloadProviders = this.reloadProviders.bind(this);
  }
  componentDidMount(){
    _.isEmpty(this.props.providersList) && this.reloadProviders();
  }
  reloadProviders(){
    this.props.getAndStoreProviders();
  }

  render(){
    return _.isEmpty(this.props.providersList) ? [] : <ProviderContext.Provider
          value = {{
            reloadProviders: this.reloadProviders
          }}>
              <Dashboard 
                Intro = {() => <MainTextField
                  color = '#fff'
                  value = 'Providers Area'
                  width = '100%'
                />}
                MainComponent = {ProvidersMainPage}
              />
          </ProviderContext.Provider>
  }
}
const mapStateToProps = (state) => {
  return {
    providersList: state.providers.providersList
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAndStoreProviders: () => { dispatch(loadProviders()) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProvidersPage));

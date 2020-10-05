import React, {Component} from "react";
import Header from './header/header';
import {withRouter} from 'react-router-dom';
import {AppContextProvider} from './appContext';
import LoadingComponent from './common/loader/loader';
import {getUserTokenInfo} from './common/miniComponents/cookieManage';
import {connect} from 'react-redux';
import {setUserLoggedIn,clearUserDetails} from '../redux/actions/userActions';
import PopupAlert from './common/SystemAlerts/systemAlerts';
import { alertParsing } from './common/SystemAlerts/alertParsing';
import MainSideNav from './common/mainSideNav/mainSideNav';
import Routes from './routes';

import _ from 'lodash';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            activeAlert: false,
            alert:{
                header: 'init header',
                msg : 'initial msg',
                type: 'warning',
                errorsList: null
            },
            isLoading: false
        }
        this.setLoading = this.setLoading.bind(this);
        this.setLoginInfo = this.setLoginInfo.bind(this);
        this.clearCookie = this.clearCookie.bind(this);
        this.onCloseAlert = this.onCloseAlert.bind(this);
        this.openPopupMessage = this.openPopupMessage.bind(this);
        this.setCredentialsForToken = this.setCredentialsForToken.bind(this);
    }

    componentDidMount(){
        _.isEmpty(this.props.loggedInUser) && this.setCredentialsForToken();
    }
    clearCookie(){
        document.cookie = "userToken=;";
        this.props.history.push('/');
        this.props.clearUserDetails();
    }
    setCredentialsForToken(){
        const userToken = getUserTokenInfo();
        if(userToken){
            this.props.storeUserDetails(userToken);
        }
    }
    onCloseAlert(){
        this.setState({activeAlert:false});
    }
    openPopupMessage(data){
        const parsedAlret = alertParsing(data);
        console.log(parsedAlret);
        this.setState({
            alert: parsedAlret,
            activeAlert:true
        },() => {
            if(parsedAlret.redirectToLogin){
                this.props.history.push('/Login');  // if 404/511 error occurred
            }
        });
    }
    setLoading(isLoading = false){
        this.setState({isLoading: isLoading});
    } 
    setLoginInfo(data){
        this.setState({loginDetails:data});
    }

    render() {
        const {alert,activeAlert,isLoading} = this.state;
        const userLoggedIn = !_.isEmpty(this.props.loggedInUser);
        return (
            <div className="AppWrapper">
            {(isLoading || this.props.globalIsLoading) ? <LoadingComponent /> : []}
            <PopupAlert
                header = {alert.header}
                msg = {alert.msg}
                type = {alert.type}
                active = {activeAlert}
                onClose = {this.onCloseAlert}
                errorsList = {alert.errorsList}
            />
            <AppContextProvider value={{
                setLoading: this.setLoading,
                setCredentialsForToken: this.setCredentialsForToken,
                clearCookie: this.clearCookie,
                openPopupMessage: this.openPopupMessage
            }}>
                <Header/>
                <div className="mainWrapper">
                    <MainSideNav />
                    <div className="main">
                        <Routes userLoggedIn={userLoggedIn}/>
                    </div>
                </div>
            </AppContextProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
        globalIsLoading: state.loader.isLoading
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      storeUserDetails: (userDetails) => {dispatch(setUserLoggedIn(userDetails))},
      clearUserDetails: () => {dispatch(clearUserDetails())}
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));
  
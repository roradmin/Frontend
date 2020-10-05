import _ from 'lodash';

const jwtDecode = require('jwt-decode');

export const setCookie = ({label,value,rememberMe}) => {
    let now = new Date();
    const defaultCookieTime = now.getTime() + 2 * 3600 * 1000;
    if(rememberMe){
        // use the token expiration
        const tokenTime = getTimeForToken(value);
        if(tokenTime){
            console.log('token valid until ',tokenTime);
            now.setTime(tokenTime);
        }else{
            // somthing happend, continue without the token expiration
            console.error('somthing happend, continue without the token expiration');
            now.setTime(defaultCookieTime);
        }
    }else{
        now.setTime(defaultCookieTime);
    }
    document.cookie = `${label}=${value};expires=${now.toUTCString()}`;
}
export const clearFromCookie = (label) => {
    if(label) {
        document.cookie = `${label}=;`;
        console.log(label,' deleted from cookie')
    }
}
const getTimeForToken = (token) => {
    const info = getUserTokenInfo(token);
    const tokenExpiration = _.get(info,'exp',null);
    if(tokenExpiration){
        const tokenExpDate = new Date(info.exp * 1000);
        return tokenExpDate;
    }else{
        return null;
    }
}
export const getDataFromCookie = (name) => {
    const value = ";" + document.cookie;
    const parts = value.split(";" + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export const getUserTokenInfo = (token = null) => {
    let tokenRes = null;
    const getToken = token ? token : getDataFromCookie('userToken');
    if(getToken){
        tokenRes = jwtDecode(getToken);
    }
    return tokenRes;
}

export const isTokenStillValid = () => {
    const currentToken = getUserTokenInfo();
    if(currentToken){
        const tokenExpDate = new Date(currentToken.exp * 1000); // refers as seconds instead of millisecond
        const today = new Date();
        const isValid = today.setHours(0,0,0,0) - tokenExpDate.setHours(0,0,0,0) < 0;
        console.log('tokenExpDate = ',tokenExpDate,' valid: ',isValid);
        return isValid;
    }
    return false;
}
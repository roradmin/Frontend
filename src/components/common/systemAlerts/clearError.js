import _ from 'lodash';
import { clearFromCookie } from '../miniComponents/cookieManage';

export const clearError = (err) =>{
    const status = _.get(err,['response','status'],null);
    const errorHeader = _.get(err,['response','data','result'],'Error Occured!');
    const errorDescription = _.get(err,['response','data','data','msg'],err.message || 'Error Occured!');
    const ErrorMsg = status && `${errorHeader} [${status}]` || errorHeader;
    console.log(errorDescription);
    let redirectToLogin = false;
    if (status == 511){
        clearFromCookie('userToken');
        redirectToLogin = true;
    }else if(status == 401){
        console.log('access is not valid');
        redirectToLogin = true;
    }
    return {
        type: 'error',
        header: ErrorMsg,
        redirectToLogin: redirectToLogin,
        msg:  errorDescription
    }
}
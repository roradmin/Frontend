import { clearError } from './clearError';

export const alertParsing = ({
    header = null,
    msg = null,
    type = 'warning',
    errorsList = null,
    err = null
}) => {
        if(err){
            console.error(JSON.stringify(err));
            const beautyErr = clearError(err);
            const newObj = {
                ...beautyErr,
                ...(header ? {header}: {}),  // for custom header/msg (high priority if exists)
                ...(msg ? {msg}: {})
            };
            return newObj;
        }else if(type === 'success'){
            return {
                active: true,
                type: type,
                ...(header? {header}: {header:'success!'}),
                ...(msg? {msg}: {})
            }
        }else if(type === 'customError'){
            return {
                active: true,
                type: 'error',
                ...(header? {header}: {header:'error occured!'}),
                ...(msg? {msg}: {}),
                ...(errorsList? {errorsList} :{})
            }
        }else if(header){
            const newObj = {
                active: true,
                type: type,
                ...(header? {header}: {}),
                ...(msg? {msg}: {}),
                ...(errorsList ? {errorsList} :{})
            };
            return newObj;
        }else{
            alert('handle alert parse');
        }
    }

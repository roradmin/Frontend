
import _ from 'lodash';

export const inputIsValid = ({value,required,formKey}) => {
    console.log({value,formKey,required});
    switch(formKey?.toLowerCase()){
        case 'email':
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        case 'whatsapp':
        case 'message':
        case 'number': 

            //return /^(\d)*$/.test(value); //int
            return /^\d*\.?\d*$/.test(value); // decimal
        case 'discount':
            return /^([0-9]?|[1-9]{1}[0-9]{1}|100)$/.test(value);   // 0-100 number
        case 'string':
            return /[a-zA-Z0-9]/g.test(value);;
        default:
            return required ? !_.isEmpty(value): true;
    }
}
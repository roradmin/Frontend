import _ from 'lodash';
import { inputIsValid } from '../../common/inputs/inputValidation';

export const checkProviderFields = ({
    provider
}) => {
    const fields = Object.keys(provider).map(key => {
        const {isValid,reason} = checkFieldValidation({fieldName:key,fieldValue:provider?.[key]});
        return{
            key: key,
            value: provider?.[key],
            isValid,
            reason
            }
    });
    console.log('fields ',fields);
    return fields;
}
const checkFieldValidation = ({fieldName,fieldValue}) => {
   switch(fieldName){
        case 'avatar':
        case 'providerExternalId':
        case 'restaurantIdentifier':
        case 'isActive':
            return {isValid: true};
        case 'contacts':
            let txt = '';
            console.log(fieldName,fieldValue);
            if (_.isEmpty(fieldValue)){
                return {isValid: true,reason: 'Contact info cannot be empty'}
            }
            const findErrors = fieldValue.find(
                contact => {
                    if(contact.contactType?.toLowerCase() == 'email'){
                        txt = 'Invalid contact email'
                        return !inputIsValid({value:contact.contactValue ,required: true,formKey:'email'});
                    }else{
                        txt = 'Invalid contact number'
                        return !inputIsValid({value: contact.contactValue,required: true,formKey:'number'});
                    }
                });
            return {isValid: findErrors ? false : true,reason: txt}
        case 'discount':
        case 'minimumPerOrder':
            const validField = inputIsValid({value: fieldValue,required: true,formKey:'number'});
            return {isValid: validField,reason: 'Minimum amount per order cannot be empty'};
        case 'name':
            const valid = inputIsValid({value: fieldValue,required: true,formKey:'string'});
            return {isValid: valid,reason: 'Provider name cannot be empty'};
        case 'schedule': 
            const findEmptyOrder = fieldValue.find(fi => _.isEmpty(fi.orderWeekDay) || _.isEmpty(fi.orderHour));
            const findEmptyDelivery = fieldValue.find(fi => _.isEmpty(fi.deliveryWeekDay) || _.isEmpty(fi.deliveryHour));
            return {
                isValid: (findEmptyOrder || findEmptyDelivery) ? true : false,
                reason: `${findEmptyOrder ? 'Order' : 'Delivery'} day cannot be empty`
            }
        default:
            return {
                isValid: true,
                reason: ''
            }
    }
}

const ProviderBase = ({
    restaurantIdentifier = '',
    providerExternalId = null,
    minimumPerOrder = 0,
    isActive = true,
    name = "",
    avatar = null,
    discount = 0,
    activeContact = null,
    contacts = [],
    schedule = [emptySchedule],
}) => ({
    avatar,
    name,
    contacts,
    schedule,
    activeContact,
    minimumPerOrder,
    providerExternalId,
    discount,
    restaurantIdentifier,
    isActive
});


export const emptyContact = {
    contactType: "email",
    contactValue: "",
    contactId: null,
    activeContact: false,
    contactUiId: null,
};
export const emptySchedule = {
    orderWeekDay: 0,
    orderHour: '14:00',
    deliveryWeekDay: 1,
    deliveryHour: '16:00'
};

export default ProviderBase;
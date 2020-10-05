import initialState from './initialState';
 
const BasicConfigurationReducer = (state = initialState.basicConfiguration,action) => {
    switch(action.type){
        case 'SET_LANGUAGE':
            return { 
                ...state,
                language: action.data
            }
        case 'SET_CURRENCY':
            return { 
                  ...state,
                  currency: setCurrency(action.data)
        }
        default:
            return state;
    }
}
const setCurrency = (curr) => {
    switch (curr){
        case 'ils':
            return {
                currencyName: 'Shekel',
                currencyLabel: 'ILS',
                sign: '₪'
            }
        case 'dollar':
            return {
                currencyName: 'Dollar',
                currencyLabel: 'USD',
                sign: '$'
            }
    }
}
export default BasicConfigurationReducer;
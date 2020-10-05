

import initialState from './initialState';
// reducer must be pure - > witout side effects
// store(reducers - pure func) => dispatch(action - plain obj) => reducer => new state
// redux -> store dispatch actions reducers
// react-redux -> provider (make the store accessible for all tree) &
//                connect - to get the store's data
// connect as high order component wrap the component itself
//      and gives you the option to use the library components (mapstate,dispatch)
// with apply middleware you can dispatch a function - can be async: then(res => dispatch data)
// every action each provider got called and the relevant response

const ProvidersReducer = (state = initialState.providersList,action) => {
    switch(action.type){
        case 'SET_PROVIDERS_LIST':
            return { 
                ...state,
                providersList: action.data
            }
        case 'ADD_PROVIDER_TO_LIST':
            return { 
                ...state,
                providersList: state.providersList.concat(action.data)
            }
        default:
            return state;
    }
}

export default ProvidersReducer;
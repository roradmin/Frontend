

import initialState from './initialState';

const LoadingReducer = (state = initialState.isLoading,action) => {
    switch(action.type){
        case 'SET_LOADING':
            return { 
                ...state,
                isLoading: action.data
            }
        default:
            return state;
    }
}

export default LoadingReducer;
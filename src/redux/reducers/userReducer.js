

import initialState from './initialState';


const UserReducer = (state = initialState.loggedInUser,action) => {
    switch(action.type){
        case 'SET_LOGGEDIN_USER':
            return { 
                ...state,
                loggedInUser: action.data
            }
        case 'CLEAR_USER_DETAILS':
            return {
                ...state,
                loggedInUser: {}            
            }
        default:
            return state;
    }
}

export default UserReducer;
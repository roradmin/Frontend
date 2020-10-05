import initialState from './initialState';
 
const CurrentPathReducer = (state = initialState.currentPath,action) => {
    switch(action.type){
        case 'SET_CURRENTPATH':
            return { 
                ...state,
                currentPath: action.data
            }
        default:
            return state;
    }
}
export default CurrentPathReducer;
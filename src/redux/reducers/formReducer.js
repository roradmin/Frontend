import produce from "immer"; // takes the current state and gives a change a copy after the changes it  produce the real immutable state
import invariant from "invariant"; //A way to provide descriptive errors in development but generic errors in production
import _ from 'lodash';
export const ADD_FORM = "ADD_FORM";
export const CHANGE_FORM_VALUE = "CHANGE_FORM_VALUE";
export const REMOVE_FORM = "REMOVE_FORM";

export const addForm = ({ key, initialState }) => ({
  type: ADD_FORM,
  payload: { key, initialState }
});
export const changeFormValue = ({
  key,    
  name,
  value,
  path,
  nestedKey,
  multiValuesIndex        
}) => ({
  type: CHANGE_FORM_VALUE,
  payload: {key, name, value,path,nestedKey,multiValuesIndex}
});
export const removeForm = ({ key }) => ({
  type: REMOVE_FORM,
  payload: { key }
});
export const initialFormsState = {};

export const formsReducer = produce((draft, action) => { // draft = current state
  switch (action.type) {
    case ADD_FORM: {
      const {key, initialState} = action.payload;
      draft[key] = initialState;
      break;
    }
    case CHANGE_FORM_VALUE: {
      const {key, name, value,nestedKey,multiValuesIndex,path} = action.payload;
      // if nestedKey = nested value of parent, multiValues = array of objects
      invariant(!!draft[key], `No such form : '${key}'`);
      // example - invariant(true value, 'This will not throw'); // depends on NODE_ENV
      // invariant(someFalseyVal, 'This will throw an error with this message');
      invariant(
        Object.keys(draft[key]).includes(name),
        `'${key}' form does not initially contain '${name}' key! Have you forgot to add it ?`
      );
      if(path){
        _.set(draft[key][name][multiValuesIndex],path,value);
      }else{
        if(nestedKey && Number.isInteger(multiValuesIndex)) _.set(draft,[key,name[multiValuesIndex],nestedKey],value);//;draft[key][name][multiValuesIndex][nestedKey] = value;
        else if (nestedKey) _.set(draft,[key,name,nestedKey],value);
        else _.set(draft,[key,name],value);
      }
      break;
    }
    case REMOVE_FORM: {
      const { key } = action.payload;
      delete draft[key];
      break;
    }
    default: return;
  }
}, initialFormsState);


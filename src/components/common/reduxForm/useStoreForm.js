import {useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import invariant from "invariant";
import { changeFormValue,removeForm } from '../../../redux/reducers/formReducer';

const useStoreForm = (key = '', submitCb) => {
 const values = useSelector(state => state.forms[key]);
  invariant(
    values,
    `Unable to find '${key}' form. You should dispatch 'PROVIDER_FORM' action IN A PARENT CONTAINER before interacting with a form (to increase perfs)`
  );

  const dispatch = useDispatch();
  const handleChange = ({
    name,
    value,
    path = null,
    nestedKey = null,           // if nestedKey -> need to update nested value
    multiValuesIndex = null     // if multiValuesIndex -> update element idx isnide an array
  }) => {
    dispatch(changeFormValue({ key, name, value ,path,nestedKey ,multiValuesIndex}));
  };
  const handleSubmit = e => {
    e && e.preventDefault && e.preventDefault();
    submitCb({ ...values });
  };

  return {
    values,
    handleChange: useCallback(handleChange, []),
    handleSubmit
  };
}

export default useStoreForm;
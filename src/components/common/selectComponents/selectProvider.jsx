import React,{useState,useEffect,useContext} from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import loadProviders from '../../../redux/actions/providerActions';
import _ from 'lodash';
import './selects.scss';

const SelectProvider = ({setSelectedProvider}) => {    
    const providersList = useSelector(state => state.providers.providersList);
    const [providersOptions,setProvidersOptions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        _.isEmpty(providersList) && dispatch(loadProviders())
    },[]);

    useEffect(() => {
        if(!_.isEmpty(providersList)){
            const providers = providersList.map(pr => ({label:pr.name,value:pr.id}));
            setProvidersOptions(providers);
        }
    },[providersList]);
    const styles = {
        control: base => ({
          ...base,
          fontSize: 'calc(12px + 0.4vw)'
        }),
        menu: base => ({
          ...base,
          fontSize: 'calc(12px + 0.4vw)'
        })
      };
    return <div className="selectProvidersWrapper"><Select
        onChange={(val) => setSelectedProvider(val)}
        options={providersOptions}
        styles={styles}
        placeholder = 'Select Provider...'
    /></div>
}

export default SelectProvider;
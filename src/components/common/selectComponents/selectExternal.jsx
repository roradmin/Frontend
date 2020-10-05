import React from 'react';
import _ from 'lodash';
import {selectCustomStyles} from './selectPinkConf';
import AsyncCreatableSelect from 'react-select/async-creatable';

const SelectExternal = ({onSelect,ApiCall,placeHolder = 'Insert Name'}) => {
    const handleDataFilter = async(val) => {
        if(val.length <= 1) return [];
        const data = await ApiCall(val).catch(err => console.error(err));
        const dataResponse = _.get(data,['data','data'],[]);
        if(!_.isEmpty(dataResponse)){
            const options = dataResponse
                .sort((a, b) => (a.counter < b.counter) ? 1 : -1)
                .map(op => ({value: op, label: op.name}))
                .slice(0, 5);       // get top 5 selections
            console.log('options ',options);
            return options;
        }
    }
          return (
            <AsyncCreatableSelect
                cacheOptions
                loadOptions={(val) => handleDataFilter(val)}
                placeholder = {placeHolder}
                isClearable
                styles = {selectCustomStyles}
                onChange = {onSelect}
            />
          );

}
 
export default SelectExternal;


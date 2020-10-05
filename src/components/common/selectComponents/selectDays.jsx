import Select from 'react-select';
import React,{useState} from 'react';

export const selectCustomStyles = {
  control: styles => ({
    ...styles,
    flexWrap: 'nowrap',
    maxHeight: '30px',
    border: '0',
    boxShadow: 'none',
    minHeight: 'unset',
    maxWidth: '350px',
    backgroundColor: 'rgb(10,40,53,0.7)',
    fontSize: '.8rem'

   }),
   singleValue: (provided, state) => ({
    ...provided,
    color: '#fff',
    fontSize: '.8rem'
   }),
   menuList: (provided, state) => ({
     ...provided,
     maxHeight: '125px',
     fontSize: '.8rem',
     overflow:'auto'
   }),
   menu: base => ({
     ...base, 
     color: '#fff',
     backgroundColor: 'rgb(10,40,53,0.7)',
     fontSize: '.8rem'

   }),
   option: (styles, {data, isDisabled, isFocused, isSelected}) => ({
       ...styles,
       backgroundColor: isFocused ? 'rgb(10,40,53,0.95)':'rgb(10,40,53,0.4)',
       color: isSelected ? 'yellow' : '#fff',
     })
};
const SelectDays = ({currentVal,setDays}) => {
const {value,type} = currentVal;
const [currentValue,setCurrentValue] = useState({value,label:value});

    return <Select 
        defaultValue = {daysOptions.find(c => c.value === parseInt(currentValue.value))}
        styles = {selectCustomStyles}
        onChange = {(val) => {
            setCurrentValue(val);
            setDays(type,val.value);
          }
        }
        options = {daysOptions}
      />
}

const daysOptions = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
];
export const getLabelDay = (dayIndex) => daysOptions[dayIndex]?.label;

export default SelectDays;
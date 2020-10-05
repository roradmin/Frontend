import React from "react";
import SelectDays from '../selectComponents/selectDays';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import styled from "styled-components";
import SwitchInput from '../miniComponents/switchBox';
import BasicLabelInput,{Label} from '../inputs/basicLabelInput';
import '../reduxForm/form.scss';
import 'rc-time-picker/assets/index.css';

const areEqual = (prev, next) => 
  prev.value === next.value &&
  prev.name === next.name &&
  prev.onChange === next.onChange &&
  prev.error === next.error;

const BasicInput = ({name, value, onChange}) => (
  <input
    name={name}
    className="basicInput inputOnly"
    value={value}
    onChange={onChange}
    placeholder= {'Insert '+ name}
  />
);

const BasicLabelInputSelect = ({
  name,
  value,
  isValid,
  type,
  onChange,
  label = this.name,
  placeholder = 'Insert '+ this.name + '...',
  SelectComponent
}) => (
  <div className="labelInputSelect">
    <BasicLabelInput 
      name={name}
      value={value}
      isValid = {isValid}
      checked = {value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {SelectComponent}
  </div>
);
const BasicLabelSelect = ({label,SelectComponent}) => (
  <div className="labelSelect">
  <label>{label}</label>
    {SelectComponent}
  </div>
)

export const SelectDaysMemo = React.memo(
  ({type,value,handleChange,label = type,customStyle}) =>
  (
    <div className = "dayPicker">
    <Label>{label}</Label>
    {type && value && <SelectDays
      currentVal = {{type:type,value:value.orderWeekDay}}
      setDays = {(type,value) => handleChange({name: 'schedule',value: value,path:[type,'orderWeekDay']})}
      customStyle = {customStyle}
      />}
    <TimePickerStyled
      defaultValue = {moment(value.orderHour,"HH:mm")}
      showSecond = {false}
      minuteStep = {15}
      format={'HH:mm'}
      allowEmpty = {false}
      onChange = {(val) => handleChange({name: 'schedule',value: moment(val).format('HH:mm'),path:[type,'orderHour']})}
    />
    </div>
  ),areEqual);

const TimePickerStyled = styled(TimePicker)`
  .rc-time-picker-input{
    background-color: rgb(10,40,53,0.7);
    color: #fff;
    font-family: inherit;
    text-align: center;
    border: 0;
    box-shadow: 0 2px 3px 0px #0a2835;
  }
  .rc-time-picker-panel-inner{
    background-color: rgb(10,40,53,0.7);

  }
`;


export const Input = React.memo(props => <BasicInput {...props} />, areEqual);
export const LabelSelect = React.memo(props => <BasicLabelSelect {...props} />, areEqual);
export const LabelInputSelect = React.memo(props => <BasicLabelInputSelect {...props} />, areEqual);
export const Switch = React.memo(props => <SwitchInput {...props} />,areEqual);
export const InputLabel = React.memo(props => <BasicLabelInput {...props}/>,areEqual);
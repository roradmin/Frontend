import React,{useEffect,useState} from 'react';
import styled from "styled-components";
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import {inputIsValid} from './inputValidation';
import { useDebounce } from '../../customHooks/useDebounce';

const BasicInputLabel = ({
  name,
  value,
  onChange,
  BGcolor = null,
  type,    //->> key for validation}
  label = name,
  inputStyle,
  width,
  errorTxt = null,   
  required = true,
  symbol = null,
  ThrdComponent = null,
  tooltip = '',
  placeholder = 'Insert '+ name + '...'
}) => {
  const [isValid,setIsValid] = useState(true);
  const debouncedSearchTerm = useDebounce(value, 500);
  const [isFirstRender,setFirstRender] = useState(true);

  useEffect(
  () => {
    //console.log('debouncedSearchTerm: ' ,debouncedSearchTerm,',isFirstRender: ',isFirstRender,' type: ',type);
    if((!_.isEmpty(debouncedSearchTerm) || !isFirstRender) && type){
      const getValidation = inputIsValid({value,required,formKey: type});
      console.log('getValidation: ',getValidation);
      setIsValid(
        getValidation
      );
      isFirstRender && setFirstRender(false);
    }
  }, [type,debouncedSearchTerm]);

    return <LblInptStyled
      className = "labelInput" 
      Length = {value?.length || 0}
      BGcolor = {BGcolor}
      label = {label}
      errorTxt = {errorTxt}
      data-tip = {tooltip}
      isValid = {isFirstRender || isValid}
      thrdComponent={ThrdComponent}
    >
      {label && <Label>{label}</Label>}
      <StyledInput
          name = {name}
          width = {width}
          Length = {value?.length || 0}
          type={type?.toLowerCase()}
          className = "basicInput"
          value = {value}
          inputStyle = {inputStyle}
          required = {required}
          checked = {value}
          onChange = {({target:{name,value}}) =>  onChange({name,value})}
          placeholder = {placeholder}
        />
        {ThrdComponent && <ThrdComponent/>}
        {symbol && <span className='symbol'>{symbol}</span>}

</LblInptStyled>
};
export const FormTooltip = ({
  place = "right",
  delayHide = 1000,
  bgcolor = "#0a2835",
}) => {
  const ToolTip = styled(ReactTooltip)`
    max-width:200px;
    background-color: ${bgcolor} !important;
    border-right-color: #0a2835 !important;
    box-sizing: content-box !important;
    padding: 8px 21px !important;
    &:after{
      border-bottom-color: ${bgcolor} !important;
    }
`;
    return <ToolTip
      place={place}
      effect="solid"
      delayHide={delayHide}
  />
}
  const LblInptStyled = styled.div`
      font-size: 1em;
      border: 1pt solid #ccc;
      font-variant-caps: all-petite-caps;
      border-radius: 5px;
      max-width: 420px;
      min-height: 30px;
      align-items: center;
      justify-content: space-between;
      display: ${props => props.label ? 'grid' : 'block'};
      border: ${props => !props.isValid ? '2pt solid #ff3333' : 'none'};
      background-color: ${props => props.BGcolor || '#9E9E9E'};
      animation: .6s ${props => !props.isValid ? 'onErrorBorder' : 'none'};
      grid-template-columns: ${props => props.thrdComponent ? '1fr 1fr 1fr' : '1fr 1fr'};
      box-sizing: border-box;
      position: relative;
      transition: .6s all;

      @keyframes onErrorBorder {
        from {border: 0;}
        to {border: 1px solid rgba(255, 16, 16, 0.53);}
      }
      &:hover{
        border: 0;
        transition: .6s all;

        &::after{
          content: '${props => !props.isValid ? props.errorTxt : ''}';
          display: ${props => (!props.isValid && !_.isEmpty(props.errorTxt)) ? 'inline-block' : 'none'};
          position: absolute;
          left: 0;
          width: 100%;
          max-width: 240px;
          border-radius: 4px;
          padding: 2pt 7pt 2pt 3pt;
          z-index: 99;
          box-sizing: border-box;
          background-color: rgba(255, 16, 16, 0.53);
          border: 1pt solid #fff;
          color: #fff;
          animation: reveal .6s forwards;  
          @keyframes reveal {
              from {clip-path: inset(0 100% 0 0);}
              to {clip-path: inset(0 0 0 0);}
            }
        }
      }
      .symbol{
        height: 100%;
        font-size: 17pt;
        position: absolute;
        right: 1pt;
        height: 35px;
        color: #fff;
      }
      // hide number arrowa
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }
      //
      input{
        letter-spacing: ${props => (props.Length < 10 ? props.Length * 0.2 : 0)}pt;
      }
  `;
  export const Label = styled.label`
        color: #fff;
        font-variant-caps: titling-caps;
        font-size: 0.7em;
        margin: 0 4% 0 4%;
        font-family: 'Montserrat',sans-serif;
  `;
  const StyledInput = styled.input`
        color: #eee;
        background-color: rgb(10, 40, 53,0.4);
        width: ${props => _.get(props,['inputStyle','width'],'auto')};
        text-align: ${props => _.get(props,['inputStyle','textAlign'],'left')};
        font-family: 'Montserrat',sans-serif;
        border: 0;
        transition: box-shadow .7s;
        &:active,&:focus{
       //   box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.75);
        }
        &::placeholder {
          color: #fff;
          opacity: 0.5;
          font-size: 10pt;
        }
  `;
  export default BasicInputLabel;
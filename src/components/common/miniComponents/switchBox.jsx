import React from 'react';
import styled from "styled-components";

const SwitchInput = ({
    name,
    label,
    value,
    onChange,
    tooltip = '',
    width = 60
    }) => (
    <CheckBoxWrapper width={width} data-tip = {value ? '' : tooltip}>
      <label className={"statusActive_"+value}>
        {`${label} is ${value ? 'Active' : 'Disabled'}`}
      </label>
      <>
        <input id="checkbox" checked = {value} type="checkbox" onChange={() => onChange(name,!value)}/>
        <label className='checkboxlbl' htmlFor="checkbox" />
      </>
    </CheckBoxWrapper>
    );

const CheckBoxWrapper = styled.div`
  background: #9E9E9E;
  border-radius: 3px;
  border: 1pt solid #ccc;
  padding: 1%;
  position: relative;
  color:#fff;
  align-items: center;
  justify-content: space-evenly;
  display: grid;
  max-height: 100px;
  grid-template-columns: 50% 50%;
  font-size: 0.7em;
  input{
    display: none;
    &:checked + *{
      background: #189949;
      &::after {
        content: "";
        display: block;
        background: #fff;
        margin-left: ${props => props.width - 12}px;
        transition: 0.2s;
      }
    }
  }
  .checkboxlbl{
    border: 1px solid #0a2835;
    box-shadow: 0px 0px 2px 0px rgb(0, 0, 0);
    border-radius: 12px;
    justify-self: center;
    width:  ${props => props.width}px;
    height: 14px;
    background: #808080;
    cursor: pointer;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px; 
      height: 12px;
      background: #cb0025;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
      transition: 0.2s;
    }
  }
  .statusActive{
      color: #fff;
      font-weight: bold;
  }
`;

export default SwitchInput;
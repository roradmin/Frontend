import React from 'react';
import styled from 'styled-components';

const LoadingButton = props => {
  const height = props.height || 35;
  return (
    <LoadingBTN
        onClick = {() => !props.isLoading ? props.onClick() : null}
        bgColor = {props.bgColor || '#a6265f'}
        textColor = {props.textColor || '#fff'}
        height = {height + 'px'}
        maxHeight = {props.maxHeight || '160px'}
        disabled = {props.disabled || false}
        margin = {props.margin || 'none'}
        fontSize = {props.fontSize || '10pt'}
        type = {props.type || 'button'}
        minWidth = {props.minWidth || '110px'}
        backgroundHover = {props.backgroundHover || '#710f3a'}
    >
    {props.isLoading ? <Loader size = {height}/> : props.btnText || 'button'}
    </LoadingBTN>
  )
}

const LoadingBTN = styled.button`
    background-color: ${props => props.bgColor};
    color: ${props => props.textColor};
    height: ${props => props.height};
    max-width: ${props => props.maxHeight};
    min-width:  ${props => props.minWidth};
    background-color: ${props => props.disabled ? "#ccc" : props.background};
    box-shadow: 1px 2px 3px 0 rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12);
    letter-spacing: .5px;
    border: none;
    border-radius: 2px;
    align-self: ${props => props.alignSelf};
    margin: ${props => props.margin};
    display: inline-block;
    font-size: ${props => props.fontSize};
    line-height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    vertical-align: middle;
    font-family: 'Montserrat', sans-serif;
    justify-self: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    outline: none !important;
    &:hover{
        background-color: ${props => props.backgroundHover};
        transition: 0.4s all;
    }
`;

const Loader = styled.div`
    display: inline-block;
  &:after {
    content: " ";
    display: block;
    width: ${props => props.size - 7}px;
    height: ${props => props.size - 7}px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default LoadingButton;

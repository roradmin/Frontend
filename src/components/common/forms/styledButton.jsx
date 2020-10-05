import styled from 'styled-components'
import React from 'react';

export const SimpleBtn = styled.button`
    background-color: #a6265f;
    color: #fff;
    height: 35px;
    max-width: 160px;
    align-self: center;
    position: absolute;
    letter-spacing: .5px;
    right: 0;
    box-shadow: 1px 2px 3px 0 rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12);
    font-family: 'Montserrat', sans-serif;
    &:hover{
        background-color: #8a1046;
    }
`;
const StyledBtn = styled.button`
    position: ${props => props.position};
    bottom: ${props => props.bottom};
    right: ${props => props.right};
    left: ${props => props.left};
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${props => props.disabled ? "#ccc" : props.background};
    min-width:  ${props => props.minWidth || '105px'};
    box-shadow: 1px 2px 3px 0 rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12);
    letter-spacing: .5px;
    border: none;
    border-radius: 2px;
    align-self: ${props => props.alignSelf};
    margin: ${props => props.margin || 'none'};
    display: inline-block;
    font-size: ${props => props.fontSize || '10pt'};
    line-height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    vertical-align: middle;
    font-family: 'Montserrat', sans-serif;
    color: ${props => props.color};
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
    i,label{
        cursor: pointer;
    }
    svg{
        margin-left:2%;
    }`;
export const StyledButton = ({
    height = '35px',
    width = 'auto',
    background = '#9E9E9E',
    color = '#fff',
    backgroundHover = '#8a1046',
    minWidth = '5vw',
    type = 'button',
    Icon = null,
    title = Icon ? null : 'Click Here',
    valid = true,
    disabled = false,
    fontSize = null,
    alignSelf = 'center',
    position = 'relative',
    margin = null,
    bottom = '0',
    left,
    right = '0',
    onClick
}) => (
<StyledBtn
    type = {type}
    width = {width}
    alignSelf = {alignSelf}
    background = {valid ? background : '#9f9797'}
    backgroundHover = {valid ? backgroundHover : '#9f9797'}
    color = {color}
    height = {height}
    onClick = {onClick}
    fontSize = {fontSize}
    right = {right}
    disabled = {disabled}
    position = {position}
    margin = {margin}
    //bottom = {bottom}
    left = {left}
>
        {title && title}
        {Icon && <Icon/>}
</StyledBtn>)   
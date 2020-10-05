import React from 'react';
import styled from 'styled-components';

const MainTextField = ({
    value,
    onChange = null,
    type = "text",
    label,
    name = '',
    color = '#eee',
    fontSize = '3rem',
    width = 'auto',
    textAnimation = true,
    lang = 'en',
    tooltip
}) => {
    return React.useMemo(() => <StyledTextField
            label={label}
            color={color}
            textAnimation={textAnimation}
            fontSize={fontSize}
            lang = {lang}
            width={width}
        >
        {
            onChange ? <input
                type = {type}
                name = {name}
                data-tip = {tooltip}
                placeholder = "Name"
                value = {value}
                onChange = {(e) => onChange && onChange(e)}
                readOnly = {onChange}
                required
            />:<span>{value}</span>
        }

  </StyledTextField>,[value]);
  }
  const StyledTextField = styled.div`
    grid-area: name;
    width: ${props => props.width};
    
    &:before{
        content: '${props => props.label ? props.label : ''}';
    }
    input,span{
        background-color: transparent;
        user-select:none;
        max-width:100%;
        border: 0;
        color: ${props => props.color};
        font-weight: 800;
        font-variant: petite-caps;
        text-align: center;
        border-bottom: ${props => props.onChange ? '2px solid #0a2835' : ''};
        font-weight: bolder;
        font-size: ${props => props.fontSize};
        letter-spacing: -2px;
       // animation: ${props => props.textAnimation ? 'expendText' : 'none'} 1.1s;
        font-family: ${props => props.lang == 'en' ? 'Merriweather' : 'Rubik'};
        -ms-letter-spacing: -2px;
        letter-spacing: 5px;
        text-shadow: #000 0px 1px 3px;
        @keyframes expendText {
            from {letter-spacing: -20px;}
            to {letter-spacing: 5px;}
        }
    }
  `;
 
export default MainTextField;
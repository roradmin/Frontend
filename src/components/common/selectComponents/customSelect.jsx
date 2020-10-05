import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import styled from 'styled-components';

export const CustomSelect = (props) => {
    const customStyles = {
        container: (base,state) => ({
            ...base,
            display: 'grid',
            alignItems: 'center',
            backgroundColor: '#333',
            height: '35px'
        }),
        control: (base,state) => ({
            ...base,
            border: state.isFocused ? 0 : 0,
            maxWidth: '230px',
            minWidth: '150px',
            height: '35px',
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
               border: state.isFocused ? 0 : 0
            },
            background: 'rgba(255,255,255,0.6)'
        })
    }
    return <SelectWrapper><Select
          styles = {customStyles}
          options = {props.options || []}
          defaultValue = {props.currentValue}
          onChange = {(selected) => props.onChange(selected)}
    /></SelectWrapper>
}

const SelectWrapper = styled.div`
    height: 100%;
    background: #333;
    padding: 1%;
`;


  
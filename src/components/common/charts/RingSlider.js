import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../customHooks/useDebounce';

const RingSlider = ({
    currentVal = 10,
    label = 'Minimum Amount',
    onChange,
    min = 1,
    max = 100,
    tooltip,
    Child = null
}) => {
    const [currentValue, setCurrentValue] = useState(currentVal);
    const debouncedSearchTerm = useDebounce(currentValue, 500);

    useEffect(() => {
        onChange(currentValue);
    }, [debouncedSearchTerm]);

    return <StyledComponent>
        <div className='mainValue' data-tip={tooltip}>
            {label && <label>{label}</label>}
            {
                Child && <Child />
            }
            <span>{currentValue}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={currentValue}
            className="slider"
            onChange={({ target }) => setCurrentValue(target.value)}
        />
    </StyledComponent>
}

const StyledComponent = styled.div`
    *{
        user-select: none;
    }
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    background: rgba(188, 188, 188, 0.92);
    max-width: 300px;
    label{

    }
    p{
        font-size: 9pt;
    }
    .mainValue{
        display: grid;
        height: 100%;
    }
    .slider {
        display: block;
        appearance: none;
        transform: rotate(-90deg);
        cursor: pointer;
        
        &:focus {
            outline: none;
        }
        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 20px;
            background: #333;
        }
        &::-webkit-slider-thumb{
            position: relative;
            appearance: none;
            height: 30px;
            width: 30px;
            background: green;
            border-radius: 100%;
            border: 0;
            top: 50%;
            margin-top: (-30px/2);
            box-shadow: webkit-slider-thumb-shadow();
            transition: background-color 150ms;
        }

        &:hover,&:focus {
            &::-webkit-slider-thumb {
                background-color: yellow;
            }
            &::-moz-range-thumb {
                background-color: yellow;
            }
            &::-ms-thumb {
                background-color: yellow;
            }
        }
    }

`;
;
export default RingSlider;
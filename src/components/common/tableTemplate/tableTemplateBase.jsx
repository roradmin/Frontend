import React from 'react';
import styled from 'styled-components';

const TableTemplateBase = ({
    seats,
    tableLabel,
    cstmStyle,
}) => {
  const Rectangle = styled.div`
    width: ${cstmStyle.width || '120px'};
    height: ${cstmStyle.height || '80px'};
    background-color: ${cstmStyle.backgroundColor};
    background-image: url('/public/images/tableBrown.png');
    background-color: rgb(55, 28, 3);
    align-self: center;
    grid-area: middle;
    justify-self: center;
    color: #fff;
    margin: ${cstmStyle.margin || 'unset'}
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    border: 1.4px solid #fff;
    max-height: ${cstmStyle.maxHeight || '20vh'};
    max-width: ${cstmStyle.maxWidth || '20vw'};
    min-height: ${cstmStyle.minHeight || 'none'};
    min-width: ${cstmStyle.minWidth || 'none'};
    box-shadow: 3px 2px 5px 0px rgba(255, 255, 255, 0.2),
                1px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    }
    &:after{
        content: '${tableLabel}';
        position: absolute;
        text-align: center;
        font-size: 2rem;//calc(20px + 1.2vw);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        color: #d5ba5e;
        display: grid;
        align-items: center;
    }
`;
const getInputChildrens = (howMuch,side) => {
    const elementsArray = [];
    for(let i=0; i < howMuch; i++){
        elementsArray.push(<div key={'dot'+side+i} className="dot"></div>)
    }
    return elementsArray;
}
  return <Rectangle>
            {
                Object.keys(seats).map(t => (
                    <span
                        className={t + ' markChild'}
                        key={t}
                        data-title={seats[t]}
                    >
                        {getInputChildrens(seats[t],t)}
                    </span>
                ))
            }
     </Rectangle>
}
 
export default TableTemplateBase;
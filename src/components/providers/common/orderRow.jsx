import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { SelectDaysMemo } from '../../common/forms/inputsHandling';

const OrderRow = ({
    arrayOfOrders,
    handleChange
}) => {
  const addOrderToRow = () => {
    if(arrayOfOrders.length < 3){
      handleChange({
        name:'schedule',
        value: [...arrayOfOrders,arrayOfOrders[arrayOfOrders.length-1]],
      });
    }
} 
const removeFromRow = (id) => {
  if(arrayOfOrders.length == 1){
      alert('Cannot delete the last delivery option');
  }else{
      handleChange({
          name: 'schedule',
          value: arrayOfOrders.filter(cont => cont.id !== id),
      });
  }
}
  return React.useMemo(() => _.isEmpty(arrayOfOrders) ? [] : <Wrapper><RowWrapper id="basicScroller">
          {
            arrayOfOrders.map((_order,idx) => (
              <span className="daysRow" key = {_order.orderWeekDay + _order.orderHour}>
                <SelectDaysMemo
                  type = 'orderDay'
                  label = 'Order Day'
                  value = {_order}
                  handleChange = {(props) => handleChange({
                    ...props,
                    multiValuesIndex: idx
                  })}
                  
                />
                <SelectDaysMemo
                  type = 'deliveryDay'
                  label = 'Delivery Day'
                  value = {_order}
                  handleChange={(props) => handleChange({
                    ...props,
                    multiValuesIndex: idx
                  })}
                />
                <div className='delete' onClick={() => removeFromRow(_order.id)}>x</div>
              </span>
          ))
          }
    </RowWrapper>
    <Add onClick = {addOrderToRow}>+</Add>
    </Wrapper>
  ,[arrayOfOrders]);
}
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr 1fr;
`;
const RowWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    max-width: 56vw;
    padding-left: 1%;
    align-items: center;
    align-items: center;
    overflow-y: visible;
        .dayPicker{
            display: flex;
            flex-direction: column;
            padding: 2%;
        >*{
            margin: 1%;
        }
    }
    .daysRow{
        max-height: 100px;
        display: flex;
        background-color: aliceblue;
        border-radius: 4px;
        background-color: rgba(255,255,255,0.3);
        animation: .7s fadeInDown;
        max-width: 350px;
        margin-right: 2%;
        min-width: 300px;
        box-shadow: 1px 2px 1px 0px rgba(0,0,0,0.75);
        transition: all .5s;
        &:hover{
          transform: scale(1.03);
        }
    }
`;

const Add = styled.div`
    width: 30px;
    font-size: 27pt;
    font-weight: bold;
    font-family: fantasy;
    background-color: transparent;
    align-self: center;
    height: 30px;
    display: flex;
    align-items: center;
    color: #fff;
    opacity: 0.6;
    margin: 0 auto;
    justify-content: center;
    transition: .7s all;
    cursor:pointer;
    background-color: #333;
    border-radius: 3px;
    &:hover{
        opacity: 1;
    }
`;
export default OrderRow;
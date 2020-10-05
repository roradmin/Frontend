import React from 'react';
import styled from 'styled-components';
import { getLabelDay } from '../../common/selectComponents/selectDays';

const defaultAvatar = require('../../../../src/images/avatar2.png');

const ItemDetails = ({ currentItem, type }) => {
    return React.useMemo(
        () => <StyledDetails id="basicScroller">
            {
                currentItem ? <>
                    <img
                        src={currentItem.avatar || require('../../../../src/images/avatar2.png')}
                        onError={(e) => e.target.src = defaultAvatar}
                    />
                    {type == 'provider' && <ProviderFrom currentItem={currentItem} />}
                    {type == 'ingredient' && <IngredientFrom currentItem={currentItem} />}
                </> : []
            }
        </StyledDetails>, [currentItem]);
}
const IngredientFrom = ({ currentItem }) => <>
    <span>{currentItem?.name?.toUpperCase()}</span>
    <span>{currentItem?.category?.toUpperCase()}</span>
    <span>{`${currentItem?.price} ${currentItem?.currency?.toUpperCase()}`}</span>
    <span>{`${currentItem?.amountInStock}/${currentItem.desiredInStock}`}</span>
    <span>{`Minimum ${currentItem?.minimumInStock}`}</span>
    <span>{`Provider ${currentItem?.providerName}`}</span>
</>
const ProviderFrom = ({ currentItem }) => <>
    <span>{currentItem.name}</span>
    <span>{currentItem.restaurantIdentifier}</span>
    {
        currentItem.contacts?.map((contact, idx) => <span key={contact.contactValue + idx}>{contact.contactValue}</span>)
    }
    {
        currentItem.schedule?.map((order, idx) => <div className="orderHolder" key={idx}>
            <label>{`Delivery Day`}</label>
            <label>{`${getLabelDay(order.deliveryWeekDay)} By ${order.deliveryHour}`}</label>
        </div>)
    }</>

const StyledDetails = styled.div`
    grid-area: details;
    background-color: #333;
    border-radius: 0 !important;
    display: flex;
    flex-direction: column;
    max-height: inherit;
    overflow-y: auto;
    padding: 3%;
    align-items: left;
    color: #fff;
    text-align:left;

    span,img{
        animation: fadeIn .5s;
    }
    img{
        margin-top:4%;
        align-self: center;
        width:100px;
        height:100px;
    }
    .orderHolder{
        margin-top: 3%;
        display: grid;
        text-align: left;
        color: orange;
    }
`;
StyledDetails.displayName = "sideItemDetails";

export default ItemDetails;
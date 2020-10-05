import React,{useEffect} from 'react';
import { useHover } from '../../customHooks/useHover';
import styled from 'styled-components';
import CircleAvatar from '../../common/mainSideNav/circleAvatar';

const MainPageItem = ({
    setCurrentItem,
    isActiveItem,
    item,
    onRowClicked
}) => {
    const [hoverRef, isHovered] = useHover();

    useEffect(() => {
        isHovered && setCurrentItem(item);
    },[isHovered]);

    return <StyledItem
            className = {isActiveItem ? 'active': 'disabled'}
            key = {item.id}
            onClick = {() => onRowClicked(item)}
            ref = {hoverRef}
        >        
        <CircleAvatar length = '50px' avatarImg = {item.avatar} className='provItem'/>
        <span>{item.name}</span>    
        <Status status = {item.isActive}/>
    </StyledItem>
}
const Status = styled.div`
    width:15px;
    height:15px;
    border-radius: 50%;
    background: ${props => props.status ? '#13b013' : '#c61818'};
    background-image: linear-gradient(${props => props.status ? 'to right, #4CAF50, #13b013' : 'to left,#c61818,#b30000'});
    position:absolute;
    right:3%;
    box-shadow: 0px 0px 2px 2px #a5a5a5;
    align-self:center;
`;
const StyledItem = styled.li`
    padding: 0.4em;
    border: 1pt solid #eee;
    box-shadow: 0px 1px 2px 0px #0a2835;
    cursor: help;
    animation: fadeIn .7s;
    transition: all .7s;
    height: 22px;
    width: 220px;
    align-items: center;
    border-radius: 30px;
    display: flex;
    position: relative;
    padding-left: 55px;
    margin: 10px 22px 10px 12px;
    .provItem{
        position: absolute;
        left: -4px;
    }
    &.active{
        letter-spacing: 1px;
        background-color: antiquewhite;

    }

`;
export default MainPageItem;
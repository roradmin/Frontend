import React from 'react';
import styled from 'styled-components';
const defaultAvatar = require('../../../images/avatar2.png');

const CircleAvatar = ({avatarImg,length ='40px',className='circleAvatar'}) => {
return <StyledComponent length = {length} className={className}>
  <img
    className="avatar"
    src = {avatarImg || require('../../../../src/images/avatar2.png')}
    onError={(e) => e.target.src = defaultAvatar}
  />
</StyledComponent>
}
 
const StyledComponent = styled.div`
  overflow: hidden;
  border-radius: 50% !important;
  border: 1px solid #000;
  box-shadow: 1px 2px 9px 5px rgba(0, 0, 0, 0.2),
              1px 3px 0px 0px rgba(0, 0, 0, 0.14),
              1px 1px 1px 0px rgba(0, 0, 0, 0.12);
  height: ${props => props.length};
  .avatar{
      height: ${props => props.length};
       width: ${props => props.length};
       background-color: #eee;
  }
`;
;
export default CircleAvatar;
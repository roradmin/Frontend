import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {FaRegArrowAltCircleRight,FaFeatherAlt,FaEye} from  "react-icons/fa";
import styled from 'styled-components';
import { setLocalLanguage } from '../../redux/actions/ConfigurationActions';

import _ from 'lodash';

const DesktopLinks = () => {
    const currentPath = useSelector(state => state.path.currentPath);
    return <div className="desktopHeader">
      <div className="logoHolder">
        RestPP
      </div>
      <div className="links">   
      {!_.isEmpty(currentPath) && <FaRegArrowAltCircleRight /> && <>
      {
        currentPath.map(p => <span key={p} className="runningPath">{p}</span>)}</>
      }
      </div>
          <div className="loginUser">
            <Language/>
          </div> 
    </div>  
  }
  const Language = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state?.basicConfiguration?.language);
    const StyledFlag = styled.div`
      margin-right:1%;
      img{
        width:60px;
        height: 25px;
        width: 42px;
        height: 25px;
        box-shadow: 1px 1px 1px 1px #000;
        cursor: pointer;
      }
    `;
    return <StyledFlag> 
      {
          language == 'en' ? <img
            src={require('../../../src/images/usa_flag.png')}
            onClick={() => {dispatch(setLocalLanguage('heb'))}}
          /> :
          <img
            src={require('../../../src/images/il_flag.jpg')}
            onClick={() => {dispatch(setLocalLanguage('en'))}}
          /> 
      }
    </StyledFlag>
  }

  export default DesktopLinks;
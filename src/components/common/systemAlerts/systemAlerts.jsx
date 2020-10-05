import React from 'react';
import {FaCheck,FaRegTimesCircle,FaMedapps,FaExclamationTriangle} from "react-icons/fa";
import { StyledButton } from '../forms/styledButton';
import _ from 'lodash';
import styled from 'styled-components';
import './systemAlerts.scss';

const Alert = ({
    header = 'Init Header',
    msg = '',
    type = 'warning',
    question = false,
    callBack = null,
    active = false,
    onClose = null,
    errorsList = null
}) => {
    //console.log(header,msg,' ,active:',active);
    const [isActive, setIsActive] = React.useState(active);
    const isLoading = (type == 'loading');
    React.useEffect(() => setIsActive(active),[active]);
    errorsList && console.log('errorsList ',errorsList);
    const buttonsResponse = (response = false) => {
        setIsActive(false);
        onClose && onClose();
     //   response && callBack(response);
    }
    return !isActive && [] || <div className="alertsBackground popupBackground">
        <div className="PopUpComponent">   
        {!isLoading && <MessageIcon type={type}/>}
            <h4 className="messageHeader">{header}</h4>
            {errorsList && <ListOfErrors errorsList={errorsList} />}
            {!_.isEmpty(msg) && <div className='textarea'>{msg} </div>}
            {!isLoading && <AskButtons buttonsResponse = {buttonsResponse} question={question}/>}
        </div> 
    </div>
}
// asking cancel/approve
// 
const ListOfErrors = ({errorsList}) => <ErrList>{errorsList.map(err => <li key={err}>{err}</li>)}</ErrList>
const ErrList = styled.ul`
    list-style-type: square;
    text-align: left;
`;
const MessageIcon = ({type}) => {
    switch (type){
        case 'success':
            return <FaCheck className = {type} size={45}/>
        case 'error':
            return <FaRegTimesCircle className = {type} size={45}/>
        case 'warning':
            return <FaExclamationTriangle className = {type} size={45}/>
    }
}
const AskButtons = ({question,buttonsResponse}) => {
    return <div className="popupButtonsWrapper">
        {question && 
        <><StyledButton
                background = {'#106914'}
                backgroundHover = {'#29752c'}
                color = {'#eee'}
                onClick = {() => buttonsResponse(true)}
                title = {'YES'}
            />
        <StyledButton
            background = {'#990404'}
            backgroundHover = {'#a41c1c'}
            color = {'#eee'}
            onClick = {() => buttonsResponse(false)}
            title = {'NO'}
        /></> ||
        <StyledButton
            background = {'#106914'}
            backgroundHover = {'#29752c'}
            color = {'#eee'}
            onClick = {() => buttonsResponse(false)}
            title = {'Continue'}
        />
        }
           
    </div>
}

export default Alert;
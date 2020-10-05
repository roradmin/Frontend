import React,{useState} from 'react';
import TextField from '../../common/inputs/textField';
import { StyledButton } from '../../common/forms/styledButton';

const AskForName = ({callback,label = "Insert name...",customStyle = null}) => {
  const [inputVal,setInputVal] = useState('');
  const validInput = inputVal.length > 0;
  return (
    <div className='popupBackground'>
        <div className='AskForName popupDiv' style = {{...customStyle}}>
            <span className='closePopup' onClick = {() => callback(false)}> X </span>
            <TextField value={inputVal} label={label} onChange={setInputVal}/>
            <StyledButton
                background = {'#990404'}
                backgroundHover = {'#a41c1c'}
                color = {'#eee'}
                valid = {validInput}
                onClick = {() => validInput && callback(inputVal)}
                title = {'Create'}
            />
        </div>
    </div>
  )
}
 
export default AskForName;
import React,{useState,useContext} from 'react';
import AppContext from '../../appContext';
import {register} from '../../../apiConnector/users.api';
import { StyledButton } from '../forms/styledButton';
import _ from 'lodash';

const RegisterForm = () => {
    const {setLoading,openPopupMessage} = useContext(AppContext);
    const [inputs,setInputs] = useState({firstName:'',lastName:'',email:'',password1:'',password2:''});

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const registerFunction = async() => {
        if(inputs.password1 !== inputs.password2){
            openPopupMessage({type:'customError',msg: 'Passwords Not Match'});
            return;
        }
        const findEmpty = Object.keys(inputs).find(c => inputs[c].length == 0);
        if(_.isEmpty(inputs)){
            openPopupMessage({type:'customError',msg: `${findEmpty} cannot be empty`});
            return;
        }else{
            try{        
                setLoading(true,"Creating User...");
                const res = await register(inputs);
                openPopupMessage({type:'success',msg: 'Created Successfuly'});
                console.log(res);
            }
            catch(err){
                openPopupMessage({err});
            }
            finally{
                setLoading(false);
            }
        }
    }
        return <div className="formWrapper"><form>
        <div>
            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} placeholder="first name" required />
        </div>
         <div>
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} placeholder="last name" required />
        </div>
        <div>
            <label>Email Address</label>
            <input type="email" name="email" onChange={handleInputChange} value={inputs.email} placeholder="E-mail or Username" required />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password1" onChange={handleInputChange} placeholder="Password" value={inputs.password1}/>
        </div>
        <div>
            <label>Re-enter Password</label>
            <input type="password" name="password2" onChange={handleInputChange} placeholder="Password" value={inputs.password2}/>
        </div>
    </form>
        <div className="formBtnWrapper">
            <StyledButton type = 'submit' onClick={()=> registerFunction()} title={'Sign Up'}/>
        </div></div>
}
export default RegisterForm;
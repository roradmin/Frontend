import React,{useState,useEffect,useContext} from 'react';
import {FaUserPlus,FaUserCheck} from "react-icons/fa";
import {isTokenStillValid} from '../miniComponents/cookieManage';
import { useHistory } from "react-router-dom";
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import './authentication.scss';

const LoginComponent = () => {
    const [registerForm,setRegisterForm] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const isTokenValid = isTokenStillValid();
         if(isTokenValid){      
           //  history.push('/');
         }
    },[]);

    return <div className="registerComponentWrapper">
        <div className="popup">
            <div className="registerBtns">
                <button className={registerForm ? "loginBtn hidden":"loginBtn show"} onClick={()=> setRegisterForm(false)}>
                    <FaUserPlus size={16}/>
                    <label>Login</label> 
                </button>
                <button className={registerForm ? "loginBtn show":"loginBtn hidden"} onClick={()=> setRegisterForm(true)}>
                    <FaUserCheck  size={16}/>
                    <label>Sign up</label> 
                </button>
            </div>
            {
                registerForm && <RegisterForm/> || <LoginForm />
            }
        </div>
    </div>
}

export default LoginComponent;
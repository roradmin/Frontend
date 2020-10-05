import React,{useState,useContext} from 'react';
import AppContext from '../../appContext';
import {login} from '../../../apiConnector/users.api';
import {setCookie} from '../miniComponents/cookieManage';
import LoadingButton from '../loader/loadingButton';
import _ from 'lodash';

const LoginForm = () => {
    const {setCredentialsForToken,openPopupMessage} = useContext(AppContext);
    const [inputs,setInputs] = useState({email:'',password:'',rememberMe: false});
    const [loginLoading,setLoginLoading] = useState(false);
    const emailRef = React.useRef();
    const passRef = React.useRef();

    React.useEffect(() => {
        if(passRef.current?.value && emailRef.current?.value){
            setInputs(inputs => ({...inputs, password: passRef.current?.value, email: emailRef.current?.value}));
        }
    },[passRef.current?.value,emailRef.current?.value]);

    React.useEffect(() => {
        if(inputs.email && inputs.password){
            window.addEventListener('keydown',detectEnterKey);
            return () => {
                window.removeEventListener('keydown',detectEnterKey)
            }
        }
    },[inputs]);

    const detectEnterKey = (event => {
        const { key } = event;
        if (key === 'Enter') {
            loginFunction();
        }
      });

    const handleInputChange = (event,checkbox = false) => {
        event.persist();
        changeInputs(event.target.name,event.target[checkbox ? 'checked' : 'value']);
    }
    const changeInputs = (name,value) => setInputs(inputs => ({...inputs, [name]: value}));

    const loginFunction =  async() => {
        const findEmpty = Object.keys(inputs).find(c => inputs[c].length == 0);
        if(findEmpty){
            alert(`${findEmpty} cannot be empty`);
            return;
        }else{
            try{
                setLoginLoading(true);
                const {email,password,rememberMe} = inputs;
                const loginData = {email,password};
                const {status,headers} = await login(loginData);
                const userToken = headers['x-auth-token'] || null;
                userToken && setCookie({label:'userToken',value:userToken,rememberMe:rememberMe});
            }
            catch(err){
                openPopupMessage({err});
            }
            finally{
                setLoginLoading(false);
                setCredentialsForToken();
            }
        }
    }
    return !_.isEmpty(inputs) && <div className="formWrapper" ><form>
    <div>
        <label>Email Address</label>
        <input
            type="email"
            name="email" 
            ref={emailRef}
            onChange={handleInputChange}
            value={inputs.email}
            placeholder="E-mail or Username"
            required
        />
    </div>
    <div>
        <label>Password</label>
        <input
            type="password"
            name="password"
            ref={passRef}
            onChange={handleInputChange}
            placeholder="Password"
            value={inputs.password}
        />
    </div>
    <div>
        <label>Remember me!</label>
        <input
            type="checkbox"
            name="rememberMe"
            style={{justifySelf: 'center',alignSelf: 'center'}}
            onChange={(e) => handleInputChange(e,true)}
            value={inputs.rememberMe}
        />
    </div>
</form>
        <div className="formBtnWrapper">
        <LoadingButton
            type = 'submit'
            onClick={loginFunction}
            isLoading = {loginLoading}
            btnText='Login'
        />
        
    </div>
    
</div>
}
export default LoginForm;
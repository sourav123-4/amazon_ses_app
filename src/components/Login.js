import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

const Login = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        username:'',
        password:''
    })
    const onHandleChange = (e)=>{
        const {name,value} = e.target;
        setData({...data,[name]:value})
    }
    const handleLogin = ()=>{
        const user = new CognitoUser({
            Username: data.username,
            Pool: UserPool,
          });
       
          const authDetails = new AuthenticationDetails({
            Username: data.username,
            Password: data.password,
          });

          user.authenticateUser(authDetails, {
            onSuccess: (result) => {
              console.log('login success', result);
              navigate("/home")
            },
            onFailure: (err) => {
              console.log('login failure', err);
            },
            newPasswordRequired: (data) => {
              console.log('new password required', data);
            },
          });
    }
    return (
        <div className="App">
            <h1>Login Via username and password</h1>
            <div className='form'>
                <input placeholder='username' name='username' onChange={(e)=>onHandleChange(e)}/>
                <input placeholder='password' name='password' onChange={(e)=>onHandleChange(e)}/>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login

import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

const Login = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationcode] = useState(false);
    const [data,setData] = useState({
        username:'',
        password:'',
        otp:0,
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
              setVerificationcode(true)
            //   navigate("/home")
            },
            onFailure: (err) => {
              console.log('login failure', err);
            },
            newPasswordRequired: (data) => {
              console.log('new password required', data);
            },
          });
    }
    const handleVerify = ()=>{
        const user = new CognitoUser({
            Username: data.username,
            Pool: UserPool,
          });
        user.getMFAOptions({
            onSuccess: (result) => {
              console.log('email verified', result);
              navigate("/home")
            },
            onFailure: (err) => {
              console.log('verified failed', err);
            },
      })
    }
    return (
        <div className="App">
            {!verificationCode ?<h1>Login Via username and password</h1>:<h1>Enter the verification code</h1>}
            {!verificationCode ?
            <div className='form'>
                <input placeholder='username' name='username' onChange={(e)=>onHandleChange(e)}/>
                <input placeholder='password' name='password' onChange={(e)=>onHandleChange(e)}/>
                <button onClick={handleLogin}>Login</button> </div>: 
            <div className='form'>
                <input placeholder='otp' name='otp' onChange={(e)=>onHandleChange(e)}/>
                <button onClick={handleVerify}>verify</button>
            </div> }
        </div>
    )
}

export default Login

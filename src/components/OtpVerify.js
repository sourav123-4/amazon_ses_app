import React, { useState } from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

function OtpVerify() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("email",location.state.username)
    const [OTP,setOTP] = useState(0)

    const verifyAccount = (e) => {
        e.preventDefault();
        const user = new CognitoUser({
          Username: location.state.username,
          Pool: UserPool,
        });
        console.log(user);
        user.confirmRegistration(OTP, true, (err, data) => {
          if (err) {
            console.log(err);
            alert("Couldn't verify account");
          } else {
            console.log(data);
            alert('Account verified successfully');
            navigate('/login')
          }
        });
      };
  return (
    <div className='form'>
        <h1>Verify using your otp</h1>
      <input placeholder='otp' onChange={(e) => setOTP(e.target.value)}/>
      <button onClick={verifyAccount}>Verify</button>
    </div>
  )
}

export default OtpVerify

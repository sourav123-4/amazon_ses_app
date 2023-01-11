import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [data,setData] = useState({
    username:'',
    email:'',
    password:''
  })
  const onHandleChange = (e)=>{
    const {name,value} = e.target;
    setData({...data,[name]:value})
  }
  const handleSubmit = ()=>{
    if(data.email && data.password){
      const {username,email,password} = data;
      console.log("data present",data);
      const attributeList = [];
      attributeList.push(
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        })
      );
      UserPool.signUp(username, password,attributeList, null, (err, data) => {
        if (err) {
          console.log(err);
          alert("Couldn't sign up");
        } else {
          console.log(data);
          //add the navigate here
          alert('User Added Successfully');
        }
      });
      navigate('/verify',{state:{username:username}}); 
    }else if(data.email && !data.password){
      console.log("password is empty",data);
    }else if(!data.email && data.password){
      console.log("email is empty",data);
    }else{
      console.log("email and password both are empty",data);
    }
  }
  return (
    <div className="App">
      <h1>Amazon Ses App</h1>
      <div className='form'>
      <input placeholder='username' name='username' onChange={(e)=>onHandleChange(e)}/>
        <input placeholder='email' name='email' onChange={(e)=>onHandleChange(e)}/>
        <input placeholder='password' name='password' onChange={(e)=>onHandleChange(e)}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;

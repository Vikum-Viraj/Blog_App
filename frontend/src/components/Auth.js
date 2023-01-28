import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup,setIsSignup] = useState(false);

  //////////////////////
  const [inputs,setInputs] = useState({

    name:"",
    email:"",
    password:""

  })

  ////////////////////////
  const hanleChange = (e) => {
     setInputs((prevState) =>({
        ...prevState,
        [e.target.name] : e.target.value
        
     }));
   
  };

  ///////////////////////////
  const sendRequest = async (type="login") => {
   
   const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password

    }).catch((err) => console.log(err))

    const data = await res.data;
    console.log(data);
    return data;
  }

  //////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    if(isSignup){
      sendRequest("signup").then((data) => localStorage.setItem("userId",data.user._id))
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"))
      .then((data) => console.log(data))
      

    }else{
      sendRequest().then((data) => localStorage.setItem("userId",data.user._id))
      .then(() => dispatch(authActions.login()))
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"))
      
    }

  }

  /////////////////////
  return (
    <div>
      <form onSubmit={handleSubmit}>

        <Box display='flex' flexDirection='column'
        maxWidth={400}
        alignItems={'center'} 
        boxShadow="10px 10px 20px #737178" 
        padding={3} margin="auto"
        marginTop={5} borderRadius={5} >
          
          <Typography padding={3} textAlign="center" variant='h2'>{!isSignup?"Login":"Sign Up"}</Typography>

          {isSignup && <TextField placeholder='Name' name="name" onChange={hanleChange} value={inputs.name} sx={{width:'300px'}} margin='normal'/> }

          <TextField placeholder='Email'    name="email"  onChange={hanleChange}  value={inputs.email}   sx={{width:'300px'}} margin='normal'/>
          <TextField placeholder='Password' type ="password" name="password" onChange={hanleChange} value={inputs.password} sx={{width:'300px'}} margin='normal'/>

          <Button variant='contained' sx={{borderRadius:2,marginTop:2,width:'90px'}} type="submit">Submit</Button>
          <Button sx={{borderRadius:3,marginTop:1}} onClick={() => setIsSignup(!isSignup)}>Switch to {isSignup?"Login":"Sign Up"}</Button>

        </Box>
      </form>
    </div>
  )
}

export default Auth

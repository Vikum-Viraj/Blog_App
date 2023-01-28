import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'normal'};

const AddBlog = () => {

  const navigate = useNavigate();

  const [inputs,setInputs] = useState({

    title:"",
    description:"",
    imageURL:""

  })

  const handleChange = (e) => {
    setInputs((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value
      
   }));

  }

  const sendRequest = async() => {
   
    const res = await axios.post(`http://localhost:5000/api/blog/add`,{

      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")

    }).catch((err) => console.log(err))

    const data = await res.data
    return data;

  }

  ///////////////
  const handleSubmit = (e) => {
   e.preventDefault();
   console.log(inputs);
   sendRequest().then((data) => console.log(data)).then(() => navigate("/blogs"))

  }
  /////////////////////////
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box borderRadius={10} 
         boxShadow="10px 10px 20px #1b05a8"
        padding={4}  display="flex" flexDirection={'column'} width={"40%"} height={"60%"} margin='auto' marginTop={'20px'}>

          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' textAlign={'center'}>Post Your Blog</Typography>

          <InputLabel  sx={labelStyles} >Title</InputLabel>
          <TextField name ="title" value={inputs.title} onChange={handleChange} margin='normal' variant='outlined'/>
          <InputLabel  sx={labelStyles} >Description</InputLabel>
          <TextField name ="description" value={inputs.description} onChange={handleChange} margin='normal' variant='outlined'/>
          <InputLabel  sx={labelStyles} >Image URL</InputLabel>
          <TextField name ="imageURL" value={inputs.imageURL} onChange={handleChange} margin='normal' variant='outlined' />
          <Button variant='contained' sx={{mt:2,mb:2,borderRadius:'10px'}} type='submit'>Post</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog

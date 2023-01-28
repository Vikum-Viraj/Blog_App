import React, { useState } from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { Box } from '@mui/system'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {

  const dispatch = useDispatch();
  const [state,setState] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  ///////////////////////////////

  return (
    <AppBar sx={{ backgroundColor:"#11034d",position:'sticky'}}>
    <Toolbar>
      
        <Typography  variant='h4'>Blogs App</Typography>

        {isLoggedIn &&  <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>

          <Tabs textColor='inherit' value={state} onChange={(e,val)=>setState(val)}>

          <Tab LinkComponent={Link} to="/blogs" label ="All Blogs" />  
          <Tab LinkComponent={Link} to="/myBlogs" label ="My Blogs" />  
          <Tab LinkComponent={Link} to="/blogs/add" label ="Add Blogs" />  
          </Tabs>

        </Box> }

        <Box variant="contained" display="flex" marginLeft="auto">

            {!isLoggedIn && <>
            <Button color='warning' sx={{margin:1,borderRadius:"6px"}} LinkComponent={Link} to="/auth" variant="contained" >Login</Button>
            <Button color='warning' sx={{margin:1,borderRadius:"6px"}} LinkComponent={Link} to="/auth" variant="contained" >Sign Up</Button>
            </>
            }

            {isLoggedIn &&  <Button color='warning'
              onClick={() => dispatch(authActions.logout())}
              sx={{margin:1,borderRadius:"6px"}}
              LinkComponent={Link} to="/auth"
              variant="contained" >Log Out</Button> }

        </Box>
    </Toolbar>
    </AppBar>
  )
}

export default Header

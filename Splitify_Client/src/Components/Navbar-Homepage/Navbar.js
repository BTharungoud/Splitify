import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Navbar.css"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdown,setDropdown] = useState(false);
  // const [userNamelogin, setUserNamelogin] = useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      const userToken = localStorage.getItem("token")
      if(userToken){
        setIsLoggedIn(true);
      }
    }
  },[])
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: '15px' }}>
        <AppBar position="static" sx={{ backgroundColor: 'transparent', color: "#fe4066", borderBottom: '1px solid #fe4066', borderRadius: '18px' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <img style={{ height: '45px', width: '45px' }} src='./pdf.png'></img>
            </IconButton>
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                <Button color="inherit" onClick={() => navigate('/')}>Splitify</Button>
                <Button color="inherit" sx={isLoggedIn ? {} : { display: 'none' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
              </Typography>
            </>
            <Button color="inherit" sx={isLoggedIn ? { display: 'none' } : {}} onClick={() => navigate('/Login')}>Login</Button>
            <IconButton sx={isLoggedIn ? { color: '#fe4066' } : { display: 'none' }}><AccountCircleIcon sx={{ width: '50px', height: '50px' }} onClick={()=>{setDropdown(!dropdown)}} /></IconButton>

          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ zIndex: "99" }} className={dropdown ? "dropdown-main":"dropdown-main1"}>
        <div className='dropdown'>
          <ul style={{ listStyle: "none" }}>
            {/* <li style={{ padding: "5px", borderBottom: "2px solid white" }} onClick={() => { navigate("/profile") }}>Profile</li> */}
            <li style={{ padding: "5px" }} onClick={() => { localStorage.removeItem("token"); navigate("/login") }}>Logout</li>
          </ul>
        </div>
      </div>
    </>
  );
}
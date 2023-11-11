import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import style from './Loginpage.module.css'
import Navbar from '../../Components/Navbar-Homepage/Navbar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Loginpage() {
    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMail, setLoginMail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showPasswordR, setShowPasswordR] = useState(false);
    const [showPasswordL, setShowPasswordL] = useState(false);

    const navigate = useNavigate();
    const handleRegister = async()=>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const email = emailPattern.test(userMail);
        const passcode = password.length>=6 
         if(email && passcode && userName){
            const data = await fetch("http://localhost:9000/auth/register",
            {
                method : "POST",
                headers : {
                    "Content-Type":"application/json"
                },body:JSON.stringify({
                    userName:userName,
                    email : userMail,
                    password : password
                })
            })
            const Data = await data.text()
            if(data.status == 201){
                toast.success(`${Data}`)
            }else{
                toast.error(`${Data}`)
            }
            setUserName('');
            setUserMail('');
            setPassword('');
        }else{
            if(!email)toast.error("Invalid Email, plz provide valid mail")
            else if(!passcode)toast.error("Password must be more than 5 letters")
            else toast.error("Invalid Username")
        }
    }

    const handleLogin = async() =>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const email = emailPattern.test(loginMail);
        if(!email){
            toast.error("Plz Enter a Vaild mail")
        }else if(loginPassword.length<6){
            toast.error("Invalid password")
        }else{
            const res = await fetch("http://localhost:9000/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },body:JSON.stringify({
                    email:loginMail,
                    password:loginPassword
                })
            })
            const data = await res.json()
            if(res.status == 401){toast.error("Invalid password plz, check your password"); return}
            else if(res.status == 404){toast.error("Email does not exist; please register first!"); return }
            else{
                localStorage.setItem('token',data.token)
                localStorage.setItem('Username',data.userName)
                navigate("/dashboard")
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPasswordR(!showPasswordR);
    };
    const togglePasswordVisibilityL = () => {
        setShowPasswordL(!showPasswordL);
    };
    
    return (
        <div className={style.mainDiv}>
            <Navbar />
            <div className={style.LoginDiv}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '15px',
                        boxShadow: 'rgba(146, 145, 145, 0.49) 0px 10px 50px',
                        backgroundColor:'whitesmoke',
                        justifyContent: 'center',
                        padding: '5%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h3 style={{ color: '#fe4066' }}>Register Here!</h3>
                    <TextField label="Name" onChange={(e) => setUserName(e.target.value)} value={userName} />
                    <TextField label="E-Mail" onChange={(e) => setUserMail(e.target.value)} value={userMail} />
                    <TextField
                        label="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        type={showPasswordR ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPasswordR ? <VisibilityIcon  /> : <VisibilityOffIcon  />}
                                </IconButton></InputAdornment>,
                        }} />
                    <Box sx={{ display: 'flex', width: "80%", justifyContent: 'center' }}>
                        <Button variant='contained' size='small' sx={{ background: "#fe4066" }} onClick={handleRegister}>Submit</Button>
                    </Box>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        boxShadow: 'rgba(146, 145, 145, 0.49) 0px 10px 50px',
                        backgroundColor : "whitesmoke",
                        justifyContent: 'center',
                        padding: '5%',
                        width: '35%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h3 style={{ textAlign: "center", color: '#fe4066' }}>UnLock your Features Here!.</h3>
                    <TextField id="outlined-basic" label="E-mail" variant="outlined" onChange={(e)=> setLoginMail(e.target.value)} />
                    <TextField
                        label="Password"
                        type={showPasswordL ? 'text' : 'password'}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibilityL}
                                    edge="end"
                                >
                                    {showPasswordL ? <VisibilityIcon  /> : <VisibilityOffIcon  />}
                                </IconButton></InputAdornment>,
                        }} />
                    <Box sx={{ display: 'flex', width: "80%", justifyContent: 'center' }}>
                        <Button variant='contained' size='small' sx={{ background: "#fe4066" }} onClick={()=>handleLogin()}>Login</Button>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
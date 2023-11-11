import * as React from 'react';
import Box from '@mui/material/Box';
import style from "./Homepage.module.css"
import { Button } from '@mui/material';
import Navbar from '../../Components/Navbar-Homepage/Navbar';
import { Link } from 'react-router-dom';
export default function Homepage() {
    
    return (
        <div className={style.mainDiv}>
            <Navbar />
            <div className={style.descriptionDiv}>
                <div className={style.aboutpdfvs}>
                    <h3 style={{color:'#fe4066'}}>Store PDFs Securely in the Cloud</h3><br/>
                    <p>Access your PDFs from anywhere, on any device. Safe and reliable cloud storage ensures your PDFs are always at your fingertips.</p><br /><br/>
                    <h3 style={{color:'#fe4066'}}>Effortlessly Split PDFs</h3><br/>
                    <p>Access your PDFs from anywhere, on any device. Safe and reliable cloud storage ensures your PDFs are always at your fingertips.</p>
                </div>
                <div className={style.resgister}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '15px',
                            boxShadow: 'rgba(146, 145, 145, 0.49) 0px 10px 50px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10%',
                            marginBottom: '10%',
                            padding: '5%',
                            width: '70%'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h3 style={{color:'#fe4066'}}>Experience the splitify here</h3><br/>
                        <p style={{color:'white',textAlign:'center'}}>To get started with spliting the pdf, click the below button "SPLITIFY".</p>
                        <Box sx={{ display: 'flex', width: "80%", justifyContent: 'center' }}>
                            <Link to={'/SplitPDF'}>
                                <Button variant='contained' size='small' sx={{ background: "#fe4066"}}>Splitify</Button>
                            </Link>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}
// PDFVaultSplit
//const textFieldStyle = {
// '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//         borderColor: '#020911', // Change the border color
//     },
//     '&:hover fieldset': {
//         borderColor: '#020911', // Change the hover border color
//     },
// },}
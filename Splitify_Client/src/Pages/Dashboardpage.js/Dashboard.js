import React, { useState } from 'react'
import style from "./Dashboard.module.css"
import LayoutContainer from '../../Components/Layout/LayoutContainer'
import { Button } from '@mui/material';
import axios from 'axios';
export default function Dashboard() {
  const [file , setFile] = useState(null);
  const currentUser = localStorage.getItem('token')
  const UserName  = localStorage.getItem('Username')
  async function handleUpload(){
    try{
      const formdata = new FormData();
     formdata.append('pdf', file);
     console.log(currentUser);
      const res = await axios.post("http://localhost:9000/splitPDF/upload",
            formdata,
                {headers:{
                    authorization : `BEARER ${currentUser}`
                } }
            )
            console.log(res);
    }catch(err){
      console.log( `error at ${err}`)
    }
   }
  return (
    <div className={style.mainDiv}>
        <LayoutContainer>
          <div className={style.Dashboarddiv}>
            <h3 style={{color:'#fe4066'}}>Welcome {UserName}</h3>
            <p>
                To save your PDF's online , plz select them and store in the Dashboard.
            </p>
            <input type='file' onChange={(e)=>{setFile(e.target.files[0])}} />
            <Button onClick={handleUpload}>Upload</Button>
          </div>
          <div>

          </div>
        </LayoutContainer>
    </div>
  )
}
import React from 'react'
import style from './Splitedpage.module.css'
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Document, Page } from 'react-pdf';
export default function SplitedPDF() {
    const navigate = useNavigate()
    const Data = sessionStorage.getItem('newPDF')
    // Process the split PDF data
    const data = JSON.parse(Data)
    const byteValues = Object.values(data);
    const binaryData = new Uint8Array(byteValues);
    // Create a Blob object with the binary data, specifying the MIME type
    const blob = new Blob([binaryData], { type: "application/pdf" });
    // Create a URL for the Blob to make it accessible for download or rendering
    const url = URL.createObjectURL(blob);
    function handleDownload() {
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.pdf";
        document.body.appendChild(a);
        a.click();
    }


    return (
        <div className={style.mainDiv}>
            <div className={style.navButtons}>

                <Button onClick={()=>{navigate('/SplitPDF')}}>
                    <img style={{maxHeight:'60px'}} src='./backarrowicon.png' />
                </Button>
                <Button variant='contained' onClick={handleDownload} sx={{maxHeight:'60px'}} >
                    Download
                </Button>
            </div>
            <div className={style.ShowPDF}>

                <Document file={blob}
                >
                    <style>
                        {`
                      .react-pdf__Page__textContent {
                        display: none;
                      }
                    `}
                    </style>
                    <Page pageNumber={1} />
                </Document>
            </div>
            <div className={style.slidebar}>

            </div>
        </div>
    )
}

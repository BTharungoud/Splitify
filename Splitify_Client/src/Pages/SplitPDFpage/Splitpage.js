import React, { useState } from 'react'
import LayoutContainer from '../../Components/Layout/LayoutContainer'
import style from './Splitpage.module.css'
import { Document, Page,pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Splitpage() {
  const [PDFarr, setPDFArr] = useState([])
  const [recviedPdf, setRecviedPdf] = useState('');
  const [pageNumbers, setPageNumbers] = useState([]);
  const [newPDF,setNewPDF] = useState("");
  const scrollContainer = document.getElementById("DisplayPdf");
  const scrollAmount = 600;
  const navigate = useNavigate();
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  function handlechange(e) {
    const file = e.target.files[0];
    console.log(file,typeof file)
    setRecviedPdf(file);
  }
  function onDocumentLoadSuccess({ numPages }) {
    let arr = []
    for (let i = 0; i < numPages; i++) {
      arr.push(i)
    }
    setPDFArr(arr);
  }
  function handlePageselection(pageno) {
    if (pageNumbers.includes(pageno)) {
      let ar = [...pageNumbers];
      let index = ar.findIndex((num) => num === pageno);
      ar.splice(index, 1);
      setPageNumbers([...ar])
    }
    else setPageNumbers([...pageNumbers, pageno])
  }
 async function handleSplitPDF() {
    const formdata = new FormData();
    formdata.append('pdf', recviedPdf);
    formdata.append('pageNumbers', JSON.stringify(pageNumbers));
    const {data} = await axios.post('http://localhost:9000/splitPDF/pdf',
    formdata,{
      headers:{
          "Content-Type" : "multipart/form-data"
      }
    })
    setNewPDF(data)
      // console.log(data ,typeof data)
      sessionStorage.setItem('newPDF',JSON.stringify(data))
      navigate('/SplitedPDF')
  }
  return (
    <div className={style.mainDiv}>
      <LayoutContainer>
        <div className={style.Splitcss}>
          <h3 style={{ color: '#fe4066' }}>Select a PDF to Split.</h3><br />
          <p style={{ color: 'white' }}>{recviedPdf ? 'Click on the pages to select them and press "Split" button' : 'To Select a PDF file Click on the Inputbox "choose a file" which redirect to file-manager.'}</p> <br />
          <input style={{ borderRadius: '9px', color: 'white', backgroundColor: 'black' }} type='file' accept='.pdf' onChange={handlechange} />
          <div className={style.PDFLayout}>
            <Button variant={'contained'} sx={recviedPdf ? { maxHeight: '30px' } : { display: 'none' }} onClick={() => scrollContainer.scrollLeft -= scrollAmount}>&lt;&lt;</Button>
            <div className={style.ShowPDF}>
              {
                (recviedPdf !== null) ?
                  (
                    <div >
                      <Document file={recviedPdf} onLoadSuccess={onDocumentLoadSuccess} >
                        <style>
                          {`
                      .react-pdf__Page__textContent {
                        display: none;
                      }
                    `}
                        </style>
                        <div id='DisplayPdf' className={style.DisplayPDF}>
                          {
                            PDFarr.map(e => (
                              <div className={pageNumbers.includes(e + 1) ? style.PageDiv : style} onClick={() => handlePageselection(e + 1)}>
                                <Page pageNumber={e + 1} scale={0.57} />
                              </div>
                            ))}
                        </div>
                      </Document>
                    </div>
                  )
                  : <h5>Didnot choose any file select one.</h5>
              }
              <Button variant='contained'
                sx={(pageNumbers.length > 0) ? { position: 'fixed', bottom: '10px', right: '10px', zIndex: '25' } : { display: 'none' }}
                onClick={handleSplitPDF}
              >Split</Button>
            </div>
            <Button variant='contained' sx={recviedPdf ? { maxHeight: '30px' } : { display: 'none' }} onClick={() => scrollContainer.scrollLeft += scrollAmount}> &gt;&gt;</Button>
          </div>
        </div>

      </LayoutContainer>
    </div>
  )
}
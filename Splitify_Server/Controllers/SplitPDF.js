const multer = require('multer');
const { PDFDocument } = require('pdf-lib');

const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { storage } = require('../config/firebase.config.js')
const fileModel = require('../Models/FileSchema.js')
// const fs = require('fs');
// Define the function to split a PDF
const SplitPDF = async (req, res) => {
    console.log(req.file,req.body)
  try {
    const pdfBuffer = req.file.buffer;
    const pageNumbers = req.body.pageNumbers; // Array of page numbers to extract

    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const newPdfDoc = await PDFDocument.create();

    for (const pageNumber of pageNumbers) {
      if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
      }
    }

    const mergedPdfBytes = await newPdfDoc.save();
    // fs.writeFileSync('./newPDF',mergedPdfBytes)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=merged.pdf');
    res.send(mergedPdfBytes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
const uploadPdf = async (req, res, next) => {
  try {
    const fileUpload = async (file) => {
      const storageRef = ref(storage, `uploads/${file.originalname}`);
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, 'application/pdf');
      const downloadURL = await getDownloadURL(snapshot.ref);
      return {
        name: file.originalname,
        downloadURL
      }
    }
    fileUpload(req.file).then(async (result) => {
      await fileModel.create({
        fileName: result.name,
        fileUrl: result.downloadURL,
        userId: req.user._id
      })
      res.send({ message: 'File uploaded successfully' })
    }).catch((error) => {
      console.log(error);
      next(error)
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}
const getUploads = async (req, res, next) => {
  try {
    const data = await fileModel.find({ userId: req.user._id });
    if (!data) {
      res.send({ message: 'No data' });
    }
    else {
      res.status(200).send({ data })
    }

  } catch (error) {
    console.log(error);
  }
}
module.exports = { SplitPDF, uploadPdf, getUploads }; // Exporting the function

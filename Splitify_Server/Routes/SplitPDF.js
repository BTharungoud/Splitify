const express = require('express')
const { SplitPDF, uploadPdf, getUploads } = require('../Controllers/SplitPDF')
const router = express.Router();
const verifyToken = require('../utils/verifyToken')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/pdf', upload.single('pdf'), SplitPDF);

router.post('/upload', verifyToken, upload.single('pdf'), uploadPdf)

router.get('/uploads', verifyToken, getUploads);

module.exports = router;

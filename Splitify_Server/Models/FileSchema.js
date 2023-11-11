const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userRegister' }
})
module.exports = mongoose.model('fileModel', FileSchema);

const storage = require("../storage/storage")

const multer = require('multer');
const upload = multer({ storage });

module.exports =  upload;

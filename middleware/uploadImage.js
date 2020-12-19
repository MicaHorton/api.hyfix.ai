const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './frontend/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })

let upload = multer({ storage: storage });
module.exports = upload.single('img');
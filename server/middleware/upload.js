const multer = require('multer');
const path = require('path');

 const  storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename : function(req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random()* 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueName + ext);
    }
 });
 const fileFilter = (req, file, cb) => {

    const allowTypes = /jpeg|jpg|png|gif|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime  = file.mimetype;

     if(allowTypes.test(ext) && mime.startsWith('image/')) {
        cb(null, true);
     }else {
        cb (new Error('Only image files(jpeg, jpg, png, gif, webp) are allowed.'));
     }
  };
  const upload = multer ({

    storage: storage,
    fileFilter : fileFilter,
    limits : {
        fileSize  : 5 * 1024 * 1024
    }
  });
   module.exports = upload;
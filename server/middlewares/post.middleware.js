import multer from 'multer';

const postPicsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/tmp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

export const handlePostPics=multer({storage:postPicsStorage}).array("images",10)
  
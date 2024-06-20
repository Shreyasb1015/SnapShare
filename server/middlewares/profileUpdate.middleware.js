import multer from 'multer';

const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/profiles")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

export const handleProfilePic=multer({storage:profilePicStorage}).single("profilePicture")
  
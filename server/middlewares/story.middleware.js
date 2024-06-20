import multer from 'multer';

const storyStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/story")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

export const handleStoryImage=multer({storage:storyStorage}).single("image")
  
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'Public/Profile');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const newFileName = uuidv4() + path.extname(file.originalname);
    cb(null, newFileName);
  }
});

// Setting up multer middleware for fields
export const upload = multer({ storage: storage }).fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'secondaryImageOne', maxCount: 1 },
  { name: 'secondaryImageTwo', maxCount: 1 },
  { name: 'avatar', maxCount: 1 } 
]);

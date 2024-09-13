import multer from 'multer';

// Multer configuration for memory storage
const storage = multer.memoryStorage();

// Setting up multer middleware for multiple fields
export const upload = multer({ storage: storage }).fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'secondaryImageOne', maxCount: 1 },
  { name: 'secondaryImageTwo', maxCount: 1 },
  { name: 'avatar', maxCount: 1 }
]);

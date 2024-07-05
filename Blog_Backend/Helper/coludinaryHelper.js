import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName
        });

        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error('Error removing file:', error);
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { uploadImageOnCloudinary };

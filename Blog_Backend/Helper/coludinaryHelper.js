import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
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

        // Remove the file from local storage after successful upload
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error('Error removing file:', error);
        }

        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error(error.message);
    }
};

export { uploadImageOnCloudinary };

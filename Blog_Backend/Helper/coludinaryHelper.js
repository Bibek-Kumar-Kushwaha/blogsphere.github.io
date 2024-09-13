import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Function to upload image to Cloudinary
const uploadImageOnCloudinary = async (buffer, folderName) => {
    try {
        const result = await cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
            if (error) throw error;
            return result;
        }).end(buffer);

        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error(error.message);
    }
};

export { uploadImageOnCloudinary };

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Function to upload image to Cloudinary
const uploadImageOnCloudinary = async (buffer, folderName) => {
    try {
        // Wrap the upload stream in a Promise
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: folderName },
                (error, result) => {
                    if (error) {
                        reject(error); // Reject if there's an error
                    } else {
                        resolve(result); // Resolve the result if successful
                    }
                }
            );
            // End the stream with the file buffer
            uploadStream.end(buffer);
        });

        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error(error.message);
    }
};

export { uploadImageOnCloudinary };

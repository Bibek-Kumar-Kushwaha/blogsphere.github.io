import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: 'dvdpsq91h',
    api_key: '855865692568394',
    api_secret: '59wkdDWYJcDNxmi92LKiWF6D5SI'
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

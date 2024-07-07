import blogModel from '../Models/blogModels.js';
import { uploadImageOnCloudinary } from '../Helper/coludinaryHelper.js';

// Create Blog
const createBlogController = async (req, res) => {
    try {
        const {
            title,
            paraOneIntro,
            paraOneTitle,
            paraOneDescription,
            paraTwoIntro,
            paraTwoTitle,
            paraTwoDescription,
            paraThreeIntro,
            paraThreeTitle,
            paraThreeDescription,
            category,
            published,
        } = req.body;

        const createdBy = req.user._id;
        const authorName = req.user.username;
        const authorAvatar = req.user.avatar.url;

        if (!title || !paraOneIntro || !paraOneTitle || !paraOneDescription || !category) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
        }

        // Check if the main image file is uploaded
        if (!req.files.mainImage) {
            return res.status(400).send({ success: false, message: 'Main image is required' });
        }

        // Handle main image upload
        const resultMainImage = await uploadImageOnCloudinary(req.files.mainImage[0].path, 'blog_images');
        const mainImage = {
            public_id: resultMainImage.public_id,
            url: resultMainImage.secure_url
        };

        // Check if the secondary images are uploaded (optional)
        let secondaryImageOne = {};
        let secondaryImageTwo = {};

        if (req.files.secondaryImageOne) {
            const result = await uploadImageOnCloudinary(req.files.secondaryImageOne[0].path, 'blog_images');
            secondaryImageOne = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        if (req.files.secondaryImageTwo) {
            const result = await uploadImageOnCloudinary(req.files.secondaryImageTwo[0].path, 'blog_images');
            secondaryImageTwo = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const blogData = {
            title,
            paraOneIntro,
            paraOneDescription,
            paraOneTitle,
            paraTwoIntro,
            paraTwoDescription,
            paraTwoTitle,
            paraThreeIntro,
            paraThreeDescription,
            paraThreeTitle,
            category,
            createdBy,
            authorAvatar,
            authorName,
            published,
            mainImage,
            secondaryImageOne,
            secondaryImageTwo,
        };

        const newBlog = new blogModel(blogData);
        await newBlog.save();

        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Blogs
const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        return res.status(200).send({
            success: true,
            total: blogs.length,
            blogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Single Blog
const getBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).send({ success: false, message: 'Blog not found' });
        }

        return res.status(200).send({
            success: true,
            blog
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update Blog
const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            paraOneIntro,
            paraOneTitle,
            paraOneDescription,
            paraTwoIntro,
            paraTwoTitle,
            paraTwoDescription,
            paraThreeIntro,
            paraThreeTitle,
            paraThreeDescription,
            category,
            published,
        } = req.body;

        let mainImage = {};
        let secondaryImageOne = {};
        let secondaryImageTwo = {};

        if (req.files && req.files.mainImage) {
            const result = await uploadImageOnCloudinary(req.files.mainImage[0].path, 'blog_images');
            mainImage = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        if (req.files && req.files.secondaryImageOne) {
            const result = await uploadImageOnCloudinary(req.files.secondaryImageOne[0].path, 'blog_images');
            secondaryImageOne = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        if (req.files && req.files.secondaryImageTwo) {
            const result = await uploadImageOnCloudinary(req.files.secondaryImageTwo[0].path, 'blog_images');
            secondaryImageTwo = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(id, {
            title,
            mainImage,
            secondaryImageOne,
            secondaryImageTwo,
            paraOneIntro,
            paraOneTitle,
            paraOneDescription,
            paraTwoIntro,
            paraTwoTitle,
            paraTwoDescription,
            paraThreeIntro,
            paraThreeTitle,
            paraThreeDescription,
            category,
            published
        }, { new: true });

        if (!updatedBlog) {
            return res.status(404).send({ success: false, message: 'Blog not found' });
        }

        return res.status(200).send({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete Blog
const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await blogModel.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).send({ success: false, message: 'Blog not found' });
        }

        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export {
    createBlogController,
    getAllBlogsController,
    getBlogController,
    updateBlogController,
    deleteBlogController
};

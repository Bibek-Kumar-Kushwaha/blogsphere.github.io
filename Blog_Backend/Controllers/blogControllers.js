import blogModel from '../Models/blogModels.js';
import { uploadImageOnCloudinary } from '../Helper/coludinaryHelper.js';

// Create Blog
const createBlogController = async (req, res) => {
    try {
        const { title, intro, category, createdBy, authorName, published } = req.body;

        if (!title || !intro || !category || !createdBy || !authorName) {
            return res.status(400).send({ success: false, message: 'All fields are required' });
        }

        let mainImage = {};
        if (req.file) {
            const result = await uploadImageOnCloudinary(req.file.path, 'blog_images');
            mainImage = {
                public_id: result.public_id,
                url: result.secure_url
            };
        } else {
            return res.status(400).send({ success: false, message: 'Main image is required' });
        }

        const newBlog = new blogModel({
            title,
            mainImage,
            intro,
            category,
            createdBy,
            authorName,
            published: true || false,
        });

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
        const { title, intro, category, published } = req.body;
        let mainImage = {};

        if (req.file) {
            const result = await uploadImageOnCloudinary(req.file.path, 'blog_images');
            mainImage = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(id, {
            title,
            mainImage,
            intro,
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

import express from 'express';
import {
    createBlogController,
    getAllBlogsController,
    getBlogController,
    updateBlogController,
    deleteBlogController,
    getMyBlogController
} from '../Controllers/blogControllers.js';
import { isAuthorized } from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multerMiddleware.js';

const blogRouter = express.Router();

blogRouter.post('/create',isAuthorized,upload, createBlogController);
blogRouter.get('/all',getAllBlogsController);
blogRouter.get('/:id', getBlogController);
blogRouter.put('/update/:id', isAuthorized, upload, updateBlogController);
blogRouter.delete('/delete/:id', isAuthorized, deleteBlogController);
blogRouter.get('/myblogs',getMyBlogController);
export default blogRouter;

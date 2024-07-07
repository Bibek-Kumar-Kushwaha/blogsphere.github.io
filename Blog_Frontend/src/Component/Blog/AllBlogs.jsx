import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]); // State to store blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/blog/all');
        const publishedBlogs = response.data.blogs.filter(blog => blog.published); // Filter published blogs
        setBlogs(publishedBlogs);
        console.log(publishedBlogs); // Log the filtered blogs for debugging
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Published Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <img
              src={blog.mainImage.url}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{blog.intro.substring(0, 200)}...</p>
              <p className="text-sm text-gray-600">Category: {blog.category}</p>
              <p className="text-sm text-gray-600">Author: {blog.authorName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

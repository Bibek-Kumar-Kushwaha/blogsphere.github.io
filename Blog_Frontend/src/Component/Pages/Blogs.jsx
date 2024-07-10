import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/blog/all');
        const publishedBlogs = response.data.blogs.filter(blog => blog.published); // Filter published blogs
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error(error.response?.data?.message);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[90%]  mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Published Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <img
                src={blog.mainImage.url}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden text-nowrap text-ellipsis">{blog.title}</h2>
                <p className="text-sm text-gray-600">Category: {blog.category}</p>
                <p className="text-sm text-gray-600">Author: {blog.authorName}</p>
              </div>
              <div className="w-[90%] flex justify-between m-auto">
                <div className="">
                  <img src={blog.authorAvatar} alt="" className='w-20 h-20 rounded-full object-cover object-top' />
                </div>
                <div className="my-auto">
                  <Link to={`singleblog/${blog._id}`}
                    className='shadow-md shadow-slate-800 bg-[#FFD803] text-[#272343] px-4 py-1 rounded-md text-lg font-semibold hover:bg-[#272343] hover:text-[#F3FBFB] transition-colors duration-300'
                  >
                    View Me
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Blogs;

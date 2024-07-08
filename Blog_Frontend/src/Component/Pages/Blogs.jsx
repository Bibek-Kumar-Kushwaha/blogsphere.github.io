import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/blog/all',
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const publishedBlogs = response.data.blogs.filter(blog => blog.published); 
        setBlogs(publishedBlogs);
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
          <div key={blog._id} className="bg-white shadow-md rounded overflow-hidden">
            <img
              src={blog.mainImage.url}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
              
              <p className="text-sm text-gray-600 mb-4">{blog.category}</p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{blog.paraOneTitle}</h3>
                <p className="text-sm text-gray-600">{blog.paraOneIntro}</p>
                <p className="text-sm text-gray-600 mt-2">{blog.paraOneDescription}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{blog.paraTwoTitle}</h3>
                <p className="text-sm text-gray-600">{blog.paraTwoIntro}</p>
                <p className="text-sm text-gray-600 mt-2">{blog.paraTwoDescription}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{blog.paraThreeTitle}</h3>
                <p className="text-sm text-gray-600">{blog.paraThreeIntro}</p>
                <p className="text-sm text-gray-600 mt-2">{blog.paraThreeDescription}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={blog.secondaryImageOne.url}
                  alt={blog.title}
                  className="w-full h-32 object-cover rounded"
                />
                <img
                  src={blog.secondaryImageTwo.url}
                  alt={blog.title}
                  className="w-full h-32 object-cover rounded"
                />
              </div>

              <div className="flex items-center mb-2">
                <img
                  src={blog.authorAvatar}
                  alt={blog.authorName}
                  className="w-10 h-10 rounded-full mr-2 object-cover object-top"
                />
                <p className="text-sm text-gray-600">{blog.authorName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

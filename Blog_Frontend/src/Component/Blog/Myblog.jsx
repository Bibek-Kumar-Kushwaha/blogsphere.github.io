import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]); // Use an array to store multiple blogs
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch all blogs belonging to the user with id
        const response = await axios.get(`http://localhost:3000/api/v1/blog/myblogs/${id}`);
        setBlogs(response.data.blogs); // Set the fetched blogs into state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [id]); // Depend on id to refetch when id changes

  if (blogs.length === 0) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="w-full mt-4 bg-[#F3FBFB] text-[#272343]">
      <div className="w-[90%] mx-auto">
        {blogs.map(blog => (
          <div key={blog._id} className="mb-8">
            <div className="text-3xl font-bold mb-4">{blog.title}</div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4 font-semibold">
              <div className="my-auto p-3">
                <div className="text-sm text-gray-600">Published: {new Date(blog.updatedAt).toDateString()}</div>
                <div className="text-sm text-gray-600">Category: {blog.category}</div>
              </div>
              <div className="my-auto text-center">
                <div className="mb-2">
                  <img src={blog.authorAvatar} alt="Author Avatar" className="w-16 h-16 rounded-full mx-auto" />
                </div>
                <div className="text-sm text-gray-800">Author: {blog.authorName}</div>
              </div>
            </div>

            {/* Paragraph One */}
            <div className="my-6">
              {blog.mainImage && <img src={blog.mainImage.url} alt="Main" className="w-full h-auto mb-4 rounded-lg" />}
              <div className="text-xl font-semibold mb-2">{blog.paraOneTitle}</div>
              <div className="text-gray-700 mb-2">{blog.paraOneIntro}</div>
              <div className="text-gray-700">{blog.paraOneDescription}</div>
            </div>

            {/* Secondary Images and Paragraphs */}
            <div className="my-6">
              {blog.secondaryImageOne && <img src={blog.secondaryImageOne.url} alt="Secondary One" className="w-full h-auto mb-4 rounded-lg" />}
              <div className="text-xl font-semibold mb-2">{blog.paraTwoTitle}</div>
              <div className="text-gray-700 mb-2">{blog.paraTwoIntro}</div>
              <div className="text-gray-700">{blog.paraTwoDescription}</div>
            </div>

            <div className="my-6">
              {blog.secondaryImageTwo && <img src={blog.secondaryImageTwo.url} alt="Secondary Two" className="w-full h-auto mb-4 rounded-lg" />}
              <div className="text-xl font-semibold mb-2">{blog.paraThreeTitle}</div>
              <div className="text-gray-700 mb-2">{blog.paraThreeIntro}</div>
              <div className="text-gray-700">{blog.paraThreeDescription}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;

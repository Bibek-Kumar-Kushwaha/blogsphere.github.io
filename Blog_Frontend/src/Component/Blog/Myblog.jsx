import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Context/ModeContext';
import { Navigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/myblogs/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBlogs(response.data.blogs);
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [id]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/blog/delete/${blogId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast('Deleted');
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Cannot delete:', error);
      toast.error(error.response?.data?.message);
    }
  };

  if (!isAuth) {
    return (
      <div>
        <Navigate to={"/"} />
      </div>
    );
  }

  if (blogs.length === 0) {
    return <div className='w-[90%] mx-auto text-red-600 text-4xl'>No Blog Posts Yet</div>;
  }

  return (
    <div className="w-full bg-[#F3FBFB] text-[#272343] p-3">
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

            {/* Secondary Images and Paragraphs one */}
            <div className="my-6">
              {blog.secondaryImageOne && <img src={blog.secondaryImageOne.url} alt="Secondary One" className="w-full h-auto mb-4 rounded-lg" />}
              <div className="text-xl font-semibold mb-2">{blog.paraTwoTitle}</div>
              <div className="text-gray-700 mb-2">{blog.paraTwoIntro}</div>
              <div className="text-gray-700">{blog.paraTwoDescription}</div>
            </div>

            {/* Secondary Images and Paragraphs two */}
            <div className="my-6">
              {blog.secondaryImageTwo && <img src={blog.secondaryImageTwo.url} alt="Secondary Two" className="w-full h-auto mb-4 rounded-lg" />}
              <div className="text-xl font-semibold mb-2">{blog.paraThreeTitle}</div>
              <div className="text-gray-700 mb-2">{blog.paraThreeIntro}</div>
              <div className="text-gray-700">{blog.paraThreeDescription}</div>
            </div>

            <button
              onClick={() => handleDelete(blog._id)}
              className="shadow-md shadow-slate-800 bg-[#FFD803] text-[#272343] px-4 py-1 rounded-md text-lg font-semibold hover:bg-[#272343] hover:text-[#F3FBFB] transition-colors duration-300"
            >
              Delete Me
            </button>
            <Link
             to={`/update/${blog._id}`}
              className="shadow-md shadow-slate-800 bg-[#FFD803] text-[#272343] px-4 py-1 rounded-md text-lg font-semibold hover:bg-[#272343] hover:text-[#F3FBFB] transition-colors duration-300 mx-3"
            >
              Update Me
            </Link>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default MyBlog;

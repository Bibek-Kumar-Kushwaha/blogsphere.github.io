import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/${id}`);
        setBlog(response.data.blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error(error.response?.data?.message);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const {
    title,
    updatedAt,
    category,
    authorAvatar,
    authorName,
    mainImage,
    paraOneTitle,
    paraOneIntro,
    paraOneDescription,
    paraTwoTitle,
    paraTwoIntro,
    paraTwoDescription,
    paraThreeTitle,
    paraThreeIntro,
    paraThreeDescription,
    secondaryImageOne,
    secondaryImageTwo
  } = blog;

  return (
    <div className="w-full mt-4 bg-[#F3FBFB] text-[#272343]">
      <div className="w-[90%] mx-auto">
        <div className="text-3xl font-bold mb-4">{title}</div>

        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4 font-semibold">
          <div className="my-auto p-3">
            <div className="text-sm text-gray-600">Published: {new Date(updatedAt).toDateString()}</div>
            <div className="text-sm text-gray-600">Category: {category}</div>
          </div>
          <div className="my-auto text-center">
            <div className="mb-2">
               <img src={authorAvatar} alt="Author Avatar" className="w-16 h-16 rounded-full mx-auto" />
            </div>
            <div className="text-sm text-gray-800">Author: {authorName}</div>
          </div>
        </div>

        {/* Paragraph One */}
        <div className="my-6">
          {mainImage && <img src={mainImage.url} alt="Main" className="w-full h-auto mb-4 rounded-lg" />}
          <div className="text-xl font-semibold mb-2">{paraOneTitle}</div>
          <div className="text-gray-700 mb-2">{paraOneIntro}</div>
          <div className="text-gray-700">{paraOneDescription}</div>
        </div>

        {/* Paragraph Two */}
        <div className="my-6">
          {secondaryImageOne && <img src={secondaryImageOne.url} alt="Secondary One" className="w-full h-auto mb-4 rounded-lg" />}
          <div className="text-xl font-semibold mb-2">{paraTwoTitle}</div>
          <div className="text-gray-700 mb-2">{paraTwoIntro}</div>
          <div className="text-gray-700">{paraTwoDescription}</div>
        </div>

        {/* Paragraph Three */}
        <div className="my-6">
          {secondaryImageTwo && <img src={secondaryImageTwo.url} alt="Secondary Two" className="w-full h-auto mb-4 rounded-lg" />}
          <div className="text-xl font-semibold mb-2">{paraThreeTitle}</div>
          <div className="text-gray-700 mb-2">{paraThreeIntro}</div>
          <div className="text-gray-700">{paraThreeDescription}</div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default SingleBlog;

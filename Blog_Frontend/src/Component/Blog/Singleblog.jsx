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
    secondaryImageTwo,
  } = blog;

  return (
    <div className="w-full bg-background text-primary py-8">
      <div className="w-[90%] mx-auto max-w-4xl">
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 uppercase">{title}</div>

        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-6 font-semibold">
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <div className="text-sm text-gray-600">Published: {new Date(updatedAt).toDateString()}</div>
            <div className="text-sm text-gray-600">Category: {category}</div>
          </div>
          <div className="text-center">
            <img
              src={authorAvatar}
              alt={`Avatar of ${authorName}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2"
            />
            <div className="text-sm text-secondary uppercase">Author : {authorName}</div>
          </div>
        </div>

        {/* Paragraph One with Image on the Right */}
        <div className="flex flex-col sm:flex-row-reverse items-center my-8">
          {mainImage && (
            <img
              src={mainImage.url}
              alt="Paragraph One Image"
              className="w-full sm:w-64 h-auto mb-6 sm:mb-0 sm:ml-6 rounded-lg"
            />
          )}
          <div>
            <div className="text-lg sm:text-xl font-bold mb-4">{paraOneTitle}</div>
            <div className="text-base sm:text-lg text-black mb-2">{paraOneIntro}</div>
            <div className="text-base sm:text-lg text-black">{paraOneDescription}</div>
          </div>
        </div>

        {/* Paragraph Two with Image on the Left */}
        <div className="flex flex-col sm:flex-row items-center my-8">
          {secondaryImageOne && (
            <img
              src={secondaryImageOne.url}
              alt="Secondary Image One"
              className="w-full sm:w-64 h-auto mb-6 sm:mb-0 sm:mr-6 rounded-lg"
            />
          )}
          <div>
            <div className="text-lg sm:text-xl font-bold mb-4">{paraTwoTitle}</div>
            <div className="text-base sm:text-lg text-gray-700 mb-2">{paraTwoIntro}</div>
            <div className="text-base sm:text-lg text-gray-700">{paraTwoDescription}</div>
          </div>
        </div>

        {/* Paragraph Three with Image on the Right */}
        <div className="flex flex-col sm:flex-row-reverse items-center my-8">
          {secondaryImageTwo && (
            <img
              src={secondaryImageTwo.url}
              alt="Secondary Image Two"
              className="w-full sm:w-64 h-auto mb-6 sm:mb-0 sm:ml-6 rounded-lg"
            />
          )}
          <div>
            <div className="text-lg sm:text-xl font-bold mb-4">{paraThreeTitle}</div>
            <div className="text-base sm:text-lg text-gray-700 mb-2">{paraThreeIntro}</div>
            <div className="text-base sm:text-lg text-gray-700">{paraThreeDescription}</div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default SingleBlog;

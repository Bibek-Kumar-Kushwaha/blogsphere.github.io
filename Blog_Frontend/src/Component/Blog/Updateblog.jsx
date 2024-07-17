import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/ModeContext'; 
import { Navigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UpdateBlog = () => { 
  const { id } = useParams();
  const { isAuth } = useContext(AppContext);
  const [blog, setBlog] = useState(null);
  axios.defaults.withCredentials = true;
  const [inputValues, setInputValues] = useState({
    title: '',
    paraOneIntro: '',
    paraOneTitle: '',
    paraOneDescription: '',
    paraTwoIntro: '',
    paraTwoTitle: '',
    paraTwoDescription: '',
    paraThreeIntro: '',
    paraThreeTitle: '',
    paraThreeDescription: '',
    category: '',
    published: false,
  });
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImageOne, setSecondaryImageOne] = useState(null);
  const [secondaryImageTwo, setSecondaryImageTwo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    switch (name) {
      case 'mainImage':
        setMainImage(files[0]);
        break;
      case 'secondaryImageOne':
        setSecondaryImageOne(files[0]);
        break;
      case 'secondaryImageTwo':
        setSecondaryImageTwo(files[0]);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      Object.keys(inputValues).forEach((key) => {
        formData.append(key, inputValues[key]);
      });

      if (mainImage) formData.append('mainImage', mainImage);
      if (secondaryImageOne) formData.append('secondaryImageOne', secondaryImageOne);
      if (secondaryImageTwo) formData.append('secondaryImageTwo', secondaryImageTwo);

      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/blog/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Blog updated successfully:', response.data);

      setInputValues({
        title: '',
        paraOneIntro: '',
        paraOneTitle: '',
        paraOneDescription: '',
        paraTwoIntro: '',
        paraTwoTitle: '',
        paraTwoDescription: '',
        paraThreeIntro: '',
        paraThreeTitle: '',
        paraThreeDescription: '',
        category: '',
        published: false,
      });
      setMainImage(null);
      setSecondaryImageOne(null);
      setSecondaryImageTwo(null);
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Error updating blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/${id}`);
        setBlog(response.data.blog);
        setInputValues({
          title: response.data.blog.title || '',
          paraOneIntro: response.data.blog.paraOneIntro || '',
          paraOneTitle: response.data.blog.paraOneTitle || '',
          paraOneDescription: response.data.blog.paraOneDescription || '',
          paraTwoIntro: response.data.blog.paraTwoIntro || '',
          paraTwoTitle: response.data.blog.paraTwoTitle || '',
          paraTwoDescription: response.data.blog.paraTwoDescription || '',
          paraThreeIntro: response.data.blog.paraThreeIntro || '',
          paraThreeTitle: response.data.blog.paraThreeTitle || '',
          paraThreeDescription: response.data.blog.paraThreeDescription || '',
          category: response.data.blog.category || '',
          published: response.data.blog.published || false,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error(error.response?.data?.message);
      }
    };
    fetchBlog();
  }, [id]);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-[#F3FBFB] font-semibold">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#272343]">Update Blog Post</h1>
        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold ml-2 text-[#272343]">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputValues.title}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paraOneTitle" className="block text-sm font-bold ml-2 text-[#272343]">
              Title (Paragraph One)
            </label>
            <input
              type="text"
              id="paraOneTitle"
              name="paraOneTitle"
              value={inputValues.paraOneTitle}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paraOneIntro" className="block text-sm font-bold ml-2 text-[#272343]">
              Introduction (Paragraph One)
            </label>
            <textarea
              id="paraOneIntro"
              name="paraOneIntro"
              value={inputValues.paraOneIntro}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              rows="2"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="paraOneDescription" className="block text-sm font-bold ml-2 text-[#272343]">
              Description (Paragraph One)
            </label>
            <textarea
              id="paraOneDescription"
              name="paraOneDescription"
              value={inputValues.paraOneDescription}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="paraTwoTitle" className="block text-sm font-bold ml-2 text-[#272343]">
              Title (Paragraph Two)
            </label>
            <input
              type="text"
              id="paraTwoTitle"
              name="paraTwoTitle"
              value={inputValues.paraTwoTitle}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paraTwoIntro" className="block text-sm font-bold ml-2 text-[#272343]">
              Introduction (Paragraph Two)
            </label>
            <textarea
              id="paraTwoIntro"
              name="paraTwoIntro"
              value={inputValues.paraTwoIntro}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              rows="2"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="paraTwoDescription" className="block text-sm font-bold ml-2 text-[#272343]">
              Description (Paragraph Two)
            </label>
            <textarea
              id="paraTwoDescription"
              name="paraTwoDescription"
              value={inputValues.paraTwoDescription}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="paraThreeTitle" className="block text-sm font-bold ml-2 text-[#272343]">
              Title (Paragraph Three)
            </label>
            <input
              type="text"
              id="paraThreeTitle"
              name="paraThreeTitle"
              value={inputValues.paraThreeTitle}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paraThreeIntro" className="block text-sm font-bold ml-2 text-[#272343]">
              Introduction (Paragraph Three)
            </label>
            <textarea
              id="paraThreeIntro"
              name="paraThreeIntro"
              value={inputValues.paraThreeIntro}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              rows="2"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="paraThreeDescription" className="block text-sm font-bold ml-2 text-[#272343]">
              Description (Paragraph Three)
            </label>
            <textarea
              id="paraThreeDescription"
              name="paraThreeDescription"
              value={inputValues.paraThreeDescription}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-bold ml-2 text-[#272343]">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={inputValues.category}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mainImage" className="block text-sm font-bold ml-2 text-[#272343]">
              Main Image
            </label>
            <input
              type="file"
              id="mainImage"
              name="mainImage"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secondaryImageOne" className="block text-sm font-bold ml-2 text-[#272343]">
              Secondary Image One
            </label>
            <input
              type="file"
              id="secondaryImageOne"
              name="secondaryImageOne"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secondaryImageTwo" className="block text-sm font-bold ml-2 text-[#272343]">
              Secondary Image Two
            </label>
            <input
              type="file"
              id="secondaryImageTwo"
              name="secondaryImageTwo"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="published" className="block text-sm font-bold ml-2 text-[#272343]">
              Published
            </label>
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={inputValues.published}
              className="w-4 h-4 text-[#272343] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#272343]"
              onChange={(e) => setInputValues({ ...inputValues, published: e.target.checked })}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`shadow-md shadow-slate-800 bg-[#FFD803] text-[#272343] px-4 py-1 rounded-md text-lg font-semibold hover:bg-[#272343] hover:text-[#F3FBFB] transition-colors duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default UpdateBlog;

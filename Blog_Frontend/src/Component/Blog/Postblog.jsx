import React, { useState } from 'react';
import axios from 'axios';

const PostBlog = () => {
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
      // Create FormData object
      const formData = new FormData();
      formData.append('title', inputValues.title);
      formData.append('paraOneIntro', inputValues.paraOneIntro);
      formData.append('paraOneTitle', inputValues.paraOneTitle);
      formData.append('paraOneDescription', inputValues.paraOneDescription);
      formData.append('paraTwoIntro', inputValues.paraTwoIntro);
      formData.append('paraTwoTitle', inputValues.paraTwoTitle);
      formData.append('paraTwoDescription', inputValues.paraTwoDescription);
      formData.append('paraThreeIntro', inputValues.paraThreeIntro);
      formData.append('paraThreeTitle', inputValues.paraThreeTitle);
      formData.append('paraThreeDescription', inputValues.paraThreeDescription);
      formData.append('category', inputValues.category);
      formData.append('published', inputValues.published);

      // Append images if they exist
      if (mainImage) {
        formData.append('mainImage', mainImage);
      }
      if (secondaryImageOne) {
        formData.append('secondaryImageOne', secondaryImageOne);
      }
      if (secondaryImageTwo) {
        formData.append('secondaryImageTwo', secondaryImageTwo);
      }

      // Make POST request to server
      const response = await axios.post('http://localhost:3000/api/v1/blog/create', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Blog created successfully:', response.data);
      // Reset form state after successful submission
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
      console.error('Error creating blog:', error);
      setError('Error creating blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className=" bg-[#F3FBFB] font-semibold">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-[#272343]">Create a New Blog Post</h1>
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainImage" className="block text-sm font-bold ml-2 text-[#272343]">
                Main Image (Image For Paragraph One)
              </label>
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                className="file-input w-full"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="secondaryImageOne" className="block text-sm font-bold ml-2 text-[#272343]">
                Secondary Image One (Image For Paragraph Two)
              </label>
              <input
                type="file"
                id="secondaryImageOne"
                name="secondaryImageOne"
                className="file-input w-full"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="secondaryImageTwo" className="block text-sm font-bold ml-2 text-[#272343]">
                Secondary Image Two (Image For Paragraph Three)
              </label>
              <input
                type="file"
                id="secondaryImageTwo"
                name="secondaryImageTwo"
                className="file-input w-full"
                onChange={handleFileChange}
                accept="image/*"
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
                className="w-7 h-7 ml-2"
                onChange={(e) => setInputValues({ ...inputValues, published: e.target.checked })}
              />
            </div>
            {/* Error message */}
            {error && <div className="mt-4 text-red-600">{error}</div>}
            <button
              type="submit"
              className={`bg-[#FFD803] text-[#272343] px-4 py-2 rounded-md transition-colors duration-300 ${loading ? 'cursor-not-allowed' : 'hover:bg-[#272343] hover:text-[#F3FBFB]'
                }`}
              disabled={loading}
              aria-label="Post_Blog"
            >
              {loading ? 'Posting...' : 'Post Blog'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlog;

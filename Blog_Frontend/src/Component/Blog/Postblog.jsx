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
      const inputValues = new inputValues();
      inputValues.append('title', inputValues.title);
      inputValues.append('paraOneIntro', inputValues.paraOneIntro);
      inputValues.append('paraOneTitle', inputValues.paraOneTitle);
      inputValues.append('paraOneDescription', inputValues.paraOneDescription);
      inputValues.append('paraTwoIntro', inputValues.paraTwoIntro);
      inputValues.append('paraTwoTitle', inputValues.paraTwoTitle);
      inputValues.append('paraTwoDescription', inputValues.paraTwoDescription);
      inputValues.append('paraThreeIntro', inputValues.paraThreeIntro);
      inputValues.append('paraThreeTitle', inputValues.paraThreeTitle);
      inputValues.append('paraThreeDescription', inputValues.paraThreeDescription);
      inputValues.append('category', inputValues.category);
      inputValues.append('published', inputValues.published);

      if (mainImage) {
        inputValues.append('mainImage', mainImage);
      }
      if (secondaryImageOne) {
        inputValues.append('secondaryImageOne', secondaryImageOne);
      }
      if (secondaryImageTwo) {
        inputValues.append('secondaryImageTwo', secondaryImageTwo);
      }
      console.log(...inputValues.entries());
      const response = await axios.post('http://localhost:3000/api/v1/blog/create', inputValues, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Blog created successfully:', response.data);
      // Reset form state after successful submission
   
      // setInputValues({
      //   title: '',
      //   paraOneIntro: '',
      //   paraOneTitle: '',
      //   paraOneDescription: '',
      //   paraTwoIntro: '',
      //   paraTwoTitle: '',
      //   paraTwoDescription: '',
      //   paraThreeIntro: '',
      //   paraThreeTitle: '',
      //   paraThreeDescription: '',
      //   category: '',
      //   published: false,
    
      // });
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
      <div className="w-full bg-[#F3FBFB]">
        <div className="w-[90%] mx-auto mt-8">
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#272343]"
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
      {error && <p>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className=" bg-[#FFD803] hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
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

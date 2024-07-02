import React from 'react';
import Logo from '../../assets/BlogSphere.jpeg';

const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundColor: '#F3FBFB' }}>
      <img src={Logo} alt="BlogSphere Logo" className="absolute inset-0 object-cover w-full h-full opacity-40" />
      <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center text-gray-900">
          <h1 className="md:text-6xl text-4xl font-bold mb-4">Your BlogSphere</h1>
          <p className="md:text-3xl text-2xl mb-8 font-semibold">Engage with insightful blogs from around the world.</p>
          <a href="/blogs" className="bg-yellow-400 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 inline-block">Explore Blogs</a>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/NotFound.png';

const Nopage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#F3FBFB] via-[#BAE8E8] to-[#FFD803]">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-[#272343]">404 - Page Not Found</h2>
        <p className="text-lg text-center text-[#272343] mt-4">Oops! The page you are looking for does not exist.</p>
        <img src={notFound} alt="Error 404" className="mt-8 mx-auto rounded-md shadow-md" style={{ maxWidth: '250px' }} />
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="bg-[#FFD803] text-[#272343] px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#3ABEF9] transition-colors duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nopage;

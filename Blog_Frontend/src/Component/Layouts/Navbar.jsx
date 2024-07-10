import React, { useState, useEffect, useContext } from 'react';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Logo from '../../assets/BlogSphere.jpeg';
import { Link,Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from '../../Context/ModeContext.jsx';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuth, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuth(!!token && !!user);
  }, [isAuth]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clear tokens from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Update isAuthenticated
      setIsAuth(false);

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed!');
    }
  };
   
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="w-full bg-[#FFD803] font-semibold sticky top-0 left-0 z-20 shadow-md shadow-slate-950">
        <div className="flex justify-between w-[90%] h-[48px] mx-auto">
          <div className="flex items-center">
            <img src={Logo} alt="logo" className='w-10 h-10 rounded-md bg-[#BAE8E8]' />
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-6 font-bold text-[#272343]">
              <li className="hover:scale-110 transition-transform">
                <Link to='/'>Home</Link>
              </li>
              <li className="hover:scale-110 transition-transform">
                <Link to='/Blogs'>Blogs</Link>
              </li>
              <li className="hover:scale-110 transition-transform">
                <Link to='/Authors'>Authors</Link>
              </li>
              <li className="hover:scale-110 transition-transform">
                <Link to='/About'>About</Link>
              </li>
              <li className="hover:scale-110 transition-transform">
                <Link to='/Contact'>Contact</Link>
              </li>
              <li className="hover:scale-110 transition-transform">
                <Link to='/Services'>Services</Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="shadow-md shadow-slate-800 bg-[#FFD803] text-[#272343] px-4 py-1 rounded-md text-lg font-semibold hover:bg-[#272343] hover:text-[#F3FBFB] transition-colors duration-300">
                {isAuth ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to='/login'>Login</Link>
                )}
              </span>

              {/* dark and light mode */}
              {/* <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller hidden"
              />
              <svg
                className="stroke-[#272343] fill-[#272343] w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="stroke-[#272343] fill-[#272343] w-6 h-6 hidden"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label> */}
            </div>
            <button
              onClick={toggleNav}
              className="md:hidden p-2 w-10 h-10 flex items-center justify-center text-sm text-[#F3FBFB] bg-[#272343] rounded-lg hover:bg-[#FFD803] hover:text-[#272343] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-300 my-auto"
            >
              {isNavOpen ? <ImCross className="text-3xl" /> : <FaBars className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>
      {isNavOpen && (
        <div className="md:hidden bg-[#FFD803] ">
          <ul className="flex flex-col gap-6 font-bold text-[#272343] text-center p-4">
            <li className="hover:scale-110 transition-transform">
              <Link to='/'>Home</Link>
            </li>
            <li className="hover:scale-110 transition-transform">
              <Link to='/Blogs'>Blogs</Link>
            </li>
            <li className="hover:scale-110 transition-transform">
              <Link to='/Authors'>Authors</Link>
            </li>
            <li className="hover:scale-110 transition-transform">
              <Link to='/About'>About</Link>
            </li>
            <li className="hover:scale-110 transition-transform">
              <Link to='/Contact'>Contact</Link>
            </li>
            <li className="hover:scale-110 transition-transform">
              <Link to='/Services'>Services</Link>
            </li>
          </ul>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default Navbar;

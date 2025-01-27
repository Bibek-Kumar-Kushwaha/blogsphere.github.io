import React, { useState, useEffect, useContext } from 'react';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Logo from '../../assets/BlogSphere.jpeg';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from '../../Context/ModeContext.jsx';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuth, setIsAuth } = useContext(AppContext);
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
    setIsAuth(!!token && !!user);
  }, [isAuth, setIsAuth]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
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
      <div className="w-full bg-button-bg font-semibold sticky top-0 left-0 z-20 shadow-md shadow-slate-950">
        <div className="flex justify-between w-[90%] h-[48px] mx-auto">
          <div className="flex items-center">
            <img src={Logo} alt="logo" className='w-10 h-10 rounded-md bg-button-bg' />
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-6 font-bold text-text">
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
                <Link to='/Contact'>Contact</Link>
              </li>
              <li className="hover:scale-110 transition-transform">
                <Link to='/Services'>Services</Link>
              </li>
              {(user?.role === 'Author' || user?.role === 'Admin')  && (
                <li className="hover:scale-110 transition-transform">
                  <Link to='/author/dashboard'>Dashboard</Link>
                </li>
              )}
              {user?.role === 'Admin' && (
                <li className="hover:scale-110 transition-transform">
                  <Link to='/admin/dashboard'>AdminDashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="shadow-md shadow-slate-800 bg-button-bg text-text px-4 py-1 rounded-md text-lg font-semibold hover:hover:bg-button-hover-bg transition-colors duration-300">
                {isAuth ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to='/login'>Login</Link>
                )}
              </span>
            </div>
            <button
              onClick={toggleNav}
              className="shadow-md shadow-slate-800 md:hidden p-2 w-9 h-9 flex items-center justify-center text-sm rounded-lg text-text bg-bg-button-bg sa hover:hover:bg-button-hover-bg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-300 my-auto"
            >
              {isNavOpen ? <ImCross className="text-3xl" /> : <FaBars className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>
      {isNavOpen && (
  <div className="md:hidden bg-button-bg text-text font-bold text-center z-50 absolute top-[50px] left-0 w-full">
    <ul className="flex flex-col gap-6 font-bold text-text text-center p-4">
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
        <Link to='/Contact'>Contact</Link>
      </li>
      <li className="hover:scale-110 transition-transform">
        <Link to='/Services'>Services</Link>
      </li>
      {(user?.role === 'Author' || user?.role === 'Admin') && (
        <li className="hover:scale-110 transition-transform">
          <Link to='/author/dashboard'>Author Dashboard</Link>
        </li>
      )}
      {user?.role === 'Admin' && (
        <li className="hover:scale-110 transition-transform">
          <Link to='/admin/dashboard'>Admin Dashboard</Link>
        </li>
      )}
    </ul>
  </div>
)}

      <Toaster />
    </>
  );
}

export default Navbar;

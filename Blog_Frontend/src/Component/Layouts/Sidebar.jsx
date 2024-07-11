import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/myprofile`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error(error.response?.data?.message);
      }
    };

    fetchUser();
  }, []);

  const buttonClass = "shadow-md shadow-slate-800 bg-[#FFD803] text-[#272343] px-4 py-2 rounded-md text-base font-semibold hover:bg-[#272343] hover:text-[#F3FBFB] transition-colors duration-300 w-full text-center";

  return (
    <div className="w-full h-screen bg-[#F3FBFB] p-4 flex flex-col items-center">
      {user && (
        <div className="text-center my-4">
          <img 
            src={user.avatar.url} 
            alt="User Avatar" 
            className="w-32 h-32 rounded-full mx-auto" 
            style={{ backgroundColor: '#BAE8E8' }}
          />
          <h2 className="mt-2 text-xl font-semibold text-[#272343]">{user.username}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}
      <nav className="w-full mt-8">
        <ul className="w-[90%] mx-auto md:flex gap-x-4 md:justify-center grid grid-cols-2 gap-y-6">
          <li className="flex justify-center">
            <Link to={`/myprofile`} className={buttonClass}>
              My Profile
            </Link>
          </li>
          <li className="flex justify-center">
            {user && (
              <Link to={`/myblog/${user._id}`} className={buttonClass}>
                My Blog
              </Link>
            )}
          </li>
          <li className="flex justify-center">
            {user && (
              <Link to={`/update/${user._id}`} className={buttonClass}>
                Updated
              </Link>
            )}
          </li>
          <li className="flex justify-center">
            <Link to={`/postblog`} className={buttonClass}>
              Create
            </Link>
          </li>
          <li className="flex justify-center">
            {user && (
              <Link to={`/delete/${user._id}`} className={buttonClass}>
                Deleted
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Toaster />
    </div>
  );
};

export default Sidebar;

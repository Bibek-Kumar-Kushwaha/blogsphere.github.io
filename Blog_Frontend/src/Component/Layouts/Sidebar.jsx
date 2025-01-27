import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;
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

  const buttonClass = "shadow-md shadow-slate-800 bg-button-bg text-text px-4 py-2 rounded-md text-base font-semibold hover:bg-button-hover-bg hover:text-text transition-colors duration-300 w-full text-center";

  return (
    <div className="w-full h-screen bg-background p-4 flex flex-col items-center">
      {user && (
        <div className="text-center my-4">
          <img
            src={user.avatar.url}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto"
            style={{ backgroundColor: '#BAE8E8' }}
          />
          <h2 className="mt-2 text-xl font-semibold text-text">{user.username}</h2>
          <p className="text-sm text-secondary">{user.email}</p>
        </div>
      )}
      <nav className="w-full mt-8">
        <ul className="w-[90%] mx-auto md:flex gap-x-4 md:justify-center grid grid-cols-2 gap-y-6">
          <li className="flex justify-center">
            <Link to={`/myprofile`} className={buttonClass}>
              View Profile
            </Link>
          </li>
          <li className="flex justify-center">
            {user && (
              <Link to={`/myblog/${user._id}`} className={buttonClass}>
                View Your Blog
              </Link>
            )}
          </li>
          <li className="flex justify-center">
            <Link to={`/postblog`} className={buttonClass}>
              Create New Blog
            </Link>
          </li>
        </ul>
      </nav>
      <Toaster />
    </div>
  );
};

export default Sidebar;

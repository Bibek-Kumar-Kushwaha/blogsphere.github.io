import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from "../../Context/ModeContext";
import { Navigate } from 'react-router-dom';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const { isAuth } = useContext(AppContext);
 console.log(isAuth)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/myprofile', {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (isAuth) {
      fetchUser();
    }
  }, [isAuth]);
  
  if (!isAuth) {
    return <div>
      <Navigate to={"/"} />
      </div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
      {isAuth ? (
        user ? (
          <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-center mb-4">
              <img
                src={user.avatar.url}
                alt={user.username}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 uppercase">{user.username}</h2>
              <p className="text-sm text-gray-600 lowercase">{user.email}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Details</h3>
              <p><span className="font-semibold">Role:</span> {user.role}</p>
              <p><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )
      ) : (
        <p className="text-center text-red-500">Please log in to access this page.</p>
      )}
    </div>
  );
};

export default MyProfile;

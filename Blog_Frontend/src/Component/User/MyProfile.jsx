import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProfile = () => {
  const [user, setUser] = useState(null); // State to store user data

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
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser(); 
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
      {user ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-4">
            <img
              src={user.avatar.url}
              alt={user.username}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Details</h3>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            <p><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toDateString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default MyProfile;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard.jsx';
import { AppContext } from '../../Context/ModeContext.jsx';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/alluser`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#F3FBFB] text-[#272343] p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
        <div className="mb-8 p-4 bg-[#BAE8E8] rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users: {users.total}</h2>
        </div>
        <div>
         {
            <UserCard user={users}/>
         }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

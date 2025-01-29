import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import UserCard from './UserCard.jsx';
import toast, {Toaster} from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/alluser`,
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
        toast.error(error.response?.data?.message);
        setError(error.message);
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

    if (error) {
      return <div>
        <Navigate to={"/"} />
        </div>;
    }

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center pt-2">User Dashboard</h1>
        <div className="mb-8 p-4 bg-background rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users: {users.total}</h2>
        </div>
        <div>
         {
            <UserCard user={users}/>
         }
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Dashboard;

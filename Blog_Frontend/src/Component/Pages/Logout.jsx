import React from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/ModeContext';

const Logout = () => {
  const{isAuth, setIsAuth} =  useContext(AppContext)

  const navigate = useNavigate(); 
  const LogoutUser = async () => {
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

      // Clear cookies from local storage if stored there
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');

      toast.success(response?.data?.message);
      navigate("/login"); // Navigate immediately after logout
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed!');
    }
  };

  return (
    <>
      <button onClick={LogoutUser} className="btn btn-primary">
        Logout
      </button>
      <Toaster />
    </>
  );
};

export default Logout;

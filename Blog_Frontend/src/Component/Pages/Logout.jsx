import React,{useContext} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Context/ModeContext'; 
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const { isAuth } = useContext(AppContext);
  const LogoutUser = async () => {
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

      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed!');
    }
  };
  if (!isAuth) {
    return <div>
      <Navigate to={"/"} />
      </div>;
  }
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

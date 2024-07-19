import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from "../../Context/ModeContext";
const Useauth = () => {
  const { setIsAuth, setUser } = useContext(AppContext);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );

      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuth(true);
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      throw error;
    }
  };

  return { refreshAccessToken };
};

export default Useauth;

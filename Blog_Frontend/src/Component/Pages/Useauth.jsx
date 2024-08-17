import { useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
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
    } catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  };

  useEffect(() => {
    // Call refreshAccessToken every minute
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 60 * 1000); // 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return { refreshAccessToken };
};

export default useAuth;

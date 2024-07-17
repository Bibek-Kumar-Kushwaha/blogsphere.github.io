import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from "../../Context/ModeContext";

const Login = () => {
  const { setIsAuth, isAuth } = useContext(AppContext);
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  axios.defaults.withCredentials = true;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        inputValues,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setInputValues({
        email: '',
        password: '',
      });

      toast.success(response?.data?.message);
      setIsAuth(true);
    } catch (error) {
      setError('Login failed. Please try again.');
      toast.error(error.response?.data?.message);
      setInputValues({
        email: '',
        password: '',
      });
      console.error(error);
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#F3FBFB] font-semibold">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg text-center text-[#272343]">Login</h3>
          <div className="mt-4 space-y-2">
            <label htmlFor="email" className="block text-[#272343]">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              aria-label="Enter your email"
              required
            />
          </div>
          <div className="mt-4 space-y-2 relative">
            <label htmlFor="password" className="block text-[#272343]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={inputValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              aria-label="Enter your password"
              required
            />
            <button
              type="button"
              className="font-semibold absolute top-7 right-3 text-[#FFF] cursor-pointer"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && (
            <div className="mt-4 text-red-600">
              {error}
            </div>
          )}
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className={`bg-[#FFD803] text-[#272343] px-4 py-2 rounded-md transition-colors duration-300 font-semibold ${loading ? 'cursor-not-allowed' : 'hover:bg-[#272343] hover:text-[#F3FBFB]'}`}
              disabled={loading}
              aria-label="Login"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="my-auto text-[#272343] font-bold">
              Not registered?
              <Link
                to="/register"
                className="underline text-[#272343] cursor-pointer mx-2 font-semibold"
                aria-label="Register"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;

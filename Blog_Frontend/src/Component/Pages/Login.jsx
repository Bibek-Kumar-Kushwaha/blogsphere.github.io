import React, { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from "../../Context/ModeContext";


const Login = () => {
  const{isAuth, setIsAuth} =  useContext(AppContext)

  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        inputValues,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user } = response.data;
          // Store token and user information in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
      setInputValues({
        email: '',
        password: '',
      });

      toast.success(response?.data?.message);
      setIsAuth(true);
      console.log('Login successful');

    } catch (error) {
      setError('Login failed. Please try again.');
      toast.error(error.response?.data?.message);
      setInputValues({
        email: '',
        password: '',
      });
      console.log(error)
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#050C9C] via-[#3572EF] to-[#3ABEF9] font-semibold">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg text-center text-[#272343]">Login</h3>
          {/* Email */}
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
          {/* Password */}
          <div className="mt-4 space-y-2">
            <label htmlFor="password" className="block text-[#272343]">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              aria-label="Enter your password"
              required
            />
          </div>
          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-600">
              {error}
            </div>
          )}
          {/* Button */}
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className={`bg-[#272343] text-[#F3FBFB] px-4 py-2 rounded-md transition-colors duration-300 ${loading ? 'cursor-not-allowed' : 'hover:bg-[#FFD803] hover:text-[#272343]'}`}
              disabled={loading}
              aria-label="Login"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="my-auto text-[#272343] font-bold">
              Not registered?
              <Link
                to="/register"
                className="underline text-blue-500 cursor-pointer mx-2 font-semibold"
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Reader',
  });
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', inputValues.username);
      formData.append('email', inputValues.email);
      formData.append('password', inputValues.password);
      formData.append('role', inputValues.role);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setInputValues({
        username: '',
        email: '',
        password: '',
        role: 'Reader',
      });
      setAvatar(null);
      toast.success(response?.data?.message);
      console.log('Registration successful');
    } catch (error) {
      setError('Registration failed. Please try again.');
      toast.error(error.response?.data?.message);
      setInputValues({
        username: '',
        email: '',
        password: '',
        role: 'Reader',
      });
      setAvatar(null);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#F3FBFB] font-semibold">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3 className="font-bold text-lg text-center text-[#272343]">Register</h3>

          {/* Image */}
          {avatar && (
            <div className="bg-[#BAE8E8] h-24 w-24 mx-auto rounded-full">
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
                className="rounded-full h-24 w-24"
              />
            </div>
          )}

          {/* Username */}
          <div className="mt-4 space-y-1">
            <label htmlFor="username" className="block text-[#272343] ml-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={inputValues.username}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your full name"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              aria-label="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mt-4 space-y-1">
            <label htmlFor="email" className="block text-[#272343] ml-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              aria-label="Enter your email"
              required
            />
          </div>

          {/* Role */}
          <div className="mt-4 space-y-1">
            <label htmlFor="role" className="block text-[#272343] ml-1">
              Role
            </label>
            <select
              name="role"
              value={inputValues.role}
              onChange={handleChange}
              className="w-80 px-3 py-1 border rounded-md outline-none"
              aria-label="Enter your Role"
              required
            >
              <option value="Author">Author</option>
              <option value="Reader">Reader</option>
            </select>
          </div>

          {/* Password */}
          <div className="mt-4 space-y-1">
            <label htmlFor="password" className="block text-[#272343] ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={inputValues.password}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                aria-label="Enter your password"
                required
              />
              <button
                type="button"
                className="font-semibold absolute top-1 right-3 text-[#FFF] cursor-pointer"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Choose profile photo */}
          <div className="mt-4 space-y-1">
            <label htmlFor="avatar" className="block text-[#272343] ml-1">
              Choose Your Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input w-full max-w-xs"
              aria-label="Choose your avatar"
            />
          </div>

          {/* Error Message */}
          {error && <div className="mt-4 text-red-600">{error}</div>}

          {/* Button */}
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className={`bg-[#FFD803] text-[#272343] px-4 py-2 rounded-md transition-colors duration-300 ${
                loading ? 'cursor-not-allowed' : 'hover:bg-[#272343] hover:text-[#F3FBFB]'
              }`}
              disabled={loading}
              aria-label="Register"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <p className="my-auto text-[#272343] font-bold">
              Already registered?
              <Link
                to="/login"
                className="underline text-[#272343] cursor-pointer mx-2 font-semibold"
                aria-label="Login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;

import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F3FBFB]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form autoComplete="off">
          <h3 className="font-bold text-lg text-center text-[#272343]">Register</h3>
          {/* Username */}
          <div className="mt-4 space-y-2">
            <label htmlFor="username" className="block text-[#272343]">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              placeholder="Enter your full name"
              className="w-80 px-3 py-1 border rounded-md outline-none"
            />
          </div>
          {/* Email */}
          <div className="mt-4 space-y-2">
            <label htmlFor="email" className="block text-[#272343]">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none"
            />
          </div>
          {/* Password */}
          <div className="mt-4 space-y-2">
            <label htmlFor="password" className="block text-[#272343]">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
            />
          </div>
          {/* Button */}
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className="bg-[#272343] text-[#F3FBFB] px-4 py-2 rounded-md hover:bg-[#FFD803] hover:text-[#272343] transition-colors duration-300"
            >
              Register
            </button>
            <p className="my-auto text-[#272343]">
              Already registered?
              <Link
                to="/login"
                className="underline text-blue-500 cursor-pointer mx-2"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

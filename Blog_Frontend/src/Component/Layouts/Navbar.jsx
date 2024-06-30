import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Logo from '../../assets/BlogSphere.jpeg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="w-full bg-[#FFD803]">
        <div className="flex justify-between w-[90%] h-[48px] mx-auto bg-[#FFD803]">
          <div className="bg-slate-600 w-10 h-10 my-auto rounded-md">
            <img src={Logo} alt="logo" className='rounded-md' />
          </div>
          <div className="my-auto hidden md:block ">
            <ul className="flex gap-6 font-bold my-auto text-[#272343]">
              <li className="hover:scale-110">
                <Link to='/'>Home</Link>
              </li>
              <li className="hover:scale-110">
                <Link to='/Blogs'>Blogs</Link>
              </li>
              <li className="hover:scale-110">
                <Link to='/Authors'>Authors</Link>
              </li>
              <li className="hover:scale-110">
                <Link to='/About'>About</Link>
              </li>
              <li className="hover:scale-110">
                <Link to='/Contact'>Contact</Link>
              </li>
              <li className="hover:scale-110">
                <Link to='/Services'>Services</Link>
              </li>
            </ul>
          </div>
          <div className="my-auto space-x-2 flex justify-between">
            <span className="font-bold my-auto bg-[#272343] text-[#F3FBFB] px-2 py-1 rounded-md">
              <Link to='/login'>Login</Link>
            </span>

            <span className="font-bold my-auto">
              <label className="grid cursor-pointer place-items-center">
                <input
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller col-span-2 col-start-1 row-start-1 bg-[#FFF]"
                />
                <svg
                  className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg
                  className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </span>
          </div>
          <button
            onClick={toggleNav}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#F3FBFB] bg-[#272343] rounded-lg md:hidden hover:bg-[#FFD803] hover:text-[#272343] focus:outline-none focus:ring-2 focus:ring-gray-200 font-bold my-auto transition-colors duration-300"
          >
            {isNavOpen ? <ImCross className="text-3xl" /> : <FaBars className="text-3xl" />}
          </button>

        </div>
      </div>
      {isNavOpen && (
        <div className="md:hidden bg-[#FFD803]">
          <ul className="flex flex-col gap-6 font-bold my-auto text-[#272343] text-center p-4">
            <li className="hover:scale-110">
              <Link to='/'>Home</Link>
            </li>
            <li className="hover:scale-110">
              <Link to='/Blogs'>Blogs</Link>
            </li>
            <li className="hover:scale-110">
              <Link to='/Authors'>Authors</Link>
            </li>
            <li className="hover:scale-110">
              <Link to='/About'>About</Link>
            </li>
            <li className="hover:scale-110">
              <Link to='/Contact'>Contact</Link>
            </li>
            <li className="hover:scale-110">
              <Link to='/Services'>Services</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;

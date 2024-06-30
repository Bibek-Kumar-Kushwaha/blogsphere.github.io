import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Pages/Login.jsx';
import Nopage from './Component/Pages/Nopage.jsx';
import Navbar from './Component/Layouts/Navbar.jsx';
import Register from './Component/Pages/Register.jsx';
import Sidebar from './Component/Layouts/Sidebar.jsx';
import Home from './Component/Pages/Home.jsx';
import Logout from './Component/Pages/Logout.jsx';
import Blogs from './Component/Pages/Blogs.jsx';
import Authors from './Component/Pages/Authors.jsx';
import About from './Component/Pages/About.jsx';
import Contact from './Component/Pages/Contact.jsx';
import Services from './Component/Pages/Services.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/authors" element={<Authors/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

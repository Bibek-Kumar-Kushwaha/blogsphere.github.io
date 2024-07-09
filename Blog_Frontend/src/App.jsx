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
import Dashboard from './Component/Admin/Dashboard.jsx';
import MyProfile from './Component/User/MyProfile.jsx';
import Postblog from './Component/Blog/Postblog.jsx';
import Footer from './Component/Pages/Footer.jsx';
import Myblog from './Component/Blog/Myblog.jsx';

import Updateblog from './Component/Blog/Updateblog.jsx';
import DeleteBlog from './Component/Blog/DeleteBlog.jsx';
import Singleblog from './Component/Blog/Singleblog.jsx';
import Alluser from './Component/Admin/Alluser.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postblog" element={<Postblog />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/myblog/:id" element={<Myblog />} />
        <Route path="/alluser" element={<Alluser/>}/>
        <Route path="/updateblog" element={<Updateblog />} />
        <Route path="blogs/singleblog/:id" element={<Singleblog/>}/>
        <Route path="/footer" element={<Footer />} />
        <Route path="/deleteblog" element={<DeleteBlog />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

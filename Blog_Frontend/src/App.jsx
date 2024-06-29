import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Pages/Login.jsx';
import Nopage from './Component/Pages/Nopage.jsx';
import Navbar from './Component/Layouts/Navbar.jsx';
import Register from './Component/Pages/Register.jsx';
import Sidebar from './Component/Layouts/Sidebar.jsx';
import Home from './Component/Pages/Home.jsx';
import Logout from './Component/Pages/Logout.jsx';

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
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/authors`);
      setAuthors(response.data.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="bg-[#F3FBFB] p-4 min-h-screen">
      <h1 className="text-[#272343] text-2xl font-bold mb-4">Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map(author => (
          <div key={author._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={author.avatar.url}
              alt={author.username}
              className="w-32 h-32 rounded-full mb-4 object-top object-cover"
            />
            <div className="text-[#272343] text-center">
              <h2 className="text-xl font-semibold uppercase">{author.username}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;

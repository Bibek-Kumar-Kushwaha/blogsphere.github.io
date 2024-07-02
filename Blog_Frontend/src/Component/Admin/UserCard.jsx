
import React from 'react';

const UserCard = ({ user }) => {
  return (
    user.data.map((data,id)=>{
      return(
        <div key={id} className="p-4 bg-white rounded-lg shadow-md mb-4">
        <div className="flex items-center">
          {/* <img
            className="w-16 h-16 rounded-full mr-4"
            src={`https://i.pravatar.cc/150?u=${user.email}`}
            alt={user.username}
          /> */}
          <div>
            <h2 className="text-xl font-semibold">{data.username}</h2>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-gray-600">{data.role}</p>
          </div>
        </div>
      </div>
      )
    })


  );
};

export default UserCard;

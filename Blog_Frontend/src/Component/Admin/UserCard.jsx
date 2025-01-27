import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="container mx-auto p-4 text-text">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {user.data.map((data, id) => ( 
          <div key={id} className="bg-background rounded-lg shadow-md p-4">
            <figure className="flex justify-center">
              <img
                className="w-32 h-32 rounded-full object-top object-cover"
                src={data.avatar.url}
                alt='your profile'
              />
            </figure>
            <div className="mt-4 font-semibold">
              <h2 className="text-lg font-semibold">Name: {data.username}</h2>
              <p className="text-sm text-secondary">Email: {data.email}</p>
              <p className="text-sm text-secondary">Role: {data.role}</p>
              <div className="mt-4 flex justify-end">
                <button 
                className="bg-button-bg hover:bg-button-hover-bg  text-text px-4 py-2 rounded-md shadow-md shadow-slate-600"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;

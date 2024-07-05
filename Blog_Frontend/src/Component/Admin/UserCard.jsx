import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="container mx-auto p-4 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {user.data.map((data, id) => (
          <div key={id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                className="w-full h-48 object-cover"
                src={data.avatar.url}
                alt={`${data.username}'s avatar`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name : {data.username}</h2>
              <p>Email : {data.email}</p>
              <p>Role : {data.role}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;

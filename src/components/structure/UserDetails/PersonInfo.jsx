import React, { useState } from "react";
import Profile from "../../../../public/user-image/profile.jpeg";

const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Lucky",
    email: "lucky_asp@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className="bg-white p-6 shadow rounded-xl">
      <div className="bg-white shadow rounded-xl p-6">
        <div className="text-center relative">
          <img
            src={Profile || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />

          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="mt-4 text-lg font-semibold border rounded px-2 py-1"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="block mx-auto mt-2 text-gray-700 border rounded px-2 py-1"
              />
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mt-4">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </>
          )}

          {/* Stats */}
          <div className="mt-4 flex justify-center gap-6">
            <div className="text-center">
              <p className="font-bold text-xl">$1,230</p>
              <span className="text-sm text-gray-500">Total Spent</span>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">18</p>
              <span className="text-sm text-gray-500">Orders</span>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">2</p>
              <span className="text-sm text-gray-500">Ongoing</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Change Profile Picture
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;

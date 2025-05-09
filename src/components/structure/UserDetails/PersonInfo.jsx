import React, { useContext, useState } from "react";
import Profile from "./user-image/profile.jpeg";
import { AuthContext } from "../../../auth/AuthWrapper";

const PersonalInfoSection = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

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
    <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
      <div className="text-center relative">
        {/* Profile Image - Responsive Sizing */}
        <img
          src={Profile || "https://via.placeholder.com/100"}
          alt="profile"
          className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full object-cover"
        />

        {/* Name & Email - Responsive Layout */}
        {isEditing ? (
          <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full text-sm sm:text-base border rounded px-2 py-1 sm:px-3 sm:py-2"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full text-xs sm:text-sm border rounded px-2 py-1 sm:px-3 sm:py-2"
            />
          </div>
        ) : (
          <div className="mt-2 sm:mt-4">
            <h2 className="text-sm sm:text-lg font-semibold">{user.name}</h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        )}

        {/* Stats - Responsive Layout */}
        <div className="mt-3 sm:mt-4 grid grid-cols-3 sm:flex sm:justify-center sm:gap-6">
          <div className="text-center">
            <p className="font-bold text-sm sm:text-xl">$1,230</p>
            <span className="text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Total </span>Spent
            </span>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm sm:text-xl">18</p>
            <span className="text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Total </span>Orders
            </span>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm sm:text-xl">2</p>
            <span className="text-xs sm:text-sm text-gray-500">Ongoing</span>
          </div>
        </div>

        {/* Buttons - Responsive Layout */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-center">
          <button
            type="button"
            className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Change<span className="hidden sm:inline"> Profile</span> Picture
          </button>
          <button
            type="button"
            onClick={handleEditToggle}
            className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;

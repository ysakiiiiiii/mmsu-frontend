import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import Profile from "./user-image/user.png";
import { AuthContext } from "../../../auth/AuthWrapper";

const PersonalInfoSection = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // Handle input changes for name and email
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Save profile changes to backend
  const saveProfileChanges = async () => {
    try {
      const res = await axios.post(
        "http://localhost/MMSU/mmsu-backend/profile/update_user_profile.php",
        {
          user_id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Profile updated successfully");
      } else {
        alert("Update failed: " + (res.data.message ?? "Unknown error"));
      }
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  // Toggle edit mode and save on "Save"
  const handleEditToggle = async () => {
    if (isEditing) {
      await saveProfileChanges();
    }
    setIsEditing((prev) => !prev);
  };

  // Trigger hidden file input click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle profile picture file selection and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("user_id", user.id);

    try {
      const res = await axios.post(
        "http://localhost/MMSU/mmsu-backend/profile/upload_profile_pic.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      if (res.data.success) {
        setUser((prev) => ({
          ...prev,
          profile_pic_url: res.data.profile_pic_url,
        }));
      } else {
        alert("Upload failed: " + (res.data.message ?? "No message"));
      }
    } catch (err) {
      if (err.response) {
        alert(
          "Upload failed: " + (err.response.data?.message ?? "Unknown error")
        );
      } else {
        alert("Network or CORS error: " + err.message);
      }
    }
  };

  const getProfilePicUrl = (url) => {
    if (!url || url === "null" || url.trim() === "") return Profile;
    return url.startsWith("http")
      ? url
      : `http://localhost${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const profilePicUrl = getProfilePicUrl(user.profile_pic_url);

  return (
    <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
      <div className="text-center relative">
        <img
          src={profilePicUrl}
          alt="profile"
          className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full object-cover"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

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

        {/* Example user stats */}
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

        {/* Buttons */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-center">
          <button
            type="button"
            onClick={handleImageClick}
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
  
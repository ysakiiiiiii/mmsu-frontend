import React, { useContext, useRef } from "react";
import axios from "axios";
import Profile from "./user-image/user.png";
import { AuthContext } from "../../../auth/AuthWrapper";

const PersonalInfoSection = () => {
  const { user, setUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);

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
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
  
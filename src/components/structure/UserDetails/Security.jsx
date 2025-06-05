import React, { useState, useContext } from "react";
import { AuthContext } from "../../../auth/AuthWrapper";

const SecuritySection = ({ userId }) => {
  const { logout } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    const newErrors = {};

    // Frontend validation
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (newPassword !== repeatPassword) {
      newErrors.repeatPassword = "Passwords don't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/MMSU/mmsu-backend/profile/changePassword.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      // Password changed successfully
      setErrors({});
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setSuccess(true);
      setShowForm(false);
      
      // Optional: Logout user after password change for security
      // logout();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
      <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">Security & Login</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1.5 rounded"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm"
              />
              {errors.currentPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm"
              />
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Repeat New Password
              </label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm"
              />
              {errors.repeatPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.repeatPassword}</p>
              )}
            </div>

            {errors.submit && (
              <p className="text-xs sm:text-sm text-red-600">{errors.submit}</p>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setErrors({});
                  setCurrentPassword("");
                  setNewPassword("");
                  setRepeatPassword("");
                }}
                className="text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        
        {success && (
          <div className="p-3 bg-green-50 rounded-md">
            <p className="text-xs sm:text-sm text-green-600">
              Password changed successfully!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SecuritySection;
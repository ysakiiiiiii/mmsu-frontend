import React, { useState, useEffect } from "react";

const UserProfileSection = ({ userId }) => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Current userId:", userId);
    const fetchProfile = async () => {
      if (!userId) {
        setIsLoading(false);
        setError("No user ID provided");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost/MMSU/mmsu-backend/profile/fetchPersonInfo.php?user_id=${userId}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setProfile({
          username: data.data.username || "",
          email: data.data.email || "",
          first_name: data.data.first_name || "",
          last_name: data.data.last_name || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost/MMSU/mmsu-backend/profile/updatePersonInfo.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: userId,
            username: profile.username,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save profile");
      }

      setIsEditing(false);
      setError(null);
      alert(data.message);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  return (
    <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl mb-6">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <h2 className="text-base sm:text-xl font-bold">Profile Information</h2>
        <button
          type="button"
          onClick={toggleEdit}
          className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 transition-colors"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4">
        {Object.entries({
          username: "Username",
          email: "Email",
          first_name: "First Name",
          last_name: "Last Name",
        }).map(([field, label]) => (
          <div key={field} className="sm:space-y-1">
            <label className="block text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
              {label}
            </label>
            {isEditing ? (
              <input
                name={field}
                className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={profile[field]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                type={field === "email" ? "email" : "text"}
                disabled={field === "email"} // Often emails shouldn't be changed
              />
            ) : (
              <p className="text-xs sm:text-sm">
                {profile[field] || "Not specified"}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfileSection;

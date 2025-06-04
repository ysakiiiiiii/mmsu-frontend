import React, { useState, useEffect } from "react";

const AddressSection = ({ userId }) => {
  const [address, setAddress] = useState({
    country: "",
    province: "",
    municipality: "",
    barangay: "",
    zip_code: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost/MMSU/mmsu-backend/profile/fetchAddress.php?user_id=${userId}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          if (data.data) {
            setHasAddress(true);
            setAddress({
              country: data.data.country || "",
              province: data.data.province || "",
              municipality: data.data.municipality || "",
              barangay: data.data.barangay || "",
              zip_code: data.data.zip_code || ""
            });
          } else {
            setHasAddress(false);
          }
        } else {
          throw new Error(data.message || "Failed to fetch address");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost/MMSU/mmsu-backend/profile/update_address.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: userId,
            country: address.country,
            province: address.province,
            municipality: address.municipality,
            barangay: address.barangay,
            zip_code: address.zip_code
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save address");
      }

      setIsEditing(false);
      setError(null);
      setHasAddress(true);
      alert(data.message);
    } catch (error) {
      console.error("Error saving address:", error);
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
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading address...</div>;
  }

  if (!hasAddress && !isEditing) {
    return (
      <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <h2 className="text-base sm:text-xl font-bold">Delivery Address</h2>
          <button
            type="button"
            onClick={toggleEdit}
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 transition-colors"
          >
            Add Address
          </button>
        </div>
        <div className="text-gray-500 text-sm">
          No address specified. Please add your delivery address.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <h2 className="text-base sm:text-xl font-bold">Delivery Address</h2>
        <button
          type="button"
          onClick={toggleEdit}
          className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 transition-colors"
        >
          {isEditing ? "Save Changes" : "Edit Address"}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4">
        {Object.entries({
          country: "Country",
          province: "Province",
          municipality: "Municipality", 
          barangay: "Barangay",
          zip_code: "Zip Code"
        }).map(([field, label]) => (
          <div key={field} className="sm:space-y-1">
            <label className="block text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
              {label}
            </label>
            {isEditing ? (
              <input
                name={field}
                className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address[field]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
              />
            ) : (
              <p className="text-xs sm:text-sm">
                {address[field] || "Not specified"}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddressSection;
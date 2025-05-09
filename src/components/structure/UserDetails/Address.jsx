import React from "react";

const AddressSection = ({ profile, isEditing, toggleEdit, handleChange }) => (
  <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
    <div className="flex items-center justify-between mb-2 sm:mb-4">
      <h2 className="text-base sm:text-xl font-bold">Delivery Addresses</h2>
      <button 
        type="button" 
        onClick={toggleEdit} 
        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 transition-colors"
      >
        {isEditing ? "Save Changes" : "Edit Address"}
      </button>
    </div>
    
    <div className="space-y-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <div className="sm:space-y-1">
        <label className="block text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Country</label>
        {isEditing ? (
          <input
            name="country"
            className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={profile.country || ''}
            onChange={handleChange}
            placeholder="Enter country"
          />
        ) : (
          <p className="text-xs sm:text-sm">{profile.country || "Not specified"}</p>
        )}
      </div>
      
      <div className="sm:space-y-1">
        <label className="block text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">City</label>
        {isEditing ? (
          <input
            name="city"
            className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={profile.city || ''}
            onChange={handleChange}
            placeholder="Enter city"
          />
        ) : (
          <p className="text-xs sm:text-sm">{profile.city || "Not specified"}</p>
        )}
      </div>
      
      <div className="sm:space-y-1">
        <label className="block text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Zip Code</label>
        {isEditing ? (
          <input
            name="zip"
            className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={profile.zip || ''}
            onChange={handleChange}
            placeholder="Enter zip code"
          />
        ) : (
          <p className="text-xs sm:text-sm">{profile.zip || "Not specified"}</p>
        )}
      </div>
    </div>
  </section>
);

export default AddressSection;
import React from "react";

const AddressSection = ({ profile, isEditing, toggleEdit, handleChange }) => (
  <section className="bg-white p-6 shadow rounded-xl">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Delivery Addresses</h2>
      <button type="button" onClick={toggleEdit} className="text-blue-600 text-sm">
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm">Country</label>
        {isEditing ? (
          <input
            name="country"
            className="input w-full"
            value={profile.country}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.country}</p>
        )}
      </div>
      <div>
        <label className="block text-sm">City</label>
        {isEditing ? (
          <input
            name="city"
            className="input w-full"
            value={profile.city}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.city}</p>
        )}
      </div>
      <div>
        <label className="block text-sm">Zip Code</label>
        {isEditing ? (
          <input
            name="zip"
            className="input w-full"
            value={profile.zip}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.zip}</p>
        )}
      </div>
    </div>
  </section>
);

export default AddressSection;

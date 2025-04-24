// Full modular version integrating all requested features with edit toggles and centered profile image
import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthWrapper";
import Profile from "../../../public/user-image/profile.jpeg";

const Account = () => {
  const { user } = useContext(AuthContext);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [profile, setProfile] = useState({
    name: user.name,
    email: "dummy_accountniJuan@gmail.com",
    phone: "09123456789",
    creationDate: "2023-12-23",
    membership: "Gold",
    location: "Philippines, Ilocos Norte",
    about: "I’m a web designer, I work in programs like Figma and member of Nazi",
    country: "Philippines",
    city: "Ilocos Norte",
    zip: "2916",
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-Poppins max-w-7xl mx-auto p-6 grid gap-8">
      {/* Personal Information */}
      <section className="bg-white p-6 shadow rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-blue-600 text-sm"
          >
            {isEditingProfile ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold">Full Name</label>
            {isEditingProfile ? (
              <input
                name="name"
                className="input w-full"
                value={profile.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Email Address</label>
            {isEditingProfile ? (
              <input
                name="email"
                className="input w-full"
                value={profile.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Phone Number</label>
            {isEditingProfile ? (
              <input
                name="phone"
                className="input w-full"
                value={profile.phone}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.phone || "Not set"}</p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={Profile} alt="Profile" className="w-24 h-24 rounded-full object-cover mt-2" />
            <button className="text-blue-500 text-sm mt-2">Upload new</button>
          </div>
        </div>
      </section>

      {/* Delivery Addresses */}
      <section className="bg-white p-6 shadow rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Delivery Addresses</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-blue-600 text-sm"
          >
            {isEditingAddress ? "Save" : "Edit"}
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm">Country</label>
            {isEditingAddress ? (
              <input
                name="country"
                className="input w-full"
                value={profile.country}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.country}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">City</label>
            {isEditingAddress ? (
              <input
                name="city"
                className="input w-full"
                value={profile.city}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Zip Code</label>
            {isEditingAddress ? (
              <input
                name="zip"
                className="input w-full"
                value={profile.zip}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.zip}</p>
            )}
          </div>
        </div>

        </section>
      {/* Payment Methods */}
      <section className="bg-white p-6 shadow rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Payment Methods</h2>
          <button
            onClick={() => setIsEditingPayment(!isEditingPayment)}
            className="text-blue-600 text-sm"
          >
            {isEditingPayment ? "Save" : "Edit"}
          </button>
        </div>
        <p>No saved payment methods.</p>
        <button className="text-blue-500 text-sm mt-2">Add Payment Method</button>
      </section>

      {/* Order Summary */}
      <section className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="font-bold text-lg">18</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
          <div>
            <p className="font-bold text-lg">2</p>
            <p className="text-sm text-gray-500">Ongoing</p>
          </div>
          <div>
            <p className="font-bold text-lg">$1230</p>
            <p className="text-sm text-gray-500">Money Spent</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Order History</h3>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <li key={id} className="flex justify-between bg-gray-50 p-4 rounded-md">
              <span>Order #{1000 + id}</span>
              <span>Status: Delivered</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </section>

      {/* Profile Stats */}
      <section className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Profile Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="font-bold text-lg">$1230</p>
            <p className="text-sm text-gray-500">Total Spent</p>
          </div>
          <div>
            <p className="font-bold text-lg">46</p>
            <p className="text-sm text-gray-500">Products Bought</p>
          </div>
          <div>
            <p className="font-bold text-lg">$27</p>
            <p className="text-sm text-gray-500">Avg Order Value</p>
          </div>
          <div>
            <p className="font-bold text-lg">Shoes</p>
            <p className="text-sm text-gray-500">Top Category</p>
          </div>
        </div>
      </section>

      {/* Wishlist */}
      <section className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Wishlist</h2>
        <p>No items saved.</p>
      </section>

      {/* Reviews */}
      <section className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Reviews & Ratings</h2>
        <p>No reviews submitted.</p>
      </section>

      {/* Notifications */}
      <section className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Notifications & Preferences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label><input type="checkbox" /> Email Notifications</label>
          <label><input type="checkbox" /> SMS Alerts</label>
          <label>Currency: 
            <select>
              <option>PHP</option>
              <option>USD</option>
              <option>EUR</option>
              <option>WON</option>
            </select></label>
        </div>
      </section>

      {/* Security */}
      <section className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Security & Login</h2>
        <p>Recent logins: None</p>
        <button className="text-red-500 text-sm mt-2">Logout from all devices</button>
      </section>
    </div>
  );
};

export default Account;

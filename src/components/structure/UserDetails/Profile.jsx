import React from "react";

const ProfileStatsSection = () => (
  <section className="bg-white p-3 shadow rounded-lg">
    <h2 className="text-base font-bold mb-2">Profile Stats</h2>
    <div className="grid grid-cols-2 gap-2">
      <div className="p-2 border rounded">
        <p className="font-bold text-sm">$1230</p>
        <p className="text-xs text-gray-500">Total Spent</p>
      </div>
      <div className="p-2 border rounded">
        <p className="font-bold text-sm">46</p>
        <p className="text-xs text-gray-500">Products</p>
      </div>
      <div className="p-2 border rounded">
        <p className="font-bold text-sm">$27</p>
        <p className="text-xs text-gray-500">Avg Order</p>
      </div>
      <div className="p-2 border rounded">
        <p className="font-bold text-sm">Shoes</p>
        <p className="text-xs text-gray-500">Top Category</p>
      </div>
    </div>
  </section>
);

export default ProfileStatsSection;
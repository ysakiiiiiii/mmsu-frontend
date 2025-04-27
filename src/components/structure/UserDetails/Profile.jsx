import React from "react";

const ProfileStatsSection = () => (
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
);

export default ProfileStatsSection;

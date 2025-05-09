import React from "react";

const SecuritySection = () => (
  <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
    <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">Security & Login</h2>
    
    <div className="space-y-3 sm:space-y-4">
      <div className="p-3 sm:p-4 bg-gray-50 rounded">
        <h3 className="text-xs sm:text-sm font-medium mb-1">Recent Activity</h3>
        <p className="text-xs sm:text-sm text-gray-600">No recent logins</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium border border-red-200 px-3 py-1.5 rounded">
          Logout from all devices
        </button>
        <button className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1.5 rounded">
          Change Password
        </button>
      </div>
    </div>
  </section>
);

export default SecuritySection;
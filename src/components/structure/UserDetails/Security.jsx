import React from "react";

const SecuritySection = () => (
  <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
    <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">Security & Login</h2>
    
    <div className="space-y-3 sm:space-y-4">
        <button className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1.5 rounded">
          Change Password
        </button>
      </div>
  </section>
);

export default SecuritySection;
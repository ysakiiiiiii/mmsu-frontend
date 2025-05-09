import React from "react";

const NotificationsSection = () => (
  <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
    <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">Notifications</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="email-notifications"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        />
        <label htmlFor="email-notifications" className="text-xs sm:text-sm">
          Email Notifications
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="sms-alerts"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        />
        <label htmlFor="sms-alerts" className="text-xs sm:text-sm">
          SMS Alerts
        </label>
      </div>
      
      <div className="sm:col-span-2">
        <label className="block text-xs sm:text-sm mb-1">Preferred Currency</label>
        <select className="w-full text-xs sm:text-sm border rounded px-2 py-1.5 sm:px-3 sm:py-2">
          <option>PHP (₱)</option>
          <option>USD ($)</option>
          <option>EUR (€)</option>
          <option>WON (₩)</option>
        </select>
      </div>
    </div>
    
    <button className="mt-3 sm:mt-4 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded">
      Save Preferences
    </button>
  </section>
);

export default NotificationsSection;
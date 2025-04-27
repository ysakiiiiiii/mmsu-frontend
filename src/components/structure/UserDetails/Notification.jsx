import React from "react";

const NotificationsSection = () => (
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
);

export default NotificationsSection;
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar-custom.css";

const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };            

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const SummaryCard = ({ title, value, icon }) => (
    <div className="bg-white/30 backdrop-blur rounded-2xl shadow-md p-6 flex items-center justify-between">
      <div>
        <h2 className="text-gray-600 text-lg font-medium mb-1">{title}</h2>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="bg-teal-100 text-teal-600 p-3 rounded-full text-2xl">
        {icon}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#dff5f0] to-[#e8f8f5] overflow-x-hidden rounded-2xl">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pt-6">Dashboard</h1>

        {/* Top Summary Panels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <SummaryCard title="Transactions" value="1,452" icon="💳" />
          <SummaryCard title="Customers" value="3,120" icon="🧑‍🤝‍🧑" />
          <SummaryCard title="Total Income" value="$12,495" icon="💰" />
          <SummaryCard title="Total Orders" value="872" icon="📦" />
        </div>

        {/* Lower Panels: Calendar + To Do List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          {/* Calendar */}
          <div className="bg-white/30 backdrop-blur rounded-2xl shadow-md p-6">
            <h2 className="text-gray-700 text-xl font-semibold mb-4">Schedule</h2>
            <Calendar
              onChange={setValue}
              value={value}
              className="rounded-xl"
            />
          </div>

          {/* To Do List */}
          <div className="bg-white/30 backdrop-blur rounded-2xl shadow-md p-6">
            <h2 className="text-gray-700 text-xl font-semibold mb-4">To Do List</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add new task"
                className="flex-grow rounded-l-xl px-4 py-2 border border-gray-300 focus:outline-none"
              />
              <button type="button"
                onClick={addTask}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-xl"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {tasks.map((t, index) => (
                <li
                  key={index}
                  className="bg-white/60 backdrop-blur rounded-xl px-4 py-2 flex justify-between items-center shadow"
                >
                  <span>{t}</span>
                  <button type="button"
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

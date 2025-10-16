import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "🏠 Dashboard" },
    { id: "courses", label: "📘 My Courses" },
    { id: "attendance", label: "🗓️ Attendance" },
    { id: "profile", label: "👤 Profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Student Portal
        </h2>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-600 text-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={signOut}
          className="mt-auto bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
        >
          🚪 Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">
            Welcome, {user?.name || "Student"} 👋
          </h1>
          <p className="text-gray-500">Role: {user?.role || "Student"}</p>
        </header>

        {/* Dynamic Section */}
        {activeTab === "dashboard" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Upcoming Classes
                </h3>
                <p className="text-gray-500">You have 2 classes today.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Attendance
                </h3>
                <p className="text-gray-500">Your attendance: 92%</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Total Courses
                </h3>
                <p className="text-gray-500">You’re enrolled in 5 courses.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "courses" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              My Courses
            </h2>
            <ul className="space-y-3">
              <li className="bg-white p-4 rounded-lg shadow">
                📘 Mathematics - Algebra & Geometry
              </li>
              <li className="bg-white p-4 rounded-lg shadow">
                📗 Science - Physics Fundamentals
              </li>
              <li className="bg-white p-4 rounded-lg shadow">
                📙 English - Grammar & Composition
              </li>
            </ul>
          </section>
        )}

        {activeTab === "attendance" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Attendance Record
            </h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">
                Current attendance: <strong>92%</strong>
              </p>
              <p className="text-gray-500 mt-2">
                Last updated: 12 Oct 2025
              </p>
            </div>
          </section>
        )}

        {activeTab === "profile" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Profile Information
            </h2>
            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <p><strong>Name:</strong> {user?.name || "John Doe"}</p>
              <p><strong>Email:</strong> {user?.email || "example@gmail.com"}</p>
              <p><strong>Role:</strong> {user?.role || "Student"}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "students", label: "🎓 Manage Students" },
    { id: "teachers", label: "👩‍🏫 Manage Teachers" },
    { id: "courses", label: "📘 Courses" },
    { id: "reports", label: "📈 Reports" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Admin Portal
        </h2>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-700 text-gray-200"
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
            Welcome, {user?.name || "Admin"} 👋
          </h1>
          <p className="text-gray-500">Role: {user?.role || "Administrator"}</p>
        </header>

        {/* Sections */}
        {activeTab === "dashboard" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Total Students
                </h3>
                <p className="text-gray-500 text-lg font-medium">120</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Total Teachers
                </h3>
                <p className="text-gray-500 text-lg font-medium">18</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Active Courses
                </h3>
                <p className="text-gray-500 text-lg font-medium">22</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Manage Students
            </h2>
            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Course</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">John Smith</td>
                  <td className="px-4 py-2">john@example.com</td>
                  <td className="px-4 py-2">Math</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    Active
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">Priya Patel</td>
                  <td className="px-4 py-2">priya@example.com</td>
                  <td className="px-4 py-2">Science</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    Active
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "teachers" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Manage Teachers
            </h2>
            <ul className="space-y-3">
              <li className="bg-white p-4 rounded-lg shadow">
                👩‍🏫 <strong>Mrs. Sharma</strong> — Mathematics
              </li>
              <li className="bg-white p-4 rounded-lg shadow">
                👨‍🏫 <strong>Mr. Khan</strong> — Science
              </li>
              <li className="bg-white p-4 rounded-lg shadow">
                👩‍🏫 <strong>Ms. Patel</strong> — English
              </li>
            </ul>
          </section>
        )}

        {activeTab === "courses" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg shadow">
                📘 <strong>Mathematics</strong> — 45 students enrolled
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                📗 <strong>Science</strong> — 38 students enrolled
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                📙 <strong>English</strong> — 30 students enrolled
              </div>
            </div>
          </section>
        )}

        {activeTab === "reports" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Reports
            </h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">
                Generate student performance and attendance reports here.
              </p>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Settings
            </h2>
            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <p><strong>Admin Name:</strong> {user?.name || "Admin"}</p>
              <p><strong>Email:</strong> {user?.email || "admin@example.com"}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                Update Info
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

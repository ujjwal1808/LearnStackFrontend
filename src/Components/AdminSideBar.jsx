import React from 'react'

const AdminSideBar = ({ activePage, setActivePage }) => {

    return (

        <div className="bg-slate-900 text-white p-6">

            <h1 className="text-2xl font-bold mb-10">

                Admin Panel

            </h1>

            <div className="space-y-3">

                <button
                    onClick={() => setActivePage("dashboard")}
                    className={`w-full text-left px-5 py-3 rounded-lg ${
                        activePage==="dashboard"
                        ?"bg-indigo-600"
                        :"hover:bg-slate-700"
                    }`}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => setActivePage("instructors")}
                    className={`w-full text-left px-5 py-3 rounded-lg ${
                        activePage==="instructors"
                        ?"bg-indigo-600"
                        :"hover:bg-slate-700"
                    }`}
                >
                    Instructors
                </button>

                <button
                    onClick={() => setActivePage("students")}
                    className={`w-full text-left px-5 py-3 rounded-lg ${
                        activePage==="students"
                        ?"bg-indigo-600"
                        :"hover:bg-slate-700"
                    }`}
                >
                    Students
                </button>

                <button
              onClick={() => setActivePage("courses")}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activePage === "courses"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-800"
              }`}
            >
              📚 Courses
            </button>

            </div>

        </div>

    );

};


export default AdminSideBar
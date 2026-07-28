import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../src/assets/Logo.png'

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("profilePicture");

    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gray-900 shadow-md">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="h-8 w-full"
                        />
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">


                        <Link
                            to={"/admin/dashboard"}
                            className="text-gray-300 hover:text-white transition"
                        >
                            Admin DashBoard
                        </Link>

                        
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* Notification */}
                        {/* <Link to="/admin/notification">
                            <button className="text-gray-300 hover:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.55}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9a6 6 0 10-12 0v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.455 1.31m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>
                        </Link> */}

                        {/* Profile Image */}
                        {/* <Link to="/instructor/profile">
                            <img
                                src="./"
                                alt="Profile"
                                className="h-9 w-9 rounded-full border border-gray-600"
                            />
                        </Link> */}
                        <button
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-white"
                        >
                            {menuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-4 space-y-3">

                        <Link
                            to="/student/home"
                            className="block text-gray-300 hover:text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            to="/student/explore-course"
                            className="block text-gray-300 hover:text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Explore Courses
                        </Link>

                        <Link
                            to="/student/enrolled-course"
                            className="block text-gray-300 hover:text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Enrolled Course
                        </Link>

                        <Link
                            to="/student/profile-page"
                            className="block text-gray-300 hover:text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            My Profile
                        </Link>
                    </div>
                )}
            </div>
        </nav>
  )
}

export default AdminNavBar
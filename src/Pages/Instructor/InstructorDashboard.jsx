import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  MoreVertical,
  BookOpen,
  Users,
  IndianRupee,
} from "lucide-react";
// import Navbar from "../../Components/Navbar";
import NavBarInstructor from "../../Components/NavBarInstructor";
import url from "../../lib/url";
import axios from "axios";

const InstructorDashboard = () => {

  // Dummy Data
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getData();
  }, [])
  

  const getData = () =>{
    axios.get(`${url}course/instructor/${localStorage.getItem("id")}`).then((res)=>{
      setCourses(res.data);
      console.log(res);
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <NavBarInstructor />

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Instructor Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all your courses
            </p>

          </div>

          <Link
            to="/instructor/create-course"
            className="mt-5 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Course
          </Link>

        </div>

        {/* Existing Courses */}

        <h2 className="text-2xl font-semibold mb-5">
          Existing Courses
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map((course) => (

            <div
              key={course.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* Thumbnail */}

              <img
                src={course.thumbnail}
                alt=""
                className="w-full h-48 object-cover"
              />

              {/* Body */}

              <div className="p-5">

                <div className="flex justify-between items-start">

                  <h3 className="font-bold text-lg">
                    {course.title}
                  </h3>

                  <button>
                    <MoreVertical size={20} />
                  </button>

                </div>

                {/* Stats */}

                <div className="flex gap-5 mt-4 text-gray-600">

                  <div className="flex items-center gap-1">
                    <Users size={18} />
                    {course.students}
                  </div>

                  <div className="flex items-center gap-1">
                    <IndianRupee size={18} />
                    {course.price}
                  </div>

                </div>

                {/* Buttons */}

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/view-course/${course.id}`}
                    className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-course/${course.id}`}
                    className="flex-1 border border-indigo-600 text-indigo-600 text-center py-2 rounded-lg hover:bg-indigo-50"
                  >
                    Edit
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Floating Button (Mobile) */}

      <Link
        to="/create-course"
        className="fixed bottom-6 right-6 md:hidden bg-indigo-600 text-white p-4 rounded-full shadow-lg"
      >
        <Plus />
      </Link>

    </div>
  );
};

export default InstructorDashboard;
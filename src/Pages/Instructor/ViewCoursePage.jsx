import React, { useContext, useEffect, useState } from 'react'
import applicationContext from '../../context/Context';
import axios from 'axios';
import url from '../../lib/url';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import NavBarInstructor from '../../Components/NavBarInstructor';

const ViewCoursePage = () => {

  const {navigate} = useNavigate();
    // const {course} = useContext(applicationContext);
    const {id} = useParams();
    const [singleCourse, setSingleCourse] = useState({});
    useEffect(() => {

      console.log(id);

        axios.get(url+"course/"+id).then((response) => {
            setSingleCourse(response.data);
            console.log(singleCourse);
        });
    },[])


    
  const isInstructor = false;
  return (
    <div>
      <NavBarInstructor/>
        <main className="flex-grow max-w-7xl mx-auto w-full p-6">

        {/* Course Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            {singleCourse.title}
          </h2>

          {isInstructor && (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
              Edit
            </button>
          )}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Left Side */}
          <div className="lg:col-span-3 space-y-6">

            {/* Thumbnail */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <img
                src={singleCourse.thumbnail}
                alt=""
                className="w-full h-[380px] object-cover"
              />

            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-xl font-semibold mb-3">
                Description
              </h3>

              <p className="text-gray-600 leading-8">
                {singleCourse.description}
              </p>

            </div>

            {/* Enroll */}

            <div className="flex gap-3">

            <Link to="/instructor/dashboard" className=" text-center border-2 border-indigo-600 w-full hover:bg-indigo-700 text-indigo-700 hover:text-white py-4 rounded-xl text-lg font-semibold" >
              Back
            </Link>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold">
              Edit
            </button>
            </div>

          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="font-bold text-xl mb-4">
                Pricing Details
              </h3>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-semibold">
                    {singleCourse.price}
                  </span>
                </div>

                {/* <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{singleCourse.duration}</span>
                </div> */}

                {/* <div className="flex justify-between">
                  <span>Level</span>
                  <span>{singleCourse.level}</span>
                </div>

                <div className="flex justify-between">
                  <span>Students</span>
                  <span>{singleCourse.students}</span>
                </div> */}

              </div>

            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="font-bold text-xl mb-4">
                Instructor
              </h3>

              <div className="flex items-center gap-4 mb-4">

                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt=""
                  className="w-14 h-14 rounded-full"
                />

                <div>

                  <h4 className="font-semibold">
                    {/* {course.instructor} */}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Senior React Instructor
                  </p>

                </div>

              </div>

              <p className="text-gray-500 text-sm">
                {/* {course.email} */}
              </p>

            </div>

          </div>

        </div>

      </main>
    </div>
  )
}

export default ViewCoursePage
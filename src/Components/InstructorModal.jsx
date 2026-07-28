import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../lib/url";

const InstructorModal = ({ instructor, onClose }) => {

    const [totalCourses, setTotalCourses] = useState(0);

    useEffect(() => {
      axios.get(`${url}course/instructor/${instructor.id}`).then((res)=>{
        setTotalCourses(res.data.length);
      })
    }, [])
    

    
    if (!instructor) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative">

                {/* Close */}

                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 text-2xl font-bold hover:text-red-500"
                >
                    ×
                </button>

                <div className="flex items-center gap-6">

                    <img
                        src={
                            instructor.profileImage ||
                            "https://via.placeholder.com/150"
                        }
                        alt=""
                        className="w-28 h-28 rounded-full object-cover border"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">

                            {instructor.fullName}

                        </h1>

                        <p className="text-gray-500">

                            {instructor.role}

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">

                    <div>

                        <h3 className="font-semibold">
                            ID
                        </h3>

                        <p>{instructor.id}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Email
                        </h3>

                        <p>{instructor.email}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Phone
                        </h3>

                        <p>{instructor.phone}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Experience
                        </h3>

                        <p>

                            {instructor.experience || 0} Years

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Total Courses
                        </h3>

                        <p>

                            {totalCourses}

                        </p>

                    </div>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold">

                        Skills

                    </h3>

                    <p className="text-gray-700 mt-2">

                        {instructor.skills || "Not Added"}

                    </p>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold">

                        Bio

                    </h3>

                    <p className="text-gray-700 mt-2 leading-7">

                        {instructor.bio || "No Bio"}

                    </p>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold">

                        Joined On

                    </h3>

                    <p>

                        {instructor.createdAt}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default InstructorModal;
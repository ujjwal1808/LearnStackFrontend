import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../lib/url";

const CourseModal = ({ course, onClose }) => {
    const [chapters, setChapters] = useState(0);

    useEffect(() => {
      getChapter();
    }, [])
    

    const getChapter = async (id) =>{
        const res = await axios.get(`${url}admin/total-chapter/${course.id}`)
        console.log(res);

        setChapters(res.data);
    }

    if (!course) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-2xl hover:text-red-500"
                >
                    ✕
                </button>

                <div className="flex gap-8">

                    <img
                        src={course.thumbnail}
                        alt=""
                        className="w-80 h-52 rounded-lg object-cover"
                    />

                    <div className="flex-1">

                        <h1 className="text-3xl font-bold">

                            {course.title}

                        </h1>

                        <p className="text-gray-500 mt-2">

                            {course.category}

                        </p>

                        <div className="grid grid-cols-2 gap-5 mt-8">

                            <div>

                                <h3 className="font-semibold">
                                    Price
                                </h3>

                                <p>
                                    ₹ {course.price}
                                </p>

                            </div>

                            <div>

                                <h3 className="font-semibold">
                                    Duration
                                </h3>

                                <p>
                                    {course.duration} Hours
                                </p>

                            </div>

                            <div>

                                <h3 className="font-semibold">
                                    Level
                                </h3>

                                <p>
                                    {course.level}
                                </p>

                            </div>

                            <div>

                                <h3 className="font-semibold">
                                    Status
                                </h3>

                                <p>
                                    {course.status}
                                </p>

                            </div>

                            <div>

                                <h3 className="font-semibold">
                                    Instructor
                                </h3>

                                <p>
                                    {course.instructor?.fullName}
                                </p>

                            </div>

                            <div>

                                <h3 className="font-semibold">
                                    Students Enrolled
                                </h3>

                                <p>
                                    {course.totalStudents}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-8">

                    <h2 className="text-xl font-semibold mb-3">

                        Description

                    </h2>

                    <p className="text-gray-700 leading-8">

                        {course.description}

                    </p>

                </div>

                <div className="mt-8">

                    <h2 className="text-xl font-semibold mb-4">

                        Chapters

                    </h2>

                    <div className="space-y-3">
                        {chapters}
                        {/* {
                            course.chapters?.map((chapter) => (

                                <div
                                    key={chapter.id}
                                    className="border rounded-lg p-4 flex justify-between"
                                >

                                    <div>

                                        <h3 className="font-semibold">

                                            {chapter.chapterOrder}. {chapter.title}

                                        </h3>

                                        <p className="text-gray-500">

                                            {chapter.duration} min

                                        </p>

                                    </div>

                                    <div>

                                        {
                                            chapter.preview

                                                ?

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded">

                                                    Preview

                                                </span>

                                                :

                                                <span className="bg-gray-100 px-3 py-1 rounded">

                                                    Premium

                                                </span>

                                        }

                                    </div>

                                </div>

                            ))
                        } */}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CourseModal;
import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../lib/url";
import CourseModal from "../../Components/CourseModal";
import SearchBar from "../../Components/SearchBar";

const CourseList = () => {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getCourses();
    }, []);

    const filteredCourses = courses.filter((course) => {

    const keyword = search.toLowerCase();

    return (
        course.id.toString().includes(keyword) ||
        course.title?.toLowerCase().includes(keyword) ||
        course.instructor?.fullName.toLowerCase().includes(keyword)
    );

});

    const getCourses = async () => {

        try {

            const res = await axios.get(`${url}admin/courses`);

            setCourses(res.data);
            // console.log(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                All Courses
            </h1>
            <SearchBar
    search={search}
    setSearch={setSearch}
    placeholder="Search Course..."
/>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                ID
                            </th>

                            <th className="p-4 text-left">
                                Course
                            </th>

                            <th className="p-4 text-left">
                                Instructor
                            </th>

                            

                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredCourses.map((course) => (

                            <tr
                                key={course.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {course.id}
                                </td>

                                <td className="p-4 font-medium">
                                    {course.title}
                                </td>

                                <td className="p-4">
                                    {course.instructor?.fullName}
                                </td>

                                

                                <td className="p-4 text-center">

                                    <button
                                        onClick={() => setSelectedCourse(course)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                                    >
                                        View Course
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {
                selectedCourse &&

                <CourseModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />

            }

        </div>

    );

};

export default CourseList;
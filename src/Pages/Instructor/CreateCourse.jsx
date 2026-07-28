import React, { useState } from "react";
import NavBarInstructor from "../../Components/NavBarInstructor";
import axios from "axios";
import url from "../../lib/url";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    status: "ACTIVE",
    instructor_id:0
  });
  const [thumbnail, setThumbnail] = useState();
  const [id, setId] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("course",JSON.stringify(course));
    formData.append("thumbnail",thumbnail);
    // console.log([...formData.entries()]);
    console.log(localStorage.getItem("id"));
    const courseData = {
    ...course,
    instructor: {
        id: Number(localStorage.getItem("id"))
    }
};
    // setCourse({instructor_id:localStorage.getItem("id") })

    axios.post(`${url}course/create-course`, courseData).then((res)=>{
        console.log(res.data.id);
        axios.put(`${url}course/setthumbnail/${res.data.id}`, formData).then((res)=>{console.log(res.data)})
        navigate(`/create-chapter/${res.data.id}`);
        
    })

  };

  return (
    <div className="min-h-screen bg-gray-100">

      <NavBarInstructor />

      <div className="max-w-5xl mx-auto py-10 px-6">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Create New Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}

            <div>
              <label className="block mb-2 font-semibold">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Description */}

            <div>
              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={course.description}
                onChange={handleChange}
                placeholder="Write course description..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                required
              />
            </div>

            {/* Category & Level */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-semibold">
                  Category
                </label>

                <select
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="Programming">Programming</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Level
                </label>

                <select
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

            </div>

            {/* Duration & Price */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-semibold">
                  Duration (Hours)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Price (₹)
                </label>

                <input
                  type="number"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

            </div>

            {/* Status */}

            <div>
              <label className="block mb-2 font-semibold">
                Status
              </label>

              <select
                name="status"
                value={course.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            {/* Thumbnail */}

            <div>
              <label className="block mb-2 font-semibold">
                Thumbnail
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnail}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4 pt-4">


              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg"
              >
                Save Course
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateCourse;
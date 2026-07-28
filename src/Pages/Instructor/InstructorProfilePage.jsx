import React, { useContext, useEffect, useState } from 'react'
import NavBarInstructor from '../../Components/NavBarInstructor'
import applicationContext from '../../context/Context';
import EditInstructorProfileModal from "../../Components/EditInstructorProfileModal";
import ChangePhotoModal from '../../Components/ChangePhotoModal';
import axios from 'axios';
import url from '../../lib/url';
import toast from 'react-hot-toast';
const InstructorProfilePage = () => {
    // const {user} = useContext(applicationContext);
    const [instructor, setInstructor] = useState({});
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [courseCount, setCourseCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);


    const notifySuccessProfileUpdated = () => toast('Successfully ProfilePicture Changes!', {
        icon: '❕', style: {
            borderRadius: '10px',
            background: '#327dff',
            color: '#fff',
        },
    });

    const handlePhotoUpload = (image) => {
        const formData = new FormData();
        formData.append("image", image);
        axios.put(`${url}users/updateProfilePhoto/${instructor.id}`, formData).then((res) => {
            notifySuccessProfileUpdated();
            getProfile();
        })
    }

    const getProfile = () => {
        axios.get(`${url}users/getprofile/${localStorage.getItem("id")}`).then((res) => {

            setInstructor(res.data);
            console.log(instructor);
        })
    }
    useEffect(() => {
        getProfile();
        getCourseCount();
        getStudentCount();
        // setInstructor(JSON.parse(localStorage.getItem("instructor")));
    }, [])

    const getCourseCount = () => {
        axios.get(`${url}course/course/count/${localStorage.getItem("id")}`).then((res) => {
            setCourseCount(res.data);
        })
    }

    const getStudentCount = () =>{
        axios.get(`${url}enrollcourse/enrolled-student/${localStorage.getItem("id")}`).then((res)=>{
            setStudentCount(res.data);
        })
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <NavBarInstructor profileImage={instructor.profileImage}/>

            <div className="max-w-7xl mx-auto p-8">

                {/* Header */}

                <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row justify-between items-center">

                    <div className="flex items-center gap-6">

                        <img
                            src={instructor.profileImage}
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                        />

                        <div>

                            <h1 className="text-3xl font-bold">
                                {instructor.fullName}
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Senior Instructor
                            </p>

                            <p className="mt-2">
                                📧 {instructor.email}
                            </p>

                            <p>
                                📱 {instructor.phone}
                            </p>

                            <span className="inline-block mt-3 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm">
                                {instructor.role}
                            </span>

                        </div>

                    </div>

                    <div className="mt-6 md:mt-0 flex gap-4">

                        <button className="bg-gray-200 px-5 py-2 rounded-lg" onClick={() => setIsPhotoModalOpen(true)}>
                            Change Photo
                        </button>

                        <button
                            onClick={() => setShowEditPopup(true)}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
                        >
                            Edit Profile
                        </button>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <h3 className="text-3xl font-bold text-indigo-600">
                            {courseCount}
                        </h3>
                        <p className="text-gray-500 mt-2">Courses</p>
                    </div>

                    <div className="bg-white shadow rounded-xl p-6 text-center">
                        <h3 className="text-3xl font-bold text-green-600">
                            {studentCount}
                        </h3>
                        <p className="text-gray-500 mt-2">Students</p>
                    </div>




                </div>

                {/* Info */}

                <div className="bg-white shadow rounded-xl mt-8 p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Instructor Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="font-semibold">Full Name</label>
                            <p className="mt-2 text-gray-600">{instructor.fullName}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Email</label>
                            <p className="mt-2 text-gray-600">{instructor.email}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Phone</label>
                            <p className="mt-2 text-gray-600">{instructor.phone}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Experience</label>
                            <p className="mt-2 text-gray-600">{instructor.experience}</p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold">Skills</label>
                            <p className="mt-2 text-gray-600">{instructor.skills}</p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold">Bio</label>
                            <p className="mt-2 text-gray-600">
                                {instructor.bio}
                            </p>
                        </div>

                    </div>

                </div>


            </div>
            <EditInstructorProfileModal
                isOpen={showEditPopup}
                onClose={() => setShowEditPopup(false)}
                instructor={instructor}
                setInstructor={setInstructor}
            />
            <ChangePhotoModal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} currentImage={instructor.profileImage} onUpload={handlePhotoUpload} />

        </div>
    );
}

export default InstructorProfilePage
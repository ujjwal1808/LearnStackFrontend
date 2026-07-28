import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import applicationContext from '../../context/Context';
import axios from 'axios';
import url from '../../lib/url';
import EditProfileModal from '../../Components/EditProfileModal';
import ChangePhotoModal from "../../Components/ChangePhotoModal";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({})
  const [profilePhoto, setProfilePhoto] = useState({
    id:0,
    image:"",
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  useEffect(() => {
    getProfile();

  }, []);

  const notifySuccessProfileUpdated = () => toast('Successfully ProfilePicture Changes!', {icon: '❕', style: {
      borderRadius: '10px',
      background: '#327dff',
      color: '#fff',
    },});
  const getProfile = () => {
    const userId = localStorage.getItem("id");
    console.log(userId);
    axios.get(url + `users/getprofile/${userId}`).then((response) => {
      setUserDetails(response.data);
    })
  }

  const handleUpdate = (updatedUser) => {

    axios.put(`${url}users/update`, updatedUser).then((res) => {
      console.log(res.data);
      getProfile();
    })
  }

  const handlePhotoUpload = (image) =>{
    const formData = new FormData();
    formData.append("image", image);
    axios.put(`${url}users/updateProfilePhoto/${userDetails.id}`,formData).then((res)=>{
      notifySuccessProfileUpdated();
      getProfile();
    })
  }
  return (
    <div>
      <Navbar profileImage={userDetails.profileImage}/>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">

        <div className="flex flex-col items-center">

          <img
            src={userDetails.profileImage}
            alt=""
            className="w-40 h-40 rounded-full border-4 border-indigo-500"
          />
          
          <button className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded-lg" onClick={() => setIsPhotoModalOpen(true)}>
            Change Photo
          </button>

        </div>

        <div className="flex-1">

          <h1 className="text-3xl font-bold">
            {userDetails.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {userDetails.role}
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">
                {userDetails.email}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <h3 className="font-semibold">
                {userDetails.phone}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Joined</p>
              <h3 className="font-semibold">
                {userDetails.createdAt}
              </h3>
            </div>
          </div>

          <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>

        </div>

      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-gray-500">
            Courses Enrolled
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            8
          </h1>

        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Account Settings
        </h2>

        <div className="space-y-3">

          <button className="w-full bg-gray-100 rounded-lg p-3 text-left hover:bg-indigo-100">
            Change Password
          </button>


          <button className="w-full bg-red-100 rounded-lg p-3 text-red-600 text-left">
            Delete Account
          </button>

        </div>

      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={userDetails} onUpdate={handleUpdate}/>
      <ChangePhotoModal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} currentImage={userDetails.profileImage} onUpload={handlePhotoUpload}/>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default ProfilePage
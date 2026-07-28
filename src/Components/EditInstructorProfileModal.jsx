import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../lib/url";

const EditInstructorProfileModal = ({
    isOpen,
    onClose,
    instructor,
    setInstructor
}) => {

    const [formData, setFormData] = useState({
        skills: "",
        bio: "",
        experience: "",
        phone: ""
    });

    useEffect(() => {

        if (instructor) {
            setFormData({
                id: instructor.id,
                skills: instructor.skills || "",
                bio: instructor.bio || "",
                experience: instructor.experience || "",
                phone: instructor.phone || ""
            });
        }

    }, [instructor]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(
                `${url}users/update/instructor`,
                formData
            );

            console.log(formData)
            setInstructor(response.data);

            localStorage.setItem(
                "instructor",
                JSON.stringify(response.data)
            );

            alert("Profile Updated Successfully");

            onClose();

        }
        catch (err) {
            console.log(err);
        }

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Instructor Profile
                </h2>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-semibold">
                            Skills
                        </label>

                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">
                            Bio
                        </label>

                        <textarea
                            rows={4}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">
                            Experience (Years)
                        </label>

                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Update
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditInstructorProfileModal;
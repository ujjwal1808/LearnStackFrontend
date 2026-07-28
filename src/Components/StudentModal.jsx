import React from "react";

const StudentModal = ({ student, onClose }) => {

    if (!student) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative">

                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 text-2xl hover:text-red-500"
                >
                    ×
                </button>

                <div className="flex items-center gap-6">

                    <img
                        src={
                            student.profileImage ||
                            "https://via.placeholder.com/150"
                        }
                        alt=""
                        className="w-28 h-28 rounded-full border object-cover"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">

                            {student.fullName}

                        </h1>

                        <p className="text-gray-500">

                            Student

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">

                    <div>

                        <h3 className="font-semibold">
                            ID
                        </h3>

                        <p>{student.id}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Email
                        </h3>

                        <p>{student.email}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Phone
                        </h3>

                        <p>{student.phone}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Active
                        </h3>

                        <p>

                            {student.active ? "Yes" : "No"}

                        </p>

                    </div>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold">

                        Joined On

                    </h3>

                    <p>

                        {student.createdAt}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default StudentModal;
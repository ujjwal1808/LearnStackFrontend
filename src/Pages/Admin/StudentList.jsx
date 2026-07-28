import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../lib/url";
import StudentModal from "../../Components/StudentModal";
import SearchBar from "../../Components/SearchBar";
import NotificationModal from "../../Components/NotifyModal";

const StudentList = () => {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        getStudents();
    }, []);

    const filteredStudents = students.filter((student) => {

        const keyword = search.toLowerCase();

        return (
            student.id.toString().includes(keyword) ||
            student.fullName.toLowerCase().includes(keyword) ||
            student.email.toLowerCase().includes(keyword)
        );

    });

    const getStudents = async () => {

        try {

            const res = await axios.get(
                `${url}admin/students`
            );

            setStudents(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                All Students
            </h1>

            <SearchBar
                search={search}
                setSearch={setSearch}
                placeholder="Search by ID, Name or Email..."
            />

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-center">
                                ID
                            </th>

                            <th className="p-4 text-center">
                                Profile
                            </th>

                            <th className="p-4 text-center">
                                Name
                            </th>

                            <th className="p-4 text-center">
                                Email
                            </th>

                            <th className="p-4 text-center">
                                Notify
                            </th>



                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="text-center">

                        {
                            filteredStudents.map((student) => (

                                <tr
                                    key={student.id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {student.id}
                                    </td>

                                    <td className="p-4">

                                        <img
                                            src={student.profileImage}
                                            alt=""
                                            className="w-12 h-12 rounded-full object-cover"
                                        />

                                    </td>

                                    <td className="p-4">
                                        {student.fullName}
                                    </td>

                                    <td className="p-4">
                                        {student.email}
                                    </td>


                                    <td>
                                        <button
                                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                                            onClick={() => {

                                                setSelectedUser(student);

                                                setOpenModal(true);

                                            }}
                                        >
                                            Notify
                                        </button>
                                    </td>

                                    <td className="p-4 text-center">

                                        <button
                                            onClick={() =>
                                                setSelectedStudent(student)
                                            }
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded"
                                        >

                                            Show More

                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                selectedStudent &&

                <StudentModal
                    student={selectedStudent}
                    onClose={() =>
                        setSelectedStudent(null)
                    }
                />

            }

            {

                selectedUser && (

                    <NotificationModal

                        isOpen={openModal}

                        user={selectedUser}

                        onClose={() => {

                            setOpenModal(false);

                            setSelectedUser(null);

                        }}

                    />

                )

            }

        </div>

    );

};

export default StudentList;
import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../lib/url";
import InstructorModal from "../../Components/InstructorModal";
import SearchBar from "../../Components/SearchBar";

const InstructorList = () => {

    const [instructors, setInstructors] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const filteredInstructors = instructors.filter((i) => {

        const keyword = search.toLowerCase();

        return (
            i.id.toString().includes(keyword) ||
            i.fullName.toLowerCase().includes(keyword) ||
            i.email.toLowerCase().includes(keyword)
        );

    });

    useEffect(() => {
        getInstructors();
    }, []);

    const getInstructors = async () => {

        try {

            const res = await axios.get(
                `${url}admin/instructors`
            );

            setInstructors(res.data);
            console.log(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                All Instructors

            </h1>
            <SearchBar
                search={search}
                setSearch={setSearch}
                placeholder="Search Instructor..."
            />

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr className="text-center">

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
                            <th className="p-4 ">
                                Active
                            </th>

                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="text-center">

                        {
                            filteredInstructors.map((i, idx) => (

                                <tr
                                    key={i.id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {idx + 1}
                                    </td>

                                    <td className="p-4">

                                        <img
                                            src={i.profileImage}
                                            alt=""
                                            className="w-12 h-12 rounded-full object-cover"
                                        />

                                    </td>

                                    <td className="p-4">
                                        {i.fullName}
                                    </td>

                                    <td className="p-4">
                                        {i.email}
                                    </td>

                                    <td className="p-4">
                                        <center>


                                            {
                                                i.active ? <div className="w-4 h-4 rounded-full bg-green-600"></div> : <div className="w-4 h-4 rounded-full text-center bg-red-600"></div>

                                            }
                                        </center>

                                    </td>

                                    <td className="p-4 text-center">

                                        <button
                                            onClick={() =>
                                                setSelectedInstructor(i)
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
                selectedInstructor &&

                <InstructorModal
                    instructor={selectedInstructor}
                    onClose={() =>
                        setSelectedInstructor(null)
                    }
                />

            }

        </div>

    );

};

export default InstructorList;
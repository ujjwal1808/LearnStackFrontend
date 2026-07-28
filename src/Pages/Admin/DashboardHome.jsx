import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../lib/url";
import AdminPieChart from "../../Components/AdminPieChart";

const DashboardHome = () => {

    const [stats, setStats] = useState({
        students: 0,
        instructors: 0,
        courses: 0,
        enrollments: 0
    });
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        try {

            const res = await axios.get(`${url}admin/dashboard`);

            setStats(res.data);

            const revRes = await axios.get(`${url}admin/revenue`);
            setRevenue(revRes.data);



        } catch (err) {
            console.log(err);
        }
    };

    const cards = [
        {
            title: "Students",
            value: stats.students,
            color: "bg-blue-700"
        },
        {
            title: "Instructors",
            value: stats.instructors,
            color: "bg-green-700"
        },
        {
            title: "Courses",
            value: stats.courses,
            color: "bg-purple-700"
        },
        {
            title: "Enrollments",
            value: stats.enrollments,
            color: "bg-orange-700"
        }
    ];

    return (
        <div>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                {
                    cards.map((card, index) => (

                        <div
                            key={index}
                            className={`${card.color} rounded-xl shadow-lg text-white p-6`}
                        >

                            <h3 className="text-lg font-semibold">
                                {card.title}
                            </h3>

                            <h1 className="text-4xl font-bold mt-4">
                                {card.value}
                            </h1>

                        </div>

                    ))
                }

                <div
                    className={`bg-green-500 rounded-xl shadow-lg text-white p-6`}
                >

                    <h3 className="text-lg font-semibold">
                        Revenue
                    </h3>

                    <h1 className="text-4xl font-bold mt-4">
                        ₹{revenue}
                    </h1>

                </div>

            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-500 p-6 hover:shadow-xl transition-all duration-300 my-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h3 className="text-xl font-bold text-gray-800">
                            Course Category Distribution
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Number of courses available in each category.
                        </p>
                    </div>

                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                        📊
                    </div>

                </div>

                {/* Chart */}
                <div className="h-[350px]">
                    <AdminPieChart />
                </div>

            </div>


        </div>
    );
};

export default DashboardHome;
import { useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import AdminSideBar from "../../Components/AdminSideBar";
import DashboardHome from "./DashboardHome";
import InstructorList from "./InstructorList";
import StudentList from "./StudentList";
import CourseList from "./CourseList";

const Admindashboard = () => {

    const [activePage, setActivePage] = useState("dashboard");

    return (
        <>
            <AdminNavBar />

            <div className="grid grid-cols-4 min-h-screen">

                <AdminSideBar
                    activePage={activePage}
                    setActivePage={setActivePage}
                />

                <div className="col-span-3 p-8">
                    {activePage === "dashboard" && <DashboardHome />}
                    {activePage === "instructors" && <InstructorList />}
                    {activePage === "students" && <StudentList />}
                    {activePage === "courses" && <CourseList/>}
                </div>

            </div>

        </>
    );
};

export default Admindashboard;
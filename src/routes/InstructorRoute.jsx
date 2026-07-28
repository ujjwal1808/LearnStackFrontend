import { Navigate, Outlet } from "react-router-dom";

const InstructorRoute = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "INSTRUCTOR") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default InstructorRoute;

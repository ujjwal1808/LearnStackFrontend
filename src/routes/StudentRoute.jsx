import { Navigate, Outlet } from "react-router-dom";

const StudentRoute = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "STUDENT") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default StudentRoute;

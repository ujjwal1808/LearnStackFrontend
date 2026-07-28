import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ExploreCourses from './Pages/Student/ExploreCourses'
import EnrolledCourses from './Pages/Student/EnrolledCourses'
import ProfilePage from './Pages/Student/ProfilePage'
// import Notification from './Pages/Student/Notification'
import SingleCoursePage from './Pages/Student/SingleCoursePage'
import Footer from './Components/Footer'
import Login from './Pages/Auth/Login'
import StudentRoute from './routes/StudentRoute'
import StudentDashBoard from './Pages/Student/StudentDashBoard'
import Admindashboard from './Pages/Admin/Admindashboard'
import InstructorDashBoard from './Pages/Instructor/InstructorDashBoard'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import InstructorRoute from './routes/InstructorRoute'
import EnrolledSignleCoursePage from './Pages/Student/EnrolledSignleCoursePage'
import SignUp from './Pages/Auth/SignUp'
import CreateCourse from './Pages/Instructor/CreateCourse'
import CreateChapter from './Pages/Instructor/CreateChapter'
import ViewCoursePage from './Pages/Instructor/ViewCoursePage'
import EditCourse from './Pages/Instructor/EditCourse'
import InstructorProfilePage from './Pages/Instructor/InstructorProfilePage'
import StudentNotification from './Pages/Student/StudentNotification'
import AssessmentPage from './Pages/Student/AssessmentPage'
import CreateAssessment from './Pages/Instructor/CreateAssessment'

const Launcher = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />


                <Route element={<ProtectedRoute />}>

                    <Route element={<StudentRoute />}>


                        <Route
                            path="/student/dashboard"
                            element={<StudentDashBoard />}
                        />
                        <Route
                            path="/student/explore-course"
                            element={<ExploreCourses />}
                        />
                        <Route
                            path="/student/enrolled-course"
                            element={<EnrolledCourses />}
                        />
                        <Route
                            path="/student/profile-page"
                            element={<ProfilePage />}
                        />
                        <Route
                            path="/assessment/:courseId"
                            element={<AssessmentPage />}
                        />

                        <Route
                            path="/student/notifications"
                            element={<StudentNotification />}
                        />
                        <Route
                            path="/student/course/:id"
                            element={<SingleCoursePage />}
                        />
                        <Route
                            path="/student/enrolled-course/content/:id"
                            element={<EnrolledSignleCoursePage />}
                        />
                    </Route>
                    <Route element={<AdminRoute />}>

                        <Route
                            path="/admin/dashboard"
                            element={<Admindashboard />}
                        />

                    </Route>

                    <Route element={<InstructorRoute />}>

                        <Route
                            path="/instructor/dashboard"
                            element={<InstructorDashBoard />}
                        />
                        <Route
                            path="/instructor/create-course"
                            element={<CreateCourse />}
                        />
                        <Route
                            path="/instructor/create-assessment/:courseId"
                            element={<CreateAssessment />}
                        />


                        <Route
                            path='/create-chapter/:courseId'
                            element={<CreateChapter />}
                        />

                        <Route
                            path='/view-course/:id'
                            element={<ViewCoursePage />}
                        />

                        <Route
                            path='/edit-course/:id'
                            element={<EditCourse />}
                        />

                        <Route
                            path='/instructor/profile'
                            element={<InstructorProfilePage />}
                        />



                    </Route>

                </Route>
            </Routes>
            <Footer />
        </>
    )
}

export default Launcher
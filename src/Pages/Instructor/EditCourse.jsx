import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import url from "../../lib/url";
import NavBarInstructor from "../../Components/NavBarInstructor";

const EditCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [chapterVideo, setChapterVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [isAddingChapter, setIsAddingChapter] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);


    const emptyAssessment = {
        courseId: id,
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        

    };

    const [assessments, setAssessments] = useState([]);
    const [assessmentForm, setAssessmentForm] = useState(emptyAssessment);
    const [editingAssessmentIndex, setEditingAssessmentIndex] = useState(null);

    const [course, setCourse] = useState({
        title: "",
        description: "",
        category: "",
        level: "",
        duration: "",
        price: "",
        status: "",
        thumbnail: "",
    });

    const emptyChapter = {
        id: null,
        title: "",
        Description: "",
        notes: "",
        duration: "",
        chapterOrder: 1,
        preview: false,
        course: null
    };
    const [chapterForm, setChapterForm] = useState(emptyChapter);

    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = () => {
        axios
            .get(`${url}course/${id}`)
            .then((res) => {

                console.log(res.data);

                setCourse(res.data);

                axios.get(`${url}Chapter/all/chapters/${id}`).then((res) => {
                    console.log(res.data);
                    setChapters(res.data);

                })
                axios.get(`${url}assessment/get/${id}`)
                    .then((res) => {
                        setAssessments(res.data);
                    });

            })
            .catch((err) => console.log(err));
    };

    const handleAssessmentChange = (e) => {

        const { name, value } = e.target;

        setAssessmentForm(prev => ({
            ...prev,
            [name]: value
        }));

    }

    const editAssessment = (index) => {

        setEditingAssessmentIndex(index);

        setAssessmentForm(assessments[index]);

    }

    const deleteAssessment = async (id) => {

        try {

            await axios.delete(
                `${url}assessment/delete/${id}`
            );

            setAssessments(prev =>
                prev.filter(a => a.id !== id)
            );

        }

        catch (err) {

            console.log(err);

        }

    }

    const addNewAssessment = () => {

        console.log("New clicked");

        setEditingAssessmentIndex(null);

        setAssessmentForm({
            courseId:id,
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctAnswer: "",
            
        });

    };

    const saveAssessment = async () => {

        try {

            if (editingAssessmentIndex === null) {

                await axios.post(
                    `${url}assessment/create`,
                    assessmentForm
                );

            }

            else {

                await axios.put(
                    `${url}assessment/update/${assessmentForm.id}`,
                    assessmentForm
                );

            }

            const res = await axios.get(
                `${url}assessment/get/${id}`
            );

            setAssessments(res.data);

            setAssessmentForm(emptyAssessment);

            setEditingAssessmentIndex(null);

        }

        catch (err) {

            console.log(err);

        }

    }

    const handleChapterChange = (e) => {

        const { name, value, checked, type } = e.target;

        setChapterForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const editChapter = (index) => {

        setEditingIndex(index);

        setChapterForm(chapters[index]);

    };

    const addNewChapter = () => {

        setEditingIndex(null);

        setChapterForm({
            ...emptyChapter,
            chapterOrder: chapters.length + 1,
        });

    };

    const deleteChapter = async (id) => {
        await axios.delete(
            `${url}Chapter/delete/chapter/${id}`
        );

        getCourse();
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setCourse((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleThumbnail = (e) => {

        setThumbnail(e.target.files[0]);

    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {

            const courseDTO = {
                id: course.id,
                title: course.title,
                description: course.description,
                price: course.price,
                category: course.category,
                level: course.level,
                duration: course.duration,
                status: course.status,
                thumbnail: course.thumbnail,
            };

            await axios.put(
                `${url}course/update/course`,
                courseDTO
            );
            console.log(thumbnail)
            if (thumbnail) {

                const fd = new FormData();
                fd.append("thumbnail", thumbnail);
                console.log([...fd]);
                console.log("Uploading...");
                await axios.put(
                    `${url}course/setthumbnail/${course.id}`,
                    fd,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                ).then((res) => {

                    alert("Course Updated Successfully");
                })
                console.log("done");

            }


        }
        catch (err) {
            console.log(err);
        }
    }

    const createChapter = async () => {

        try {

            const formData = new FormData();

            formData.append(
                "chapter",
                new Blob(
                    [JSON.stringify({
                        ...chapterForm,
                        courseId: course.id
                    })],
                    {
                        type: "application/json"
                    }
                )
            );

            formData.append("video", chapterVideo);

            await axios.post(
                `${url}Chapter/create-single`,
                formData
            );

            alert("Chapter Added Successfully");

            getCourse();

            setChapterVideo(null);

            setChapterForm(emptyChapter);

        }
        catch (err) {
            console.log(err);
        }

    }

    const handleUpdateChapter = async (chapter) => {

        await axios.put(
            `${url}Chapter/edit/chapter`,
            chapter
        );

        alert("Chapter Updated");

        getCourse();

        setEditingIndex(null);

        setChapterForm(emptyChapter);

    }

    const saveChapter = () => {

        if (editingIndex === null) {
            createChapter();
        } else {
            handleUpdateChapter(chapterForm);
        }

    }



    return (

        <div className="min-h-screen bg-gray-100">

            <NavBarInstructor />

            <div className="max-w-6xl mx-auto py-8">
                {/* edit course */}
                <div className="bg-white shadow-xl rounded-xl p-8">

                    <h1 className="text-3xl font-bold mb-8">

                        Edit Course

                    </h1>

                    <form
                        onSubmit={handleUpdateCourse}
                        className="space-y-6"
                    >

                        {/* Title */}

                        <div>

                            <label className="font-semibold">

                                Course Title

                            </label>

                            <input
                                type="text"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-lg p-3"
                            />

                        </div>

                        {/* Description */}

                        <div>

                            <label className="font-semibold">

                                Description

                            </label>

                            <textarea
                                rows={5}
                                name="description"
                                value={course.description}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-lg p-3"
                            />

                        </div>

                        {/* Category + Level */}

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label className="font-semibold">

                                    Category

                                </label>

                                <select
                                    name="category"
                                    value={course.category || ""}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg p-3"
                                >

                                    <option value="Programming">Programming</option>

                                    <option value="Frontend">Frontend</option>

                                    <option value="Backend">Backend</option>

                                    <option value="Database">Database</option>

                                    <option value="DevOps">DevOps</option>

                                </select>

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Level

                                </label>

                                <select
                                    name="level"
                                    value={course.level || ""}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg p-3"
                                >

                                    <option value="Beginner">Beginner</option>

                                    <option value="Intermediate">Intermediate</option>

                                    <option value="Advanced">Advanced</option>

                                </select>

                            </div>

                        </div>

                        {/* Price + Duration */}

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label className="font-semibold">

                                    Price

                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={course.price || ""}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Duration (Hours)

                                </label>

                                <input
                                    type="number"
                                    name="duration"
                                    value={course.duration || ""}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            </div>

                        </div>

                        {/* Status */}

                        <div>

                            <label className="font-semibold">

                                Status

                            </label>

                            <select
                                name="status"
                                value={course.status || ""}
                                onChange={handleChange}
                                className="w-full mt-2 border rounded-lg p-3"
                            >

                                <option value="ACTIVE">ACTIVE</option>

                                <option value="INACTIVE">INACTIVE</option>

                            </select>

                        </div>

                        {/* Thumbnail */}

                        <div>

                            <label className="font-semibold">

                                Current Thumbnail

                            </label>

                            <div className="mt-3">

                                <img
                                    src={course.thumbnail || "/"}
                                    alt="Course Thumbnail"
                                    className="w-80 rounded-lg border shadow"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="font-semibold">

                                Change Thumbnail

                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnail}
                                className="w-full mt-3 border rounded-lg p-3"
                            />

                        </div>

                        <div className="flex justify-end">

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg"
                            >

                                Update Course

                            </button>

                        </div>

                    </form>

                </div>

                {/* edit chapter */}
                <div className="mt-16">

                    <h2 className="text-3xl font-bold mb-8">

                        Course Chapters

                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* LEFT */}

                        <div className="space-y-4">

                            {
                                chapters.map((chapter, index) => (

                                    <div
                                        key={index}
                                        className="border rounded-xl p-5 bg-white shadow">

                                        <h3 className="font-bold text-lg">

                                            Chapter {chapter.chapterOrder}

                                        </h3>

                                        <p className="mt-2">

                                            {chapter.title}

                                        </p>

                                        <div className="flex gap-3 mt-5">

                                            <button
                                                type="button"
                                                onClick={() => editChapter(index)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded">

                                                Edit

                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteChapter(chapter.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded">

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                ))
                            }

                            <button
                                type="button"
                                onClick={addNewChapter}
                                className="w-full py-3 rounded-lg bg-green-600 text-white">

                                + Add Chapter

                            </button>

                        </div>

                        {/* RIGHT */}

                        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

                            <h2 className="text-2xl font-bold mb-6">

                                {
                                    editingIndex == null
                                        ?
                                        "Add Chapter"
                                        :
                                        "Edit Chapter"
                                }

                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={chapterForm.title || ""}
                                    onChange={handleChapterChange}
                                    className="border rounded-lg p-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Duration"
                                    name="duration"
                                    value={chapterForm.duration || ""}
                                    onChange={handleChapterChange}
                                    className="border rounded-lg p-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Chapter Number"
                                    name="chapterOrder"
                                    value={chapterForm.chapterOrder}
                                    className="border rounded-lg p-3"
                                    readOnly
                                />


                            </div>

                            <textarea
                                rows={5}
                                placeholder="Description"
                                name="Description"
                                value={chapterForm.Description || ""}
                                onChange={handleChapterChange}
                                className="border rounded-lg p-3 w-full mt-5"
                            />

                            <textarea
                                rows={4}
                                placeholder="Notes"
                                name="notes"
                                value={chapterForm.notes || ""}
                                onChange={handleChapterChange}
                                className="border rounded-lg p-3 w-full mt-5"
                            />

                            {editingIndex === null && (
                                <div className="mt-5">
                                    <label className="block font-semibold mb-2">
                                        Upload Chapter Video
                                    </label>

                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setChapterVideo(e.target.files[0])}
                                        className="w-full border rounded-lg p-3"
                                    />

                                    {chapterVideo && (
                                        <p className="text-green-600 mt-2">
                                            Selected: {chapterVideo.name}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-3 mt-5">

                                <input
                                    type="checkbox"
                                    name="preview"
                                    checked={chapterForm.preview || ""}
                                    onChange={handleChapterChange}
                                />

                                <label>

                                    Free Preview

                                </label>

                            </div>

                            <button
                                type="button"
                                onClick={saveChapter}
                                className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-lg"
                            >
                                {editingIndex == null ? "Add Chapter" : "Update Chapter"}
                            </button>

                        </div>

                    </div>

                </div>

                {/* edit assessments */}
                {
                    assessments.map((assessment, index) => (

                        <div
                            key={assessment.id}
                            className="border rounded-xl bg-white shadow p-5 mb-4">

                            <h3 className="font-bold">
                                Question {index + 1}
                            </h3>

                            <p className="mt-2">
                                {assessment.question}
                            </p>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() => editAssessment(index)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded">

                                    Edit

                                </button>

                                <button
                                    onClick={() => deleteAssessment(assessment.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded">

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))
                }

                <textarea
                    name="question"
                    value={assessmentForm.question}
                    onChange={handleAssessmentChange}
                    rows={4}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    type="text"
                    name="optionA"
                    value={assessmentForm.optionA}
                    onChange={handleAssessmentChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="text"
                    name="optionB"
                    value={assessmentForm.optionB}
                    onChange={handleAssessmentChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="text"
                    name="optionC"
                    value={assessmentForm.optionC}
                    onChange={handleAssessmentChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="text"
                    name="optionD"
                    value={assessmentForm.optionD}
                    onChange={handleAssessmentChange}
                    className="border rounded-lg p-3"
                />

                <select
                    name="correctAnswer"
                    value={assessmentForm.correctAnswer}
                    onChange={handleAssessmentChange}
                    className="w-full border rounded-lg p-3 mt-5">

                    <option value="">Correct Answer</option>
                    <option value={assessmentForm.optionA}>Option A</option>
                    <option value={assessmentForm.optionB}>Option B</option>
                    <option value={assessmentForm.optionC}>Option C</option>
                    <option value={assessmentForm.optionA}>Option D</option>

                </select>

                <button
                    type="button"
                    onClick={saveAssessment}
                    className="bg-indigo-600 text-white px-6 py-3 rounded"
                >
                    {editingAssessmentIndex === null
                        ? "Add Assessment"
                        : "Update Assessment"}
                </button>

                <button
                    type="button"
                    onClick={addNewAssessment}
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >
                    New Assessment
                </button>

            </div>

        </div>

    );
};

export default EditCourse;
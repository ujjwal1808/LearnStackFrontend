import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../lib/url';
import NavBarInstructor from "../../Components/NavBarInstructor"

const CreateChapter = () => {
    const {courseId} = useParams();
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([
        {
        title: "",
        description: "",
        notes: "",
        duration: "",
        chapterOrder: 1,
        preview: false,
        video: null
    },
    ]);

    const addChapter = () => {

    setChapters([
        ...chapters,
        {
            title: "",
            description: "",
            notes: "",
            duration: "",
            chapterOrder: chapters.length + 1,
            preview: false,
            video: null
        },
    ]);

};

    const removeChapter = (index) => {

    const updated = [...chapters];

    updated.splice(index, 1);

    updated.forEach((chapter, i) => {

        chapter.chapterOrder = i + 1;

    });

    setChapters(updated);

};

    const handleChapterChange = (index, e) => {
        const { name, value, type, checked, files } = e.target;

        const updated = [...chapters];

        if (type === "checkbox") {
            updated[index][name] = checked;
        } else if (type === "file") {
            updated[index][name] = files[0];
        } else {
            updated[index][name] = value;
        }

        setChapters(updated);
    };

    const handleSubmit = () => {

    try {

        // JSON data (without video)
        const chapterData = chapters.map((chapter) => ({
            title: chapter.title,
            description: chapter.description,
            notes: chapter.notes,
            duration: Number(chapter.duration),
            chapterOrder: chapter.chapterOrder,
            preview: chapter.preview,
            courseId: Number(courseId)
        }));

        const formData = new FormData();

        // Append JSON
        formData.append(
            "chapters",
            new Blob(
                [JSON.stringify(chapterData)],
                {
                    type: "application/json"
                }
            )
        );

        // Append videos
        chapters.forEach((chapter) => {
            formData.append("videos", chapter.video);
        });

        console.log(chapterData);

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        axios.post(
            `${url}Chapter/create`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then((res)=>{
            console.log(res.data);
            
        });

        alert("Chapters Created Successfully");
        navigate(`/instructor/create-assessment/${courseId}`);

    } catch (error) {

        console.log(error);

    }

};

    return (
        <div>
            <NavBarInstructor/>
            <div className="mt-10">

                <h2 className="text-3xl font-bold mb-6">
                    Course Chapters
                </h2>

                {chapters.map((chapter, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-6 mb-8 border"
                    >

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="text-xl font-semibold">
                                Chapter {index + 1}
                            </h3>

                            {chapters.length > 1 && (
                                <button
                                    onClick={() => removeChapter(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>
                            )}

                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Title */}

                            <div>
                                <label className="block mb-2 font-medium">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={chapter.title}
                                    onChange={(e) => handleChapterChange(index, e)}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            {/* Chapter Number */}

                            <div>
                                <label className="block mb-2 font-medium">
                                    Chapter Number
                                </label>

                                <input
                                    type="number"
                                    name="chapterOrder"
                                    value={chapter.chapterOrder}
                                    onChange={(e) => handleChapterChange(index, e)}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            {/* Duration */}

                            <div>
                                <label className="block mb-2 font-medium">
                                    Duration (Minutes)
                                </label>

                                <input
                                    type="number"
                                    name="duration"
                                    value={chapter.duration}
                                    onChange={(e) => handleChapterChange(index, e)}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            {/* Upload Video */}

                            <div>
                                <label className="block mb-2 font-medium">
                                    Upload Video
                                </label>

                                <input
                                    type="file"
                                    accept="video/*"
                                    name="video"
                                    onChange={(e) => handleChapterChange(index, e)}
                                    className="w-full border rounded-lg p-3"
                                />

                                {chapter.video && (
                                    <p className="text-green-600 mt-2 text-sm">
                                        {chapter.video.name}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Description */}

                        <div className="mt-6">

                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                name="description"
                                value={chapter.description}
                                onChange={(e) => handleChapterChange(index, e)}
                                className="w-full border rounded-lg p-3"
                            />

                        </div>

                        {/* Notes */}

                        <div className="mt-6">

                            <label className="block mb-2 font-medium">
                                Notes
                            </label>

                            <textarea
                                rows="3"
                                name="notes"
                                value={chapter.notes}
                                onChange={(e) => handleChapterChange(index, e)}
                                className="w-full border rounded-lg p-3"
                            />

                        </div>

                        {/* Preview */}

                        <div className="mt-6 flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="preview"
                                checked={chapter.preview}
                                onChange={(e) => handleChapterChange(index, e)}
                                className="w-5 h-5"
                            />

                            <label className="font-medium">
                                Free Preview
                            </label>

                        </div>

                    </div>

                ))}

                <button
                    type="button"
                    onClick={addChapter}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                    + Add Chapter
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg"
                >
                    Create Course
                </button>

            </div>
        </div>
    )
}

export default CreateChapter
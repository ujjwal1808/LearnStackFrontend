import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AssessmentResultModal = ({ marks, total, onClose }) => {

    const navigate = useNavigate();

    const percentage = ((marks / total) * 100).toFixed(0);

    const getMessage = () => {

        if (percentage >= 90)
            return {
                title: "Outstanding!",
                color: "text-green-600",
                emoji: "🏆"
            };

        if (percentage >= 75)
            return {
                title: "Excellent!",
                color: "text-green-500",
                emoji: "🎉"
            };

        if (percentage >= 60)
            return {
                title: "Good Job!",
                color: "text-blue-600",
                emoji: "👏"
            };

        if (percentage >= 40)
            return {
                title: "Keep Practicing!",
                color: "text-yellow-500",
                emoji: "🙂"
            };

        return {
            title: "Needs Improvement",
            color: "text-red-500",
            emoji: "📚"
        };

    };

    // useEffect(() => {
    //   console.log(marks);
    //   console.log(total);
    // }, [])
    

    const result = getMessage();

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-8 animate-fadeIn">

                {/* Emoji */}

                <div className="text-center">

                    <div className="text-7xl">

                        {result.emoji}

                    </div>

                    <h1 className={`text-3xl font-bold mt-4 ${result.color}`}>

                        {result.title}

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Assessment Submitted Successfully

                    </p>

                </div>

                {/* Marks */}

                <div className="mt-10">

                    <div className="flex justify-between text-lg">

                        <span>Total Questions</span>

                        <span className="font-semibold">

                            {total}

                        </span>

                    </div>

                    <div className="flex justify-between text-lg mt-4">

                        <span>Marks Obtained</span>

                        <span className="font-semibold">

                            {marks}

                        </span>

                    </div>

                    <div className="flex justify-between text-lg mt-4">

                        <span>Percentage</span>

                        <span className="font-semibold text-indigo-600">

                            {percentage}%

                        </span>

                    </div>

                </div>

                {/* Progress */}

                <div className="mt-8">

                    <div className="w-full bg-gray-200 rounded-full h-4">

                        <div

                            className={`
                            
                            h-4
                            rounded-full
                            
                            ${
                                percentage >= 75
                                    ? "bg-green-500"
                                    : percentage >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }

                            `}

                            style={{

                                width: `${percentage}%`

                            }}

                        />

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex justify-center gap-5 mt-10">

                    <button

                        onClick={onClose}

                        className="px-8 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"

                    >

                        Close

                    </button>

                    <button

                        onClick={() => navigate(-1)}

                        className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"

                    >

                        Back to Course

                    </button>

                </div>

            </div>

        </div>

    );

};

export default AssessmentResultModal;
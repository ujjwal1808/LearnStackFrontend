import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import url from "../../lib/url";

import QuestionCards from "../../Components/QuestionCards"

import AssessmentResultModal from "../../Components/AssessmentResultModal";

const AssessmentPage = () => {

    const { courseId } = useParams();

    const userId = localStorage.getItem("id");

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [loading, setLoading] = useState(true);

    const [marks, setMarks] = useState(0);

    const [showResult, setShowResult] = useState(false);


    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {

        try {

            const res = await axios.get(
                `${url}assessment/get/${courseId}`
            );

            setQuestions(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    //------------------------------------------------

    const handleAnswerSelect = async (assessmentId, answer) => {

    // Don't call API again if same option selected
    if (selectedAnswers[assessmentId] === answer) return;

    // Update UI immediately
    setSelectedAnswers((prev) => ({
        ...prev,
        [assessmentId]: answer,
    }));

    try {

        await axios.post(
            `${url}marks/saving-answer`,
            {
                userId: Number(userId),
                courseId,
                assessmentId: assessmentId,
                selectedAnswer: answer,

            }
        ).then((res)=>{

            console.log(res.data)
        });

    } catch (err) {

        console.log(err);

    }
};

    //------------------------------------------------

    const nextQuestion = () => {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

        }

    };

    //------------------------------------------------

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(currentQuestion - 1);

        }

    };

    //------------------------------------------------

    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);

    };

    //------------------------------------------------

   const submitAssessment = async () => {

    try {

        const res = await axios.get(
            `${url}marks/getmarks/${userId}/${courseId}`
        );

        // console.log(res.data);

        setMarks(res.data[0].marksObtained);
        console.log(res.data[0].marksObtained)

        setShowResult(true);

    } catch (err) {

        console.log(err);

    }

};
    //------------------------------------------------

    const answeredQuestions = Object.keys(selectedAnswers).length;

    const progress = questions.length === 0
        ? 0
        : ((answeredQuestions / questions.length) * 100);

    //------------------------------------------------

    if (loading) {

        return (

            <div>

                <Navbar />

                <div className="flex justify-center items-center h-[80vh]">

                    <h2 className="text-2xl font-bold">

                        Loading Assessment...

                    </h2>

                </div>

            </div>

        );

    }

    //------------------------------------------------

    if (questions.length === 0) {

        return (

            <div>

                <Navbar />

                <div className="flex justify-center items-center h-[80vh]">

                    <h2 className="text-3xl font-bold text-gray-500">

                        No Assessment Available

                    </h2>

                </div>

            </div>

        );

    }

    //------------------------------------------------

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto py-10">

                <div className="bg-white rounded-xl shadow-lg p-8">

                    {/* Heading */}

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold">

                                Assessment

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Question {currentQuestion + 1} of {questions.length}

                            </p>

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold">

                                Answered

                            </h2>

                            <p className="text-indigo-600 font-bold text-2xl">

                                {answeredQuestions}/{questions.length}

                            </p>

                        </div>

                    </div>

                    {/* Progress */}

                    <div className="w-full bg-gray-200 h-3 rounded-full mt-8">

                        <div

                            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"

                            style={{
                                width: `${progress}%`
                            }}

                        />

                    </div>

                    {/* Question Palette */}

                    <div className="flex flex-wrap gap-3 mt-8">

                        {

                            questions.map((question, index) => (

                                <button

                                    key={question.id}

                                    onClick={() => jumpToQuestion(index)}

                                    className={`

                                    w-10
                                    h-10
                                    rounded-full
                                    font-bold
                                    transition

                                    ${

                                        currentQuestion === index

                                            ?

                                            "bg-indigo-600 text-white"

                                            :

                                            selectedAnswers[question.id]

                                                ?

                                                "bg-green-500 text-white"

                                                :

                                                "bg-gray-300"

                                    }

                                    `}

                                >

                                    {index + 1}

                                </button>

                            ))

                        }

                    </div>

                    {/* Question */}

                    <div className="mt-10">

                        <QuestionCards

                            question={questions[currentQuestion]}

                            selectedAnswer={

                                selectedAnswers[
                                questions[currentQuestion].id
                                ]

                            }

                            onSelect={handleAnswerSelect}

                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-between mt-10">

                        <button

                            onClick={previousQuestion}

                            disabled={currentQuestion === 0}

                            className="bg-gray-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-300"

                        >

                            Previous

                        </button>

                        {

                            currentQuestion === questions.length - 1

                                ?

                                <button

                                    onClick={submitAssessment}

                                    className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg"

                                >

                                    Submit Assessment

                                </button>

                                :

                                <button

                                    onClick={nextQuestion}

                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg"

                                >

                                    Next

                                </button>

                        }

                    </div>

                </div>

            </div>

            {

                showResult &&

                <AssessmentResultModal

                    marks={marks}

                    total={questions.length}

                    onClose={() => setShowResult(false)}

                />

            }
           

        </div>

    );

};

export default AssessmentPage;
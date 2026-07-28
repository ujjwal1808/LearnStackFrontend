import React from "react";

const QuestionCards = ({
    question,
    selectedAnswer,
    onSelect
}) => {

    return (

        <div className="space-y-6">

            <h2 className="text-2xl font-semibold">
                {question.question}
            </h2>

            {[

                question.optionA,
                question.optionB,
                question.optionC,
                question.optionD

            ].map((option, index) => (

                <label
                    key={index}
                    className={`

                        flex
                        items-center
                        gap-4
                        border
                        rounded-xl
                        p-4
                        cursor-pointer
                        transition

                        ${
                            selectedAnswer === option
                                ? "border-indigo-600 bg-indigo-50"
                                : "hover:bg-gray-50"
                        }

                    `}
                >

                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={selectedAnswer === option}
                        onChange={() =>
                            onSelect(question.id, option)
                        }
                    />

                    <span>{option}</span>

                </label>

            ))}

        </div>

    );

};

export default QuestionCards;
"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
// import { Question } from "@/types"; // Import the Question type
import ResultDisplay from "./ResultDisplay"; // Import the new component
import { FaRegCircle, FaCheckCircle } from "react-icons/fa"; // Import icons
import { ChevronLeft, RotateCcw } from "lucide-react"; // Import Lucide icons

function Questionnaire() {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1); // Start with question ID 1
  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string | null>(
    null
  );
  const [showResponse, setShowResponse] = useState<string | null>(null); // State to hold the final response
  const [questionHistory, setQuestionHistory] = useState<number[]>([1]); // Track question history

  const handleRestart = () => {
    setCurrentQuestionId(1);
    setSelectedOptionLabel(null);
    setShowResponse(null);
    setQuestionHistory([1]);
  };

  const handleOptionChange = (optionLabel: string) => {
    setSelectedOptionLabel(optionLabel);
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  // Separate 'Learn More' final options from regular choices
  const learnMoreOption = currentQuestion?.options?.find(
    (opt) => opt.label === "Learn More" && opt.complete && opt.response
  );
  const regularOptions = currentQuestion?.options?.filter(
    (opt) => !(opt.label === "Learn More" && opt.complete && opt.response)
  );
  const hasOnlyLearnMore =
    learnMoreOption && (!regularOptions || regularOptions.length === 0);

  const handlePrevious = () => {
    if (questionHistory.length > 1) {
      const newHistory = questionHistory.slice(0, -1);
      setQuestionHistory(newHistory);
      setCurrentQuestionId(newHistory[newHistory.length - 1]);
      setSelectedOptionLabel(null);
    }
  };

  const handleNext = () => {
    // If the only option is 'Learn More', show its response directly
    if (hasOnlyLearnMore && learnMoreOption && learnMoreOption.response) {
      setShowResponse(learnMoreOption.response);
      return;
    }

    // Existing logic for regular options
    if (!selectedOptionLabel || !currentQuestion || !currentQuestion.options)
      return;

    const selectedOpt = currentQuestion.options.find(
      (opt) => opt.label === selectedOptionLabel
    );

    if (selectedOpt) {
      if (selectedOpt.complete && selectedOpt.response) {
        // Show the final response
        setShowResponse(selectedOpt.response);
      } else if (selectedOpt.goTo) {
        // Navigate to the next question
        const nextQuestionExists = questions.some(
          (q) => q.id === selectedOpt.goTo
        );
        if (nextQuestionExists) {
          setCurrentQuestionId(selectedOpt.goTo);
          setQuestionHistory([...questionHistory, selectedOpt.goTo]); // Add new question to history
          setSelectedOptionLabel(null); // Reset selection for the next question
        } else {
          console.error(`Question with id ${selectedOpt.goTo} not found.`);
          // Optionally handle this case, e.g., show an error message or go to a default state
        }
      }
    }
  };

  // If a response should be shown, render the ResultDisplay component
  if (showResponse) {
    return <ResultDisplay response={showResponse} onRestart={handleRestart} />;
  }

  // Render the current question if it exists
  if (!currentQuestion) {
    // Handle case where question is not found (e.g., initial state or error)
    return <div>Loading question...</div>; // Or some error message
  }

  const questionHeading = currentQuestion.heading;
  console.log(questionHeading);

  return (
    <div className="bg-white shadow-lg p-10 max-sm:p-4 rounded-xl min-w-3/4 max-w-[90%] lg:max-w-3/4 max-sm:my-5 md:my-10">
      <h1 className="mb-6 text-primary text-lg max-sm:text-center">
        {questionHeading}
      </h1>
      <p className="mb-6 text-slate-500 font-secondary text-lg max-sm:text-md max-w-full max-sm:max-w-[90%] max-sm:mx-auto max-sm:text-center leading-relaxed">
        {currentQuestion.question}
      </p>
      {/* Only show radio options if there are regular options */}
      {regularOptions && regularOptions.length > 0 && (
        <ul className="flex flex-col gap-4 mb-8">
          {regularOptions.map((option, index) => (
            <li key={index}>
              {/* Use index for unique ID, but option.label is better if unique */}
              <label
                htmlFor={`option-${currentQuestionId}-${index}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  id={`option-${currentQuestionId}-${index}`}
                  name={`option-${currentQuestionId}`} // Ensure unique name per question
                  className="appearance-none" // Hide default radio button
                  onChange={() => handleOptionChange(option.label)}
                  checked={selectedOptionLabel === option.label} // Control the checked state
                  value={option.label} // Add value attribute
                />
                {/* Conditional Icon Rendering */}
                {selectedOptionLabel === option.label ? (
                  <FaCheckCircle className="text-green-400 text-2xl flex-shrink-0" />
                ) : (
                  <FaRegCircle className="text-gray-100 text-2xl flex-shrink-0" />
                )}
                <span className="text-gray-500 font-light font-secondary text-md max-sm:text-sm">
                  {option.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
      {/* Add margin bottom if radio buttons are hidden but learn more exists */}
      {hasOnlyLearnMore && <div className="mb-8"></div>}

      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
        <div className="flex gap-4 max-sm:w-full max-sm:flex-col">
          {/* Previous button - show after first question */}
          {questionHistory.length > 1 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition cursor-pointer max-sm:w-full flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
          )}
          {/* Start Over button - show after first question */}
          {questionHistory.length > 1 && (
            <button
              onClick={handleRestart}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition cursor-pointer max-sm:w-full flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          )}
        </div>
        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!hasOnlyLearnMore && !selectedOptionLabel}
          className="bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full"
        >
          {hasOnlyLearnMore ? "Learn More" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;

import { useState } from 'react'
import QuestionNavigator from './QuestionNavigator'
import RealTimeScore from './RealTimeScore'

const Quiz = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onOptionSelect,
  onNext,
  onSkip,
  onQuestionNavigate,
  questionStatuses,
  score,
  darkMode,
  toggleDarkMode,
  shuffleEnabled,
  onToggleShuffle
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleOptionClick = (optionIndex) => {
    if (selectedOption === null) {
      setIsAnimating(true)
      onOptionSelect(optionIndex)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const getOptionClass = (optionIndex) => {
    const baseClass = "w-full p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer text-left font-medium"
    
    if (selectedOption === null) {
      return `${baseClass} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20`
    }
    
    const isSelected = selectedOption === optionIndex
    const isCorrect = optionIndex === question.correctOptionIndex
    
    if (isSelected && isCorrect) {
      return `${baseClass} border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200`
    }
    
    if (isSelected && !isCorrect) {
      return `${baseClass} border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200`
    }
    
    if (isCorrect && selectedOption !== null) {
      return `${baseClass} border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200`
    }
    
    return `${baseClass} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 opacity-60`
  }

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {question?.subject || 'Quiz'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Question {currentIndex + 1} of {totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleShuffle}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                shuffleEnabled
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              title="Shuffle Questions"
            >
              🔀 Shuffle
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Question Navigator */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-6">
              <QuestionNavigator
                totalQuestions={totalQuestions}
                currentIndex={currentIndex}
                questionStatuses={questionStatuses}
                onQuestionClick={onQuestionNavigate}
              />
            </div>
          </div>

          {/* Center: Question Card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {question?.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {question?.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={getOptionClass(index)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 font-semibold text-lg">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                      {selectedOption !== null && index === question.correctOptionIndex && (
                        <span className="ml-auto text-green-600 dark:text-green-400">✓</span>
                      )}
                      {selectedOption === index && selectedOption !== question.correctOptionIndex && (
                        <span className="ml-auto text-red-600 dark:text-red-400">✗</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback Message */}
              {selectedOption !== null && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    selectedOption === question.correctOptionIndex
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  }`}
                >
                  <p className="font-semibold">
                    {selectedOption === question.correctOptionIndex
                      ? '✓ Correct!'
                      : '✗ Incorrect. The correct answer is highlighted in green.'}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={onSkip}
                className="px-6 py-3 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Skip Question
              </button>
              <button
                onClick={onNext}
                disabled={selectedOption === null}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedOption === null
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question →'}
              </button>
            </div>
          </div>

          {/* Right: Real-Time Score */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <RealTimeScore
                totalQuestions={totalQuestions}
                score={score}
                questionStatuses={questionStatuses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz


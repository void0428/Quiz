const Review = ({
  questions,
  answers,
  onBack,
  darkMode,
  toggleDarkMode
}) => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Review Answers
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Review Questions */}
        <div className="space-y-6">
          {answers.map((answer, index) => {
            const isCorrect = answer.isCorrect
            
            return (
              <div
                key={answer.questionId}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Question {index + 1}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isCorrect
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {isCorrect ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {answer.question}
                </p>

                <div className="space-y-2">
                  {answer.options.map((option, optIndex) => {
                    const isSelected = optIndex === answer.selectedOption
                    const isCorrectOption = optIndex === answer.correctOption
                    
                    let optionClass = "p-3 rounded-lg border-2 "
                    
                    if (isCorrectOption) {
                      optionClass += "border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                    } else if (isSelected && !isCorrect) {
                      optionClass += "border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                    } else {
                      optionClass += "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                    }
                    
                    return (
                      <div key={optIndex} className={optionClass}>
                        <div className="flex items-center">
                          <span className="mr-3 font-semibold">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          <span>{option}</span>
                          {isCorrectOption && (
                            <span className="ml-auto text-green-600 dark:text-green-400 font-bold">
                              ✓ Correct Answer
                            </span>
                          )}
                          {isSelected && !isCorrectOption && (
                            <span className="ml-auto text-red-600 dark:text-red-400 font-bold">
                              ✗ Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            ← Back to Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default Review


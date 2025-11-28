const Results = ({
  totalQuestions,
  score,
  onRestart,
  onReview,
  darkMode,
  toggleDarkMode
}) => {
  const percentage = Math.round((score.correct / totalQuestions) * 100)
  
  const getMessage = () => {
    if (percentage >= 90) return { text: 'Excellent! 🎉', color: 'text-green-600 dark:text-green-400' }
    if (percentage >= 75) return { text: 'Great Job! 👍', color: 'text-blue-600 dark:text-blue-400' }
    if (percentage >= 60) return { text: 'Good Work! 👏', color: 'text-yellow-600 dark:text-yellow-400' }
    if (percentage >= 40) return { text: 'Keep Trying! 💪', color: 'text-orange-600 dark:text-orange-400' }
    return { text: 'Try Again! 📚', color: 'text-red-600 dark:text-red-400' }
  }

  const message = getMessage()

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Results Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Quiz Completed!
            </h1>
            <div className={`text-4xl font-bold mb-2 ${message.color}`}>
              {message.text}
            </div>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(percentage / 100) * 552.92} 552.92`}
                  className="text-blue-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Score
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                Total Questions
              </div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {totalQuestions}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                Correct Answers
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {score.correct}
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                Wrong Answers
              </div>
              <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                {score.wrong}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                Percentage
              </div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {percentage}%
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onReview}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold transition-colors"
            >
              Review Answers
            </button>
            <button
              onClick={onRestart}
              className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results


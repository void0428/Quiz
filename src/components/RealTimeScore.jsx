const RealTimeScore = ({
  totalQuestions,
  score,
  questionStatuses
}) => {
  const answered = Object.values(questionStatuses).filter(s => s === 'correct' || s === 'wrong').length
  const percentage = answered > 0 ? Math.round((score.correct / answered) * 100) : 0
  const overallPercentage = totalQuestions > 0 ? Math.round((score.correct / totalQuestions) * 100) : 0

  const getMessage = () => {
    if (answered === 0) return { text: 'Start Answering! 📝', color: 'text-gray-600 dark:text-gray-400' }
    if (percentage >= 90) return { text: 'Excellent! 🎉', color: 'text-green-600 dark:text-green-400' }
    if (percentage >= 75) return { text: 'Great Job! 👍', color: 'text-blue-600 dark:text-blue-400' }
    if (percentage >= 60) return { text: 'Good Work! 👏', color: 'text-yellow-600 dark:text-yellow-400' }
    if (percentage >= 40) return { text: 'Keep Trying! 💪', color: 'text-orange-600 dark:text-orange-400' }
    return { text: 'Try Again! 📚', color: 'text-red-600 dark:text-red-400' }
  }

  const message = getMessage()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
        Score Analysis
      </h3>

      {/* Performance Message */}
      <div className={`text-center mb-6 ${message.color}`}>
        <div className="text-2xl font-bold mb-1">{message.text}</div>
        {answered > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Accuracy: {percentage}%
          </div>
        )}
      </div>

      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(overallPercentage / 100) * 351.86} 351.86`}
              className="text-blue-500 transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {overallPercentage}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Overall
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="space-y-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
            Total Questions
          </div>
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
            {totalQuestions}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
            Correct Answers
          </div>
          <div className="text-xl font-bold text-green-700 dark:text-green-300">
            {score.correct}
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <div className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">
            Wrong Answers
          </div>
          <div className="text-xl font-bold text-red-700 dark:text-red-300">
            {score.wrong}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
            Percentage
          </div>
          <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
            {overallPercentage}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealTimeScore


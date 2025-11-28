const QuestionNavigator = ({
  totalQuestions,
  currentIndex,
  questionStatuses,
  onQuestionClick
}) => {
  const getQuestionStatus = (index) => {
    return questionStatuses[index] || null
  }

  const getQuestionClass = (index) => {
    const baseClass = "w-8 h-8 flex items-center justify-center rounded-md font-medium text-xs transition-all cursor-pointer border-2"
    const status = getQuestionStatus(index)
    const isCurrent = index === currentIndex

    if (isCurrent) {
      return `${baseClass} border-blue-500 bg-blue-500 text-white shadow-lg scale-110`
    }

    switch (status) {
      case 'correct':
        return `${baseClass} border-green-500 bg-green-500 text-white hover:bg-green-600`
      case 'wrong':
        return `${baseClass} border-red-500 bg-red-500 text-white hover:bg-red-600`
      case 'skipped':
        return `${baseClass} border-blue-300 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50`
      default:
        return `${baseClass} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600`
    }
  }

  // Calculate statistics
  const answered = Object.values(questionStatuses).filter(s => s === 'correct' || s === 'wrong').length
  const skipped = Object.values(questionStatuses).filter(s => s === 'skipped').length
  const remaining = totalQuestions - answered - skipped

  // Create grid: 10 columns
  const questionsPerRow = 10
  const rows = Math.ceil(totalQuestions / questionsPerRow)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-fit w-full">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
        Question Navigator
      </h3>

      {/* Legend */}
      <div className="mb-3 space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500 border-2 border-green-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Correct</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500 border-2 border-red-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Wrong</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-400"></div>
          <span className="text-gray-600 dark:text-gray-400">Skipped</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Unanswered</span>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="max-h-96 overflow-y-auto mb-4">
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(index)}
              className={getQuestionClass(index)}
              title={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1 text-sm">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Answered:</span>
          <span className="font-semibold">{answered}</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Skipped:</span>
          <span className="font-semibold">{skipped}</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Remaining:</span>
          <span className="font-semibold">{remaining}</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionNavigator


import { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Review from './components/Review'
import quizData from './data/quizData.json'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [isFinished, setIsFinished] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [shuffleEnabled, setShuffleEnabled] = useState(false)
  const [questionStatuses, setQuestionStatuses] = useState({}) // Track status: 'correct', 'wrong', 'skipped', null

  useEffect(() => {
    initializeQuiz()
  }, [])

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const initializeQuiz = (shouldShuffle = shuffleEnabled) => {
    let questionList = [...quizData.questions]
    
    if (shouldShuffle) {
      questionList = shuffleArray(questionList)
    }
    
    setQuestions(questionList)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setAnswers([])
    setScore({ correct: 0, wrong: 0 })
    setIsFinished(false)
    setShowReview(false)
    setQuestionStatuses({})
  }

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleOptionSelect = (optionIndex) => {
    if (selectedOption !== null) return // Already answered
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = optionIndex === currentQuestion.correctOptionIndex
    
    setSelectedOption(optionIndex)
    
    const answerData = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedOption: optionIndex,
      correctOption: currentQuestion.correctOptionIndex,
      options: currentQuestion.options,
      isCorrect
    }
    
    setAnswers([...answers, answerData])
    
    // Update question status
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: isCorrect ? 'correct' : 'wrong'
    }))
    
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }))
    }
  }

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex)
    // Check if this question was already answered
    const currentQuestion = questions[questionIndex]
    if (currentQuestion) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id)
      setSelectedOption(existingAnswer ? existingAnswer.selectedOption : null)
    } else {
      setSelectedOption(null)
    }
  }

  const handleSkip = () => {
    const currentQuestion = questions[currentQuestionIndex]
    // Mark as skipped
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: 'skipped'
    }))
    // Move to next question
    handleNext()
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(nextIndex)
      // Check if next question was already answered
      const nextQuestion = questions[nextIndex]
      if (nextQuestion) {
        const existingAnswer = answers.find(a => a.questionId === nextQuestion.id)
        setSelectedOption(existingAnswer ? existingAnswer.selectedOption : null)
      } else {
        setSelectedOption(null)
      }
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    initializeQuiz()
  }

  const handleToggleShuffle = () => {
    const newShuffleValue = !shuffleEnabled
    setShuffleEnabled(newShuffleValue)
    if (!isFinished && questions.length > 0) {
      // Reinitialize with new shuffle setting
      initializeQuiz(newShuffleValue)
    }
  }

  if (showReview) {
    return (
      <Review
        questions={questions}
        answers={answers}
        onBack={() => setShowReview(false)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
    )
  }

  if (isFinished) {
    return (
      <Results
        totalQuestions={questions.length}
        score={score}
        onRestart={handleRestart}
        onReview={() => setShowReview(true)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading quiz...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Quiz
        question={questions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        onNext={handleNext}
        onSkip={handleSkip}
        onQuestionNavigate={handleQuestionNavigation}
        questionStatuses={questionStatuses}
        score={score}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        shuffleEnabled={shuffleEnabled}
        onToggleShuffle={handleToggleShuffle}
      />
    </div>
  )
}

export default App


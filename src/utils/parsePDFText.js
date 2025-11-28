/**
 * Utility function to help parse PDF text into JSON format
 * 
 * This is a helper function that you can use to convert your extracted PDF text
 * into the required JSON format for the quiz app.
 * 
 * Usage:
 * 1. Extract text from your PDF
 * 2. Format it with clear question markers (e.g., "Q1:", "Question 1:", etc.)
 * 3. Use this function or manually structure your data
 */

/**
 * Example parser function for common MCQ formats
 * Adjust the regex patterns based on your PDF format
 */
export const parseMCQText = (text, subjectName = "Quiz Subject") => {
  const questions = []
  let currentQuestion = null
  let currentOptions = []
  let questionCounter = 1

  // Common patterns to look for:
  // - Question markers: Q1, Question 1, 1., etc.
  // - Option markers: A), B), C), D) or A., B., C., D. or (A), (B), etc.
  // - Answer markers: Answer:, Correct Answer:, Ans:, etc.

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

  lines.forEach((line, index) => {
    // Detect question start (adjust pattern as needed)
    const questionMatch = line.match(/^(?:Q\d+|Question\s+\d+|^\d+[\.\)])\s*(.+)$/i)
    if (questionMatch) {
      // Save previous question if exists
      if (currentQuestion) {
        questions.push({
          id: questionCounter++,
          question: currentQuestion,
          options: currentOptions,
          correctOptionIndex: 0 // You'll need to identify this from your text
        })
      }
      currentQuestion = questionMatch[1]
      currentOptions = []
      return
    }

    // Detect options (adjust pattern as needed)
    const optionMatch = line.match(/^[\(]?([A-D])[\)\.\)]\s*(.+)$/i)
    if (optionMatch) {
      currentOptions.push(optionMatch[2].trim())
      return
    }

    // Detect correct answer (adjust pattern as needed)
    const answerMatch = line.match(/^(?:Answer|Correct Answer|Ans)[:\s]+([A-D])/i)
    if (answerMatch) {
      // This would set the correctOptionIndex
      // Implementation depends on your text format
    }
  })

  // Add last question
  if (currentQuestion) {
    questions.push({
      id: questionCounter++,
      question: currentQuestion,
      options: currentOptions,
      correctOptionIndex: 0 // Update manually
    })
  }

  return {
    subject: subjectName,
    questions: questions
  }
}

/**
 * Manual conversion guide:
 * 
 * If your PDF text looks like this:
 * 
 * Q1. What is the capital of France?
 * A) London
 * B) Berlin
 * C) Paris
 * D) Madrid
 * Answer: C
 * 
 * Convert it to:
 * {
 *   "id": 1,
 *   "question": "What is the capital of France?",
 *   "options": ["London", "Berlin", "Paris", "Madrid"],
 *   "correctOptionIndex": 2  // C is index 2 (0-based: A=0, B=1, C=2, D=3)
 * }
 */

export default parseMCQText


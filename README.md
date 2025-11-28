# Quaze - MCQ Quiz Application

A beautiful, user-friendly MCQ quiz application built with React and Tailwind CSS.

## Features

- ✨ Clean, aesthetic UI with smooth animations
- 🌓 Light/Dark mode toggle
- 📊 Real-time progress tracking
- ✅ Immediate feedback on answer selection
- 📈 Comprehensive scoring system
- 🔀 Shuffle questions option
- 📝 Review answers after completion
- 🔄 Restart quiz functionality

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Adding Your Quiz Questions

1. Extract text from your PDF document
2. Use the provided JSON structure in `src/data/quizData.json`
3. Replace the sample questions with your own

### JSON Structure

```json
{
  "subject": "Your Subject Name",
  "questions": [
    {
      "id": 1,
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctOptionIndex": 2
    }
  ]
}
```

**Note:** `correctOptionIndex` is 0-based (0 = Option A, 1 = Option B, 2 = Option C, 3 = Option D)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
quaze/
├── src/
│   ├── components/
│   │   ├── Quiz.jsx          # Main quiz component
│   │   ├── Results.jsx       # Results screen
│   │   └── Review.jsx        # Answer review screen
│   ├── data/
│   │   └── quizData.json     # Quiz questions data
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Features Explained

### Quiz Interface
- Displays current question with 4 options
- Progress bar showing completion percentage
- Question counter (e.g., "Question 3 of 20")

### Answer Selection
- Click any option to select
- Immediate visual feedback:
  - Correct answer highlighted in green
  - Wrong answer highlighted in red
  - Correct option always shown in green

### Scoring System
- Total questions count
- Correct answers count
- Wrong answers count
- Percentage score
- Performance message based on score:
  - 90%+: "Excellent! 🎉"
  - 75-89%: "Great Job! 👍"
  - 60-74%: "Good Work! 👏"
  - 40-59%: "Keep Trying! 💪"
  - <40%: "Try Again! 📚"

### Additional Features
- **Shuffle Questions**: Randomize question order
- **Review Answers**: See all questions with correct/incorrect answers highlighted
- **Dark Mode**: Toggle between light and dark themes
- **Restart Quiz**: Start the quiz again from the beginning

## Customization

You can customize the app by:
- Modifying colors in Tailwind classes
- Adjusting spacing and sizing
- Adding more features in the components
- Changing the subject name in `quizData.json`

## License

MIT


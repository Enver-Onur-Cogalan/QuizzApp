# Quizz.app

Quizz.app is an interactive quiz application built with React Native and Expo. Players answer 10 randomly selected questions from a static question bank while enjoying a fun experience enhanced with lifelines, animations, sound effects, and Lottie animations.

## Features

- **Quiz Logic:**
  - Randomly selects 10 questions from a static question bank.
  - Players progress by answering one question at a time.

- **50-50 Lifeline:**
  - Eliminates two incorrect options to make it easier to find the correct one.
  - Can only be used once per game.

- **Animations & Sound Effects:**
  - Shake and blink animations on answer selection.
  - Sound effects for correct/incorrect answers and background music using `expo-av`.

- **Engaging UI:**
  - Home screen enhanced with Lottie animation and custom start button.
  - Result screen features a fire animation when the player scores a perfect 10/10.

## Installation

1. **Requirements:**
   - Node.js
   - Expo CLI (or use `npx create-expo-app` to set up the project)

2. **Clone the Repository:**

   ```bash
   git clone https://github.com/Enver-Onur-Cogalan/QuizzApp.git
   cd QuizzApp
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the App:**

   ```bash
   expo start
   ```

## Usage

- **HomeScreen:**
  Start the quiz by tapping the "Start Quiz" button under a fun Lottie animation.

- **QuizScreen:**
  Answer randomly selected questions, use the 50-50 lifeline if needed, and enjoy visual and audio feedback.

- **ResultScreen:**
  Displays your final score. If you score 10/10, a special fire animation plays.

## Technologies Used

- **React Native (Expo)**
- **React Navigation**
- **Lottie (lottie-react-native)**
- **expo-av** (for sound/music)


## Contributing

This is a beginner-level quiz app project. Feel free to contribute with suggestions, pull requests, or issues!

## License

This project is licensed under the MIT License.

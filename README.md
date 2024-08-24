# QuizApp

QuizApp is an interactive web application that allows users to take quizzes on various topics, add new questions, and view their performance summary.

## Features

- Topic Selection: Choose from a variety of quiz topics.
- Quiz Taking: Answer questions on the selected topic.
- Performance Summary: View your quiz results and overall performance.
- Add Questions: Contribute new questions to the quiz database.
- Dark/Light Mode: Toggle between dark and light themes for comfortable viewing.

## Technologies Used

- Frontend: React.js
- Backend:  Node.js with Express
- Database: MongoDB
- Hosting: Frontend on vercel and on Render also, Backend on Render

## Links
- Frontend:https://quizz-app-frontend-two.vercel.app/
- Backend:https://quizzapp-backend.onrender.com/api/topics
- Backend-git_hub :https://github.com/Amanyadav207/QuizzApp-backend.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
    ```
    git clone git@github.com:Amanyadav207/QuizzApp-Frontend.git
    cd QuizzApp-Frontend
    ```
2. Install dependencies:
    ``` 
    npm install
    ```
3. Create a `.env` file in the root directory and add your backend URL:
    ```
    REACT_APP_BACKEND_URL=your_Backend_url
    ```
4. Start the development server:
    ```
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).
2. Select a topic from the Topic Selection page.
3. Answer the quiz questions.
4. View your performance summary after completing the quiz.
5. Use the "Add Question" feature to contribute new questions to the database.
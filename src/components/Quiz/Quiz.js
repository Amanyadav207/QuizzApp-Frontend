import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axoisInstance';
// import ThemeContext from '../../contexts/ThemeContext';
import './Quiz.css';
// import axiosInstance from '../../config/axoisInstance';
// import '../../styles/global.css';


function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const { topic } = useParams();
  const navigate = useNavigate();
  // const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axiosInstance.get(`/question/${topic}`)
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, [topic]);

  const handleOptionToggle = (index) => {
    if (answered) return; // Prevent changing answers after submission

    if (questions[currentQuestion].type === 'multiple') {
      setSelectedAnswers(prevSelected =>
        prevSelected.includes(index)
          ? prevSelected.filter(i => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedAnswers([index]);
    }
  };

  const handleSubmitAnswer = () => {
    if (answered) return; // Prevent multiple submissions

    const question = questions[currentQuestion];
    const correctAnswers = question.options
      .map((option, index) => (option.isCorrect ? index : -1))
      .filter(index => index !== -1);
    
    const isCorrect = 
      question.type === 'multiple'
        ? correctAnswers.length === selectedAnswers.length &&
          correctAnswers.every(index => selectedAnswers.includes(index))
        : selectedAnswers.length === 1 && correctAnswers.includes(selectedAnswers[0]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswered(true);

    // Automatically move to the next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswers([]);
        setAnswered(false);
      } else {
        navigate('/summary', { state: { score: isCorrect ? score + 1 : score, totalQuestions: questions.length } });
      }
    }, 1000);
  };

  const getButtonClass = (index) => {
    if (answered) {
      const isCorrect = questions[currentQuestion].options[index].isCorrect;
      return isCorrect ? 'correct' : selectedAnswers.includes(index) ? 'incorrect' : '';
    }
    return selectedAnswers.includes(index) ? 'selected' : '';
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[currentQuestion];

  return (
    <div className="quiz">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
        ></div>
      </div>

      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p className="question-type">{`Question Type: ${question.type === 'multiple' ? 'Multiple Correct' : question.type === 'single' ? 'Single Correct' : 'True/False'}`}</p>
      <p className="question-text">{question.text}</p>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleOptionToggle(index)}
            className={`option-button ${getButtonClass(index)} `}
          >
            {option.text}
          </button>
        ))}
      </div>
      <button onClick={handleSubmitAnswer} className="button primary hover-effect ">Submit Answer</button>
    </div>
  );
}

export default Quiz;

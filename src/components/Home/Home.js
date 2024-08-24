import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../contexts/ThemeContext';
import './Home.css';
// import '../../styles/global.css';


function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`home ${theme}`}>
      <div className="home-content">
        <h1>Welcome to QuizMaster</h1>
        <p>Challenge yourself with our diverse range of quizzes. Learn, compete, and have fun!</p>
        
        <div className="button-container1">
          <Link to="/topics" className="button primary hover-effect">Start Quiz</Link>
          <Link to="/add-question" className="button secondary hover-effect">Add Question</Link>
        </div>
        <div className="features">
          <div className="feature">
            <i className="fas fa-brain"></i>
            <h3>Learn</h3>
            <p>Expand your knowledge</p>
          </div>
          <div className="feature">
            <i className="fas fa-trophy"></i>
            <h3>Compete</h3>
            <p>Challenge your friends</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-line"></i>
            <h3>Improve</h3>
            <p>Track your progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
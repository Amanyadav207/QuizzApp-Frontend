import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeContext from '../../contexts/ThemeContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './PerformanceSummary.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function PerformanceSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  const percentage = Math.round((score / totalQuestions) * 100);

  const chartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [score, totalQuestions - score],
        backgroundColor: ['#2ecc71', '#ff2d2d'],
        hoverBackgroundColor: ['#27ae60', '#d62626'],
        borderWidth: 3,
        borderColor: ['#27ae60', '#d62626'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: theme === 'dark' ? '#f5f5f5' : '#333',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={`performance-summary ${theme}`}>
      <div className="summary-content">
        <h2>Quiz Results</h2>
        <div className="score">{percentage}%</div>
        <div className="score-details">
          You got {score} correct answers out of {totalQuestions} questions.
        </div>
        <div className="performance-chart">
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="action-buttons">
          <button onClick={() => navigate('/topics')} className="button primary hover-effect">Try Another Quiz</button>
          <button onClick={() => navigate('/')} className="button secondary hover-effect">Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default PerformanceSummary;

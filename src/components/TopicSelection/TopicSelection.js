import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import ThemeContext from '../../contexts/ThemeContext';
import './TopicSelection.css';
import '../../styles/global.css';
import axiosInstance from '../../config/axoisInstance';

function TopicSelection() {
  const [topics, setTopics] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axiosInstance.get('/topics')
    .then(response => {
      console.log('Fetched topics:', response.data);
      setTopics(response.data);
    })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  return (
    <div className={`topic-selection ${theme}`}>
    <h2 className='tocenter' >Select a Topic</h2>
    <div className="topics">
      <div className="topic-list">
        {topics.map(topic => (
          <Link key={topic.name} to={`/quiz/${topic.name}`} className="topic-button">
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

export default TopicSelection;
import React, { useState, useEffect,useContext } from 'react';
// import axios from 'axios';
import ThemeContext from '../../contexts/ThemeContext';
import './AddQuestion.css';
import '../../styles/global.css';
import axiosInstance from "../../config/axoisInstance";

function AddQuestion() {
  const [question, setQuestion] = useState({
    text: '',
    topic: '',
    type: 'single',
    options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
  });
  const [message, setMessage] = useState('');
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    // Fetch existing topics when component mounts
    axiosInstance.get('/topics')
    .then(response => {
      // Ensure topics are stored as an array of strings
      const topicStrings = response.data.map(topic => 
        typeof topic === 'string' ? topic : topic.name || ''
      );
      setTopics(topicStrings);
    })
    .catch(error => console.error('Error fetching topics:', error));
}, []);
  const handleTopicChange = (e) => {
    const value = e.target.value;
    setQuestion({ ...question, topic: value });
    
    // Filter topics based on input
    const filtered = topics.filter(topic => 
      topic.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.text || !question.topic || question.options.some(option => !option.text)) {
      setMessage('Please fill all fields');
      return;
    }
    if (!question.options.some(option => option.isCorrect)) {
      setMessage('Please mark at least one option as correct');
      return;
    }

    // Normalize topic to lowercase before sending
    const normalizedQuestion = {
      ...question,
      topic: question.topic.toLowerCase()
    };

    axiosInstance.post('/question', normalizedQuestion)
      .then(() => {
        setMessage('Question added successfully');
        setQuestion({
          text: '',
          topic: '',
          type: 'single',
          options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
        });
        // Update topics list if it's a new topic
        if (!topics.includes(normalizedQuestion.topic)) {
          setTopics([...topics, normalizedQuestion.topic]);
        }
      })
      .catch(error => {
        console.error('Error adding question:', error);
        setMessage('Error adding question. Please try again.');
      });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...question.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setQuestion({ ...question, options: newOptions });
  };

  const addOption = () => {
    if (question.options.length < 4) {
      setQuestion({
        ...question,
        options: [...question.options, { text: '', isCorrect: false }],
      });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    let newOptions = [...question.options];
    if (newType === 'boolean') {
      newOptions = [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: false }
      ];
    } else if (newOptions.length < 2) {
      newOptions.push({ text: '', isCorrect: false });
    }
    setQuestion({ ...question, type: newType, options: newOptions });
  };

  return (
    <div className={`add-question-container ${theme}`}>
      <form onSubmit={handleSubmit} className="add-question-form">
        <h2>Add a New Question</h2>
        {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
        
        <div className="form-group">
          <label htmlFor="question-text">Question Text</label>
          <textarea
            id="question-text"
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            placeholder="Enter your question here"
            className="input"
            rows="3"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            type="text"
            value={question.topic}
            onChange={handleTopicChange}
            placeholder="Enter or select a topic"
            className="input"
            list="topic-list"
          />
          <datalist id="topic-list">
            {filteredTopics.map((topic, index) => (
              <option key={index} value={topic} />
            ))}
          </datalist>
        </div>
  
        <div className="form-group">
          <label htmlFor="question-type">Question Type</label>
          <select
            id="question-type"
            value={question.type}
            onChange={handleTypeChange}
            className="input"
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
  
        <div className="options-section">
          <h3>Options</h3>
          <div className="options-container">
            {question.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="option-input"
                  disabled={question.type === 'boolean'}
                />
                <label className="checkbox-label">
                  <input
                    type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                    name="correct-option"
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>
          {question.type !== 'boolean' && question.options.length < 4 && (
            <button type="button" onClick={addOption} className="button secondary hover-effect">Add Option</button>
          )}
        </div>
  
        <div className="button-container">
          <button type="submit" className="button primary hover-effect">Add Question</button>
        </div>
      </form>
    </div>
  );
}

export default AddQuestion;
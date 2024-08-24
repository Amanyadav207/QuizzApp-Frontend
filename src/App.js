import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeContext from './contexts/ThemeContext';
import Home from './components/Home/Home';
import TopicSelection from './components/TopicSelection/TopicSelection';
import Quiz from './components/Quiz/Quiz';
import AddQuestion from './components/AddQuestion/AddQuestion';
import PerformanceSummary from './components/PerformanceSummary/PerformanceSummary';
import './App.css';
import "./styles/global.css";

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`app ${theme}`}>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<TopicSelection />} />
            <Route path="/quiz/:topic" element={<Quiz />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/summary" element={<PerformanceSummary />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import WeatherByHours from './components/WeatherByHours';

function AppRouter() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/weather-hours" element={<WeatherByHours />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
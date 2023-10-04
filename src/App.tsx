import React from 'react';
import AppRouter from './Router';
import { WeatherDataProvider } from './WeatherContext';

function App() {
  return (
    <WeatherDataProvider>
      <AppRouter />
    </WeatherDataProvider>
  );
}

export default App;
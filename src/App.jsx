import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import { Home } from './pages/Home';

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <h1>Context API Example</h1>
      <p>Current Theme: <b>{theme}</b></p>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <Home/>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

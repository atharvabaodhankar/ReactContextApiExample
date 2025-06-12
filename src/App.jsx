import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import { Home } from './pages/Home';
import { AuthProvider } from './context/AuthContext';

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
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

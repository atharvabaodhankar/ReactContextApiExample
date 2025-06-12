# React Context API Example

This project demonstrates two ways to implement React's Context API for state management, specifically for a theme toggling feature.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Method 1: Manual Context Usage (`.Provider value={{ }}` and `Context.Consumer`)](#method-1-manual-context-usage-provider-value--and-contextconsumer)
- [Method 2: Using `useContext` with a Custom Hook (Recommended)](#method-2-using-usecontext-with-a-custom-hook-recommended)
- [How to Run](#how-to-run)

## Introduction

React Context provides a way to pass data through the component tree without having to pass props down manually at every level. This is particularly useful for global data like user authentication, theme settings, or preferred language.

## Project Structure

```
.gitignore
README.md
eslint.config.js
index.html
package-lock.json
package.json
public\
│   └── vite.svg
src\
│   ├── App.css
│   ├── App.jsx
│   ├── assets\
│   │   └── react.svg
│   ├── context\
│   │   └── ThemeContext.jsx
│   ├── index.css
│   ├── main.jsx
│   └── pages\
└── vite.config.js
```

## Method 1: Manual Context Usage (`.Provider value={{ }}` and `Context.Consumer`)

This method involves directly using `Context.Provider` to provide the value and `Context.Consumer` to consume it. While functional, it can lead to more verbose code, especially when consuming multiple contexts.

**1. Create the Context (`ThemeContext.jsx` - Manual Example)**

```jsx:src/context/ThemeContextManual.jsx
import React, { createContext } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProviderManual = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**2. Provide the Context (`main.jsx` - Manual Example)**

```jsx:src/main.jsx
// ... other imports
import { ThemeProviderManual } from './context/ThemeContextManual';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderManual>
      <App />
    </ThemeProviderManual>
  </React.StrictMode>
);
```

**3. Consume the Context (`App.jsx` - Manual Example)**

```jsx:src/AppManual.jsx
import React from 'react';
import { ThemeContext } from './context/ThemeContextManual';
import './App.css';

function AppManual() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div className={`App ${theme}`}>
          <h1>Context API Example (Manual)</h1>
          <p>Current Theme: {theme}</p>
          <button onClick={toggleTheme}>
            Toggle Theme
          </button>
        }
    </ThemeContext.Consumer>
  );
}

export default AppManual;
```

## Method 2: Using `useContext` with a Custom Hook (Recommended)

This is the more modern and recommended approach, especially with React Hooks. It makes consuming context cleaner and more concise.

**1. Create the Context and Custom Hook (`ThemeContext.jsx`)**

```jsx:src/context/ThemeContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

**2. Provide the Context (`main.jsx`)**

```jsx:src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**3. Consume the Context (`App.jsx`)**

```jsx:src/App.jsx
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <h1>Context API Example</h1>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
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
```

## How to Run

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Start the Development Server**:

    ```bash
    npm run dev
    ```

    This will typically open the application in your browser at `http://localhost:5173/`.

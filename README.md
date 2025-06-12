---

# 🌗 React Context API - Theme Toggle Example

This project demonstrates how to use **React Context API** to manage global state (like light/dark theme) in two different ways:

- **Method 1:** Direct use of `<Context.Provider>` inside `App.jsx`
- **Method 2 (Used in this project):** Creating a custom provider component (`ThemeProvider`) to wrap and organize logic

---

## 🔧 Project Setup

```bash
npm install
npm run dev  # or npm start if using CRA
````

---

## 📁 Folder Structure

```
src/
│
├── context/
│   └── ThemeContext.js     # Context logic (Method 2)
│
├── pages/
│   └── Home.jsx            # Component using the context
│
├── App.jsx                 # Uses ThemeProvider + AppContent
└── App.css                 # Theme styles
```

---

## 📦 What is Context API?

React Context is used to **share data globally** between components without prop drilling.

---

## 🧠 Method 1: Manual Provider (Basic)

### 🔸 Example:

```jsx
// App.jsx
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <AppContent />
</ThemeContext.Provider>
```

* Suitable for **very small apps**
* You manage state directly in `App.jsx`
* Not scalable or clean when the app grows

---

## ✅ Method 2: Custom Provider Component (Used Here)

### 📄 `ThemeContext.js`

```jsx
import { createContext, useState, useContext } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

### 📄 `App.jsx`

```jsx
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Home } from "./pages/Home";

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <h1>Context API Example</h1>
      <p>Current Theme: <b>{theme}</b></p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Home />
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

### 📄 `Home.jsx`

```jsx
import { useTheme } from "../context/ThemeContext";

export const Home = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="home">
      <b>Home can Do it Too</b> <br />
      <button onClick={toggleTheme}>
        Toggle Theme From Home Component
      </button>
    </div>
  );
};
```

---

## ✅ Why Method 2 is Better

| Feature           | Method 1             | Method 2 (Used Here)        |
| ----------------- | -------------------- | --------------------------- |
| Clean Code        | ❌ Mixed in App.jsx   | ✅ Separated in its own file |
| Reusable Provider | ❌ No                 | ✅ Yes                       |
| Scalable          | ❌ Hard to maintain   | ✅ Easy to add more values   |
| Recommended       | ❌ For small projects | ✅ For real apps             |

---

## 🎯 Conclusion

* Context API helps manage shared state without prop drilling
* Method 2 (custom provider component) is **clean, modular, and scalable**
* This project uses a `ThemeProvider` to control light/dark mode across the app

---

## 🧪 Try Expanding It

* Add `localStorage` to persist theme
* Add `user login` state to context
* Use with `React Router`

---

### 💡 Built by Atharva with ❤️ & React

```

---

Let me know if you want a version with screenshots or badges, or if you'd like to turn this into a GitHub repo with a README and full starter code!
```

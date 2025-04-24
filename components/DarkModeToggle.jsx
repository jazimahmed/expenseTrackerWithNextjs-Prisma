import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false); // default to false

  // Load theme from localStorage only after the component mounts (client-side)
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
  }, []);

  useEffect(() => {
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-3 py-1 rounded border text-sm bg-gray-100 dark:bg-gray-800 dark:text-white text-slate-500"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;

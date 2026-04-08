'use client';
import { useState, useEffect } from 'react';
import styles from './HeaderActions.module.css';
import MiniClock from '../MiniClock/MiniClock';

export default function HeaderActions() {
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.headerActions}>
      <MiniClock />
      
      <button 
        className={`${styles.actionBtn} ${styles.printBtn}`} 
        onClick={handlePrint}
        title="Print Calendar"
        aria-label="Print Calendar"
      >
        🖨️
      </button>

      <button 
        className={`${styles.actionBtn} ${styles.themeBtn}`} 
        onClick={toggleTheme}
        title="Toggle Light/Dark Mode"
        aria-label="Toggle Light/Dark Mode"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

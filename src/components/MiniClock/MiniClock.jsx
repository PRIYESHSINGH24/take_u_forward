'use client';
import { useState, useEffect } from 'react';
import styles from './MiniClock.module.css';

export default function MiniClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Initial set
    setTime(new Date());

    // Update every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null; // Avoid hydration mismatch

  // Format hours, minutes, and am/pm
  let hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutes = time.getMinutes().toString().padStart(2, '0');
  
  // Format the date shortly (e.g., "Apr 7")
  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className={styles.clockWrapper}>
      <div className={styles.time}>
        {hours}<span className={styles.blink}>:</span>{minutes}
        <span className={styles.ampm}>{ampm}</span>
      </div>
      <div className={styles.date}>
        {dateStr}
      </div>
    </div>
  );
}

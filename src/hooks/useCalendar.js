'use client';
import { useState, useCallback } from 'react';

/**
 * Custom hook for calendar month navigation
 */
export default function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next, 0 = initial

  const goToPrevMonth = useCallback(() => {
    setDirection(-1);
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setDirection(1);
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setDirection(0);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }, []);

  const goToMonth = useCallback((month, year) => {
    setDirection(0);
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);

  return {
    currentMonth,
    currentYear,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    goToMonth,
  };
}

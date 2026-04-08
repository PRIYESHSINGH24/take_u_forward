'use client';
import { useState, useCallback } from 'react';
import { isSameDay, isBefore } from '@/utils/dateHelpers';

/**
 * Custom hook for date range selection (start + end)
 */
export default function useRangeSelect() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const handleDateClick = useCallback((date) => {
    if (!startDate || (startDate && endDate)) {
      // No selection yet, or resetting — set start
      setStartDate(date);
      setEndDate(null);
    } else {
      // Start already set — set end
      if (isSameDay(date, startDate)) {
        // Clicking same date clears
        setStartDate(null);
        setEndDate(null);
      } else if (isBefore(date, startDate)) {
        // Clicked before start — swap
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const handleDateHover = useCallback((date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    }
  }, [startDate, endDate]);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  }, []);

  return {
    startDate,
    endDate,
    hoverDate,
    handleDateClick,
    handleDateHover,
    clearSelection,
  };
}

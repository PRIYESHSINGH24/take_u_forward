'use client';
import { useState, useCallback, useEffect } from 'react';
import { dateToKey } from '@/utils/dateHelpers';

const STORAGE_KEY = 'wall-calendar-notes';

/**
 * Custom hook for notes management with localStorage persistence
 * 
 * Notes structure:
 * {
 *   "monthly-2024-3": "General April notes...",
 *   "range-2024-04-05-to-2024-04-10": "Range specific note",
 *   "date-2024-04-07": "Single day note"
 * }
 */
export default function useNotes() {
  const [notes, setNotes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load notes from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.warn('Failed to save notes to localStorage:', e);
      }
    }
  }, [notes, isLoaded]);

  /**
   * Get the key for a monthly note
   */
  const getMonthlyKey = useCallback((year, month) => {
    return `monthly-${year}-${month}`;
  }, []);

  /**
   * Get the key for a range note
   */
  const getRangeKey = useCallback((startDate, endDate) => {
    return `range-${dateToKey(startDate)}-to-${dateToKey(endDate)}`;
  }, []);

  /**
   * Get monthly notes
   */
  const getMonthlyNote = useCallback((year, month) => {
    return notes[getMonthlyKey(year, month)] || '';
  }, [notes, getMonthlyKey]);

  /**
   * Set monthly notes
   */
  const setMonthlyNote = useCallback((year, month, text) => {
    setNotes(prev => ({
      ...prev,
      [getMonthlyKey(year, month)]: text,
    }));
  }, [getMonthlyKey]);

  /**
   * Get range note
   */
  const getRangeNote = useCallback((startDate, endDate) => {
    if (!startDate || !endDate) return '';
    return notes[getRangeKey(startDate, endDate)] || '';
  }, [notes, getRangeKey]);

  /**
   * Set range note
   */
  const setRangeNote = useCallback((startDate, endDate, text) => {
    if (!startDate || !endDate) return;
    setNotes(prev => ({
      ...prev,
      [getRangeKey(startDate, endDate)]: text,
    }));
  }, [getRangeKey]);

  /**
   * Get all range notes for a given month
   */
  const getRangeNotesForMonth = useCallback((year, month) => {
    const prefix = `range-${year}-${String(month + 1).padStart(2, '0')}`;
    return Object.entries(notes)
      .filter(([key]) => key.startsWith('range-') && key.includes(prefix))
      .map(([key, value]) => ({ key, text: value }));
  }, [notes]);

  /**
   * Delete a note by key
   */
  const deleteNote = useCallback((key) => {
    setNotes(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return {
    notes,
    isLoaded,
    getMonthlyNote,
    setMonthlyNote,
    getRangeNote,
    setRangeNote,
    getRangeNotesForMonth,
    deleteNote,
  };
}

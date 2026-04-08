'use client';
import { useEffect, useRef, useCallback } from 'react';
import styles from './Calendar.module.css';
import SpiralBinding from './SpiralBinding';
import CalendarHero from './CalendarHero';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import MonthNav from './MonthNav';
import useCalendar from '@/hooks/useCalendar';
import useRangeSelect from '@/hooks/useRangeSelect';
import useNotes from '@/hooks/useNotes';
import useStickers from '@/hooks/useStickers';
import monthThemes from '@/data/monthThemes';
import StickerDrawer from './StickerDrawer';

export default function Calendar() {
  const {
    currentMonth,
    currentYear,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const {
    startDate,
    endDate,
    hoverDate,
    handleDateClick,
    handleDateHover,
    clearSelection,
  } = useRangeSelect();

  const {
    getMonthlyNote,
    setMonthlyNote,
    getRangeNote,
    setRangeNote,
    getRangeNotesForMonth,
    deleteNote,
    isLoaded,
  } = useNotes();

  const { stickers, addSticker, removeSticker } = useStickers();

  const calendarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Update CSS accent colors when month changes
  useEffect(() => {
    const theme = monthThemes[currentMonth];
    const root = document.documentElement;
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-light', theme.accentLight);
    root.style.setProperty('--accent-dark', theme.accentDark);
    root.style.setProperty('--accent-gradient', theme.gradient);
  }, [currentMonth]);

  // Touch swipe handling
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 60;
    if (diff > threshold) {
      goToNextMonth();
    } else if (diff < -threshold) {
      goToPrevMonth();
    }
  }, [goToNextMonth, goToPrevMonth]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevMonth();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextMonth();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevMonth, goToNextMonth]);

  if (!isLoaded) return null;

  const monthlyNote = getMonthlyNote(currentYear, currentMonth);
  const rangeNote = startDate && endDate ? getRangeNote(startDate, endDate) : '';
  const savedRangeNotes = getRangeNotesForMonth(currentYear, currentMonth);

  return (
    <div
      className={styles.calendarOuter}
      ref={calendarRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <SpiralBinding />

      <div className={styles.calendarBody}>
        <div 
          key={`${currentYear}-${currentMonth}`}
          className={`${styles.pageFlipper} ${direction === 1 ? styles.flipNext : direction === -1 ? styles.flipPrev : ''}`}
        >
          <CalendarHero
            month={currentMonth}
            year={currentYear}
          />

          <MonthNav
            month={currentMonth}
            year={currentYear}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
          />

          <div className={styles.contentArea}>
            <CalendarGrid
              month={currentMonth}
              year={currentYear}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDateClick={handleDateClick}
              onDateHover={handleDateHover}
              onClear={clearSelection}
              direction={direction}
              stickers={stickers}
              onAddSticker={addSticker}
              onRemoveSticker={removeSticker}
            />

            <NotesPanel
              month={currentMonth}
              year={currentYear}
              startDate={startDate}
              endDate={endDate}
              monthlyNote={monthlyNote}
              onMonthlyNoteChange={(text) => setMonthlyNote(currentYear, currentMonth, text)}
              rangeNote={rangeNote}
              onRangeNoteChange={(text) => setRangeNote(startDate, endDate, text)}
              savedRangeNotes={savedRangeNotes}
              onDeleteNote={deleteNote}
            />

            <StickerDrawer />
          </div>

          <div className={styles.swipeHint}>
            ← Swipe to change month →
          </div>

          <div className={styles.calendarFooter}>
            ⌨️ Use arrow keys to navigate months
          </div>
        </div>
      </div>
    </div>
  );
}

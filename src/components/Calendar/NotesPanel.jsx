'use client';
import { useState, useMemo } from 'react';
import styles from './NotesPanel.module.css';
import { MONTH_NAMES_SHORT, dateToKey } from '@/utils/dateHelpers';

export default function NotesPanel({
  month,
  year,
  startDate,
  endDate,
  monthlyNote,
  onMonthlyNoteChange,
  rangeNote,
  onRangeNoteChange,
  savedRangeNotes,
  onDeleteNote,
}) {
  const [activeTab, setActiveTab] = useState('monthly');
  const hasRange = startDate && endDate;

  const rangeLabel = useMemo(() => {
    if (!startDate || !endDate) return '';
    const fmt = (d) => `${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}`;
    return `${fmt(startDate)} → ${fmt(endDate)}`;
  }, [startDate, endDate]);

  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesHeader}>
        <span className={styles.notesTitle}>
          <span className={styles.notesIcon}>📝</span>
          Notes
        </span>
        <div className={styles.tabSwitcher}>
          <button
            className={`${styles.tab} ${activeTab === 'monthly' ? styles.active : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'range' ? styles.active : ''}`}
            onClick={() => setActiveTab('range')}
            disabled={!hasRange}
            title={!hasRange ? 'Select a date range first' : ''}
          >
            Range
          </button>
        </div>
      </div>

      {activeTab === 'monthly' && (
        <div className={styles.noteArea}>
          <textarea
            className={styles.noteTextarea}
            value={monthlyNote}
            onChange={(e) => onMonthlyNoteChange(e.target.value)}
            placeholder={`Notes for ${MONTH_NAMES_SHORT[month]} ${year}...`}
            maxLength={500}
            aria-label={`Monthly notes for ${MONTH_NAMES_SHORT[month]} ${year}`}
          />
          <div className={styles.charCount}>
            {monthlyNote.length}/500
          </div>
        </div>
      )}

      {activeTab === 'range' && (
        <div className={styles.noteArea}>
          {hasRange ? (
            <>
              <div className={styles.rangeLabel}>
                📅 {rangeLabel}
              </div>
              <textarea
                className={styles.noteTextarea}
                value={rangeNote}
                onChange={(e) => onRangeNoteChange(e.target.value)}
                placeholder={`Notes for ${rangeLabel}...`}
                maxLength={500}
                aria-label={`Notes for range ${rangeLabel}`}
              />
              <div className={styles.charCount}>
                {rangeNote.length}/500
              </div>
            </>
          ) : (
            <p style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '0.85rem' }}>
              Select a date range on the calendar to attach notes.
            </p>
          )}
        </div>
      )}

      {/* Saved range notes for this month */}
      {savedRangeNotes && savedRangeNotes.length > 0 && activeTab === 'range' && (
        <div className={styles.savedNotes}>
          {savedRangeNotes.map((note) => (
            <div key={note.key} className={styles.savedNoteCard}>
              <div className={styles.savedNoteDate}>
                {note.key.replace('range-', '').replace('-to-', ' → ')}
              </div>
              <div className={styles.savedNoteText}>{note.text}</div>
              <div className={styles.savedNoteActions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDeleteNote(note.key)}
                  aria-label="Delete note"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

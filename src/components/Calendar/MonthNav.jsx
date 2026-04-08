'use client';
import styles from './MonthNav.module.css';
import { MONTH_NAMES } from '@/utils/dateHelpers';

export default function MonthNav({ month, year, onPrev, onNext, onToday }) {
  return (
    <nav className={styles.nav} aria-label="Calendar navigation">
      <div className={styles.navGroup}>
        <button
          className={styles.navBtn}
          onClick={onPrev}
          aria-label="Previous month"
          title="Previous month"
        >
          ‹
        </button>
        <button
          className={styles.navBtn}
          onClick={onNext}
          aria-label="Next month"
          title="Next month"
        >
          ›
        </button>
      </div>

      <span className={styles.monthYearLabel}>
        {MONTH_NAMES[month]} {year}
      </span>

      <button
        className={styles.todayBtn}
        onClick={onToday}
        aria-label="Go to today"
      >
        Today
      </button>
    </nav>
  );
}

'use client';
import { useMemo } from 'react';
import styles from './CalendarGrid.module.css';
import { DAYS_OF_WEEK, MONTH_NAMES_SHORT, generateCalendarGrid, isSameDay, isInRange, dateToKey } from '@/utils/dateHelpers';
import { getHolidayForDate } from '@/utils/holidays';

export default function CalendarGrid({
  month,
  year,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
  onClear,
  direction,
  stickers = {},
  onAddSticker,
  onRemoveSticker,
}) {
  const cells = useMemo(() => generateCalendarGrid(year, month), [year, month]);

  const key = `grid-${year}-${month}`;

  const getSelectionLabel = () => {
    if (!startDate && !endDate) return null;
    const fmt = (d) => `${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}`;
    if (startDate && !endDate) return `Start: ${fmt(startDate)} — click another date`;
    if (startDate && endDate) {
      const days = Math.round(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      return `${fmt(startDate)} → ${fmt(endDate)} (${days} day${days > 1 ? 's' : ''})`;
    }
    return null;
  };

  return (
    <div className={styles.gridContainer}>
      {/* Day-of-week headers */}
      <div className={styles.dayHeaders}>
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={day}
            className={`${styles.dayHeader} ${i >= 5 ? styles.weekend : ''}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className={styles.dateGrid} key={key}>
        {cells.map((cell, i) => {
          const isStart = startDate && isSameDay(cell.date, startDate);
          const isEnd = endDate && isSameDay(cell.date, endDate);
          const inRange = startDate && endDate && isInRange(cell.date, startDate, endDate) && !isStart && !isEnd;
          const inHoverRange = startDate && !endDate && hoverDate && isInRange(cell.date, startDate, hoverDate) && !isStart;
          const holiday = cell.isCurrentMonth ? getHolidayForDate(cell.month, cell.day) : null;

          const classNames = [
            styles.dayCell,
            !cell.isCurrentMonth && styles.otherMonth,
            cell.isWeekend && styles.weekend,
            cell.isToday && styles.today,
            isStart && styles.rangeStart,
            isEnd && styles.rangeEnd,
            inRange && styles.inRange,
            inHoverRange && styles.hoverRange,
          ].filter(Boolean).join(' ');

          const dateStr = dateToKey(cell.date);
          const dayStickers = stickers[dateStr] || [];

          return (
            <div
              key={`${cell.year}-${cell.month}-${cell.day}`}
              className={classNames}
              onClick={() => onDateClick(cell.date)}
              onMouseEnter={() => onDateHover(cell.date)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const emoji = e.dataTransfer.getData('text/plain');
                if (emoji && onAddSticker) onAddSticker(dateStr, emoji);
              }}
              role="gridcell"
              aria-label={`${cell.day} ${MONTH_NAMES_SHORT[cell.month]} ${cell.year}`}
              aria-selected={isStart || isEnd}
              tabIndex={cell.isCurrentMonth ? 0 : -1}
            >
              {cell.day}
              
              {dayStickers.length > 0 && (
                <div className={styles.stickersContainer}>
                  {dayStickers.map((stk, idx) => (
                    <span 
                      key={idx} 
                      className={styles.miniSticker}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent clicking cell
                        if (onRemoveSticker) onRemoveSticker(dateStr, idx);
                      }}
                      title="Click to remove"
                    >
                      {stk}
                    </span>
                  ))}
                </div>
              )}

              {holiday && (
                <>
                  <span className={styles.holidayDot}>{holiday.emoji}</span>
                  <span className={styles.tooltip}>{holiday.emoji} {holiday.name}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection info bar */}
      {(startDate || endDate) && (
        <div className={styles.selectionInfo}>
          <span className={styles.selectionText}>
            <span className={styles.icon}>📅</span>
            {getSelectionLabel()}
          </span>
          <button className={styles.clearBtn} onClick={onClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

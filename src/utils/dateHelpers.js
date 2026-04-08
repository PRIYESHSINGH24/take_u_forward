/**
 * Calendar date utility functions
 */

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Get the number of days in a given month/year
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of week (0=Mon, 6=Sun) for the first day of the month
 */
export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert from Sun=0 to Mon=0
  return day === 0 ? 6 : day - 1;
}

/**
 * Generate a grid of day cells for a calendar month
 * Returns array of { date, day, month, year, isCurrentMonth, isToday, isWeekend }
 */
export function generateCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const cells = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({
      date: new Date(prevYear, prevMonth, day),
      day,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: `${prevYear}-${prevMonth}-${day}` === todayStr,
      isWeekend: false, // will set below
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(year, month, day),
      day,
      month,
      year,
      isCurrentMonth: true,
      isToday: `${year}-${month}-${day}` === todayStr,
      isWeekend: false,
    });
  }

  // Next month leading days to fill grid (always show 6 rows = 42 cells)
  const totalCells = 42;
  const remaining = totalCells - cells.length;
  for (let day = 1; day <= remaining; day++) {
    cells.push({
      date: new Date(nextYear, nextMonth, day),
      day,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      isToday: `${nextYear}-${nextMonth}-${day}` === todayStr,
      isWeekend: false,
    });
  }

  // Mark weekends (Sat=index 5, Sun=index 6 in each row)
  cells.forEach((cell, index) => {
    const dayOfWeek = index % 7;
    cell.isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
  });

  return cells;
}

/**
 * Format a date as YYYY-MM-DD string key
 */
export function dateToKey(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Check if date A is before date B
 */
export function isBefore(a, b) {
  return a.getTime() < b.getTime();
}

/**
 * Check if date A is same day as date B
 */
export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

/**
 * Check if a date is between start and end (inclusive)
 */
export function isInRange(date, start, end) {
  if (!start || !end) return false;
  const time = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();
  return time >= Math.min(startTime, endTime) && time <= Math.max(startTime, endTime);
}

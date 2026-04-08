/**
 * Static holiday data — major international holidays
 * Each entry: { name, month (0-indexed), day, emoji }
 */
const holidays = [
  // January
  { name: "New Year's Day", month: 0, day: 1, emoji: '🎆' },
  { name: 'Martin Luther King Jr. Day', month: 0, day: 20, emoji: '✊' },
  { name: 'Republic Day (India)', month: 0, day: 26, emoji: '🇮🇳' },

  // February
  { name: "Valentine's Day", month: 1, day: 14, emoji: '❤️' },
  { name: "Presidents' Day", month: 1, day: 17, emoji: '🏛️' },

  // March
  { name: 'Holi (approx.)', month: 2, day: 14, emoji: '🎨' },
  { name: "St. Patrick's Day", month: 2, day: 17, emoji: '☘️' },

  // April
  { name: "April Fools' Day", month: 3, day: 1, emoji: '🤡' },
  { name: 'Earth Day', month: 3, day: 22, emoji: '🌍' },

  // May
  { name: "Mother's Day", month: 4, day: 11, emoji: '💐' },
  { name: 'Memorial Day', month: 4, day: 26, emoji: '🎗️' },

  // June
  { name: "Father's Day", month: 5, day: 15, emoji: '👔' },
  { name: 'World Environment Day', month: 5, day: 5, emoji: '🌱' },

  // July
  { name: 'Independence Day (US)', month: 6, day: 4, emoji: '🇺🇸' },

  // August
  { name: 'Independence Day (India)', month: 7, day: 15, emoji: '🇮🇳' },

  // September
  { name: 'Labor Day', month: 8, day: 1, emoji: '⚒️' },
  { name: 'Teachers Day (India)', month: 8, day: 5, emoji: '📚' },

  // October
  { name: 'Gandhi Jayanti', month: 9, day: 2, emoji: '🕊️' },
  { name: 'Halloween', month: 9, day: 31, emoji: '🎃' },
  { name: 'Dussehra (approx.)', month: 9, day: 12, emoji: '🏹' },

  // November
  { name: 'Diwali (approx.)', month: 10, day: 1, emoji: '🪔' },
  { name: 'Thanksgiving', month: 10, day: 27, emoji: '🦃' },

  // December
  { name: 'Christmas Eve', month: 11, day: 24, emoji: '🎄' },
  { name: 'Christmas', month: 11, day: 25, emoji: '🎅' },
  { name: "New Year's Eve", month: 11, day: 31, emoji: '🥂' },
];

/**
 * Get holidays for a specific month (0-indexed)
 */
export function getHolidaysForMonth(month) {
  return holidays.filter(h => h.month === month);
}

/**
 * Get holiday for a specific date
 */
export function getHolidayForDate(month, day) {
  return holidays.find(h => h.month === month && h.day === day);
}

export default holidays;

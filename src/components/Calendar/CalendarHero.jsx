'use client';
import styles from './CalendarHero.module.css';
import { MONTH_NAMES } from '@/utils/dateHelpers';
import monthThemes from '@/data/monthThemes';

const seasonEmoji = {
  winter: '❄️ Winter',
  spring: '🌸 Spring',
  summer: '☀️ Summer',
  autumn: '🍂 Autumn',
};

export default function CalendarHero({ month, year }) {
  const theme = monthThemes[month];

  const key = `${year}-${month}`;

  return (
    <div className={styles.heroWrapper} key={key}>
      {/* Gradient background */}
      <div
        className={styles.heroBackground}
        style={{ background: theme.heroGradient }}
      />
      {/* Pattern overlay */}
      <div
        className={styles.heroPattern}
        style={{ background: theme.heroPattern }}
      />
      {/* Decorative floating shapes */}
      <div className={styles.floatingShapes}>
        <div className={styles.shape1} style={{ background: `${theme.accent}30` }} />
        <div className={styles.shape2} style={{ background: `${theme.accent}20` }} />
        <div className={styles.shape3} style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
      {/* Sparkle decorations */}
      <div className={styles.sparkles}>
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
        <div className={styles.sparkle} />
      </div>
      {/* Large emoji decoration */}
      <div className={styles.heroEmoji}>
        {theme.heroEmoji}
      </div>
      {/* Season badge */}
      <div className={styles.seasonBadge}>
        {seasonEmoji[theme.season]}
      </div>
      {/* Wave overlay */}
      <div className={styles.waveOverlay}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,30 C60,70 140,10 220,50 C300,90 380,20 500,50 L500,100 L0,100 Z"
            fill={theme.accent}
            opacity="0.8"
          />
          <path
            d="M0,55 C80,25 170,75 260,40 C350,5 430,60 500,35 L500,100 L0,100 Z"
            fill="var(--calendar-paper)"
            opacity="1"
          />
        </svg>
      </div>
      {/* Month/Year label */}
      <div className={styles.monthLabel}>
        <span className={styles.yearText}>{year}</span>
        <span className={styles.monthText}>{MONTH_NAMES[month]}</span>
      </div>
    </div>
  );
}

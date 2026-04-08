'use client';
import styles from './SpiralBinding.module.css';

export default function SpiralBinding() {
  const ringCount = 22;

  return (
    <div className={styles.binding}>
      <div className={styles.hook}>
        <div className={styles.hookTriangle}></div>
        <div className={styles.hookLine}></div>
      </div>
      {Array.from({ length: ringCount }, (_, i) => (
        <div key={i} className={styles.ring} />
      ))}
    </div>
  );
}

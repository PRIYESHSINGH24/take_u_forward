'use client';
import styles from './StickerDrawer.module.css';

const STICKERS = ['🎀', '⭐', '✈️', '🎂', '🎉', '💖', '🐶', '☕', '💰', '🏋️'];

export default function StickerDrawer() {
  const handleDragStart = (e, emoji) => {
    e.dataTransfer.setData('text/plain', emoji);
    e.dataTransfer.effectAllowed = 'copy';
    // Add a class for visual feedback during drag
    setTimeout(() => {
      e.target.classList.add(styles.dragging);
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove(styles.dragging);
  };

  return (
    <div className={styles.drawer}>
      <div className={styles.title}>
        <span>✨ Fun Stickers</span>
        <span className={styles.instruction}>(Drag and drop onto a date!)</span>
      </div>
      <div className={styles.stickerList}>
        {STICKERS.map((emoji) => (
          <div
            key={emoji}
            className={styles.sticker}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, emoji)}
            onDragEnd={handleDragEnd}
            title="Drag me!"
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

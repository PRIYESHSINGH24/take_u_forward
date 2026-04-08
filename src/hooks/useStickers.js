import { useState, useEffect } from 'react';

export default function useStickers() {
  const [stickers, setStickers] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('calendar_stickers');
      if (stored) {
        setStickers(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading stickers:', err);
    }
  }, []);

  const addSticker = (dateStr, stickerEmoji) => {
    setStickers(prev => {
      const currentForDate = prev[dateStr] || [];
      // Prevent adding more than 3 stickers to a single day to keep it neat
      if (currentForDate.length >= 3) return prev;
      
      const newStickers = {
        ...prev,
        [dateStr]: [...currentForDate, stickerEmoji]
      };
      localStorage.setItem('calendar_stickers', JSON.stringify(newStickers));
      return newStickers;
    });
  };

  const removeSticker = (dateStr, index) => {
    setStickers(prev => {
      const currentForDate = prev[dateStr];
      if (!currentForDate) return prev;
      
      const newForDate = [...currentForDate];
      newForDate.splice(index, 1);
      
      const newStickers = { ...prev };
      if (newForDate.length === 0) {
        delete newStickers[dateStr];
      } else {
        newStickers[dateStr] = newForDate;
      }
      
      localStorage.setItem('calendar_stickers', JSON.stringify(newStickers));
      return newStickers;
    });
  };

  return {
    stickers,
    addSticker,
    removeSticker
  };
}

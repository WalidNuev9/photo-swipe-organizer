
import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface SwipeableCardProps {
  imageUrl: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ imageUrl, onSwipe }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(false);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 20 },
  }));

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    updatePosition(diff);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    updatePosition(diff);
  };

  const updatePosition = (diff: number) => {
    api.start({ x: diff });
    setShowLeftOverlay(diff < -50);
    setShowRightOverlay(diff > 50);
  };

  const handleTouchEnd = () => finishSwipe();
  const handleMouseUp = () => finishSwipe();

  const finishSwipe = () => {
    setIsDragging(false);
    const currentX = x.get();
    
    if (currentX < -100) {
      api.start({ x: -500, onRest: () => onSwipe('left') });
    } else if (currentX > 100) {
      api.start({ x: 500, onRest: () => onSwipe('right') });
    } else {
      api.start({ x: 0 });
    }
    
    setShowLeftOverlay(false);
    setShowRightOverlay(false);
  };

  return (
    <animated.div
      ref={cardRef}
      className={`swipeable-card ${isDragging ? 'swiping' : ''}`}
      style={{ x }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img src={imageUrl} alt="Swipeable content" />
      <div className={`action-overlay left ${showLeftOverlay ? 'visible' : ''}`}>
        Supprimer
      </div>
      <div className={`action-overlay right ${showRightOverlay ? 'visible' : ''}`}>
        Garder
      </div>
    </animated.div>
  );
};

export default SwipeableCard;

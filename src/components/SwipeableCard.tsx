
import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Trash, Check } from 'lucide-react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [{ x, opacity }, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
    config: {
      tension: 500,
      friction: 30,
      mass: 0.5
    },
  }));

  const calculateVelocity = (currentX: number, currentTime: number) => {
    if (lastTimeRef.current && lastXRef.current) {
      const deltaTime = currentTime - lastTimeRef.current;
      const deltaX = currentX - lastXRef.current;
      velocityRef.current = deltaX / deltaTime;
    }
    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    velocityRef.current = 0;
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = Date.now();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    calculateVelocity(currentX, Date.now());
    const diff = currentX - startX;
    updatePosition(diff);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    calculateVelocity(currentX, Date.now());
    const diff = currentX - startX;
    updatePosition(diff);
  };

  const updatePosition = (diff: number) => {
    api.start({ 
      x: diff,
      opacity: Math.max(1 - Math.abs(diff) / 500, 0.5),
      immediate: true
    });
    setShowLeftOverlay(diff < -50);
    setShowRightOverlay(diff > 50);
  };

  const handleTouchEnd = () => finishSwipe();
  const handleMouseUp = () => finishSwipe();

  const finishSwipe = () => {
    setIsDragging(false);
    const currentX = x.get();
    const velocity = Math.abs(velocityRef.current);
    const direction = velocityRef.current > 0 ? 'right' : 'left';
    
    if (velocity > 0.5 || Math.abs(currentX) > 100) {
      if (direction === 'left' && currentX < 0) {
        setShowDeleteDialog(true);
      } else if (direction === 'right' && currentX > 0) {
        animateSwipeOut('right');
      } else {
        resetPosition();
      }
    } else {
      resetPosition();
    }
    
    setShowLeftOverlay(false);
    setShowRightOverlay(false);
  };

  const resetPosition = () => {
    api.start({ 
      x: 0, 
      opacity: 1,
      config: {
        tension: 500,
        friction: 30,
        mass: 0.5
      }
    });
  };

  const animateSwipeOut = (direction: 'left' | 'right') => {
    const xOffset = direction === 'left' ? -window.innerWidth : window.innerWidth;
    api.start({ 
      x: xOffset,
      opacity: 0,
      config: {
        tension: 500,
        friction: 50,
        mass: 0.5,
        velocity: velocityRef.current * 2
      },
      onRest: () => onSwipe(direction),
    });
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    resetPosition();
  };

  const handleDeleteConfirm = () => {
    setShowDeleteDialog(false);
    animateSwipeOut('left');
  };

  return (
    <>
      <animated.div
        ref={cardRef}
        className={`swipeable-card absolute inset-0 will-change-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          x,
          opacity,
          touchAction: 'none',
          userSelect: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          src={imageUrl} 
          alt="Content" 
          className="w-full h-full object-cover rounded-xl"
          draggable={false}
        />
        <div 
          className={`action-overlay left absolute inset-0 flex items-center justify-center bg-danger/20 transition-opacity duration-200 ${
            showLeftOverlay ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Trash className="w-16 h-16 text-danger" strokeWidth={1.5} />
        </div>
        <div 
          className={`action-overlay right absolute inset-0 flex items-center justify-center bg-success/20 transition-opacity duration-200 ${
            showRightOverlay ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Check className="w-16 h-16 text-success" strokeWidth={1.5} />
        </div>
      </animated.div>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default SwipeableCard;

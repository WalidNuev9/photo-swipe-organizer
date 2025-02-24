
import React, { useState } from 'react';
import SwipeableCard from '@/components/SwipeableCard';
import ProgressBar from '@/components/ProgressBar';
import { useToast } from '@/hooks/use-toast';

// Simulons quelques images pour la démo
const demoImages = [
  'https://picsum.photos/800/1200?random=1',
  'https://picsum.photos/800/1200?random=2',
  'https://picsum.photos/800/1200?random=3',
  'https://picsum.photos/800/1200?random=4',
  'https://picsum.photos/800/1200?random=5',
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right') => {
    const action = direction === 'left' ? 'supprimée' : 'conservée';
    toast({
      description: `Image ${action}`,
      duration: 1500,
    });
    
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="mb-8 text-center">
        <h2 className="text-sm font-medium text-muted-foreground mb-2">
          {currentIndex + 1} / {demoImages.length}
        </h2>
      </div>
      
      <div className="relative w-full max-w-md mx-auto">
        {currentIndex < demoImages.length ? (
          <SwipeableCard
            imageUrl={demoImages[currentIndex]}
            onSwipe={handleSwipe}
          />
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">Terminé !</h2>
            <p className="text-muted-foreground">
              Vous avez trié toutes vos photos.
            </p>
          </div>
        )}
      </div>
      
      <ProgressBar
        current={currentIndex}
        total={demoImages.length}
      />
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SwipeableCard from '@/components/SwipeableCard';
import ProgressBar from '@/components/ProgressBar';
import { useToast } from '@/hooks/use-toast';
import PhotoAccessModal from '@/components/PhotoAccessModal';
import PhotoPermissionDeniedModal from '@/components/PhotoPermissionDeniedModal';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const { toast } = useToast();

  // Images de démonstration
  const demoImages = [
    'https://picsum.photos/800/1200?random=1',
    'https://picsum.photos/800/1200?random=2',
    'https://picsum.photos/800/1200?random=3',
    'https://picsum.photos/800/1200?random=4',
    'https://picsum.photos/800/1200?random=5',
  ];

  const handleStart = () => {
    setShowPhotoModal(true);
  };

  const handleAuthorize = () => {
    setShowPhotoModal(false);
    setStarted(true);
    toast({
      title: "Accès autorisé",
      description: "Vous pouvez maintenant trier vos photos",
      duration: 2000,
    });
  };

  const handleDeny = () => {
    setShowPhotoModal(false);
    setShowDeniedModal(true);
  };

  const handleRetry = () => {
    setShowDeniedModal(false);
    setShowPhotoModal(true);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const action = direction === 'left' ? 'supprimée' : 'conservée';
    toast({
      description: `Image ${action}`,
      duration: 1500,
    });
    
    setCurrentIndex(prev => prev + 1);
  };

  if (!started) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Swipe & Organise
          </h1>
          
          <div className="text-center space-y-6">
            <p className="text-muted-foreground text-lg">
              Swipez à gauche pour supprimer, à droite pour garder
            </p>
            
            <div className="relative">
              <ArrowLeftRight 
                className="w-12 h-12 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" 
                strokeWidth={1.5}
              />
            </div>
          </div>

          <Button 
            onClick={handleStart}
            size="lg"
            className="mt-8 text-lg px-8"
          >
            Commencer
          </Button>
        </div>

        <PhotoAccessModal 
          isOpen={showPhotoModal}
          onAuthorize={handleAuthorize}
          onDeny={handleDeny}
        />

        <PhotoPermissionDeniedModal
          isOpen={showDeniedModal}
          onRetry={handleRetry}
        />
      </>
    );
  }

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



import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import SortingInterface from '@/components/SortingInterface';
import PhotoAccessModal from '@/components/PhotoAccessModal';
import PhotoPermissionDeniedModal from '@/components/PhotoPermissionDeniedModal';
import { useImageSorting } from '@/hooks/useImageSorting';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const { toast } = useToast();
  
  const {
    currentIndex,
    history,
    loadedImages,
    isPreloading,
    demoImages,
    handleSwipe,
    handleUndo,
    handleReset
  } = useImageSorting();

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

  if (!started) {
    return (
      <>
        <WelcomeScreen onStart={handleStart} />
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
    <SortingInterface
      currentIndex={currentIndex}
      totalImages={demoImages.length}
      imageUrl={loadedImages[currentIndex]}
      onSwipe={handleSwipe}
      onUndo={handleUndo}
      canUndo={history.length > 0}
      onReset={handleReset}
      isPreloading={isPreloading}
    />
  );
};

export default Index;

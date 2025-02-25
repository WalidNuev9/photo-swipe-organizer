
import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Undo2, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SwipeableCard from '@/components/SwipeableCard';
import ProgressBar from '@/components/ProgressBar';
import { useToast } from '@/hooks/use-toast';
import PhotoAccessModal from '@/components/PhotoAccessModal';
import PhotoPermissionDeniedModal from '@/components/PhotoPermissionDeniedModal';
import SettingsMenu from '@/components/SettingsMenu';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [history, setHistory] = useState<Array<{ index: number; action: 'left' | 'right' }>>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isPreloading, setIsPreloading] = useState(true);
  const { toast } = useToast();

  const demoImages = [
    'https://picsum.photos/800/1200?random=1',
    'https://picsum.photos/800/1200?random=2',
    'https://picsum.photos/800/1200?random=3',
    'https://picsum.photos/800/1200?random=4',
    'https://picsum.photos/800/1200?random=5',
  ];

  useEffect(() => {
    const preloadImages = async () => {
      setIsPreloading(true);
      const loadPromises = demoImages.map((src) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = reject;
        });
      });

      try {
        const loaded = await Promise.all(loadPromises);
        setLoadedImages(loaded);
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      } finally {
        setIsPreloading(false);
      }
    };

    if (started) {
      preloadImages();
    }
  }, [started]);

  useEffect(() => {
    if (currentIndex < demoImages.length - 1) {
      const nextImage = new Image();
      nextImage.src = demoImages[currentIndex + 1];
    }
  }, [currentIndex, demoImages]);

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

  const handleProfile = () => {
    // Pour l'instant, on affiche juste une notification
    // Cette fonction sera mise à jour quand on ajoutera l'authentification
    toast({
      title: "Profil",
      description: "Fonctionnalité bientôt disponible",
      duration: 2000,
    });
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= demoImages.length) return;
    
    const action = direction === 'left' ? 'supprimée' : 'conservée';
    toast({
      description: `Image ${action}`,
      duration: 1500,
    });
    
    setHistory(prev => [...prev, { index: currentIndex, action: direction }]);
    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    
    const lastAction = history[history.length - 1];
    setCurrentIndex(lastAction.index);
    setHistory(prev => prev.slice(0, -1));
    
    toast({
      description: "Action annulée",
      duration: 1500,
    });
  };

  if (!started) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-8">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfile}
              className="rounded-full"
            >
              <User className="w-5 h-5" />
              <span className="sr-only">Profil</span>
            </Button>
            <SettingsMenu />
          </div>
          
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-medium text-muted-foreground">
          {demoImages.length - currentIndex} restantes
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="rounded-full"
          >
            <Undo2 className="w-4 h-4" />
            <span className="sr-only">Annuler la dernière action</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
            className="rounded-full"
          >
            <User className="w-5 h-5" />
            <span className="sr-only">Profil</span>
          </Button>
          <SettingsMenu />
        </div>
      </div>
      
      <ProgressBar
        current={currentIndex}
        total={demoImages.length}
      />
      
      <div className="flex-1 flex items-center justify-center my-8">
        <div className="relative w-full max-w-md aspect-[3/4]">
          {isPreloading ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-card rounded-xl shadow-lg">
              <p className="text-muted-foreground">Chargement des images...</p>
            </div>
          ) : loadedImages.length > 0 && currentIndex < demoImages.length ? (
            <SwipeableCard
              imageUrl={loadedImages[currentIndex]}
              onSwipe={handleSwipe}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Terminé !</h2>
              <p className="text-muted-foreground">
                Vous avez trié toutes vos photos.
              </p>
              <Button 
                onClick={() => {
                  setCurrentIndex(0);
                  setHistory([]);
                }}
                className="mt-8"
              >
                Recommencer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

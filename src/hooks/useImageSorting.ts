
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useImageSorting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

    preloadImages();
  }, []);

  useEffect(() => {
    if (currentIndex < demoImages.length - 1) {
      const nextImage = new Image();
      nextImage.src = demoImages[currentIndex + 1];
    }
  }, [currentIndex]);

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

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
  };

  return {
    currentIndex,
    history,
    loadedImages,
    isPreloading,
    demoImages,
    handleSwipe,
    handleUndo,
    handleReset
  };
};

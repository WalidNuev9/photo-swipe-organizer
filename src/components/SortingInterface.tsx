
import React from 'react';
import { Undo2, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SwipeableCard from '@/components/SwipeableCard';
import ProgressBar from '@/components/ProgressBar';
import SettingsMenu from '@/components/SettingsMenu';
import { useNavigate } from 'react-router-dom';

interface SortingInterfaceProps {
  currentIndex: number;
  totalImages: number;
  imageUrl: string | undefined;
  onSwipe: (direction: 'left' | 'right') => void;
  onUndo: () => void;
  canUndo: boolean;
  onReset: () => void;
  isPreloading: boolean;
}

const SortingInterface: React.FC<SortingInterfaceProps> = ({
  currentIndex,
  totalImages,
  imageUrl,
  onSwipe,
  onUndo,
  canUndo,
  onReset,
  isPreloading,
}) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-medium text-primary">
          {totalImages - currentIndex} restantes
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onUndo}
            disabled={!canUndo}
            className="rounded-full border-primary/20 hover:bg-primary/10"
          >
            <Undo2 className="w-4 h-4" />
            <span className="sr-only">Annuler la dernière action</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
            className="rounded-full hover:bg-secondary/80"
          >
            <User className="w-5 h-5" />
            <span className="sr-only">Profil</span>
          </Button>
          <SettingsMenu />
        </div>
      </div>
      
      <ProgressBar
        current={currentIndex}
        total={totalImages}
      />
      
      <div className="flex-1 flex items-center justify-center my-8 px-4">
        <div className="relative w-full max-w-md aspect-[3/4]">
          {isPreloading ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-card rounded-[2rem] shadow-2xl">
              <p className="text-muted-foreground">Chargement des images...</p>
            </div>
          ) : imageUrl ? (
            <SwipeableCard
              imageUrl={imageUrl}
              onSwipe={onSwipe}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-[2rem] shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Terminé !
              </h2>
              <p className="text-muted-foreground">
                Vous avez trié toutes vos photos.
              </p>
              <Button 
                onClick={onReset}
                className="mt-8 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
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

export default SortingInterface;

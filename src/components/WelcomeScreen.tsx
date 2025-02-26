
import React from 'react';
import { ArrowLeftRight, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SettingsMenu from '@/components/SettingsMenu';
import { useNavigate } from 'react-router-dom';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const navigate = useNavigate();
  
  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg p-4 space-y-12">
      <div className="absolute top-4 right-4 flex items-center gap-2">
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
      
      <div className="space-y-8 text-center max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Swipe & Organise
        </h1>
        
        <p className="text-muted-foreground text-lg px-4">
          Swipez à gauche pour supprimer, à droite pour garder
        </p>
        
        <div className="relative">
          <ArrowLeftRight 
            className="w-12 h-12 text-primary animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" 
            strokeWidth={1.5}
          />
        </div>
      </div>

      <Button 
        onClick={onStart}
        size="lg"
        className="mt-8 text-lg px-12 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-xl"
      >
        Commencer
      </Button>
    </div>
  );
};

export default WelcomeScreen;


import React from 'react';
import { ArrowLeft, HardDrive, Trash2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Temporary state for demo
  const mockDeletedPhotos = [
    { id: 1, url: 'https://picsum.photos/200/300?random=1' },
    { id: 2, url: 'https://picsum.photos/200/300?random=2' },
    { id: 3, url: 'https://picsum.photos/200/300?random=3' },
  ];

  return (
    <div className="min-h-screen gradient-bg p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-secondary/80"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Retour</span>
          </Button>
          <h1 className="text-2xl font-bold">Mon profil</h1>
        </div>
        
        {!isLoggedIn && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" className="gap-2">
                <LogIn className="w-4 h-4" />
                Connexion
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Bienvenue</SheetTitle>
                <SheetDescription>
                  Connectez-vous pour sauvegarder vos préférences
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-8">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-4">
                  <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                    Se connecter
                  </Button>
                  <Button variant="outline" className="w-full">
                    S'inscrire
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <div className="space-y-8">
        {/* User Info */}
        <div className="bg-card rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Pseudo</h2>
          <p className="text-muted-foreground">@utilisateur</p>
        </div>

        {/* Storage Stats */}
        <div className="bg-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <HardDrive className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Stockage économisé</h2>
          </div>
          <p className="text-2xl font-bold">2.4 GB</p>
        </div>

        {/* Recently Deleted */}
        <div className="bg-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Photos supprimées récemment</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {mockDeletedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden bg-secondary"
              >
                <img
                  src={photo.url}
                  alt="Deleted photo"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

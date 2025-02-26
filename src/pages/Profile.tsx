
import React from 'react';
import { ArrowLeft, HardDrive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const mockDeletedPhotos = [
    { id: 1, url: 'https://picsum.photos/200/300?random=1' },
    { id: 2, url: 'https://picsum.photos/200/300?random=2' },
    { id: 3, url: 'https://picsum.photos/200/300?random=3' },
  ];

  return (
    <div className="min-h-screen gradient-bg p-4 space-y-6">
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


import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SortPage = () => {
  const navigate = useNavigate();
  const mockAlbums = [
    { id: 1, date: '2024-03-15', title: 'Mars 2024', count: 45 },
    { id: 2, date: '2024-02-20', title: 'Février 2024', count: 32 },
    { id: 3, date: '2024-01-05', title: 'Janvier 2024', count: 78 },
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
        <h1 className="text-2xl font-bold">Albums par date</h1>
      </div>

      <div className="grid gap-4">
        {mockAlbums.map((album) => (
          <Button
            key={album.id}
            variant="outline"
            className="w-full p-6 h-auto flex flex-col items-start gap-2 rounded-2xl bg-card hover:bg-secondary/20 transition-colors"
            onClick={() => navigate('/')}
          >
            <span className="text-lg font-semibold">{album.title}</span>
            <span className="text-sm text-muted-foreground">
              {album.count} photos
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SortPage;

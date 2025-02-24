
import React from 'react';
import { GalleryHorizontal, ShieldCheck } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PhotoAccessModalProps {
  isOpen: boolean;
  onAuthorize: () => void;
  onDeny: () => void;
}

const PhotoAccessModal = ({ isOpen, onAuthorize, onDeny }: PhotoAccessModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-6">
          <div className="mx-auto p-3 bg-secondary rounded-full">
            <GalleryHorizontal className="w-6 h-6" />
          </div>
          
          <AlertDialogTitle className="text-xl text-center">
            Autoriser l'accès à vos photos ?
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-center space-y-4">
            <p>
              Nous avons besoin d'accéder à votre galerie pour vous permettre de trier vos photos.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>Nous ne stockons pas vos données</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex flex-col space-y-2 sm:space-y-0">
          <AlertDialogAction
            onClick={onAuthorize}
            className="w-full sm:w-auto"
          >
            Autoriser
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onDeny}
            className="w-full sm:w-auto"
          >
            Refuser
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PhotoAccessModal;



import React from 'react';
import { XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PhotoPermissionDeniedModalProps {
  isOpen: boolean;
  onRetry: () => void;
}

const PhotoPermissionDeniedModal = ({ isOpen, onRetry }: PhotoPermissionDeniedModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="space-y-6">
          <div className="mx-auto p-3 bg-danger/10 rounded-full">
            <XCircle className="w-6 h-6 text-danger" />
          </div>
          
          <AlertDialogTitle className="text-xl text-center">
            Accès refusé
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-center">
            L'accès est nécessaire pour trier vos photos
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onRetry}
            className="w-full"
          >
            Réessayer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PhotoPermissionDeniedModal;



import React from 'react';
import { Settings, Sun, SortDesc, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SettingsMenu = () => {
  const handleDarkModeToggle = () => {
    // Implémentation du mode sombre à venir
    console.log("Toggle dark mode");
  };

  const handleSortChange = (value: string) => {
    console.log("Sort by:", value);
  };

  const handleTutorialClick = () => {
    console.log("Open tutorial");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="w-4 h-4" />
          <span className="sr-only">Paramètres</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Paramètres</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Mode Sombre */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sun className="w-4 h-4" />
              <Label>Mode Sombre</Label>
            </div>
            <Switch onCheckedChange={handleDarkModeToggle} />
          </div>

          <Separator />

          {/* Trier par */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <SortDesc className="w-4 h-4" />
              <Label>Trier par</Label>
            </div>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un tri" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="size">Taille</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Voir le tutoriel */}
          <Button
            variant="outline"
            className="w-full justify-start space-x-2"
            onClick={handleTutorialClick}
          >
            <BookOpen className="w-4 h-4" />
            <span>Voir le tutoriel</span>
          </Button>

          {/* Politique de confidentialité */}
          <Button
            variant="outline"
            className="w-full justify-start space-x-2"
            asChild
          >
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4" />
              <span>Politique de confidentialité</span>
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsMenu;

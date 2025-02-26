
import React from 'react';
import { Settings, Sun, Moon, SortDesc, BookOpen, FileText, Clock, User } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';
import { useTheme } from "next-themes";

const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleSortChange = (value: string) => {
    if (value === 'date') {
      navigate('/sort');
    }
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
              {theme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <Label>Mode Sombre</Label>
            </div>
            <Switch 
              checked={theme === "dark"}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>

          <Separator />

          {/* Trier par */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <Clock className="w-4 h-4" />
              <Label>Trier par</Label>
            </div>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un tri" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Par date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Profile */}
          <Button
            variant="outline"
            className="w-full justify-start space-x-2"
            onClick={() => navigate('/profile')}
          >
            <User className="w-4 h-4" />
            <span>Mon profil</span>
          </Button>

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

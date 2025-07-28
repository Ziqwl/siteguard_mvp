import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ isDarkMode, onToggle, className = '' }: ThemeToggleProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Switch 
        id="theme-toggle" 
        checked={isDarkMode} 
        onCheckedChange={onToggle}
      />
      <Label htmlFor="theme-toggle" className="text-sm text-white/70 flex items-center gap-2 cursor-pointer">
        {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        Dark Mode
      </Label>
    </div>
  );
}
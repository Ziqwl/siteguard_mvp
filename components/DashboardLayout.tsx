import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Shield, 
  Moon, 
  Sun, 
  Activity, 
  Globe, 
  AlertTriangle,
  Settings,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Zap,
  Brain
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { AppScreen } from '../App';

interface DashboardLayoutProps {
  title: string;
  description: string;
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  description,
  currentScreen,
  onNavigate,
  onToggleTheme,
  isDarkMode,
  children,
}) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-xl bg-primary-blue/20 ring-1 ring-primary-blue/30">
            <Shield className="h-6 w-6 text-primary-blue" />
          </div>
          <div className="hidden sm:block ml-2">
            <h1 className="font-bold text-text-primary text-lg">SiteGuard</h1>
            <p className="text-xs text-text-muted">Security Dashboard</p>
          </div>
        </div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li className={currentScreen === 'dashboard' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('dashboard')}>Dashboard</Button>
            </li>
            <li className={currentScreen === 'monitors' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('monitors')}>Monitors</Button>
            </li>
            <li className={currentScreen === 'security' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('security')}>Security</Button>
            </li>
            <li className={currentScreen === 'alerts' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('alerts')}>Alerts</Button>
            </li>
            <li className={currentScreen === 'chaos-experiments' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('chaos-experiments')}>Chaos Experiments</Button>
            </li>
            <li className={currentScreen === 'ai-insights' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('ai-insights')}>AI Insights</Button>
            </li>
            <li className={currentScreen === 'team' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('team')}>Team</Button>
            </li>
            <li className={currentScreen === 'settings' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('settings')}>Settings</Button>
            </li>
            {/* Replace 'ai-postmortems' with a valid AppScreen value, e.g., 'ai-insights' */}
            <li className={currentScreen === 'ai-insights' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('ai-insights')}>AI Postmortems</Button>
            </li>
            <li className={currentScreen === 'runbooks' ? 'bg-gray-700 rounded p-2' : ''}>
              <Button onClick={() => onNavigate('runbooks')}>Drift Correction</Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </header>
        {children}
      </div>
    </div>
  );
}


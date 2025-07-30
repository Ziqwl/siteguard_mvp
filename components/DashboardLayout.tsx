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
  children: React.ReactNode;
  title: string;
  description?: string;
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export function DashboardLayout({ 
  children, 
  title, 
  description, 
  currentScreen, 
  onNavigate, 
  onToggleTheme, 
  isDarkMode 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', screen: 'dashboard' as AppScreen, disabled: false },
    { icon: Globe, label: 'Monitors', screen: 'monitors' as AppScreen, disabled: false },
    { icon: Shield, label: 'Security', screen: 'security' as AppScreen, disabled: false },
    { icon: AlertTriangle, label: 'Alerts', screen: 'alerts' as AppScreen, disabled: false },
    { icon: Zap, label: 'Chaos Experiments', screen: 'chaos-experiments' as AppScreen, disabled: false },
    { icon: Brain, label: 'AI Insights', screen: 'ai-insights' as AppScreen, disabled: false },
    { icon: Users, label: 'Team', screen: 'team' as AppScreen, disabled: false },
    { icon: Settings, label: 'Settings', screen: 'settings' as AppScreen, disabled: false },
    { icon: Activity, label: 'AI Postmortems', screen: 'dashboard' as AppScreen, disabled: true, tooltip: 'Coming soon - AI-powered incident analysis' },
    { icon: Shield, label: 'Drift Correction', screen: 'dashboard' as AppScreen, disabled: true, tooltip: 'Coming soon - Automated security drift detection' },
    { icon: Settings, label: 'Runbooks', screen: 'dashboard' as AppScreen, disabled: true, tooltip: 'Coming soon - Automated incident response playbooks' }
  ];

  const handleNavigation = (screen: AppScreen) => {
    onNavigate(screen);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Sidebar */}
              <div className={`
          fixed inset-y-0 left-0 z-50 w-72 lg:w-80 xl:w-96
          glass-strong border-r border-white/20 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:inset-0
                     bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95
        `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
                           <div className="p-2 rounded-xl bg-[#3B82F6]/20 ring-1 ring-[#3B82F6]/30">
               <Shield className="h-6 w-6 lg:h-7 lg:w-7 text-[#3B82F6]" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg lg:text-xl">SiteGuard</h1>
                <p className="text-xs lg:text-sm text-white/60">Security Dashboard</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white/70 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
            <TooltipProvider>
              {sidebarItems.map((item, index) => {
                const buttonContent = (
                  <button
                    key={index}
                    onClick={() => !item.disabled && handleNavigation(item.screen)}
                    disabled={item.disabled}
                    className={`
                      w-full flex items-center gap-3 lg:gap-4 px-5 lg:px-6 py-5 lg:py-6 
                      rounded-2xl text-left transition-all duration-300 ease-out
                      touch-manipulation min-h-[56px] lg:min-h-[60px]
                      ${item.disabled 
                        ? 'text-white/30 cursor-not-allowed opacity-50' 
                        : currentScreen === item.screen 
                                                     ? 'bg-gradient-to-r from-[#3B82F6]/30 to-[#8B5CF6]/30 text-white border border-[#3B82F6]/50 shadow-lg shadow-[#3B82F6]/20 backdrop-blur-sm' 
                           : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-[#3B82F6]/10 hover:to-[#8B5CF6]/15 hover:shadow-lg hover:shadow-[#3B82F6]/15 hover:backdrop-blur-sm'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0" />
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                  </button>
                );

                return item.disabled && item.tooltip ? (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-slate-800 text-white border-white/20">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={index}>
                    {buttonContent}
                  </div>
                );
              })}
            </TooltipProvider>
          </nav>
          
          {/* Footer Section */}
          <div className="p-3 lg:p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] lg:min-h-[52px] touch-manipulation"
              onClick={() => onNavigate('login')}
            >
              <LogOut className="h-5 w-5 lg:h-6 lg:w-6 mr-3 lg:mr-4" />
              <span className="text-sm lg:text-base">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="glass-strong border-b border-white/10 px-4 lg:px-6 py-4 lg:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white/70 hover:text-white touch-manipulation"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Breadcrumb for mobile */}
              {isMobile && currentScreen !== 'dashboard' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white touch-manipulation"
                  onClick={() => onNavigate('dashboard')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              
              <div className="min-w-0 flex-1">
                <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold text-white truncate">
                  {title}
                </h2>
                {description && (
                  <p className="text-xs lg:text-sm text-white/60 truncate mt-1 lg:mt-0.5">
                    {description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Theme toggle */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Switch 
                id="theme-toggle" 
                checked={isDarkMode} 
                onCheckedChange={onToggleTheme}
                className="touch-manipulation"
              />
              <Label 
                htmlFor="theme-toggle" 
                className="text-xs lg:text-sm text-white/70 flex items-center gap-1 lg:gap-2 cursor-pointer"
              >
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="hidden sm:inline">
                  {isDarkMode ? 'Dark' : 'Light'}
                </span>
              </Label>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>

        {/* Mobile bottom navigation for quick access */}
        {isMobile && (
          <div className="glass-strong border-t border-white/10 p-2">
            <div className="flex justify-around">
              {sidebarItems.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.screen)}
                  className={`
                    flex flex-col items-center gap-1 p-2 rounded-lg transition-colors touch-manipulation
                    ${currentScreen === item.screen 
                      ? 'text-primary' 
                      : 'text-white/60 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
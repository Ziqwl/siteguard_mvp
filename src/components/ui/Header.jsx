import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Don't render header on authentication pages
  if (location.pathname === '/user-login' || location.pathname === '/user-registration') {
    return null;
  }

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    navigate('/user-login');
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/main-dashboard',
      icon: 'BarChart3'
    },
    {
      label: 'Checks',
      path: '#',
      icon: 'Shield',
      comingSoon: true
    },
    {
      label: 'Integrations',
      path: '#',
      icon: 'Plug',
      comingSoon: true
    },
    {
      label: 'Reports',
      path: '#',
      icon: 'FileText',
      comingSoon: true
    },
    {
      label: 'Profile',
      path: '/settings',
      icon: 'User'
    }
  ];

  const handleNavigation = (path, comingSoon) => {
    if (comingSoon) return;
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/main-dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(13,17,23,0.8)] backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 pl-20 pr-6">
        {/* Logo - Large and prominent */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Shield" size={24} color="var(--color-primary-foreground)" />
          </div>
          <span className="text-2xl font-bold text-white">SiteGuard</span>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* System Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white">All systems operational</span>
          </div>
          
          {/* Theme Toggle Placeholder */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#2DD4BF] hover:bg-white/10"
          >
            <Icon name="Moon" size={20} color="currentColor" />
          </Button>
          
          <Button
            variant="ghost"
            iconName="LogOut"
            iconPosition="left"
            iconSize={18}
            onClick={handleLogout}
            className="px-4 py-2 text-white hover:text-[#2DD4BF] hover:bg-white/10"
          >
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-[#2DD4BF] hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          iconName={isMobileMenuOpen ? "X" : "Menu"}
          iconSize={20}
        >
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[rgba(13,17,23,0.95)] backdrop-blur-md border-b border-border">
          <nav className="px-6 py-4 space-y-2">
            {/* Mobile System Status */}
            <div className="flex items-center justify-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white">All systems operational</span>
            </div>
            
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                <Button
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.path, item.comingSoon)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  disabled={item.comingSoon}
                  className={`justify-start px-4 py-3 ${
                    item.comingSoon ? 'opacity-60' : ''
                  } ${
                    !isActivePath(item.path) ? 'text-white hover:text-[#2DD4BF] hover:bg-white/10' : ''
                  }`}
                >
                  {item.label}
                  {item.comingSoon && (
                    <span className="ml-2 text-xs text-[#F59E0B]">(Coming Soon)</span>
                  )}
                </Button>
              </div>
            ))}
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                iconName="LogOut"
                iconPosition="left"
                iconSize={18}
                onClick={handleLogout}
                fullWidth
                className="justify-start px-4 py-3 text-white hover:text-[#2DD4BF] hover:bg-white/10"
              >
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
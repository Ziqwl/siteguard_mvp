import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Don't render sidebar on authentication pages
  if (location.pathname === '/user-login' || location.pathname === '/user-registration') {
    return null;
  }

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
  };

  const isActivePath = (path) => {
    if (path === '/main-dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#111827] to-[#1E293B] border-r border-border transition-all duration-200 ease-out z-40 ${
        isExpanded ? 'w-[200px]' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full py-4">
        {/* Logo Area */}
        <div className="flex items-center justify-center h-16 mb-8">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Shield" size={20} color="var(--color-primary-foreground)" />
          </div>
          {isExpanded && (
            <span className="ml-3 text-lg font-semibold text-white transition-opacity duration-200">
              SiteGuard
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                <button
                  onClick={() => handleNavigation(item.path, item.comingSoon)}
                  disabled={item.comingSoon}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-150 group ${
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-[#2DD4BF] to-[#10B981] text-gray-900'
                      : 'text-white hover:text-[#2DD4BF] hover:bg-white/5'
                  } ${
                    item.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      color={isActivePath(item.path) ? '#0D1117' : 'currentColor'}
                    />
                  </div>
                  {isExpanded && (
                    <span className="ml-3 text-sm font-medium transition-opacity duration-200">
                      {item.label}
                    </span>
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {item.comingSoon && (
                      <span className="ml-1 text-[#F59E0B]">(Coming Soon)</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Support Links */}
        <div className="px-2 pb-4">
          <div className="border-t border-white/10 pt-4 space-y-2">
            <button
              className="w-full flex items-center p-3 rounded-lg text-white hover:text-[#2DD4BF] hover:bg-white/5 transition-all duration-150 group"
              onClick={() => {/* Coming soon */}}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <Icon name="HelpCircle" size={20} color="currentColor" />
              </div>
              {isExpanded && (
                <span className="ml-3 text-sm font-medium transition-opacity duration-200">
                  Help Center
                </span>
              )}
            </button>
            
            <button
              className="w-full flex items-center p-3 rounded-lg text-white hover:text-[#2DD4BF] hover:bg-white/5 transition-all duration-150 group"
              onClick={() => {/* Coming soon */}}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <Icon name="MessageCircle" size={20} color="currentColor" />
              </div>
              {isExpanded && (
                <span className="ml-3 text-sm font-medium transition-opacity duration-200">
                  Feedback
                </span>
              )}
            </button>
            
            {/* Tooltips for collapsed state */}
            {!isExpanded && (
              <>
                <div className="absolute left-full bottom-20 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Help Center
                </div>
                <div className="absolute left-full bottom-8 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Feedback
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
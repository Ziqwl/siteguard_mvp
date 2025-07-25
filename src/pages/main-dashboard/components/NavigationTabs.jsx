import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'dashboard',
      label: 'Панель управления',
      path: '/main-dashboard',
      icon: 'BarChart3',
      active: true
    },
    {
      id: 'features',
      label: 'Функции',
      path: '#',
      icon: 'Zap',
      active: false,
      comingSoon: true
    },
    {
      id: 'settings',
      label: 'Настройки',
      path: '/settings',
      icon: 'Settings',
      active: false
    }
  ];

  const handleTabClick = (tab) => {
    if (tab.comingSoon) {
      return;
    }
    navigate(tab.path);
  };

  const isActiveTab = (tab) => {
    return location.pathname === tab.path;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="flex items-center space-x-1 px-6 py-2 overflow-x-auto">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative">
            <Button
              variant={isActiveTab(tab) ? "default" : "ghost"}
              onClick={() => handleTabClick(tab)}
              iconName={tab.icon}
              iconPosition="left"
              iconSize={18}
              className={`px-4 py-2 whitespace-nowrap ${
                tab.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              disabled={tab.comingSoon}
            >
              {tab.label}
            </Button>
            {tab.comingSoon && (
              <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
                Скоро
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
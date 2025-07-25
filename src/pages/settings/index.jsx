import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import ThemeSection from './components/ThemeSection';
import AccountSection from './components/AccountSection';
import NotificationSection from './components/NotificationSection';

const Settings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/user-login');
      return;
    }
  }, [navigate]);

  const sections = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'theme', label: 'Theme', icon: 'Palette' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSection />;
      case 'notifications':
        return <NotificationSection />;
      case 'theme':
        return <ThemeSection />;
      default:
        return <AccountSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="pt-16 pl-16">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account and application settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-4">
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        onClick={() => setActiveSection(section.id)}
                        iconName={section.icon}
                        iconPosition="left"
                        iconSize={18}
                        fullWidth
                        className="justify-start px-4 py-3"
                      >
                        {section.label}
                      </Button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="slide-up">
                  {renderActiveSection()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ThemeSection = () => {
  const [currentTheme, setCurrentTheme] = useState('dark-tech');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on component mount
    const savedTheme = localStorage.getItem('theme') || 'dark-tech';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    
    // Only apply dark-tech theme
    root.style.setProperty('--color-background', '#0A0E13');
    root.style.setProperty('--color-foreground', '#E5E7EB');
    root.style.setProperty('--color-card', '#1F2937');
    root.style.setProperty('--color-card-foreground', '#E5E7EB');
    root.style.setProperty('--color-muted', '#374151');
    root.style.setProperty('--color-muted-foreground', '#9CA3AF');
    root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--color-primary', '#2DD4BF');
    root.style.setProperty('--color-accent', '#2DD4BF');
    document.body.style.background = '';
  };

  const handleThemeChange = async (theme) => {
    setLoading(true);
    
    // Simulate theme application delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    
    setLoading(false);
  };

  const themes = [
    {
      id: 'dark-tech',
      name: 'Dark Tech',
      description: 'Elegant dark interface with tech vibes - the perfect theme for security monitoring',
      icon: 'Moon',
      preview: {
        background: '#0A0E13',
        card: '#1F2937',
        accent: '#2DD4BF',
        text: '#E5E7EB'
      }
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="Palette" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Theme Settings</h3>
          <p className="text-sm text-muted-foreground">Currently using the optimized Dark Tech theme</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="relative p-4 rounded-lg border-2 border-primary bg-primary/5 transition-all duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
                <Icon 
                  name={theme.icon} 
                  size={20} 
                  color="var(--color-primary)" 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-foreground">{theme.name}</h4>
                  <div className="flex items-center justify-center w-5 h-5 bg-primary rounded-full">
                    <Icon name="Check" size={12} color="var(--color-primary-foreground)" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                
                {/* Theme Preview */}
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ background: theme.preview.background }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ background: theme.preview.card }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ background: theme.preview.accent }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ background: theme.preview.text }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Optimized Theme</p>
            <p>Dark Tech theme is carefully optimized for security monitoring interfaces and reduces eye strain during extended monitoring sessions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;
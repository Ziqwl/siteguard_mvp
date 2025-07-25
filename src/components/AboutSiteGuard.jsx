import React from 'react';
import Icon from './AppIcon';

const AboutSiteGuard = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Real-time Monitoring',
      description: 'Continuous uptime and performance tracking'
    },
    {
      icon: 'Zap',
      title: 'Instant Alerts',
      description: 'Get notified immediately when issues occur'
    },
    {
      icon: 'Globe',
      title: 'Global Coverage',
      description: 'Monitor from multiple locations worldwide'
    },
    {
      icon: 'BarChart3',
      title: 'Detailed Analytics',
      description: 'Comprehensive reports and insights'
    }
  ];

  const useCases = [
    'E-commerce websites monitoring',
    'API endpoint health checks',
    'Server uptime tracking',
    'Performance optimization insights'
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
            <Icon name="Shield" size={32} color="var(--color-primary)" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">About SiteGuard</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Professional website monitoring and uptime tracking platform designed for businesses and developers
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg flex-shrink-0">
              <Icon name={feature.icon} size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Use Cases */}
      <div className="bg-card/50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="CheckCircle" size={16} color="var(--color-primary)" className="mr-2" />
          Perfect for:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">{useCase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Credits */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-2">Created by Ziqwl</p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <a 
            href="https://t.me/Ziqwl0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-primary transition-colors"
          >
            <Icon name="MessageCircle" size={12} />
            <span>@Ziqwl0</span>
          </a>
          <span>•</span>
          <a 
            href="mailto:ziqwl.0@gmail.com"
            className="flex items-center space-x-1 hover:text-primary transition-colors"
          >
            <Icon name="Mail" size={12} />
            <span>ziqwl.0@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSiteGuard;
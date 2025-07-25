import React from 'react';


const WelcomeSection = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to SiteGuard
          </h1>
          <p className="text-muted-foreground">
            Monitor your website performance and uptime • Last updated: {currentTime}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-success/10 px-4 py-2 rounded-lg">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-success">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
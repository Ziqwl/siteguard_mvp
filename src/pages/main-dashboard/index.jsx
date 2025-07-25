import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import UptimeChart from './components/UptimeChart';
import RunCheckButton from './components/RunCheckButton';
import ThemeToggle from './components/ThemeToggle';
import WelcomeSection from './components/WelcomeSection';
import QuickTips from './components/QuickTips';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    uptime: 0,
    responseTime: 0,
    errorRate: 0
  });

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/user-login');
      return;
    }

    // Simulate loading metrics
    setTimeout(() => {
      setMetrics({
        uptime: 99.8,
        responseTime: 245,
        errorRate: 0.2
      });
      setIsLoading(false);
    }, 1500);
  }, [navigate]);

  const handleRunCheck = () => {
    setIsLoading(true);
    
    // Simulate new metrics after check
    setTimeout(() => {
      setMetrics({
        uptime: Math.floor(Math.random() * 5) + 95,
        responseTime: Math.floor(Math.random() * 200) + 150,
        errorRate: Math.random() * 2
      });
      setIsLoading(false);
    }, 2000);
  };

  const metricCards = [
    {
      title: 'Uptime',
      value: metrics.uptime.toFixed(1),
      unit: '%',
      icon: 'Activity',
      trend: 'up',
      trendValue: '+0.2%'
    },
    {
      title: 'Average Response Time',
      value: metrics.responseTime,
      unit: 'ms',
      icon: 'Clock',
      trend: 'down',
      trendValue: '-15ms'
    },
    {
      title: 'Error Rate',
      value: metrics.errorRate.toFixed(1),
      unit: '%',
      icon: 'AlertTriangle',
      trend: 'down',
      trendValue: '-0.1%'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="pt-16 pl-16">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="fade-in">
            <WelcomeSection />
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {metricCards.map((metric, index) => (
                <div key={index} className="slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    unit={metric.unit}
                    icon={metric.icon}
                    trend={metric.trend}
                    trendValue={metric.trendValue}
                    isLoading={isLoading}
                  />
                </div>
              ))}
            </div>

            {/* Run Check Button */}
            <RunCheckButton onRunCheck={handleRunCheck} />

            {/* Uptime Chart */}
            <div className="slide-up" style={{ animationDelay: '400ms' }}>
              <UptimeChart isLoading={isLoading} />
            </div>

            {/* Quick Tips Section */}
            <div className="mt-8 slide-up" style={{ animationDelay: '500ms' }}>
              <QuickTips />
            </div>

            {/* Status Information */}
            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">System Status</h3>
                  <p className="text-muted-foreground">
                    All systems operational. Last check: {new Date().toLocaleTimeString('en-US')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">Online</span>
                </div>
              </div>
            </div>

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed bottom-6 right-6 z-50">
              <ThemeToggle />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
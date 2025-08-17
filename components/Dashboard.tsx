import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Activity, Globe, Shield, TrendingUp, Download, RefreshCw, ArrowUpRight, Eye } from 'lucide-react';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface DashboardProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isDarkMode, currentScreen, onToggleTheme }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const metrics = [
    {
      title: "Total Requests",
      value: "24.2K",
      change: "+12.5%",
      icon: Activity,
      color: "text-blue-500",
      onClick: () => onNavigate('monitors')
    },
    {
      title: "Avg Response Time",
      value: "145ms",
      change: "-2.3%",
      icon: Globe,
      color: "text-green-500",
      onClick: () => onNavigate('monitors')
    },
    {
      title: "Security Score",
      value: "A+",
      change: "0%",
      icon: Shield,
      color: "text-purple-500",
      onClick: () => onNavigate('security')
    }
  ];

  const recentActivities = [
    {
      type: "success",
      message: "SSL certificate renewed successfully",
      time: "2 min ago"
    },
    {
      type: "info",
      message: "New security vulnerability detected",
      time: "1 hour ago"
    },
    {
      type: "warning",
      message: "Response time degradation detected",
      time: "3 hours ago"
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div>
      {/* Adding placeholder content */}
      <h1>Dashboard Placeholder Content</h1>
      {/* Keeping original code */}
      <DashboardLayout
        title="Dashboard"
        description="Monitor your website security and performance"
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        onToggleTheme={onToggleTheme}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-6 lg:space-y-8">
          {/* Quick Actions */}
          <div className="w-full my-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex flex-col xs:flex-row gap-3 flex-1">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                aria-label={isRefreshing ? 'Refreshing dashboard data' : 'Refresh dashboard data'}
                className="btn btn-secondary"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
            
            <div className="text-sm font-medium text-text-secondary text-center sm:text-right">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <Card 
                key={index} 
                className="card group cursor-pointer hover:scale-[1.02] transition-all duration-200 w-full sm:w-1/3 aspect-[3/2]"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={metric.onClick}
                role="button"
                tabIndex={0}
                aria-label={`${metric.title}: ${metric.value} - Click to view details`}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    metric.onClick();
                  }
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-text-primary">
                    {metric.title}
                  </CardTitle>
                  <div className="p-3 rounded-lg bg-bg-secondary">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-text-primary">
                      {metric.value}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-text-muted" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-status-success font-medium">
                    <TrendingUp className="h-3 w-3" />
                    <span className="truncate">{metric.change} from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
            <Card className="card" style={{ animationDelay: '500ms' }}>
              {/* Card content here */}
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

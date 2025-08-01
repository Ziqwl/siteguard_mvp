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

export function Dashboard({ onNavigate, onToggleTheme, isDarkMode, currentScreen }: DashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addToast } = useToast();

  const metrics = [
    {
      title: 'Uptime Status',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
                 color: 'text-emerald-400',
           bgColor: 'bg-gradient-to-br from-emerald-400/30 to-emerald-500/20',
           borderColor: 'border-emerald-400/40',
           gradient: 'from-emerald-400 to-emerald-500',
      onClick: () => onNavigate('monitors')
    },
    {
      title: 'Active Monitors',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Globe,
                 color: 'text-indigo-400',
           bgColor: 'bg-gradient-to-br from-indigo-400/30 to-indigo-500/20',
           borderColor: 'border-indigo-400/40',
           gradient: 'from-indigo-400 to-indigo-500',
      onClick: () => onNavigate('monitors')
    },
    {
      title: 'Threats Blocked',
      value: '847',
      change: '+12',
      trend: 'up',
      icon: Shield,
                 color: 'text-purple-400',
           bgColor: 'bg-gradient-to-br from-purple-400/30 to-purple-500/20',
           borderColor: 'border-purple-400/40',
           gradient: 'from-purple-400 to-purple-500',
      onClick: () => onNavigate('security')
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    addToast({
      type: 'info',
      title: 'Refreshing data...',
      description: 'Updating dashboard metrics'
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRefreshing(false);
    addToast({
      type: 'success',
      title: 'Data refreshed',
      description: 'Dashboard updated with latest information'
    });
  };

  const recentActivities = [
    { 
      type: 'success', 
      message: 'Website scan completed - No threats detected', 
      time: '2 minutes ago',
      source: 'example.com'
    },
    { 
      type: 'warning', 
      message: 'SSL certificate expires in 30 days', 
      time: '1 hour ago',
      source: 'api.example.com'
    },
    { 
      type: 'info', 
      message: 'New monitor added for subdomain.example.com', 
      time: '3 hours ago',
      source: 'subdomain.example.com'
    },
    { 
      type: 'success', 
      message: 'Uptime check passed - 99.9% availability', 
      time: '6 hours ago',
      source: 'example.com'
    }
  ];

  return (
    <DashboardLayout
      title="Dashboard"
      description="Monitor your website security and performance"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 lg:space-y-8">
          {/* Quick Actions */}
          <div className="w-full my-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex flex-col xs:flex-row gap-3 flex-1">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="btn-secondary hover:bg-gray-800/50 hover:border-gray-500 transition-colors duration-200 min-h-[44px]"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
            
            <div className="text-sm font-medium text-gray-300 text-center sm:text-right">
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
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-white">
                  {metric.title}
                </CardTitle>
                <div className="p-3 rounded-lg bg-gray-800/50">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-white">
                    {metric.value}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
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
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg Response Time</span>
                <span className="text-sm font-semibold text-white">125ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Requests</span>
                <span className="text-sm font-semibold text-white">2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Error Rate</span>
                <span className="text-sm font-semibold text-emerald-400">0.02%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Security Score</span>
                <span className="text-sm font-semibold text-primary">A+</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card" style={{ animationDelay: '600ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm text-gray-400">All systems operational</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-gray-400">Monitoring active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm text-gray-400">Security enabled</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card" style={{ animationDelay: '700ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.slice(0, 3).map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => onNavigate('alerts')}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-emerald-400' :
                      activity.type === 'warning' ? 'bg-amber-400' :
                      'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white hover:text-primary transition-colors">
                        {activity.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('alerts')}
                className="btn-secondary w-full mt-4 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white transition-all duration-200 hover:shadow-md"
              >
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
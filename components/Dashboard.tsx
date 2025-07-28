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
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20',
      onClick: () => onNavigate('monitors')
    },
    {
      title: 'Active Monitors',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Globe,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20',
      onClick: () => onNavigate('monitors')
    },
    {
      title: 'Threats Blocked',
      value: '847',
      change: '+12',
      trend: 'up',
      icon: Shield,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
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
      <div className="space-y-6 lg:space-y-8">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-stretch sm:items-center justify-between">
          <div className="flex flex-col xs:flex-row gap-2 lg:gap-3 flex-1">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="glass border-white/20 text-white hover:bg-white/5"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
          
          <div className="text-xs lg:text-sm text-white/60 text-center sm:text-right">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className={`
                glass border-white/10 hover:border-white/20 transition-all duration-300 
                animate-scale-in group cursor-pointer hover:shadow-2xl hover:shadow-black/20
                hover:scale-[1.02] active:scale-[0.98]
                ${metric.borderColor}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={metric.onClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm lg:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                  {metric.title}
                </CardTitle>
                <div className={`
                  p-2 lg:p-3 rounded-lg lg:rounded-xl ${metric.bgColor} 
                  group-hover:scale-110 transition-transform ring-1 ring-white/10
                `}>
                  <metric.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl lg:text-3xl font-bold text-white group-hover:text-primary transition-colors">
                    {metric.value}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center gap-1 text-xs lg:text-sm text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>{metric.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '500ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Avg Response Time</span>
                <span className="text-sm font-semibold text-white">125ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Total Requests</span>
                <span className="text-sm font-semibold text-white">2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Error Rate</span>
                <span className="text-sm font-semibold text-emerald-400">0.02%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Security Score</span>
                <span className="text-sm font-semibold text-primary">A+</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '600ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm text-white/70">All systems operational</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-white/70">Monitoring active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm text-white/70">Security enabled</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '700ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.slice(0, 3).map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-2 rounded-lg glass hover:bg-white/5 transition-colors cursor-pointer"
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
                        <span className="text-xs text-white/50">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('alerts')}
                className="w-full mt-4 glass border-white/20 text-white hover:bg-white/5"
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
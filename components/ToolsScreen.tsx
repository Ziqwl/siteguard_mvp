import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Wrench, 
  Shield, 
  Database, 
  Globe, 
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Activity,
  BarChart3,
  Target,
  RefreshCw,
  Play,
  Stop,
  ExternalLink
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface ToolsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'security' | 'performance' | 'monitoring' | 'integration';
  status: 'available' | 'running' | 'maintenance' | 'error';
  lastRun?: Date;
  duration?: number;
  icon: React.ComponentType<any>;
}

interface QuickAction {
  id: string;
  name: string;
  description: string;
  action: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  icon: React.ComponentType<any>;
}

export function ToolsScreen({ 
  onNavigate, 
  onToggleTheme, 
  isDarkMode, 
  currentScreen 
}: ToolsScreenProps) {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: '1',
      name: 'SSL Certificate Checker',
      description: 'Verify SSL certificate validity and expiration',
      category: 'security',
      status: 'available',
      lastRun: new Date(Date.now() - 3600000),
      icon: Shield
    },
    {
      id: '2',
      name: 'Database Health Check',
      description: 'Monitor database performance and connections',
      category: 'performance',
      status: 'running',
      lastRun: new Date(),
      duration: 45,
      icon: Database
    },
    {
      id: '3',
      name: 'Network Latency Test',
      description: 'Test network connectivity and response times',
      category: 'monitoring',
      status: 'available',
      lastRun: new Date(Date.now() - 1800000),
      icon: Globe
    },
    {
      id: '4',
      name: 'Load Balancer Status',
      description: 'Check load balancer health and distribution',
      category: 'performance',
      status: 'available',
      lastRun: new Date(Date.now() - 900000),
      icon: Activity
    }
  ]);

  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: '1',
      name: 'Quick SSL Check',
      description: 'Instant SSL certificate validation',
      action: 'ssl-check',
      status: 'idle',
      icon: Shield
    },
    {
      id: '2',
      name: 'Database Backup',
      description: 'Create immediate database backup',
      action: 'db-backup',
      status: 'idle',
      icon: Database
    },
    {
      id: '3',
      name: 'Cache Clear',
      description: 'Clear all application caches',
      action: 'cache-clear',
      status: 'idle',
      icon: RefreshCw
    },
    {
      id: '4',
      name: 'Service Restart',
      description: 'Restart critical services',
      action: 'service-restart',
      status: 'idle',
      icon: Play
    }
  ]);

  const [autoChecks, setAutoChecks] = useState({
    ssl: true,
    database: true,
    network: false,
    performance: true
  });

  const { addToast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'available': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'performance': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'monitoring': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'integration': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleRunTool = (toolId: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId 
        ? { ...tool, status: 'running' as const, lastRun: new Date() }
        : tool
    ));
    
    addToast({
      type: 'success',
      title: 'Tool Started',
      description: 'Tool is now running'
    });

    // Simulate tool completion
    setTimeout(() => {
      setTools(prev => prev.map(tool => 
        tool.id === toolId 
          ? { ...tool, status: 'available' as const }
          : tool
      ));
    }, 3000);
  };

  const handleQuickAction = (actionId: string) => {
    setQuickActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: 'running' as const }
        : action
    ));
    
    addToast({
      type: 'info',
      title: 'Action Started',
      description: 'Quick action is being executed'
    });

    // Simulate action completion
    setTimeout(() => {
      setQuickActions(prev => prev.map(action => 
        action.id === actionId 
          ? { ...action, status: 'completed' as const }
          : action
      ));
    }, 2000);
  };

  const runningTools = tools.filter(tool => tool.status === 'running');
  const availableTools = tools.filter(tool => tool.status === 'available');

  return (
    <DashboardLayout
      title="Tools & Integrations"
      description="Quick actions and system utilities"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Available Tools</p>
                  <p className="text-2xl font-bold text-white">{availableTools.length}</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Currently Running</p>
                  <p className="text-2xl font-bold text-white">{runningTools.length}</p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Quick Actions</p>
                  <p className="text-2xl font-bold text-white">{quickActions.length}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Auto-Checks</p>
                  <p className="text-2xl font-bold text-white">
                    {Object.values(autoChecks).filter(Boolean).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-Checks Configuration */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Automated Checks
            </CardTitle>
            <CardDescription className="text-white/70">
              Configure automatic system health checks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ssl-check" className="text-white">SSL Certificate Check</Label>
                <Switch
                  id="ssl-check"
                  checked={autoChecks.ssl}
                  onCheckedChange={(checked) => setAutoChecks(prev => ({ ...prev, ssl: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="db-check" className="text-white">Database Health Check</Label>
                <Switch
                  id="db-check"
                  checked={autoChecks.database}
                  onCheckedChange={(checked) => setAutoChecks(prev => ({ ...prev, database: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="network-check" className="text-white">Network Latency Check</Label>
                <Switch
                  id="network-check"
                  checked={autoChecks.network}
                  onCheckedChange={(checked) => setAutoChecks(prev => ({ ...prev, network: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perf-check" className="text-white">Performance Check</Label>
                <Switch
                  id="perf-check"
                  checked={autoChecks.performance}
                  onCheckedChange={(checked) => setAutoChecks(prev => ({ ...prev, performance: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-white/70">
              Instant system utilities and maintenance tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Card key={action.id} className="glass border-white/10 hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <action.icon className="h-5 w-5 text-blue-400" />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{action.name}</h3>
                        <p className="text-xs text-white/60">{action.description}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleQuickAction(action.id)}
                      disabled={action.status === 'running'}
                      className="w-full"
                      size="sm"
                    >
                      {action.status === 'running' ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : action.status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="glass border-white/10 hover:border-white/20 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      <tool.icon className="h-5 w-5" />
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-white/70 mt-2">
                      {tool.description}
                    </CardDescription>
                  </div>
                  <Badge className={getCategoryColor(tool.category)}>
                    {tool.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(tool.status)}`} />
                    <span className="text-white capitalize">{tool.status}</span>
                  </div>
                </div>

                {tool.lastRun && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Last Run:</span>
                    <span className="text-white text-xs">
                      {tool.lastRun.toLocaleTimeString()}
                    </span>
                  </div>
                )}

                {tool.duration && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Duration:</span>
                    <span className="text-white">{tool.duration}s</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {tool.status === 'available' ? (
                    <Button
                      onClick={() => handleRunTool(tool.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Tool
                    </Button>
                  ) : tool.status === 'running' ? (
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled
                    >
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Running...
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRunTool(tool.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Again
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 
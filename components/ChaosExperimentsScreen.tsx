import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Zap, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  BarChart3, 
  Clock, 
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';

interface ChaosExperimentsScreenProps {
  onNavigate: (screen: string) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: string;
}

interface ChaosExperiment {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  type: 'network' | 'cpu' | 'memory' | 'database';
  severity: 'low' | 'medium' | 'high' | 'critical';
  duration: number;
  progress: number;
  startTime: string;
  endTime?: string;
  results: {
    servicesAffected: number;
    recoveryTime: number;
    impact: string;
  };
}

export const ChaosExperimentsScreen: React.FC<ChaosExperimentsScreenProps> = ({
  onNavigate,
  onToggleTheme,
  isDarkMode,
  currentScreen
}) => {
  const [experiments, setExperiments] = useState<ChaosExperiment[]>([
    {
      id: '1',
      name: 'Network Latency Test',
      description: 'Simulate network latency to test application resilience',
      status: 'running',
      type: 'network',
      severity: 'medium',
      duration: 300,
      progress: 65,
      startTime: '2024-01-15T10:30:00Z',
      results: {
        servicesAffected: 2,
        recoveryTime: 45,
        impact: 'Minimal'
      }
    },
    {
      id: '2',
      name: 'CPU Stress Test',
      description: 'High CPU load simulation to test autoscaling',
      status: 'completed',
      type: 'cpu',
      severity: 'high',
      duration: 600,
      progress: 100,
      startTime: '2024-01-15T09:00:00Z',
      endTime: '2024-01-15T09:10:00Z',
      results: {
        servicesAffected: 5,
        recoveryTime: 120,
        impact: 'Moderate'
      }
    },
    {
      id: '3',
      name: 'Database Connection Pool Test',
      description: 'Test database connection handling under stress',
      status: 'scheduled',
      type: 'database',
      severity: 'low',
      duration: 180,
      progress: 0,
      startTime: '2024-01-15T11:00:00Z',
      results: {
        servicesAffected: 1,
        recoveryTime: 30,
        impact: 'Low'
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'scheduled': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'network': return <Activity className="h-4 w-4" />;
      case 'cpu': return <BarChart3 className="h-4 w-4" />;
      case 'memory': return <Zap className="h-4 w-4" />;
      case 'database': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const startExperiment = (id: string) => {
    setExperiments(prev => 
      prev.map(exp => 
        exp.id === id 
          ? { ...exp, status: 'running' as const, progress: 0 }
          : exp
      )
    );
  };

  const stopExperiment = (id: string) => {
    setExperiments(prev => 
      prev.map(exp => 
        exp.id === id 
          ? { ...exp, status: 'completed' as const, progress: 100, endTime: new Date().toISOString() }
          : exp
      )
    );
  };

  return (
    <DashboardLayout
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
      currentScreen={currentScreen}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Chaos Experiments</h1>
              <p className="text-gray-400 text-sm lg:text-base">Test your system's resilience with controlled chaos</p>
            </div>
            <Button 
              className="btn-primary min-h-[44px]"
              onClick={() => {/* TODO: Add new experiment modal */}}
            >
              <Zap className="h-4 w-4" />
              New Experiment
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Experiments</p>
                    <p className="text-2xl font-bold text-white">1</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <Play className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Completed Today</p>
                    <p className="text-2xl font-bold text-white">3</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-white">87%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Avg Recovery</p>
                    <p className="text-2xl font-bold text-white">65s</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <Clock className="h-5 w-5 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experiments List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {experiments.map((experiment) => (
            <Card key={experiment.id} className="card group hover:scale-[1.02] transition-transform">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/10">
                        {getTypeIcon(experiment.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{experiment.name}</CardTitle>
                        <CardDescription className="text-white/70">{experiment.description}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Badge className={getSeverityColor(experiment.severity)}>
                        {experiment.severity.toUpperCase()}
                      </Badge>
                      <Badge className="bg-white/20 text-white">
                        {experiment.type.toUpperCase()}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(experiment.status)}`} />
                      <span className="text-sm text-white/70">
                        {experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {experiment.status === 'running' && (
                      <>
                                                  <Button
                            variant="outline"
                            size="sm"
                            onClick={() => stopExperiment(experiment.id)}
                            className="btn-secondary border-red-500/30 text-red-400 hover:bg-red-500/20"
                          >
                            <Pause className="h-4 w-4" />
                            Stop
                          </Button>
                        <div className="w-20">
                          <Progress value={experiment.progress} className="h-2" />
                        </div>
                      </>
                    )}
                    
                    {experiment.status === 'scheduled' && (
                                                <Button
                            size="sm"
                            onClick={() => startExperiment(experiment.id)}
                            className="btn-primary bg-green-600 hover:bg-green-700"
                          >
                            <Play className="h-4 w-4" />
                            Start
                          </Button>
                    )}
                    
                    {experiment.status === 'completed' && (
                                                <Button
                            variant="outline" 
                            size="sm"
                            className="btn-secondary border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Rerun
                          </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white/70 mb-1">Duration</p>
                    <p className="text-white font-medium">{experiment.duration}s</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Services Affected</p>
                    <p className="text-white font-medium">{experiment.results.servicesAffected}</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Recovery Time</p>
                    <p className="text-white font-medium">{experiment.results.recoveryTime}s</p>
                  </div>
                </div>
                
                {experiment.status === 'completed' && (
                  <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-white/70 mb-2">Results Summary</p>
                    <p className="text-white">
                      Impact: <span className="font-medium">{experiment.results.impact}</span> | 
                      Recovery: <span className="font-medium">{experiment.results.recoveryTime}s</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}; 
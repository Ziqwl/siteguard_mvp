import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Zap, 
  AlertTriangle, 
  Play, 
  Pause, 
  Settings, 
  BarChart3,
  Clock,
  Target,
  Activity,
  Shield,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface ChaosExperimentsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

interface Experiment {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  category: 'network' | 'infrastructure' | 'application' | 'security';
  impact: 'low' | 'medium' | 'high' | 'critical';
  duration: number;
  lastRun?: Date;
  successRate: number;
}

export function ChaosExperimentsScreen({ 
  onNavigate, 
  onToggleTheme, 
  isDarkMode, 
  currentScreen 
}: ChaosExperimentsScreenProps) {
  const [experiments, setExperiments] = useState<Experiment[]>([
    {
      id: '1',
      name: 'Network Latency Injection',
      description: 'Simulates network delays to test application resilience',
      status: 'idle',
      category: 'network',
      impact: 'medium',
      duration: 300,
      successRate: 85
    },
    {
      id: '2',
      name: 'CPU Stress Test',
      description: 'Increases CPU usage to test resource management',
      status: 'running',
      category: 'infrastructure',
      impact: 'high',
      duration: 600,
      lastRun: new Date(),
      successRate: 92
    },
    {
      id: '3',
      name: 'Database Connection Failure',
      description: 'Simulates database connection issues',
      status: 'completed',
      category: 'application',
      impact: 'critical',
      duration: 180,
      lastRun: new Date(Date.now() - 86400000),
      successRate: 78
    },
    {
      id: '4',
      name: 'Memory Leak Simulation',
      description: 'Gradually increases memory usage',
      status: 'idle',
      category: 'infrastructure',
      impact: 'high',
      duration: 900,
      successRate: 88
    }
  ]);

  const [autoRemediation, setAutoRemediation] = useState(true);
  const { addToast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network': return <Activity className="h-4 w-4" />;
      case 'infrastructure': return <Settings className="h-4 w-4" />;
      case 'application': return <Target className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleRunExperiment = (experimentId: string) => {
    setExperiments(prev => prev.map(exp => 
      exp.id === experimentId 
        ? { ...exp, status: 'running' as const, lastRun: new Date() }
        : exp
    ));
    
    addToast({
      type: 'success',
      title: 'Experiment Started',
      description: 'Chaos experiment is now running'
    });

    // Simulate experiment completion
    setTimeout(() => {
      setExperiments(prev => prev.map(exp => 
        exp.id === experimentId 
          ? { ...exp, status: 'completed' as const }
          : exp
      ));
    }, 5000);
  };

  const handleStopExperiment = (experimentId: string) => {
    setExperiments(prev => prev.map(exp => 
      exp.id === experimentId 
        ? { ...exp, status: 'idle' as const }
        : exp
    ));
    
    addToast({
      type: 'info',
      title: 'Experiment Stopped',
      description: 'Chaos experiment has been terminated'
    });
  };

  const runningExperiments = experiments.filter(exp => exp.status === 'running');
  const completedExperiments = experiments.filter(exp => exp.status === 'completed');

  return (
    <DashboardLayout
      title="Chaos Experiments"
      description="Test your system's resilience with controlled failure scenarios"
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
                  <p className="text-sm text-white/60">Total Experiments</p>
                  <p className="text-2xl font-bold text-white">{experiments.length}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Currently Running</p>
                  <p className="text-2xl font-bold text-white">{runningExperiments.length}</p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Success Rate</p>
                  <p className="text-2xl font-bold text-white">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Auto-Remediation</p>
                  <p className="text-2xl font-bold text-white">{autoRemediation ? 'ON' : 'OFF'}</p>
                </div>
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-Remediation Toggle */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Auto-Remediation
            </CardTitle>
            <CardDescription className="text-white/70">
              Automatically resolve issues detected during chaos experiments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-remediation"
                checked={autoRemediation}
                onCheckedChange={setAutoRemediation}
              />
              <Label htmlFor="auto-remediation" className="text-white">
                Enable automatic issue resolution
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experiments.map((experiment) => (
            <Card key={experiment.id} className="glass border-white/10 hover:border-white/20 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      {getCategoryIcon(experiment.category)}
                      {experiment.name}
                    </CardTitle>
                    <CardDescription className="text-white/70 mt-2">
                      {experiment.description}
                    </CardDescription>
                  </div>
                  <Badge className={getImpactColor(experiment.impact)}>
                    {experiment.impact}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(experiment.status)}`} />
                    <span className="text-white capitalize">{experiment.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Duration:</span>
                  <span className="text-white">{experiment.duration}s</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Success Rate:</span>
                  <span className="text-white">{experiment.successRate}%</span>
                </div>

                {experiment.lastRun && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Last Run:</span>
                    <span className="text-white">
                      {experiment.lastRun.toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {experiment.status === 'idle' ? (
                    <Button
                      onClick={() => handleRunExperiment(experiment.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Experiment
                    </Button>
                  ) : experiment.status === 'running' ? (
                    <Button
                      onClick={() => handleStopExperiment(experiment.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Experiment
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRunExperiment(experiment.id)}
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
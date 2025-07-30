import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Shield,
  Activity,
  BarChart3,
  Lightbulb,
  Target,
  ArrowUpRight,
  AlertCircle,
  Settings
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface AIInsightsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'prediction' | 'anomaly' | 'optimization' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  status: 'active' | 'resolved' | 'investigating';
  createdAt: Date;
  predictedImpact: string;
  autoRemediation?: boolean;
}

interface AutoRemediation {
  id: string;
  action: string;
  target: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  impact: string;
  timestamp: Date;
}

export function AIInsightsScreen({ 
  onNavigate, 
  onToggleTheme, 
  isDarkMode, 
  currentScreen 
}: AIInsightsScreenProps) {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      title: 'Memory Usage Trend Analysis',
      description: 'Detected increasing memory usage pattern that may lead to performance degradation within 24 hours',
      type: 'prediction',
      severity: 'medium',
      confidence: 87,
      status: 'active',
      createdAt: new Date(Date.now() - 3600000),
      predictedImpact: 'Potential 15% performance degradation',
      autoRemediation: true
    },
    {
      id: '2',
      title: 'Unusual Network Traffic Pattern',
      description: 'Detected anomalous network activity that may indicate a security threat',
      type: 'security',
      severity: 'high',
      confidence: 92,
      status: 'investigating',
      createdAt: new Date(Date.now() - 1800000),
      predictedImpact: 'Potential security breach',
      autoRemediation: false
    },
    {
      id: '3',
      title: 'Database Query Optimization',
      description: 'Identified slow database queries that can be optimized for better performance',
      type: 'optimization',
      severity: 'low',
      confidence: 95,
      status: 'resolved',
      createdAt: new Date(Date.now() - 7200000),
      predictedImpact: '30% query performance improvement'
    },
    {
      id: '4',
      title: 'CPU Bottleneck Prediction',
      description: 'CPU usage patterns suggest potential bottleneck in the next 6 hours',
      type: 'prediction',
      severity: 'medium',
      confidence: 78,
      status: 'active',
      createdAt: new Date(Date.now() - 5400000),
      predictedImpact: 'Service degradation risk',
      autoRemediation: true
    }
  ]);

  const [autoRemediations, setAutoRemediations] = useState<AutoRemediation[]>([
    {
      id: '1',
      action: 'Memory cleanup initiated',
      target: 'Application Server #2',
      status: 'completed',
      impact: 'Reduced memory usage by 23%',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      action: 'Load balancer adjustment',
      target: 'Web Server Cluster',
      status: 'running',
      impact: 'Distributing traffic more evenly',
      timestamp: new Date(Date.now() - 120000)
    }
  ]);

  const { addToast } = useToast();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      case 'investigating': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAutoRemediate = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { ...insight, autoRemediation: true }
        : insight
    ));
    
    addToast({
      type: 'success',
      title: 'Auto-Remediation Enabled',
      description: 'AI will automatically resolve this issue'
    });
  };

  const activeInsights = insights.filter(insight => insight.status === 'active');
  const resolvedInsights = insights.filter(insight => insight.status === 'resolved');

  return (
    <DashboardLayout
      title="AI Insights"
      description="Predictive analytics and automated issue resolution"
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
                  <p className="text-sm text-white/60">Active Insights</p>
                  <p className="text-2xl font-bold text-white">{activeInsights.length}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-white">94%</p>
                </div>
                <Target className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Auto-Remediations</p>
                  <p className="text-2xl font-bold text-white">{autoRemediations.length}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Issues Prevented</p>
                  <p className="text-2xl font-bold text-white">23</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <Card key={insight.id} className="glass border-white/10 hover:border-white/20 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      {getTypeIcon(insight.type)}
                      {insight.title}
                    </CardTitle>
                    <CardDescription className="text-white/70 mt-2">
                      {insight.description}
                    </CardDescription>
                  </div>
                  <Badge className={getSeverityColor(insight.severity)}>
                    {insight.severity}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Confidence:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={insight.confidence} className="w-20" />
                    <span className="text-white">{insight.confidence}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(insight.status)}`} />
                    <span className="text-white capitalize">{insight.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Predicted Impact:</span>
                  <span className="text-white text-xs">{insight.predictedImpact}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Detected:</span>
                  <span className="text-white text-xs">
                    {insight.createdAt.toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  {!insight.autoRemediation && insight.status === 'active' && (
                    <Button
                      onClick={() => handleAutoRemediate(insight.id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Enable Auto-Remediation
                    </Button>
                  )}
                  
                  {insight.autoRemediation && (
                    <Button variant="outline" className="flex-1" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Auto-Remediation Active
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

        {/* Auto-Remediation History */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Auto-Remediation History
            </CardTitle>
            <CardDescription className="text-white/70">
              Recent automated actions taken by AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {autoRemediations.map((remediation) => (
                <div key={remediation.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(remediation.status)}`} />
                    <div>
                      <p className="text-white font-medium">{remediation.action}</p>
                      <p className="text-white/60 text-sm">{remediation.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{remediation.impact}</p>
                    <p className="text-white/60 text-xs">
                      {remediation.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 
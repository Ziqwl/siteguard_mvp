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
  BarChart3,
  Activity,
  Shield,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';

interface AIInsightsScreenProps {
  onNavigate: (screen: string) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'prediction' | 'recommendation' | 'anomaly' | 'optimization';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  status: 'active' | 'resolved' | 'pending';
  timestamp: string;
  impact: string;
  action?: string;
  trend: 'up' | 'down' | 'stable';
  value?: number;
  unit?: string;
}

export const AIInsightsScreen: React.FC<AIInsightsScreenProps> = ({
  onNavigate,
  onToggleTheme,
  isDarkMode,
  currentScreen
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: '1',
      title: 'Memory Usage Spike Predicted',
      description: 'Based on current trends, memory usage is expected to exceed 85% within 2 hours',
      type: 'prediction',
      severity: 'high',
      confidence: 87,
      status: 'active',
      timestamp: '2024-01-15T10:30:00Z',
      impact: 'Potential service degradation',
      action: 'Consider scaling up memory allocation',
      trend: 'up',
      value: 78,
      unit: '%'
    },
    {
      id: '2',
      title: 'Database Connection Pool Optimization',
      description: 'Current connection pool settings are suboptimal for your traffic patterns',
      type: 'optimization',
      severity: 'medium',
      confidence: 92,
      status: 'pending',
      timestamp: '2024-01-15T09:15:00Z',
      impact: 'Improved response times',
      action: 'Increase max_connections from 50 to 100',
      trend: 'up',
      value: 45,
      unit: 'ms'
    },
    {
      id: '3',
      title: 'Unusual Error Rate Detected',
      description: 'Error rate has increased by 15% compared to baseline',
      type: 'anomaly',
      severity: 'critical',
      confidence: 95,
      status: 'active',
      timestamp: '2024-01-15T10:45:00Z',
      impact: 'User experience degradation',
      action: 'Investigate recent deployments',
      trend: 'up',
      value: 3.2,
      unit: '%'
    },
    {
      id: '4',
      title: 'Auto-scaling Threshold Adjustment',
      description: 'Current auto-scaling thresholds are too conservative',
      type: 'recommendation',
      severity: 'low',
      confidence: 78,
      status: 'resolved',
      timestamp: '2024-01-15T08:30:00Z',
      impact: 'Better resource utilization',
      action: 'Lower CPU threshold from 80% to 70%',
      trend: 'down',
      value: 65,
      unit: '%'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'recommendation': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'anomaly': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'optimization': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const resolveInsight = (id: string) => {
    setInsights(prev => 
      prev.map(insight => 
        insight.id === id 
          ? { ...insight, status: 'resolved' as const }
          : insight
      )
    );
  };

  const activeInsights = insights.filter(i => i.status === 'active');
  const resolvedInsights = insights.filter(i => i.status === 'resolved');

  return (
    <DashboardLayout
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
      currentScreen={currentScreen}
    >
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">AI Insights</h1>
              <p className="text-white/70 text-sm lg:text-base">Predictive analytics and intelligent recommendations</p>
            </div>
                          <Button 
                className="btn-primary"
                onClick={() => {/* TODO: Refresh insights */}}
              >
                <Brain className="h-4 w-4" />
                Refresh Analysis
              </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8">
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Active Insights</p>
                    <p className="text-2xl font-bold text-white">{activeInsights.length}</p>
                  </div>
                                     <div className="p-3 rounded-full bg-emerald-500/20">
                     <Brain className="h-6 w-6 text-emerald-400" />
                   </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Avg Confidence</p>
                    <p className="text-2xl font-bold text-white">88%</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500/20">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Predictions</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-500/20">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Auto-Resolved</p>
                    <p className="text-2xl font-bold text-white">{resolvedInsights.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-orange-500/20">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {insights.map((insight) => (
            <Card key={insight.id} className="card group hover:scale-[1.02] transition-transform">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/10">
                        {getTypeIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white">{insight.title}</CardTitle>
                        <CardDescription className="text-white/70">{insight.description}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Badge className={getTypeColor(insight.type)}>
                        {insight.type.toUpperCase()}
                      </Badge>
                      <Badge className={getSeverityColor(insight.severity)}>
                        {insight.severity.toUpperCase()}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(insight.status)}`} />
                      <span className="text-sm text-white/70">
                        {insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}
                      </span>
                      <div className="flex items-center gap-1">
                        {insight.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-red-400" />
                        ) : insight.trend === 'down' ? (
                          <ArrowDownRight className="h-4 w-4 text-green-400" />
                        ) : (
                          <Activity className="h-4 w-4 text-blue-400" />
                        )}
                        {insight.value && (
                          <span className="text-sm font-medium text-white">
                            {insight.value}{insight.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm text-white/70">Confidence</p>
                      <p className="text-lg font-bold text-white">{insight.confidence}%</p>
                    </div>
                    {insight.status === 'active' && (
                                                <Button
                            size="sm"
                            onClick={() => resolveInsight(insight.id)}
                            className="btn-primary bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Resolve
                          </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/70 mb-1">Impact</p>
                    <p className="text-white font-medium">{insight.impact}</p>
                  </div>
                  {insight.action && (
                    <div>
                      <p className="text-white/70 mb-1">Recommended Action</p>
                      <p className="text-white font-medium">{insight.action}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">Confidence Level</span>
                    <span className="text-sm text-white">{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}; 
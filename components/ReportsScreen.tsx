import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Eye,
  Share2,
  Filter,
  Search
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface ReportsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'security' | 'performance' | 'uptime' | 'compliance';
  status: 'generating' | 'ready' | 'failed';
  size: string;
  createdAt: Date;
  lastGenerated?: Date;
  format: 'pdf' | 'csv' | 'json';
  scheduled: boolean;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'on-demand';
  lastUsed?: Date;
}

export function ReportsScreen({ 
  onNavigate, 
  onToggleTheme, 
  isDarkMode, 
  currentScreen 
}: ReportsScreenProps) {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Security Audit Report',
      description: 'Comprehensive security analysis and vulnerability assessment',
      type: 'security',
      status: 'ready',
      size: '2.4 MB',
      createdAt: new Date(Date.now() - 86400000),
      lastGenerated: new Date(Date.now() - 3600000),
      format: 'pdf',
      scheduled: true
    },
    {
      id: '2',
      title: 'Performance Metrics Report',
      description: 'System performance analysis and optimization recommendations',
      type: 'performance',
      status: 'generating',
      size: '1.8 MB',
      createdAt: new Date(Date.now() - 172800000),
      format: 'pdf',
      scheduled: false
    },
    {
      id: '3',
      title: 'Uptime Summary Report',
      description: 'Monthly uptime statistics and availability metrics',
      type: 'uptime',
      status: 'ready',
      size: '856 KB',
      createdAt: new Date(Date.now() - 2592000000),
      lastGenerated: new Date(Date.now() - 86400000),
      format: 'pdf',
      scheduled: true
    },
    {
      id: '4',
      title: 'Compliance Report',
      description: 'Regulatory compliance status and audit trail',
      type: 'compliance',
      status: 'ready',
      size: '3.2 MB',
      createdAt: new Date(Date.now() - 432000000),
      lastGenerated: new Date(Date.now() - 7200000),
      format: 'pdf',
      scheduled: true
    }
  ]);

  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: '1',
      name: 'Executive Summary',
      description: 'High-level overview for management',
      category: 'Executive',
      frequency: 'weekly',
      lastUsed: new Date(Date.now() - 604800000)
    },
    {
      id: '2',
      name: 'Technical Deep Dive',
      description: 'Detailed technical analysis for engineers',
      category: 'Technical',
      frequency: 'monthly',
      lastUsed: new Date(Date.now() - 2592000000)
    },
    {
      id: '3',
      name: 'Security Assessment',
      description: 'Comprehensive security evaluation',
      category: 'Security',
      frequency: 'monthly',
      lastUsed: new Date(Date.now() - 2592000000)
    },
    {
      id: '4',
      name: 'Performance Review',
      description: 'System performance and optimization report',
      category: 'Performance',
      frequency: 'weekly',
      lastUsed: new Date(Date.now() - 604800000)
    }
  ]);

  const { addToast } = useToast();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'performance': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'uptime': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'compliance': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'generating': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleGenerateReport = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: 'generating' as const }
        : report
    ));
    
    addToast({
      type: 'info',
      title: 'Report Generation Started',
      description: 'Your report is being generated'
    });

    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: 'ready' as const, lastGenerated: new Date() }
          : report
      ));
      
      addToast({
        type: 'success',
        title: 'Report Ready',
        description: 'Your report has been generated successfully'
      });
    }, 3000);
  };

  const handleDownloadReport = (reportId: string) => {
    addToast({
      type: 'success',
      title: 'Download Started',
      description: 'Report download has begun'
    });
  };

  const handleEmailReport = (reportId: string) => {
    addToast({
      type: 'success',
      title: 'Report Sent',
      description: 'Report has been sent via email'
    });
  };

  const readyReports = reports.filter(report => report.status === 'ready');
  const generatingReports = reports.filter(report => report.status === 'generating');

  return (
    <DashboardLayout
      title="Reports & Analytics"
      description="Generate and export detailed system reports"
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
                  <p className="text-sm text-white/60">Ready Reports</p>
                  <p className="text-2xl font-bold text-white">{readyReports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Generating</p>
                  <p className="text-2xl font-bold text-white">{generatingReports.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Templates</p>
                  <p className="text-2xl font-bold text-white">{templates.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Scheduled</p>
                  <p className="text-2xl font-bold text-white">
                    {reports.filter(r => r.scheduled).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Report Templates
            </CardTitle>
            <CardDescription className="text-white/70">
              Pre-configured report templates for quick generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="glass border-white/10 hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{template.name}</h3>
                        <p className="text-xs text-white/60">{template.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                      <span>Frequency:</span>
                      <span className="capitalize">{template.frequency}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="glass border-white/10 hover:border-white/20 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {report.title}
                    </CardTitle>
                    <CardDescription className="text-white/70 mt-2">
                      {report.description}
                    </CardDescription>
                  </div>
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`} />
                    <span className="text-white capitalize">{report.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Size:</span>
                  <span className="text-white">{report.size}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Format:</span>
                  <span className="text-white uppercase">{report.format}</span>
                </div>

                {report.lastGenerated && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Last Generated:</span>
                    <span className="text-white text-xs">
                      {report.lastGenerated.toLocaleTimeString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Scheduled:</span>
                  <span className="text-white">{report.scheduled ? 'Yes' : 'No'}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  {report.status === 'ready' ? (
                    <>
                      <Button
                        onClick={() => handleDownloadReport(report.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={() => handleEmailReport(report.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </>
                  ) : report.status === 'generating' ? (
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled
                    >
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleGenerateReport(report.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
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
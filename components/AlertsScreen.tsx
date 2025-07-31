import { DashboardLayout } from './DashboardLayout';
import { Card } from './ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

import { AppScreen } from '../App';
import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, Bell } from 'lucide-react';

interface AlertsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

const mockAlerts = [
  {
    id: 1,
    title: 'SSL Certificate Expiring Soon',
    description: 'SSL certificate for example.com will expire in 7 days',
    severity: 'warning',
    timestamp: '2 hours ago',
    status: 'open',
    source: 'example.com'
  },
  {
    id: 2,
    title: 'High Response Time Detected',
    description: 'API response time increased to 2.5s (threshold: 1s)',
    severity: 'critical',
    timestamp: '4 hours ago',
    status: 'investigating',
    source: 'api.example.com'
  },
  {
    id: 3,
    title: 'Security Vulnerability Found',
    description: 'XSS vulnerability detected in blog comments',
    severity: 'critical',
    timestamp: '6 hours ago',
    status: 'resolved',
    source: 'blog.example.com'
  },
  {
    id: 4,
    title: 'Website Downtime',
    description: 'CDN assets unreachable for 15 minutes',
    severity: 'critical',
    timestamp: '1 day ago',
    status: 'resolved',
    source: 'cdn.example.com'
  },
  {
    id: 5,
    title: 'Security Scan Completed',
    description: 'Weekly security scan found 2 medium-risk issues',
    severity: 'info',
    timestamp: '2 days ago',
    status: 'acknowledged',
    source: 'example.com'
  }
];

export function AlertsScreen({ onNavigate, onToggleTheme, isDarkMode, currentScreen }: AlertsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-400/10 text-red-400 border-red-400/20';
      case 'warning':
        return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'info':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'acknowledged':
        return <Bell className="h-4 w-4 text-amber-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
    }
  };

  const alertCounts = {
    total: mockAlerts.length,
    open: mockAlerts.filter(a => a.status === 'open').length,
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
    resolved: mockAlerts.filter(a => a.status === 'resolved').length
  };

  return (
    <DashboardLayout
      title="Alerts"
      description="Monitor and manage security alerts and notifications"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-6 w-full max-w-4xl mx-auto">
        {/* Alert Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="card">
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{alertCounts.total}</div>
              <p className="text-sm text-gray-300 font-medium">Total Alerts</p>
            </div>
          </Card>
          
          <Card className="card" style={{ animationDelay: '100ms' }}>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{alertCounts.open}</div>
              <p className="text-sm text-gray-300 font-medium">Open</p>
            </div>
          </Card>
          
          <Card className="card" style={{ animationDelay: '200ms' }}>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{alertCounts.critical}</div>
              <p className="text-sm text-gray-300 font-medium">Critical</p>
            </div>
          </Card>
          
          <Card className="card" style={{ animationDelay: '300ms' }}>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{alertCounts.resolved}</div>
              <p className="text-sm text-gray-300 font-medium">Resolved</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <div className="relative">
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="glass border-white/20 text-white placeholder:text-white/50 pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <SearchOutlined />
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="glass border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="glass border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alerts List */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {filteredAlerts.map((alert, index) => (
            <Card key={alert.id} className="card" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="card-header">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(alert.status)}
                      <div className="space-y-1 flex-1">
                        <h3 className="text-white">{alert.title}</h3>
                        <p className="text-gray-300">
                          {alert.description}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{alert.source}</span>
                          <span>•</span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`${getSeverityColor(alert.severity)} px-2.5 py-1 rounded-full text-sm capitalize`}>
                      {alert.severity}
                    </div>
                    <div className="border text-gray-400 border-gray-600 px-2.5 py-1 rounded-full text-sm capitalize">
                      {alert.status}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <div className="flex gap-2">
                  {alert.status === 'open' && (
                    <>
                      <button className="glass border-white/20 text-white hover:bg-white/5">
                        Acknowledge
                      </button>
                      <button className="glass border-white/20 text-white hover:bg-white/5">
                        Investigate
                      </button>
                    </>
                  )}
                  {alert.status === 'investigating' && (
                    <button className="glass border-white/20 text-white hover:bg-white/5">
                      Mark Resolved
                    </button>
                  )}
                  <button className="glass border-white/20 text-white hover:bg-white/5">
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="glass border-white/10">
            <div className="card-body p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No alerts found</h3>
              <p className="text-white/60">Try adjusting your filters or search terms.</p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
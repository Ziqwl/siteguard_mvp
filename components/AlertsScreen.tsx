import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertTriangle, CheckCircle2, XCircle, Clock, Bell, Search, Filter } from 'lucide-react';
import { AppScreen } from '../App';
import { useState } from 'react';

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
      <div className="space-y-6">
        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-white/10 animate-scale-in">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{alertCounts.total}</div>
              <p className="text-sm text-white/60">Total Alerts</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{alertCounts.open}</div>
              <p className="text-sm text-white/60">Open</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{alertCounts.critical}</div>
              <p className="text-sm text-white/60">Critical</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{alertCounts.resolved}</div>
              <p className="text-sm text-white/60">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32 glass border-white/20 text-white">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 glass border-white/20 text-white">
                <SelectValue placeholder="Status" />
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
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => (
            <Card key={alert.id} className="glass border-white/10 hover:border-white/20 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(alert.status)}
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-white">{alert.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {alert.description}
                        </CardDescription>
                        <div className="flex items-center gap-3 text-sm text-white/50">
                          <span>{alert.source}</span>
                          <span>•</span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSeverityColor(alert.severity)} capitalize`}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline" className="text-white/70 border-white/20 capitalize">
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-2">
                  {alert.status === 'open' && (
                    <>
                      <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/5">
                        Acknowledge
                      </Button>
                      <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/5">
                        Investigate
                      </Button>
                    </>
                  )}
                  {alert.status === 'investigating' && (
                    <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/5">
                      Mark Resolved
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/5">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="glass border-white/10">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No alerts found</h3>
              <p className="text-white/60">Try adjusting your filters or search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
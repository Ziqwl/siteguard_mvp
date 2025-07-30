import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Globe, Activity, Clock, AlertTriangle, CheckCircle2, Search, MoreHorizontal, Filter, SortDesc } from 'lucide-react';
import { AppScreen } from '../App';
import { useState } from 'react';
import { MonitorDetailModal } from './MonitorDetailModal';
import { AddMonitorModal } from './AddMonitorModal';
import { useToast } from './ToastNotification';

interface MonitorsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

const initialMonitors = [
  {
    id: 1,
    name: 'Main Website',
    url: 'https://example.com',
    status: 'online',
    uptime: '99.9%',
    responseTime: '120ms',
    lastCheck: '2 minutes ago',
    location: 'US East'
  },
  {
    id: 2,
    name: 'API Endpoint',
    url: 'https://api.example.com',
    status: 'online',
    uptime: '100%',
    responseTime: '85ms',
    lastCheck: '1 minute ago',
    location: 'EU West'
  },
  {
    id: 3,
    name: 'Blog Subdomain',
    url: 'https://blog.example.com',
    status: 'warning',
    uptime: '98.5%',
    responseTime: '350ms',
    lastCheck: '3 minutes ago',
    location: 'Asia Pacific'
  },
  {
    id: 4,
    name: 'CDN Assets',
    url: 'https://cdn.example.com',
    status: 'offline',
    uptime: '95.2%',
    responseTime: '0ms',
    lastCheck: '15 minutes ago',
    location: 'Global'
  },
  {
    id: 5,
    name: 'Payment Gateway',
    url: 'https://payments.example.com',
    status: 'online',
    uptime: '99.8%',
    responseTime: '95ms',
    lastCheck: '30 seconds ago',
    location: 'US West'
  },
  {
    id: 6,
    name: 'Admin Panel',
    url: 'https://admin.example.com',
    status: 'warning',
    uptime: '97.2%',
    responseTime: '280ms',
    lastCheck: '5 minutes ago',
    location: 'EU Central'
  }
];

export function MonitorsScreen({ onNavigate, onToggleTheme, isDarkMode, currentScreen }: MonitorsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [monitors, setMonitors] = useState(initialMonitors);
  const [selectedMonitor, setSelectedMonitor] = useState<typeof monitors[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'uptime'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'warning' | 'offline'>('all');
  
  const { addToast } = useToast();

  const filteredMonitors = monitors
    .filter(monitor => {
      const matchesSearch = monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           monitor.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || monitor.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          const statusOrder = { 'offline': 0, 'warning': 1, 'online': 2 };
          return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
        case 'uptime':
          return parseFloat(b.uptime) - parseFloat(a.uptime);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'warning':
        return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'offline':
        return 'bg-red-400/10 text-red-400 border-red-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'offline':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const handleMonitorClick = (monitor: typeof monitors[0]) => {
    setSelectedMonitor(monitor);
    setShowDetailModal(true);
  };

  const handleAddMonitor = (newMonitor: any) => {
    setMonitors(prev => [...prev, newMonitor]);
  };

  const handleQuickAction = (action: string, monitor: typeof monitors[0]) => {
    switch (action) {
      case 'pause':
        addToast({
          type: 'info',
          title: 'Monitor paused',
          description: `${monitor.name} monitoring has been paused`
        });
        break;
      case 'test':
        addToast({
          type: 'info',
          title: 'Testing monitor',
          description: `Running test check for ${monitor.name}`
        });
        setTimeout(() => {
          addToast({
            type: 'success',
            title: 'Test completed',
            description: `${monitor.name} is responding normally`
          });
        }, 2000);
        break;
      case 'edit':
        setSelectedMonitor(monitor);
        setShowDetailModal(true);
        break;
      default:
        break;
    }
  };

  const stats = {
    total: monitors.length,
    online: monitors.filter(m => m.status === 'online').length,
    warning: monitors.filter(m => m.status === 'warning').length,
    offline: monitors.filter(m => m.status === 'offline').length
  };

  return (
    <DashboardLayout
      title="Monitors"
      description="Monitor your websites and APIs in real-time"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-6 lg:space-y-8">
        {/* Header Actions - Mobile First */}
        <div className="flex flex-col gap-4">
          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search monitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 lg:h-12 glass border-white/20 text-white placeholder:text-white/50 touch-manipulation"
              />
            </div>
            
            <Button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
              Add Monitor
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/50" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="glass border-white/20 text-white bg-transparent rounded-lg px-3 py-2 text-sm touch-manipulation"
              >
                <option value="all" className="bg-slate-800">All Status</option>
                <option value="online" className="bg-slate-800">Online</option>
                <option value="warning" className="bg-slate-800">Warning</option>
                <option value="offline" className="bg-slate-800">Offline</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <SortDesc className="h-4 w-4 text-white/50" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="glass border-white/20 text-white bg-transparent rounded-lg px-3 py-2 text-sm touch-manipulation"
              >
                <option value="name" className="bg-slate-800">Name</option>
                <option value="status" className="bg-slate-800">Status</option>
                <option value="uptime" className="bg-slate-800">Uptime</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
          <Card className="glass border-white/10 animate-scale-in">
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-white">{stats.total}</div>
              <p className="text-xs lg:text-sm text-white/60">Total</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-emerald-400">{stats.online}</div>
              <p className="text-xs lg:text-sm text-white/60">Online</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-amber-400">{stats.warning}</div>
              <p className="text-xs lg:text-sm text-white/60">Warning</p>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/10 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-red-400">{stats.offline}</div>
              <p className="text-xs lg:text-sm text-white/60">Offline</p>
            </CardContent>
          </Card>
        </div>

        {/* Monitors Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredMonitors.map((monitor, index) => (
            <Card 
              key={monitor.id} 
              className="glass border-white/10 hover:border-white/20 transition-all duration-300 animate-scale-in cursor-pointer group hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleMonitorClick(monitor)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 min-w-0 flex-1">
                    <CardTitle className="text-white flex items-center gap-2 group-hover:text-primary transition-colors text-base lg:text-lg">
                      <Globe className="h-4 w-4 lg:h-5 lg:w-5 text-primary flex-shrink-0" />
                      <span className="truncate">{monitor.name}</span>
                    </CardTitle>
                    <CardDescription className="text-white/60 text-sm truncate">
                      {monitor.url}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={`${getStatusColor(monitor.status)} capitalize text-xs lg:text-sm`}>
                      {getStatusIcon(monitor.status)}
                      <span className="ml-1">{monitor.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-white/60">Uptime</Label>
                    <p className="text-sm lg:text-base font-medium text-white">{monitor.uptime}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-white/60">Response</Label>
                    <p className="text-sm lg:text-base font-medium text-white">{monitor.responseTime}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-white/60">Location</Label>
                    <p className="text-sm lg:text-base font-medium text-white truncate">{monitor.location}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-white/60">Last Check</Label>
                    <p className="text-sm lg:text-base font-medium text-white flex items-center gap-1">
                      <Clock className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{monitor.lastCheck}</span>
                    </p>
                  </div>
                </div>
                
                {/* Quick Actions - Mobile Optimized */}
                <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAction('pause', monitor);
                    }}
                    className="btn-secondary text-xs lg:text-sm"
                  >
                    Pause
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAction('test', monitor);
                    }}
                    className="btn-secondary text-xs lg:text-sm"
                  >
                    Test
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Show more options
                    }}
                    className="btn-secondary w-10 p-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMonitors.length === 0 && (
          <Card className="glass border-white/10">
            <CardContent className="p-8 lg:p-12 text-center">
              <Globe className="h-12 w-12 lg:h-16 lg:w-16 text-white/30 mx-auto mb-4 lg:mb-6" />
              <h3 className="text-lg lg:text-xl font-medium text-white mb-2">No monitors found</h3>
              <p className="text-white/60 mb-6 text-sm lg:text-base">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search terms or filters.' 
                  : 'Add your first monitor to get started with website monitoring.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground touch-manipulation"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Monitor
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <MonitorDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          monitor={selectedMonitor}
        />

        <AddMonitorModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMonitor}
        />
      </div>
    </DashboardLayout>
  );
}
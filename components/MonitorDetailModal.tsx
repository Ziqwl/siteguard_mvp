import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Globe, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Settings, 
  Edit3,
  Trash2,
  Play,
  Pause
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonitorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  monitor: {
    id: number;
    name: string;
    url: string;
    status: string;
    uptime: string;
    responseTime: string;
    lastCheck: string;
    location: string;
  } | null;
}

const mockUptimeData = [
  { time: '00:00', uptime: 100, responseTime: 120 },
  { time: '04:00', uptime: 100, responseTime: 115 },
  { time: '08:00', uptime: 99.5, responseTime: 180 },
  { time: '12:00', uptime: 100, responseTime: 95 },
  { time: '16:00', uptime: 100, responseTime: 110 },
  { time: '20:00', uptime: 100, responseTime: 125 },
  { time: '24:00', uptime: 100, responseTime: 105 }
];

const mockIncidents = [
  { id: 1, type: 'downtime', message: 'Site unreachable for 2 minutes', time: '2 hours ago', duration: '2m' },
  { id: 2, type: 'slowdown', message: 'Response time exceeded 5s', time: '6 hours ago', duration: '15m' },
  { id: 3, type: 'resolved', message: 'SSL certificate renewed', time: '1 day ago', duration: '0m' }
];

export function MonitorDetailModal({ isOpen, onClose, monitor }: MonitorDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  if (!monitor) return null;

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

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'downtime':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'slowdown':
        return <Clock className="h-4 w-4 text-amber-400" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                {monitor.name}
              </DialogTitle>
              <DialogDescription className="text-white/70">
                {monitor.url}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(monitor.status)} capitalize`}>
                {getStatusIcon(monitor.status)}
                <span className="ml-1">{monitor.status}</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="text-white/70 hover:text-white"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass border-white/20">
            <TabsTrigger value="overview" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-primary/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-primary/20">
              Performance
            </TabsTrigger>
            <TabsTrigger value="incidents" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-primary/20">
              Incidents
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-primary/20">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{monitor.uptime}</div>
                  <p className="text-sm text-white/60">Uptime</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{monitor.responseTime}</div>
                  <p className="text-sm text-white/60">Response Time</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{monitor.location}</div>
                  <p className="text-sm text-white/60">Location</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{monitor.lastCheck}</div>
                  <p className="text-sm text-white/60">Last Check</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Current Status</CardTitle>
                <CardDescription className="text-white/60">
                  Real-time monitoring information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">HTTP Status</span>
                    <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
                      200 OK
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">SSL Certificate</span>
                    <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
                      Valid (expires in 89 days)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">DNS Resolution</span>
                    <span className="text-white">45ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">TCP Connection</span>
                    <span className="text-white">23ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">24 Hour Performance</CardTitle>
                <CardDescription className="text-white/60">
                  Uptime and response time trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockUptimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis 
                        dataKey="time" 
                        stroke="rgba(255,255,255,0.6)"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.6)"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'rgba(255,255,255,0.12)',
                          border: '1px solid rgba(255,255,255,0.25)',
                          borderRadius: '8px',
                          backdropFilter: 'blur(30px)',
                          color: 'white'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="uptime" 
                        stroke="#5eead4" 
                        strokeWidth={2}
                        dot={{ fill: '#5eead4', strokeWidth: 2, r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responseTime" 
                        stroke="#a78bfa" 
                        strokeWidth={2}
                        dot={{ fill: '#a78bfa', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-semibold text-emerald-400">99.95%</div>
                  <p className="text-sm text-white/60">7-day uptime</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-semibold text-blue-400">125ms</div>
                  <p className="text-sm text-white/60">Average response</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-semibold text-amber-400">2</div>
                  <p className="text-sm text-white/60">Incidents this week</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <div className="space-y-3">
              {mockIncidents.map((incident) => (
                <Card key={incident.id} className="glass border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getIncidentIcon(incident.type)}
                      <div className="flex-1">
                        <p className="text-sm text-white">{incident.message}</p>
                        <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                          <span>{incident.time}</span>
                          <span>•</span>
                          <span>Duration: {incident.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Monitor Configuration</CardTitle>
                <CardDescription className="text-white/60">
                  Configure monitoring settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/90">Monitor Name</Label>
                  <Input
                    defaultValue={monitor.name}
                    className="glass border-white/20 text-white"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white/90">URL</Label>
                  <Input
                    defaultValue={monitor.url}
                    className="glass border-white/20 text-white"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Check Interval</Label>
                    <Select defaultValue="5min" disabled={!isEditing}>
                      <SelectTrigger className="glass border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white/90">Timeout</Label>
                    <Select defaultValue="30s" disabled={!isEditing}>
                      <SelectTrigger className="glass border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10s">10 seconds</SelectItem>
                        <SelectItem value="30s">30 seconds</SelectItem>
                        <SelectItem value="60s">60 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    className="glass border-red-400/20 text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Monitor
                  </Button>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="glass border-white/20 text-white hover:bg-white/5"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Monitor
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Shield, AlertTriangle, CheckCircle2, Scan, Clock, Bug, Lock, Globe } from 'lucide-react';
import { AppScreen } from '../App';

interface SecurityScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

const mockScans = [
  {
    id: 1,
    website: 'example.com',
    status: 'completed',
    score: 92,
    vulnerabilities: 2,
    lastScan: '2 hours ago',
    nextScan: 'In 22 hours',
    issues: ['Outdated SSL certificate', 'Missing security headers']
  },
  {
    id: 2,
    website: 'api.example.com',
    status: 'scanning',
    score: null,
    vulnerabilities: null,
    lastScan: 'In progress...',
    nextScan: 'In 24 hours',
    progress: 65
  },
  {
    id: 3,
    website: 'blog.example.com',
    status: 'completed',
    score: 78,
    vulnerabilities: 5,
    lastScan: '6 hours ago',
    nextScan: 'In 18 hours',
    issues: ['XSS vulnerability', 'Weak password policy', 'Insecure cookies']
  }
];

export function SecurityScreen({ onNavigate, onToggleTheme, isDarkMode, currentScreen }: SecurityScreenProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'scanning':
        return (
          <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20">
            <Scan className="h-3 w-3 mr-1 animate-spin" />
            Scanning
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-400/10 text-gray-400 border-gray-400/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <DashboardLayout
      title="Security"
      description="Monitor and manage website security vulnerabilities"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-6">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Average Security Score</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">85</div>
              <p className="text-xs text-emerald-400">+5 from last week</p>
            </CardContent>
          </Card>

          <Card className="card" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Vulnerabilities</CardTitle>
              <Bug className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">7</div>
              <p className="text-xs text-red-400">2 Critical, 5 Medium</p>
            </CardContent>
          </Card>

          <Card className="card" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Last Full Scan</CardTitle>
              <Scan className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2h</div>
              <p className="text-xs text-gray-400">ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Button className="btn-primary">
            <Scan className="h-4 w-4" />
            Run Full Scan
          </Button>
          <Button variant="outline" className="btn-secondary">
            <Shield className="h-4 w-4" />
            Security Report
          </Button>
        </div>

                {/* Security Scans */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Recent Security Scans</h3>
          
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
            {mockScans.map((scan, index) => (
              <Card key={scan.id} className="card" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      {scan.website}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Last scan: {scan.lastScan} • Next: {scan.nextScan}
                    </CardDescription>
                  </div>
                  {getStatusBadge(scan.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {scan.status === 'scanning' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Scanning progress</span>
                      <span className="text-white">{scan.progress}%</span>
                    </div>
                    <Progress value={scan.progress} className="h-2" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-400">Security Score</div>
                        <div className={`text-2xl font-bold ${getScoreColor(scan.score!)}`}>
                          {scan.score}/100
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-400">Vulnerabilities</div>
                        <div className="text-2xl font-bold text-white flex items-center gap-2">
                          {scan.vulnerabilities}
                          {scan.vulnerabilities! > 0 && (
                            <AlertTriangle className="h-5 w-5 text-amber-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {scan.issues && scan.issues.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Critical Issues:</div>
                        <div className="space-y-1">
                          {scan.issues.slice(0, 2).map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-center gap-2 text-sm text-gray-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              {issue}
                            </div>
                          ))}
                          {scan.issues.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{scan.issues.length - 2} more issues
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="btn-secondary">
                    View Report
                  </Button>
                  <Button variant="outline" size="sm" className="btn-secondary">
                    <Scan className="h-3 w-3" />
                    Rescan
                  </Button>
                </div>
              </CardContent>
            </Card>
                      ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
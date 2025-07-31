import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  User, 
  CreditCard, 
  Key,
  Save,
  Mail,
  Smartphone
} from 'lucide-react';
import { AppScreen } from '../App';

interface SettingsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

export function SettingsScreen({ onNavigate, onToggleTheme, isDarkMode, currentScreen }: SettingsScreenProps) {
  return (
    <DashboardLayout
      title="Settings"
      description="Manage your account and application preferences"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-8 md:space-y-12">
        {/* Profile Settings */}
        <Card className="glass border-white/10 animate-scale-in rounded-[var(--radius)] md:rounded-[var(--radius-mobile)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white/90">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white/90">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white/90">Company</Label>
              <Input
                id="company"
                defaultValue="Acme Corp"
                className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
              />
            </div>
            
            <Button className="btn-primary">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass border-white/10 animate-scale-in rounded-[var(--radius)] md:rounded-[var(--radius-mobile)]" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 md:space-y-10">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive alerts via email</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">SMS Notifications</div>
                  <div className="text-sm text-gray-400">Get urgent alerts via SMS</div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Weekly Reports</div>
                  <div className="text-sm text-gray-400">Weekly summary emails</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Security Alerts</div>
                  <div className="text-sm text-gray-400">Critical security notifications</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <Label className="text-white/90">Notification Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger className="glass border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/90">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass border-white/10 animate-scale-in rounded-[var(--radius)] md:rounded-[var(--radius-mobile)]" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription className="text-white/60">
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 md:space-y-10">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Two-Factor Authentication</div>
                  <div className="text-sm text-white/60">Add an extra layer of security</div>
                </div>
                <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/5">
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Session Timeout</div>
                  <div className="text-sm text-white/60">Auto logout after inactivity</div>
                </div>
                <Select defaultValue="1hour">
                  <SelectTrigger className="w-32 glass border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="4hour">4 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div className="space-y-6 md:space-y-8">
              <h4 className="font-medium text-white">Change Password</h4>
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white/90">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white/90">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
              </div>
              <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/5 px-[var(--spacing-6)] py-[var(--spacing-2)] rounded-[var(--radius)]">
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Settings */}
        <Card className="glass border-white/10 animate-scale-in rounded-[var(--radius)] md:rounded-[var(--radius-mobile)]" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Monitoring Settings
            </CardTitle>
            <CardDescription className="text-white/60">
              Configure monitoring preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <Label className="text-white/90">Check Interval</Label>
                <Select defaultValue="5min">
                  <SelectTrigger className="glass border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">1 minute</SelectItem>
                    <SelectItem value="5min">5 minutes</SelectItem>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/90">Timeout Threshold</Label>
                <Select defaultValue="30sec">
                  <SelectTrigger className="glass border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10sec">10 seconds</SelectItem>
                    <SelectItem value="30sec">30 seconds</SelectItem>
                    <SelectItem value="60sec">60 seconds</SelectItem>
                    <SelectItem value="120sec">2 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Auto-retry Failed Checks</div>
                  <div className="text-sm text-white/60">Retry failed monitoring checks automatically</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-white">Maintenance Mode</div>
                  <div className="text-sm text-white/60">Pause all monitoring during maintenance</div>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="glass border-white/10 animate-scale-in rounded-[var(--radius)] md:rounded-[var(--radius-mobile)]" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              API Settings
            </CardTitle>
            <CardDescription className="text-white/60">
              Manage API keys and webhooks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <Label className="text-white/90">API Key</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value="sk_test_4eC39HqLyjWDarjtT1zdp7dc"
                  className="glass border-white/20 text-white placeholder:text-white/50 font-mono px-[var(--spacing-4)] py-[var(--spacing-2)]"
                />
                <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/5 px-[var(--spacing-6)] py-[var(--spacing-2)] rounded-[var(--radius)]">
                  Regenerate
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook" className="text-white/90">Webhook URL</Label>
              <Input
                id="webhook"
                placeholder="https://your-site.com/webhook"
                className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookSecret" className="text-white/90">Webhook Secret</Label>
              <Input
                id="webhookSecret"
                type="password"
                className="glass border-white/20 text-white placeholder:text-white/50 px-[var(--spacing-4)] py-[var(--spacing-2)]"
              />
            </div>
            
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-[var(--spacing-6)] py-[var(--spacing-2)] rounded-[var(--radius)]">
              <Save className="h-4 w-4 mr-2" />
              Save API Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
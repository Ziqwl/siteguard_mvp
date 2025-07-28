import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Plus, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastNotification';

interface AddMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (monitor: any) => void;
}

interface MonitorForm {
  name: string;
  url: string;
  checkInterval: string;
  timeout: string;
  locations: string[];
  alertEmail: string;
  alertSMS: boolean;
  description: string;
}

const initialForm: MonitorForm = {
  name: '',
  url: '',
  checkInterval: '5min',
  timeout: '30s',
  locations: ['us-east'],
  alertEmail: '',
  alertSMS: false,
  description: ''
};

const availableLocations = [
  { value: 'us-east', label: 'US East (Virginia)' },
  { value: 'us-west', label: 'US West (Oregon)' },
  { value: 'eu-west', label: 'EU West (Ireland)' },
  { value: 'ap-southeast', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-northeast', label: 'Asia Pacific (Tokyo)' }
];

export function AddMonitorModal({ isOpen, onClose, onAdd }: AddMonitorModalProps) {
  const [form, setForm] = useState<MonitorForm>(initialForm);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    httpStatus?: number;
    responseTime?: number;
    error?: string;
  } | null>(null);
  
  const { addToast } = useToast();

  const handleInputChange = (field: keyof MonitorForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Reset validation when URL changes
    if (field === 'url') {
      setValidationResult(null);
    }
  };

  const validateUrl = async () => {
    if (!form.url) {
      addToast({
        type: 'error',
        title: 'Please enter a URL to validate'
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      // Simulate URL validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation result
      const mockResult = {
        isValid: Math.random() > 0.3, // 70% success rate
        httpStatus: 200,
        responseTime: Math.floor(Math.random() * 500) + 100,
        error: Math.random() > 0.7 ? 'Connection timeout' : undefined
      };

      setValidationResult(mockResult);
      
      if (mockResult.isValid) {
        addToast({
          type: 'success',
          title: 'URL validation successful',
          description: `Response time: ${mockResult.responseTime}ms`
        });
      } else {
        addToast({
          type: 'error',
          title: 'URL validation failed',
          description: mockResult.error || 'Unknown error'
        });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Validation failed',
        description: 'Please check the URL and try again'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.url) {
      addToast({
        type: 'error',
        title: 'Please fill in all required fields'
      });
      return;
    }

    if (!validationResult?.isValid) {
      addToast({
        type: 'warning',
        title: 'Please validate the URL before adding the monitor'
      });
      return;
    }

    // Add monitor
    const newMonitor = {
      id: Date.now(),
      name: form.name,
      url: form.url,
      status: 'online',
      uptime: '100%',
      responseTime: `${validationResult.responseTime}ms`,
      lastCheck: 'Just now',
      location: availableLocations.find(loc => loc.value === form.locations[0])?.label || 'US East',
      checkInterval: form.checkInterval,
      timeout: form.timeout,
      alertEmail: form.alertEmail,
      alertSMS: form.alertSMS,
      description: form.description
    };

    onAdd(newMonitor);
    addToast({
      type: 'success',
      title: 'Monitor added successfully',
      description: `Now monitoring ${form.name}`
    });
    
    // Reset form
    setForm(initialForm);
    setValidationResult(null);
    onClose();
  };

  const toggleLocation = (location: string) => {
    setForm(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(loc => loc !== location)
        : [...prev.locations, location]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add New Monitor
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Set up monitoring for a new website or API endpoint
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Monitor Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="My Website"
                  className="glass border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url" className="text-white/90">URL *</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    value={form.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    placeholder="https://example.com"
                    className="glass border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={validateUrl}
                    disabled={isValidating || !form.url}
                    className="glass border-white/20 text-white hover:bg-white/5 flex-shrink-0"
                  >
                    {isValidating ? 'Validating...' : 'Test'}
                  </Button>
                </div>
                
                {validationResult && (
                  <div className={`flex items-center gap-2 text-sm ${
                    validationResult.isValid ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {validationResult.isValid ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {validationResult.isValid 
                      ? `Valid (${validationResult.responseTime}ms)`
                      : validationResult.error || 'Invalid URL'
                    }
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white/90">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Optional description for this monitor"
                className="glass border-white/20 text-white placeholder:text-white/50"
                rows={3}
              />
            </div>
          </div>

          {/* Monitoring Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Monitoring Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/90">Check Interval</Label>
                <Select value={form.checkInterval} onValueChange={(value) => handleInputChange('checkInterval', value)}>
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
                <Label className="text-white/90">Timeout</Label>
                <Select value={form.timeout} onValueChange={(value) => handleInputChange('timeout', value)}>
                  <SelectTrigger className="glass border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10s">10 seconds</SelectItem>
                    <SelectItem value="30s">30 seconds</SelectItem>
                    <SelectItem value="60s">60 seconds</SelectItem>
                    <SelectItem value="120s">2 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Monitoring Locations */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Monitoring Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableLocations.map((location) => (
                <Card
                  key={location.value}
                  className={`glass border-white/10 cursor-pointer transition-all duration-200 ${
                    form.locations.includes(location.value)
                      ? 'border-primary/50 bg-primary/10'
                      : 'hover:border-white/20'
                  }`}
                  onClick={() => toggleLocation(location.value)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-sm text-white">{location.label}</span>
                      </div>
                      {form.locations.includes(location.value) && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Alert Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Alert Configuration</h3>
            
            <div className="space-y-2">
              <Label htmlFor="alertEmail" className="text-white/90">Email Notifications</Label>
              <Input
                id="alertEmail"
                type="email"
                value={form.alertEmail}
                onChange={(e) => handleInputChange('alertEmail', e.target.value)}
                placeholder="admin@example.com"
                className="glass border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white/90">SMS Notifications</Label>
                <p className="text-sm text-white/60">Send critical alerts via SMS</p>
              </div>
              <Switch
                checked={form.alertSMS}
                onCheckedChange={(checked) => handleInputChange('alertSMS', checked)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="glass border-white/20 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!validationResult?.isValid}
            >
              Add Monitor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
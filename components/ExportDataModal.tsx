import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { CalendarDays, Download, FileText, Database, FileSpreadsheet, Loader2 } from 'lucide-react';
import { useToast } from './ToastNotification';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableData: {
    monitors: boolean;
    alerts: boolean;
    security: boolean;
    team: boolean;
    analytics: boolean;
  };
}

interface ExportSettings {
  format: 'csv' | 'json' | 'pdf';
  dataTypes: string[];
  dateRange: string;
  includeCharts: boolean;
  includeMetadata: boolean;
}

const initialSettings: ExportSettings = {
  format: 'csv',
  dataTypes: ['monitors'],
  dateRange: '30days',
  includeCharts: false,
  includeMetadata: true
};

export function ExportDataModal({ isOpen, onClose, availableData }: ExportDataModalProps) {
  const [settings, setSettings] = useState<ExportSettings>(initialSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { addToast } = useToast();

  const dataTypeOptions = [
    { id: 'monitors', label: 'Monitor Data', enabled: availableData.monitors },
    { id: 'alerts', label: 'Alert History', enabled: availableData.alerts },
    { id: 'security', label: 'Security Scans', enabled: availableData.security },
    { id: 'team', label: 'Team Activity', enabled: availableData.team },
    { id: 'analytics', label: 'Analytics Data', enabled: availableData.analytics }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Comma-separated values, perfect for Excel' },
    { value: 'json', label: 'JSON', icon: Database, description: 'JavaScript Object Notation, ideal for APIs' },
    { value: 'pdf', label: 'PDF', icon: FileText, description: 'Portable Document Format, great for reports' }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '1year', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ];

  const handleDataTypeChange = (dataType: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      dataTypes: checked 
        ? [...prev.dataTypes, dataType]
        : prev.dataTypes.filter(type => type !== dataType)
    }));
  };

  const handleExport = async () => {
    if (settings.dataTypes.length === 0) {
      addToast({
        type: 'error',
        title: 'Please select at least one data type to export'
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate export process with progress
      const progressSteps = [
        { step: 'Preparing data...', progress: 20 },
        { step: 'Generating export...', progress: 50 },
        { step: 'Formatting data...', progress: 80 },
        { step: 'Finalizing...', progress: 100 }
      ];

      for (const { step, progress } of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setExportProgress(progress);
        
        if (progress < 100) {
          addToast({
            type: 'info',
            title: 'Export in progress',
            description: step
          });
        }
      }

      // Mock file download
      const filename = `siteguard-export-${Date.now()}.${settings.format}`;
      const blob = new Blob(['Mock export data'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addToast({
        type: 'success',
        title: 'Export completed successfully',
        description: `Downloaded ${filename}`
      });
      onClose();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Export failed',
        description: 'Please try again later'
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const getEstimatedSize = () => {
    const baseSize = settings.dataTypes.length * 50; // KB per data type
    const multiplier = settings.dateRange === 'all' ? 3 : 
                     settings.dateRange === '1year' ? 2 : 1;
    return Math.round(baseSize * multiplier);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export Data
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Export your SiteGuard data in various formats
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-4">
            <Label className="text-white/90">Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {formatOptions.map((format) => (
                <Card
                  key={format.value}
                  className={`glass border-white/10 cursor-pointer transition-all duration-200 ${
                    settings.format === format.value
                      ? 'border-primary/50 bg-primary/10'
                      : 'hover:border-white/20'
                  }`}
                  onClick={() => setSettings(prev => ({ ...prev, format: format.value as any }))}
                >
                  <CardContent className="p-4 text-center">
                    <format.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-white">{format.label}</div>
                    <div className="text-xs text-white/60 mt-1">{format.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Types */}
          <div className="space-y-4">
            <Label className="text-white/90">Data to Export</Label>
            <div className="space-y-3">
              {dataTypeOptions.map((dataType) => (
                <div 
                  key={dataType.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg glass ${
                    !dataType.enabled ? 'opacity-50' : ''
                  }`}
                >
                  <Checkbox
                    id={dataType.id}
                    checked={settings.dataTypes.includes(dataType.id)}
                    onCheckedChange={(checked) => handleDataTypeChange(dataType.id, checked as boolean)}
                    disabled={!dataType.enabled}
                  />
                  <Label 
                    htmlFor={dataType.id} 
                    className={`text-white/90 cursor-pointer ${!dataType.enabled ? 'cursor-not-allowed' : ''}`}
                  >
                    {dataType.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="text-white/90">Date Range</Label>
            <Select value={settings.dateRange} onValueChange={(value) => setSettings(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger className="glass border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <Label className="text-white/90">Additional Options</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="includeCharts"
                  checked={settings.includeCharts}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeCharts: checked as boolean }))}
                  disabled={settings.format !== 'pdf'}
                />
                <Label 
                  htmlFor="includeCharts" 
                  className={`text-white/90 ${settings.format !== 'pdf' ? 'opacity-50' : ''}`}
                >
                  Include Charts and Graphs (PDF only)
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="includeMetadata"
                  checked={settings.includeMetadata}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeMetadata: checked as boolean }))}
                />
                <Label htmlFor="includeMetadata" className="text-white/90">
                  Include Metadata and Configuration
                </Label>
              </div>
            </div>
          </div>

          {/* Export Info */}
          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <CalendarDays className="h-4 w-4" />
                <span>Estimated file size: ~{getEstimatedSize()} KB</span>
              </div>
              <div className="text-xs text-white/50 mt-1">
                {settings.dataTypes.length} data type(s) selected • {settings.dateRange} range
              </div>
            </CardContent>
          </Card>

          {/* Export Progress */}
          {isExporting && (
            <Card className="glass border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span>Exporting...</span>
                      <span>{exportProgress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${exportProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
              className="glass border-white/20 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || settings.dataTypes.length === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
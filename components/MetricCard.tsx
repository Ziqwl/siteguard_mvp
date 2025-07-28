import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  delay?: number;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  bgColor, 
  delay = 0 
}: MetricCardProps) {
  return (
    <Card 
      className="glass border-white/10 hover:border-white/20 transition-all duration-300 animate-scale-in transform hover:scale-105" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center gap-1 text-xs text-green-400">
          <TrendingUp className="h-3 w-3" />
          <span>{change} from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, icon, trend, trendValue, isLoading }) => {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] card-elevation group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-24"></div>
          </div>
        ) : (
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold text-foreground group-hover:underline transition-all duration-200">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
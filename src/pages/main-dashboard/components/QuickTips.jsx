import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuickTips = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    'Run manual checks anytime via "Run Check" button',
    'View history in "Settings" → "History Logs"',
    'Configure alerts for better monitoring'
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation transition-all duration-300 hover:shadow-lg">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Tips</h3>
            <p className="text-sm text-muted-foreground">Helpful suggestions for better monitoring</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/30 transition-colors">
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            color="var(--color-muted-foreground)" 
          />
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-sm text-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
import React from 'react';
import Button from '../../../components/ui/Button';

const RunCheckButton = ({ onRunCheck }) => {
  return (
    <div className="text-center mb-8">
      <Button
        onClick={onRunCheck}
        iconName="Play"
        iconPosition="left"
        iconSize={16}
        size="lg"
        className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
      >
        Run Check
      </Button>
      <p className="text-sm text-muted-foreground mt-2">
        Perform a manual check of all monitored services
      </p>
    </div>
  );
};

export default RunCheckButton;
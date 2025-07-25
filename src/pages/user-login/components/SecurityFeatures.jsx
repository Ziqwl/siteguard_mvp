import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Защищенное соединение',
      description: 'SSL шифрование данных'
    },
    {
      icon: 'Lock',
      title: 'Двухфакторная аутентификация',
      description: 'Дополнительная защита аккаунта'
    },
    {
      icon: 'Eye',
      title: 'Мониторинг активности',
      description: 'Отслеживание входов в систему'
    }
  ];

  return (
    <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
        Безопасность и защита
      </h3>
      
      <div className="space-y-3">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <Icon 
                name={feature.icon} 
                size={16} 
                color="var(--color-primary)" 
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">
                {feature.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityFeatures;
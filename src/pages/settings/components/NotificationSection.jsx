import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSection = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    uptimeWarnings: true,
    performanceThresholds: false,
    weeklyReports: true,
    maintenanceUpdates: false,
    securityAlerts: true
  });
  const [loading, setLoading] = useState(false);

  const handleNotificationChange = (key) => (e) => {
    setNotifications(prev => ({
      ...prev,
      [key]: e.target.checked
    }));
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    
    // Show success message
    alert('Настройки уведомлений успешно сохранены!');
  };

  const notificationOptions = [
    {
      key: 'emailAlerts',
      label: 'Email уведомления',
      description: 'Получать уведомления о статусе сайтов на email',
      icon: 'Mail'
    },
    {
      key: 'uptimeWarnings',
      label: 'Предупреждения о недоступности',
      description: 'Мгновенные уведомления при падении сайта',
      icon: 'AlertTriangle'
    },
    {
      key: 'performanceThresholds',
      label: 'Пороги производительности',
      description: 'Уведомления при превышении времени отклика',
      icon: 'Zap'
    },
    {
      key: 'weeklyReports',
      label: 'Еженедельные отчеты',
      description: 'Сводка статистики за неделю',
      icon: 'FileText'
    },
    {
      key: 'maintenanceUpdates',
      label: 'Обновления обслуживания',
      description: 'Информация о плановых работах',
      icon: 'Settings'
    },
    {
      key: 'securityAlerts',
      label: 'Оповещения безопасности',
      description: 'Критические уведомления о безопасности',
      icon: 'Shield'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Bell" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Настройки уведомлений</h3>
            <p className="text-sm text-muted-foreground">Управление типами получаемых уведомлений</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mt-1">
              <Icon name={option.icon} size={16} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <Checkbox
                label={option.label}
                description={option.description}
                checked={notifications[option.key]}
                onChange={handleNotificationChange(option.key)}
                className="mb-0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Изменения применяются немедленно
        </div>
        <Button
          variant="default"
          onClick={handleSaveNotifications}
          loading={loading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
};

export default NotificationSection;
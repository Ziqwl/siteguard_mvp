import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'Activity',
      title: 'Мониторинг в реальном времени',
      description: 'Отслеживайте доступность ваших сайтов 24/7'
    },
    {
      icon: 'BarChart3',
      title: 'Детальная аналитика',
      description: 'Получайте подробные отчеты о производительности'
    },
    {
      icon: 'Bell',
      title: 'Мгновенные уведомления',
      description: 'Узнавайте о проблемах первыми'
    }
  ];

  return (
    <div className="hidden lg:block w-full max-w-md">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Почему выбирают SiteGuard?
          </h3>
          <p className="text-muted-foreground">
            Профессиональный мониторинг сайтов для вашего бизнеса
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border/50 hover:bg-card/80 transition-all duration-200"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} color="var(--color-primary)" />
            <span>Безопасность и надежность гарантированы</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
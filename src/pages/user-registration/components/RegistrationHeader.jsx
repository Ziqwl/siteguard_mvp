import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl mr-3">
          <Icon name="Shield" size={28} color="var(--color-primary-foreground)" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">SiteGuard</h1>
      </div>

      {/* Registration Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Создать аккаунт
        </h2>
        <p className="text-muted-foreground">
          Начните мониторинг ваших сайтов уже сегодня
        </p>
      </div>
    </div>
  );
};

export default RegistrationHeader;
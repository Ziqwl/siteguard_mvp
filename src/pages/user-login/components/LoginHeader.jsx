import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Shield" size={28} color="var(--color-primary-foreground)" />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-foreground mb-2">SiteGuard</h1>
      
      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Добро пожаловать!</h2>
        <p className="text-muted-foreground">
          Войдите в свою учетную запись для мониторинга сайтов
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
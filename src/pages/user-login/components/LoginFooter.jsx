import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginFooter = () => {
  const navigate = useNavigate();

  const handleNavigateToRegister = () => {
    navigate('/user-registration');
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Функция восстановления пароля будет доступна в ближайшее время');
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Registration Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Нет учетной записи?
        </p>
        <Button
          variant="outline"
          fullWidth
          onClick={handleNavigateToRegister}
          iconName="UserPlus"
          iconPosition="left"
          iconSize={16}
        >
          Создать новую учетную запись
        </Button>
      </div>

      {/* Forgot Password Link */}
      <div className="text-center pt-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleForgotPassword}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Забыли пароль?
        </Button>
      </div>

      {/* Footer Info */}
      <div className="text-center pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SiteGuard. Все права защищены.
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;
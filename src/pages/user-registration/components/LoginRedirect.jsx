import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginRedirect = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  return (
    <div className="text-center mt-8 pt-6 border-t border-border">
      <p className="text-muted-foreground mb-4">
        Уже есть аккаунт?
      </p>
      <Button
        variant="outline"
        onClick={handleLoginRedirect}
        iconName="LogIn"
        iconPosition="left"
        iconSize={18}
        className="px-6"
      >
        Войти в систему
      </Button>
    </div>
  );
};

export default LoginRedirect;
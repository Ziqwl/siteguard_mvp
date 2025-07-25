import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  const validateUsername = (username) => {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (value && !validateEmail(value)) {
          newErrors.email = 'Введите корректный email адрес';
        } else {
          delete newErrors.email;
        }
        break;
      case 'username':
        if (value && !validateUsername(value)) {
          newErrors.username = 'Имя пользователя должно содержать минимум 3 символа (буквы, цифры, _)';
        } else {
          delete newErrors.username;
        }
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          newErrors.password = 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          newErrors.confirmPassword = 'Пароли не совпадают';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }
    
    if (!formData.username) {
      newErrors.username = 'Имя пользователя обязательно для заполнения';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Имя пользователя должно содержать минимум 3 символа (буквы, цифры, _)';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation for existing users
      if (formData.email === 'admin@siteguard.ru' || formData.username === 'admin') {
        setErrors({
          email: formData.email === 'admin@siteguard.ru' ? 'Пользователь с таким email уже существует' : '',
          username: formData.username === 'admin' ? 'Имя пользователя уже занято' : ''
        });
        return;
      }
      
      // Store mock auth token
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('username', formData.username);
      
      // Navigate to dashboard
      navigate('/main-dashboard');
      
    } catch (error) {
      setErrors({
        submit: 'Произошла ошибка при регистрации. Попробуйте еще раз.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email адрес"
          type="email"
          name="email"
          placeholder="example@domain.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          className="mb-4"
        />

        <Input
          label="Имя пользователя"
          type="text"
          name="username"
          placeholder="username123"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username}
          required
          className="mb-4"
        />

        <Input
          label="Пароль"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          className="mb-4"
        />

        <Input
          label="Подтвердите пароль"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
          className="mb-6"
        />

        {errors.submit && (
          <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span className="text-sm text-error">{errors.submit}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="mt-6"
        >
          {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSection = () => {
  const [formData, setFormData] = useState({
    username: 'admin_user',
    email: 'admin@siteguard.ru',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setIsEditing(false);
    
    // Show success message (in real app, this would be a toast notification)
    alert('Настройки аккаунта успешно обновлены!');
  };

  const handleCancel = () => {
    setFormData({
      username: 'admin_user',
      email: 'admin@siteguard.ru',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Информация об аккаунте</h3>
            <p className="text-sm text-muted-foreground">Управление данными вашего профиля</p>
          </div>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
            onClick={() => setIsEditing(true)}
          >
            Редактировать
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Имя пользователя"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={errors.username}
            placeholder="Введите имя пользователя"
            required
          />
          
          <Input
            label="Email адрес"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={errors.email}
            placeholder="Введите email"
            required
          />
        </div>

        {isEditing && (
          <div className="pt-4 border-t border-border">
            <h4 className="text-md font-medium text-foreground mb-4">Изменить пароль</h4>
            <div className="space-y-4">
              <Input
                label="Текущий пароль"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Введите текущий пароль"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Новый пароль"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  error={errors.newPassword}
                  placeholder="Введите новый пароль"
                  description="Минимум 6 символов"
                />
                
                <Input
                  label="Подтвердите пароль"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  placeholder="Повторите новый пароль"
                />
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={loading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Сохранить изменения
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Shield, Moon, Sun, Mail, MessageCircle, HelpCircle, Check } from 'lucide-react';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface RegistrationScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export function RegistrationScreen({ onNavigate, onToggleTheme, isDarkMode }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.email.trim()) {
      addToast({
        type: 'error',
        title: 'Email required',
        description: 'Please enter your email address'
      });
      return;
    }
    
    if (!formData.password.trim()) {
      addToast({
        type: 'error',
        title: 'Password required',
        description: 'Please enter a password'
      });
      return;
    }
    
    if (formData.password.length < 6) {
      addToast({
        type: 'error',
        title: 'Password too short',
        description: 'Password must be at least 6 characters'
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are identical'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with proper data structure
      const registerData = { 
        email: formData.email.trim(), 
        password: formData.password 
      };
      console.log('Registration attempt:', { email: registerData.email, password: '***' });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast({
        type: 'success',
        title: 'Account created successfully!',
        description: 'Welcome to SiteGuard'
      });
      onNavigate('dashboard');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Registration failed',
        description: 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8 px-4">
      {/* Centered Registration Form */}
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header with Logo and Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">SiteGuard</h1>
              <p className="text-xs text-gray-400">Security Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch 
              id="theme-toggle" 
              checked={isDarkMode} 
              onCheckedChange={onToggleTheme}
            />
            <Label 
              htmlFor="theme-toggle" 
              className="text-sm text-gray-400 flex items-center gap-2 cursor-pointer"
            >
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Label>
          </div>
        </div>

        {/* Registration Card */}
        <Card className="card">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="form-title text-white text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-300 text-center text-base leading-relaxed">
              Get started with your free account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-5 lg:space-y-6">

                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-11 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-11 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="btn-primary w-full min-h-[44px] px-4 py-2 text-base font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate('login')}
                      disabled={isLoading}
                      className="btn-secondary w-full min-h-[44px] px-4 py-2 text-base font-semibold"
                    >
                      Sign In
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
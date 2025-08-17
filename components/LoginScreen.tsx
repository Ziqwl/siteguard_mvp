import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Shield, Moon, Sun, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { AppScreen } from '../App';
import { useToast } from './ToastNotification';

interface LoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export function LoginScreen({ onNavigate, onToggleTheme, isDarkMode }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', email, password); // 添加日志输出
    // 处理登录逻辑，例如设置 currentScreen 为 "dashboard"
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8 px-4">
      {/* Centered Login Form */}
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header with Logo and Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-blue/20 ring-1 ring-primary-blue/30">
              <Shield className="h-6 w-6 text-primary-blue" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-text-primary text-lg">SiteGuard</h1>
              <p className="text-xs text-text-muted">Security Dashboard</p>
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
              className="text-sm text-text-muted flex items-center gap-2 cursor-pointer"
            >
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Label>
          </div>
        </div>

        {/* Login Card */}
        <Card className="card">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="form-title text-text-primary text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-text-secondary text-center text-base leading-relaxed">
              Welcome back to your security dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6" role="form" aria-label="Sign in form">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-primary font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 h-11 input"
                    disabled={isLoading}
                    aria-required="true"
                    aria-describedby="email-error"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-primary font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 h-11 input"
                    disabled={isLoading}
                    aria-required="true"
                    aria-describedby="password-error"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('register')}
                  disabled={isLoading}
                  className="btn btn-secondary btn-lg w-full"
                >
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo credentials hint */}
        <Card className="card">
          <CardContent className="p-4">
            <p className="text-xs text-text-muted text-center">
              Demo: Use any email and password to access the dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
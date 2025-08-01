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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!email.trim()) {
      addToast({
        type: 'error',
        title: 'Email required',
        description: 'Please enter your email address'
      });
      return;
    }
    
    if (!password.trim()) {
      addToast({
        type: 'error',
        title: 'Password required',
        description: 'Please enter your password'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      console.log('Login attempt:', { email: email.trim(), password: '***' });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast({
        type: 'success',
        title: 'Welcome back!',
        description: 'Successfully signed in to SiteGuard'
      });
      onNavigate('dashboard');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Login failed',
        description: 'Please check your credentials and try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8 px-4">
      {/* Centered Login Form */}
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header with Logo and Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="hidden sm:block">
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

        {/* Login Card */}
        <Card className="card">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="form-title text-white text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-300 text-center text-base leading-relaxed">
              Welcome back to your security dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5 lg:space-y-6" role="form" aria-label="Sign in form">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 h-11 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isLoading}
                    aria-required="true"
                    aria-describedby="email-error"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 h-11 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isLoading}
                    aria-required="true"
                    aria-describedby="password-error"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 text-white/50 hover:text-white hover:bg-white/10"
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
                  className="btn-primary w-full min-h-[44px] px-4 py-2 text-base font-semibold"
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
                  className="btn-secondary w-full min-h-[44px] px-4 py-2 text-base font-semibold"
                >
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo credentials hint */}
        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-white/50 text-center">
              Demo: Use any email and password to access the dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
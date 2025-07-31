import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Shield, Eye, EyeOff, Mail, Lock, Moon, Sun, ArrowRight } from 'lucide-react';
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
    
    if (password.length < 6) {
      addToast({
        type: 'error',
        title: 'Invalid password',
        description: 'Password must be at least 6 characters'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with proper data structure
      const loginData = { email: email.trim(), password };
      console.log('Login attempt:', { email: loginData.email, password: '***' });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast({
        type: 'success',
        title: 'Welcome back!',
        description: 'Successfully logged in'
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 p-8 xl:p-12 items-center justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-xl xl:rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20 mb-8">
            <Shield className="w-8 h-8 xl:w-10 xl:h-10 text-indigo-400" />
          </div>
          
          <h1 className="text-2xl xl:text-3xl font-bold text-white mb-4">
            Welcome to SiteGuard
          </h1>
          
          <p className="text-base xl:text-lg text-gray-400 mb-8">
            Comprehensive website security monitoring and threat detection platform
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6 lg:space-y-8">
          {/* Theme toggle */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 lg:gap-3">
              <Switch 
                id="theme-toggle" 
                checked={isDarkMode} 
                onCheckedChange={onToggleTheme}
              />
              <Label 
                htmlFor="theme-toggle" 
                className="text-sm text-white/70 flex items-center gap-2 cursor-pointer"
              >
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="hidden sm:inline">
                  {isDarkMode ? 'Dark' : 'Light'}
                </span>
              </Label>
            </div>
          </div>

          {/* Mobile branding */}
          <div className="text-center lg:hidden">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20 mb-4">
            <Shield className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SiteGuard</h1>
            <p className="text-gray-400">Secure your digital presence</p>
          </div>

          {/* Login Card */}
          <Card className="card">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl lg:text-3xl font-bold text-white text-center">
                Sign In
              </CardTitle>
              <CardDescription className="text-gray-400 text-center text-base">
                Access your security dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5 lg:space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Username or Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com or username"
                      className="pl-10 h-11 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
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
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 text-white/50 hover:text-white hover:bg-white/10"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full"
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

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-white/70 text-sm">
                    Don't have an account?{' '}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => onNavigate('register')}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-semibold"
                      disabled={isLoading}
                    >
                      Create one here
                    </Button>
                  </p>
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
    </div>
  );
}
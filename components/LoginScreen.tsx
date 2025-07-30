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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8 xl:p-12 items-center justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 xl:w-24 xl:h-24 rounded-2xl xl:rounded-3xl bg-primary/20 ring-1 ring-primary/30 mb-8">
            <Shield className="w-10 h-10 xl:w-12 xl:h-12 text-primary" />
          </div>
          
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-4">
            Welcome to SiteGuard
          </h1>
          
          <p className="text-lg xl:text-xl text-white/70 mb-8">
            Comprehensive website security monitoring and threat detection platform
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 lg:bg-none">
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 ring-1 ring-primary/30 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SiteGuard</h1>
            <p className="text-white/60">Secure your digital presence</p>
          </div>

          {/* Login Card */}
          <Card className="glass-strong border-white/20 shadow-2xl">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl lg:text-3xl font-bold text-white text-center">
                Sign In
              </CardTitle>
              <CardDescription className="text-white/70 text-center text-base">
                Access your security dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5 lg:space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Username or Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com or username"
                      className="pl-10 h-12 lg:h-14 glass border-white/20 text-white placeholder:text-white/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-12 h-12 lg:h-14 glass border-white/20 text-white placeholder:text-white/50"
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
                  className="w-full h-12 lg:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
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
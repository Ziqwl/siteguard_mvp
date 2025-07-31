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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
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

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* About Section */}
          <div className="space-y-6 lg:space-y-8 animate-slide-in-up order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20 ring-1 ring-primary/30">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">SiteGuard</h1>
                <p className="text-white/70">Website Security &amp; Monitoring</p>
              </div>
            </div>
            
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Join Thousands of Protected Websites
              </h2>
              <p className="text-base lg:text-lg text-white/80 leading-relaxed">
                Start protecting your digital assets today with our comprehensive 
                security suite.
              </p>
              
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/20">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-white/80 text-sm lg:text-base">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/20">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-white/80 text-sm lg:text-base">24/7 monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/20">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-white/80 text-sm lg:text-base">Advanced security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="animate-scale-in order-1 lg:order-2">
            <Card className="card max-w-md mx-auto">
              <CardHeader className="space-y-2 text-center pb-6">
                <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Create Account</CardTitle>
                <CardDescription className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Get started with your free account
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-5 lg:space-y-6">

                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">Username or Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your username or email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 lg:h-14 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
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
                      className="h-12 lg:h-14 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="h-12 lg:h-14 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="btn-primary w-full min-h-[44px] text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </CardContent>
                
                <CardFooter className="text-center">
                  <p className="text-sm text-white/70 w-full">
                    Already have an account?{' '}
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-semibold"
                      onClick={() => onNavigate('login')}
                      disabled={isLoading}
                    >
                      Sign in
                    </Button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-white/70">
            <span>&copy; 2025 SiteGuard. All rights reserved.</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-white/70">
            <span>Created by Ziqwl</span>
            <div className="flex items-center gap-4">
              <a 
                href="https://t.me/Ziqwl0" 
                className="flex items-center gap-1 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                @Ziqwl0
              </a>
              <a 
                href="mailto:ziqwl.0@gmail.com" 
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
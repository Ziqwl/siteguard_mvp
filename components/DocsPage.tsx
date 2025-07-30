import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Shield, Mail, MessageCircle } from 'lucide-react';
import { AppScreen } from '../App';

interface DocsPageProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export function DocsPage({ onNavigate, onToggleTheme, isDarkMode }: DocsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="glass-strong border-b border-white/10 px-4 lg:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 ring-1 ring-primary/30">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">SiteGuard</h1>
              <p className="text-xs text-white/60">Documentation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate('login')}
              className="text-white/70 hover:text-white"
            >
              Sign In
            </Button>
            <Button
              onClick={() => onNavigate('register')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              SiteGuard MVP
            </h1>
            <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto">
              Website Security & Monitoring Platform
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Comprehensive website security monitoring and threat detection platform designed to protect your digital assets with real-time monitoring, security scanning, and automated alerts.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-white/80">
                  <li>• Real-time website uptime monitoring</li>
                  <li>• SSL certificate expiration tracking</li>
                  <li>• Security vulnerability scanning</li>
                  <li>• Automated threat detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Dashboard & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-white/80">
                  <li>• Live security metrics</li>
                  <li>• Performance monitoring</li>
                  <li>• Custom alert configurations</li>
                  <li>• Detailed reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Alert System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-white/80">
                  <li>• Instant notifications for security issues</li>
                  <li>• Email and SMS alerts</li>
                  <li>• Custom alert thresholds</li>
                  <li>• Escalation procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Team Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-white/80">
                  <li>• Multi-user access control</li>
                  <li>• Role-based permissions</li>
                  <li>• Activity logging</li>
                  <li>• Team collaboration tools</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Getting Started</CardTitle>
              <CardDescription className="text-white/70">
                Follow these simple steps to start protecting your websites
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Create Account</h3>
                      <p className="text-white/70 text-sm">Sign up for a free 14-day trial to experience SiteGuard's full capabilities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Add Your Websites</h3>
                      <p className="text-white/70 text-sm">Configure monitoring for your websites and APIs with our simple setup process.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Configure Alerts</h3>
                      <p className="text-white/70 text-sm">Set up custom alert rules and notification preferences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Monitor & Respond</h3>
                      <p className="text-white/70 text-sm">Use our dashboard to monitor security status and respond to incidents.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Pricing Plans</CardTitle>
              <CardDescription className="text-white/70">
                Choose the plan that fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h3 className="font-semibold text-white">Free Trial</h3>
                  <p className="text-primary text-sm">14 days</p>
                  <p className="text-white/70 text-xs mt-2">Full feature access</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white">Basic</h3>
                  <p className="text-white text-sm">$29/month</p>
                  <p className="text-white/70 text-xs mt-2">Up to 10 websites</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white">Pro</h3>
                  <p className="text-white text-sm">$79/month</p>
                  <p className="text-white/70 text-xs mt-2">Up to 50 websites</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white">Enterprise</h3>
                  <p className="text-white text-sm">Custom</p>
                  <p className="text-white/70 text-xs mt-2">Large deployments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
              <CardDescription className="text-white/70">
                Get in touch with our team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Creator</p>
                  <p className="text-white/70 text-sm">@Ziqwl0</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Telegram</p>
                  <a href="https://t.me/Ziqwl0" className="text-primary hover:underline text-sm">t.me/Ziqwl0</a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:ziqwl.0@gmail.com" className="text-primary hover:underline text-sm">ziqwl.0@gmail.com</a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('register')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              Register Now
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('login')}
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 p-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            © 2025 SiteGuard. All rights reserved. | Protecting your digital presence since 2025
          </p>
        </div>
      </footer>
    </div>
  );
} 
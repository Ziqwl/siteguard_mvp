import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutSiteGuard from '../../components/AboutSiteGuard';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import SecurityFeatures from './components/SecurityFeatures';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/main-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* About SiteGuard Section */}
        <AboutSiteGuard />

        {/* Main Login Container */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8 fade-in">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </div>

        {/* Security Features - Desktop Only */}
        <div className="hidden md:block">
          <SecurityFeatures />
        </div>

        {/* Mobile Security Info */}
        <div className="md:hidden mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Ваши данные защищены SSL шифрованием
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default UserLogin;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutSiteGuard from '../../components/AboutSiteGuard';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import LoginRedirect from './components/LoginRedirect';
import FeatureHighlights from './components/FeatureHighlights';

const UserRegistration = () => {
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
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Registration Section */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* About SiteGuard Section */}
            <AboutSiteGuard />
            
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <RegistrationHeader />
              <RegistrationForm />
              <LoginRedirect />
            </div>
          </div>

          {/* Feature Highlights Section - Desktop Only */}
          <div className="hidden lg:flex justify-center">
            <FeatureHighlights />
          </div>
        </div>

        {/* Mobile Feature Highlights */}
        <div className="lg:hidden mt-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <FeatureHighlights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
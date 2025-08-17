import React, { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationScreen } from "./components/RegistrationScreen";
import { DocsPage } from "./components/DocsPage";
import { Dashboard } from "./components/Dashboard";
import { MonitorsScreen } from "./components/MonitorsScreen";
import { SecurityScreen } from "./components/SecurityScreen";
import { AlertsScreen } from "./components/AlertsScreen";
import { TeamScreen } from "./components/TeamScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { ChaosExperimentsScreen } from "./components/ChaosExperimentsScreen";
import { AIInsightsScreen } from "./components/AIInsightsScreen";
import { ToastProvider } from "./components/ToastNotification";

export type AppScreen =
  | "login"
  | "register"
  | "docs"
  | "dashboard"
  | "monitors"
  | "security"
  | "alerts"
  | "team"
  | "settings"
  | "chaos-experiments"
  | "ai-insights"
  | "runbooks"
  | "integrations";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("login");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode on mount
  useEffect(() => {
    try {
      document.documentElement.classList.add("dark");
    } catch (error) {
      console.warn("Could not set dark mode class:", error);
    }
  }, []);

  const handleNavigation = (screen: AppScreen) => {
    console.log(`Navigating to screen: ${screen}`); // 添加日志输出
    setCurrentScreen(screen);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      try {
        if (newTheme) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.warn("Could not toggle theme:", error);
      }
      return newTheme;
    });
  };

  const renderCurrentScreen = () => {
    const commonProps = {
      onNavigate: handleNavigation,
      onToggleTheme: toggleTheme,
      isDarkMode: isDarkMode,
    };

    switch (currentScreen) {
      case "login":
        return <LoginScreen {...commonProps} />;
      case "register":
        return <RegistrationScreen {...commonProps} />;
      case "docs":
        return <DocsPage {...commonProps} />;
      case "dashboard":
        return <Dashboard {...commonProps} currentScreen={currentScreen} />;
      case "monitors":
        return <MonitorsScreen {...commonProps} currentScreen={currentScreen} />;
      case "security":
        return <SecurityScreen {...commonProps} currentScreen={currentScreen} />;
      case "alerts":
        return <AlertsScreen {...commonProps} currentScreen={currentScreen} />;
      case "team":
        return <TeamScreen {...commonProps} currentScreen={currentScreen} />;
      case "settings":
        return <SettingsScreen {...commonProps} currentScreen={currentScreen} />;
      case "chaos-experiments":
        return <ChaosExperimentsScreen {...commonProps} currentScreen={currentScreen} />;
      case "ai-insights":
        return <AIInsightsScreen {...commonProps} currentScreen={currentScreen} />;
      default:
        return <LoginScreen {...commonProps} />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen">
        {renderCurrentScreen()}
      </div>
    </ToastProvider>
  );
}

export default App;
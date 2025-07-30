import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastNotificationProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export function ToastNotification({ toast, onRemove }: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-400/20 bg-emerald-400/10';
      case 'error':
        return 'border-red-400/20 bg-red-400/10';
      case 'warning':
        return 'border-amber-400/20 bg-amber-400/10';
      default:
        return 'border-blue-400/20 bg-blue-400/10';
    }
  };

  const getIcon = () => {
    const iconClass = "h-5 w-5";
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className={`${iconClass} text-emerald-400`} />;
      case 'error':
        return <XCircle className={`${iconClass} text-red-400`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-amber-400`} />;
      default:
        return <Info className={`${iconClass} text-blue-400`} />;
    }
  };

  return (
    <Card 
      className={`
        ${getToastStyles()}
        glass border transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'translate-x-full opacity-0' : ''}
        w-full max-w-sm sm:w-80 shadow-lg
      `}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-white">{toast.title}</h4>
            {toast.description && (
              <p className="text-sm text-white/70 mt-1">{toast.description}</p>
            )}
            {toast.action && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toast.action.onClick}
                className="mt-2 h-8 px-3 text-xs text-white/80 hover:text-white hover:bg-white/10"
              >
                {toast.action.label}
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Toast Context
interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// Toast Provider
interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastNotification
              toast={toast}
              onRemove={removeToast}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback for cases where component is not wrapped in ToastProvider
    return {
      addToast: (toast: Omit<Toast, 'id'>) => {
        console.warn('Toast called outside of ToastProvider context:', toast);
      }
    };
  }
  return context;
}

// Legacy toast functions for backward compatibility
export const toast = {
  success: (title: string, description?: string, action?: Toast['action']) => {
    console.warn('Legacy toast.success called. Use useToast hook instead.');
  },
  error: (title: string, description?: string, action?: Toast['action']) => {
    console.warn('Legacy toast.error called. Use useToast hook instead.');
  },
  warning: (title: string, description?: string, action?: Toast['action']) => {
    console.warn('Legacy toast.warning called. Use useToast hook instead.');
  },
  info: (title: string, description?: string, action?: Toast['action']) => {
    console.warn('Legacy toast.info called. Use useToast hook instead.');
  },
};
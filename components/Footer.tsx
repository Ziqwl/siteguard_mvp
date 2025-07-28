import { Mail, MessageCircle, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 p-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6 text-sm text-white/70">
          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </div>
          <span>&copy; 2025 SiteGuard. All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-white/70">
          <span>Created by Ziqwl</span>
          <div className="flex items-center gap-4">
            <a 
              href="https://t.me/Ziqwl0" 
              className="flex items-center gap-1 hover:text-primary transition-colors duration-200 transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              @Ziqwl0
            </a>
            <a 
              href="mailto:ziqwl.0@gmail.com" 
              className="flex items-center gap-1 hover:text-primary transition-colors duration-200 transform hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
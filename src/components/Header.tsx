import { FileText, Home, Sun, Moon, LogOut, User } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: 'home' | 'results';
  onNavigate: (view: 'home' | 'results') => void;
  hasImages: boolean;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ currentView, onNavigate, hasImages, theme, onToggleTheme }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/logo.jpg"
                alt="SilicoShieldAI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-semibold tracking-tight">
                SilicoShieldAI
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Silicosis Detection</span>
            </div>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </button>
              {hasImages && (
                <button
                  onClick={() => onNavigate('results')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'results'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Analysis</span>
                </button>
              )}
            </nav>
            
            {/* User Info & Actions */}
            <div className="ml-4 flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
              {/* User Email */}
              {user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {user.email}
                  </span>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

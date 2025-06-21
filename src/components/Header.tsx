
import React from 'react';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-gray-400" />
            <div className="relative inline-block w-10 h-6 bg-gray-200 rounded-full">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform"></div>
            </div>
            <Moon className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">Administrator</div>
              <div className="text-gray-500">ADMIN</div>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

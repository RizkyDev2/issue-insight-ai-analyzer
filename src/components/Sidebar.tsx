
import React from 'react';
import { Brain, Users, History, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  const menuItems = [
    { icon: Brain, label: 'Predict', href: '/predict', active: true },
    { icon: Users, label: 'Admin Panel', href: '/admin', adminOnly: true },
    { icon: History, label: 'Riwayat', href: '/history' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Klasifikasi App</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          if (item.adminOnly && user?.role !== 'ADMIN') return null;
          
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

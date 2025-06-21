
import React from 'react';
import { Layout } from '../components/Layout';
import { PredictPage } from '../components/PredictPage';
import { AdminPage } from '../components/AdminPage';
import { HistoryPage } from '../components/HistoryPage';
import { LoginPage } from '../components/LoginPage';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { ThemeProvider } from '../hooks/useTheme';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('predict');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'admin':
        return <AdminPage />;
      case 'history':
        return <HistoryPage />;
      default:
        return <PredictPage />;
    }
  };

  return (
    <Layout>
      {renderCurrentPage()}
    </Layout>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import StartProjectPage from './pages/StartProjectPage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateDetails from './pages/TemplateDetails';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import CookiePolicy from './pages/legal/CookiePolicy';
import AdminLogin from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TemplateList from './pages/admin/TemplateList';
import TemplateForm from './pages/admin/TemplateForm';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans text-slate-900 flex flex-col">
        <Toaster position="top-right" />
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/start-project" element={<StartProjectPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/template/:id" element={<TemplateDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route path="dashboard" element={<TemplateList />} />
              <Route path="templates/new" element={<TemplateForm />} />
              <Route path="templates/edit/:id" element={<TemplateForm />} />
            </Route>
          </Routes>
        </main>
        {!isAdminRoute && (
          <>
            <Footer />
            <FloatingChat />
            <CookieConsent />
          </>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;

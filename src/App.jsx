import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
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
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AdminLogin from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TemplateList from './pages/admin/TemplateList';
import TemplateForm from './pages/admin/TemplateForm';

// Tools
const ToolsPage = React.lazy(() => import('./pages/tools/ToolsPage'));
const WordCounter = React.lazy(() => import('./pages/tools/WordCounter'));
const CaseConverter = React.lazy(() => import('./pages/tools/CaseConverter'));
const ImageCompressor = React.lazy(() => import('./pages/tools/ImageCompressor'));
const ImageToPdf = React.lazy(() => import('./pages/tools/ImageToPdf'));
const PdfToImage = React.lazy(() => import('./pages/tools/PdfToImage'));
const JsonFormatter = React.lazy(() => import('./pages/tools/JsonFormatter'));
const QrGenerator = React.lazy(() => import('./pages/tools/QrGenerator'));
const PasswordGenerator = React.lazy(() => import('./pages/tools/PasswordGenerator'));
const TextToSpeech = React.lazy(() => import('./pages/tools/TextToSpeech'));
const LoremIpsum = React.lazy(() => import('./pages/tools/LoremIpsum'));


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans text-slate-900 flex flex-col">
          <Toaster position="top-right" />
          {!isAdminRoute && <Navbar />}
          <main className="flex-grow">
            <React.Suspense fallback={
              <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/start-project" element={<StartProjectPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/template/:id" element={<TemplateDetails />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Tools Routes */}
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/word-counter" element={<WordCounter />} />
                <Route path="/tools/case-converter" element={<CaseConverter />} />
                <Route path="/tools/image-compressor" element={<ImageCompressor />} />
                <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
                <Route path="/tools/pdf-to-image" element={<PdfToImage />} />
                <Route path="/tools/json-formatter" element={<JsonFormatter />} />
                <Route path="/tools/qr-code-generator" element={<QrGenerator />} />
                <Route path="/tools/password-generator" element={<PasswordGenerator />} />
                <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
                <Route path="/tools/lorem-ipsum-generator" element={<LoremIpsum />} />

                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<TemplateList />} />
                  <Route path="templates/new" element={<TemplateForm />} />
                  <Route path="templates/edit/:id" element={<TemplateForm />} />
                </Route>
              </Routes>
            </React.Suspense>
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
    </HelmetProvider>
  );
}

export default App;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ClientAuthProvider } from './contexts/ClientAuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { PersonalizationProvider } from './contexts/PersonalizationContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import CookieConsent from './components/CookieConsent';
import ExitIntentModal from './components/ExitIntentModal';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import CommandPalette from './components/CommandPalette';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence } from 'framer-motion';
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
import PageLoadingSkeleton from './components/PageLoadingSkeleton';
import ClientProtectedRoute from './components/portal/ClientProtectedRoute';

const ClientLogin = React.lazy(() => import('./pages/portal/ClientLogin'));
const ClientDashboard = React.lazy(() => import('./pages/portal/ClientDashboard'));
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
const YoutubePrompt = React.lazy(() => import('./pages/tools/YoutubePrompt'));
const InstagramPrompt = React.lazy(() => import('./pages/tools/InstagramPrompt'));
const MidjourneyPrompt = React.lazy(() => import('./pages/tools/MidjourneyPrompt'));
const GrammarFixer = React.lazy(() => import('./pages/tools/GrammarFixer'));
const TextImprover = React.lazy(() => import('./pages/tools/TextImprover'));
const TextLengthChanger = React.lazy(() => import('./pages/tools/TextLengthChanger'));
const ToneChanger = React.lazy(() => import('./pages/tools/ToneChanger'));
const ROICalculator = React.lazy(() => import('./pages/tools/ROICalculator'));
const BrandAudit = React.lazy(() => import('./pages/tools/BrandAudit'));
const BacklinkChecker = React.lazy(() => import('./pages/tools/BacklinkChecker'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));
const PdfConverter = React.lazy(() => import('./pages/tools/PdfConverter'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));

function App() {
  const location = useLocation();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    const handleToggle = () => setIsCommandPaletteOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-command-palette', handleToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-command-palette', handleToggle);
    };
  }, []);

  const isCustomLayoutRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/portal') || location.pathname === '/client-login';

  return (
    <HelmetProvider>
      <PersonalizationProvider>
        <AuthProvider>
          <ClientAuthProvider>
          <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans text-slate-900 flex flex-col cursor-none">
            <CustomCursor />
            <Toaster position="top-right" />
            {!isCustomLayoutRoute && <Navbar />}
            <ScrollProgress />
            <main className="flex-grow">
            <React.Suspense fallback={<PageLoadingSkeleton />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                  <Route path="/start-project" element={<PageTransition><StartProjectPage /></PageTransition>} />
                  <Route path="/templates" element={<PageTransition><TemplatesPage /></PageTransition>} />
                  <Route path="/template/:id" element={<PageTransition><TemplateDetails /></PageTransition>} />
                  <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                  <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
                  <Route path="/cookie-policy" element={<PageTransition><CookiePolicy /></PageTransition>} />
                  <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                  <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
                  <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
                  <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
                  <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
                  <Route path="/portfolio/:id" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
                  <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
                  <Route path="/client-login" element={<PageTransition><ClientLogin /></PageTransition>} />
                  
                  <Route element={<ClientProtectedRoute />}>
                    <Route path="/portal" element={<PageTransition><ClientDashboard /></PageTransition>} />
                  </Route>
                  
                  {/* Tools Routes */}
                  <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
                  <Route path="/tools/word-counter" element={<PageTransition><WordCounter /></PageTransition>} />
                  <Route path="/tools/case-converter" element={<PageTransition><CaseConverter /></PageTransition>} />
                  <Route path="/tools/image-compressor" element={<PageTransition><ImageCompressor /></PageTransition>} />
                  <Route path="/tools/image-to-pdf" element={<PageTransition><ImageToPdf /></PageTransition>} />
                  <Route path="/tools/pdf-to-image" element={<PageTransition><PdfToImage /></PageTransition>} />
                  <Route path="/tools/json-formatter" element={<PageTransition><JsonFormatter /></PageTransition>} />
                  <Route path="/tools/qr-code-generator" element={<PageTransition><QrGenerator /></PageTransition>} />
                  <Route path="/tools/password-generator" element={<PageTransition><PasswordGenerator /></PageTransition>} />
                  <Route path="/tools/text-to-speech" element={<PageTransition><TextToSpeech /></PageTransition>} />
                  <Route path="/tools/lorem-ipsum-generator" element={<PageTransition><LoremIpsum /></PageTransition>} />
                  <Route path="/tools/youtube-script-generator" element={<PageTransition><YoutubePrompt /></PageTransition>} />
                  <Route path="/tools/instagram-reel-generator" element={<PageTransition><InstagramPrompt /></PageTransition>} />
                  <Route path="/tools/midjourney-prompt-generator" element={<PageTransition><MidjourneyPrompt /></PageTransition>} />
                  <Route path="/tools/grammar-fixer" element={<PageTransition><GrammarFixer /></PageTransition>} />
                  <Route path="/tools/text-improver" element={<PageTransition><TextImprover /></PageTransition>} />
                  <Route path="/tools/text-length-changer" element={<PageTransition><TextLengthChanger /></PageTransition>} />
                  <Route path="/tools/tone-changer" element={<PageTransition><ToneChanger /></PageTransition>} />
                  <Route path="/tools/roi-calculator" element={<PageTransition><ROICalculator /></PageTransition>} />
                  <Route path="/tools/brand-audit" element={<PageTransition><BrandAudit /></PageTransition>} />
                  <Route path="/tools/backlink-checker" element={<PageTransition><BacklinkChecker /></PageTransition>} />
                  <Route path="/tools/pdf-converter" element={<PageTransition><PdfConverter /></PageTransition>} />
                  
                  {/* Services Routes */}
                  <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />

                  <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<PageTransition><TemplateList /></PageTransition>} />
                    <Route path="templates/new" element={<PageTransition><TemplateForm /></PageTransition>} />
                    <Route path="templates/edit/:id" element={<PageTransition><TemplateForm /></PageTransition>} />
                  </Route>
                </Routes>
              </AnimatePresence>
            </React.Suspense>
          </main>
          {!isCustomLayoutRoute && (
            <>
              <Footer />
              <FloatingChat />
              <BackToTop />
              <CookieConsent />
              <ExitIntentModal />
              <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
            </>
          )}
          </div>
          </ClientAuthProvider>
        </AuthProvider>
      </PersonalizationProvider>
    </HelmetProvider>
  );
}

export default App;

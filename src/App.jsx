import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MessageSquare, Trees, ArrowUp, Lock } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ThePlacePage } from './pages/ThePlacePage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { StayPage } from './pages/StayPage';
import { PackagesPage } from './pages/PackagesPage';
import { SightseeingPage } from './pages/SightseeingPage';
import { GettingHerePage } from './pages/GettingHerePage';
import { ContactPage } from './pages/ContactPage';
import { AvailabilityModal } from './components/AvailabilityModal';
import { PickupModal, SightseeingModal, EventModal } from './components/EnquiryModals';
import { Container, Button } from './components/ui/Primitives';
import { resortInfo } from './content/resortInfo';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

export function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
      return 'admin';
    }
    return 'home';
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ssr_admin_user');
      const token = localStorage.getItem('ssr_admin_token');
      if (token && stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return null;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const [isSightseeingOpen, setIsSightseeingOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else if (currentPage === 'admin' && window.location.hash === '') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentPage]);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    if (pageId === 'admin') {
      window.location.hash = 'admin';
    } else {
      if (window.location.hash === '#admin') {
        history.replaceState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('ssr_admin_token');
    localStorage.removeItem('ssr_admin_user');
    setAdminUser(null);
    navigateTo('home');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing Admin Portal
  if (currentPage === 'admin') {
    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={handleAdminLogout}
          onReturnToSite={() => navigateTo('home')}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={(user) => setAdminUser(user)}
        onBackToSite={() => navigateTo('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#143628] font-sans selection:bg-[#C5A059]/20">
      
      {/* Top Main Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenPickup={() => setIsPickupOpen(true)}
            onOpenSightseeing={() => setIsSightseeingOpen(true)}
            onOpenEvent={() => setIsEventOpen(true)}
          />
        )}

        {currentPage === 'the-place' && (
          <ThePlacePage
            onNavigate={navigateTo}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'experiences' && (
          <ExperiencesPage
            onNavigate={navigateTo}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'stay' && (
          <StayPage
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'packages' && (
          <PackagesPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenEvent={() => setIsEventOpen(true)}
          />
        )}

        {currentPage === 'sightseeing' && (
          <SightseeingPage
            onOpenSightseeing={() => setIsSightseeingOpen(true)}
          />
        )}

        {currentPage === 'getting-here' && (
          <GettingHerePage
            onOpenPickup={() => setIsPickupOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}
      </main>

      {/* Reusable Inner Pages Footer */}
      <footer className="bg-[#0E261C] text-[#F9F6F0] py-12 border-t-2 border-[#C5A059]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Trees className="w-5 h-5 text-[#C5A059]" />
                <span className="font-cinzel text-lg font-bold text-white">{resortInfo.name}</span>
              </div>
              <p className="text-xs text-[#DFCA95] mt-1">
                Estd. 1998 • Village Nimture, P.O. Bolani, District Keonjhar, Odisha — 758037
              </p>
              <p className="text-[11px] text-[#F9F6F0]/60 mt-0.5">
                "{resortInfo.photoDisclaimer}" • {resortInfo.taxDisplayNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="terracotta"
                size="sm"
                onClick={() => setIsBookingOpen(true)}
                icon={Calendar}
              >
                Check Availability
              </Button>
              {currentPage !== 'home' && (
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => navigateTo('home')}
                >
                  Return to Home
                </Button>
              )}
              {/* Discrete Staff Portal Access */}
              <button
                type="button"
                onClick={() => navigateTo('admin')}
                className="text-xs text-[#DFCA95]/60 hover:text-[#DFCA95] flex items-center gap-1 ml-2 transition-colors cursor-pointer"
                title="Staff Management Portal"
              >
                <Lock className="w-3 h-3" /> Staff Portal
              </button>
            </div>
          </div>
        </Container>
      </footer>

      {/* Sticky Mobile Bottom Booking Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#143628] text-[#F9F6F0] px-4 py-2.5 border-t border-[#C5A059]/40 shadow-lg flex items-center justify-between gap-2">
        <div className="text-left">
          <span className="text-[10px] text-[#DFCA95] uppercase font-semibold block">Oct 2026 Stays</span>
          <span className="text-xs font-serif font-bold text-white">From ₹3,000 / night</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello Saranda Safari Resort, I am enquiring about availability.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded bg-emerald-800 text-white hover:bg-emerald-700"
            aria-label="WhatsApp Enquiry"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="bg-[#C25E3E] text-white px-4 py-2 rounded text-xs font-semibold shadow-sm active:bg-[#AA4E31] cursor-pointer"
          >
            Check Availability
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-16 md:bottom-6 right-6 z-30 p-2.5 rounded-full bg-[#143628] text-[#DFCA95] border border-[#C5A059]/40 shadow-md hover:bg-[#0E261C] transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Interactive Modals */}
      <AvailabilityModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <PickupModal
        isOpen={isPickupOpen}
        onClose={() => setIsPickupOpen(false)}
      />

      <SightseeingModal
        isOpen={isSightseeingOpen}
        onClose={() => setIsSightseeingOpen(false)}
      />

      <EventModal
        isOpen={isEventOpen}
        onClose={() => setIsEventOpen(false)}
      />

    </div>
  );
}

export default App;

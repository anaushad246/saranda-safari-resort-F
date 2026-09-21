import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  IndianRupee, 
  MessageSquare, 
  Bell, 
  LogOut, 
  ExternalLink, 
  ShieldCheck,
  Trees
} from 'lucide-react';

// Existing Manager Components preserved
import { OperationsDashboard } from './OperationsDashboard'; 
import { BookingsManager } from './BookingsManager';
import { InventoryManager } from './InventoryManager';
import { PricingManager } from './PricingManager';
import { EnquiriesManager } from './EnquiriesManager';
import { ContentManager } from './ContentManager';

export function AdminDashboard({ user, onLogout, onReturnToSite }) {
  // Default to Today's Operations command centre
  const [activeTab, setActiveTab] = useState('operations');

  const tabs = [
    { id: 'operations', label: "Today's Operations", icon: LayoutDashboard },
    { id: 'bookings', label: "Reservations Ledger", icon: BookOpen },
    { id: 'inventory', label: "Inventory & Blocks", icon: CalendarDays },
    { id: 'pricing', label: "Tariffs & Pricing", icon: IndianRupee },
    { id: 'enquiries', label: "Guest Enquiries", icon: MessageSquare },
    { id: 'content', label: "Notices & Alerts", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#143628] flex flex-col font-sans">
      
      {/* Top Executive Header */}
      <header className="bg-[#0E261C] border-b-2 border-[#C5A059]/40 sticky top-0 z-50 shadow-md">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#143628] border border-[#C5A059]/50 flex items-center justify-center shadow-inner shrink-0">
                <Trees className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-cinzel text-base sm:text-lg font-bold text-[#F9F6F0] tracking-wide">
                    SARANDA SAFARI
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C5A059]/20 text-[#DFCA95] border border-[#C5A059]/35 uppercase tracking-wider">
                    Executive Portal
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-[#DFCA95] uppercase tracking-widest font-semibold block mt-0.5">
                  Bolani, Keonjhar, Odisha · Estd. 1998
                </span>
              </div>
            </div>

            {/* Quick Actions & User Info */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium">{user?.name || 'Resort Staff'} ({user?.role || 'Admin'})</span>
              </div>
              
              <button
                type="button"
                onClick={onReturnToSite}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A059]/50 text-[#DFCA95] hover:text-white hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview Live Site</span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-900 text-rose-200 transition-colors text-xs font-semibold cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>
        </div>

        {/* Scrollable Tab Navigation (Smooth horizontal scroll on mobile, full bar on desktop) */}
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar pt-2 pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 shrink-0
                    ${isActive 
                      ? 'bg-[#F4EFE6] text-[#143628] border-[#C25E3E] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' 
                      : 'text-[#DFCA95]/75 hover:text-white border-transparent hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C25E3E]' : 'text-[#C5A059]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Workspace Area: Mounting the Existing Manager Modules */}
      <main className="flex-grow max-w-[96rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fadeIn">
        {activeTab === 'operations' && <OperationsDashboard user={user} />}
        {activeTab === 'bookings' && <BookingsManager />}
        {activeTab === 'inventory' && <InventoryManager />}
        {activeTab === 'pricing' && <PricingManager />}
        {activeTab === 'enquiries' && <EnquiriesManager />}
        {activeTab === 'content' && <ContentManager />}
      </main>

      {/* Footer */}
      <footer className="bg-[#0E261C] text-[#DFCA95]/80 py-3 text-center text-xs border-t border-[#C5A059]/30">
        Saranda Safari Resort Management System · Bolani, Keonjhar, Odisha · Estd. 1998 · Maximum 25 Guests
      </footer>

    </div>
  );
}

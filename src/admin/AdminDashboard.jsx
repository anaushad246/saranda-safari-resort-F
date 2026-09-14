import React, { useState } from 'react';
import { Trees, Calendar, BookOpen, Mail, LogOut, ExternalLink, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { OperationsDashboard } from './OperationsDashboard';
import { PricingManager } from './PricingManager';
import { IndianRupee } from 'lucide-react';
import { InventoryManager } from './InventoryManager';
import { BookingsManager } from './BookingsManager';
import { EnquiriesManager } from './EnquiriesManager';

export function AdminDashboard({ user, onLogout, onReturnToSite }) {
  const [activeTab, setActiveTab] = useState('operations');

  const tabClass = (name) =>
    `px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
      activeTab === name
        ? 'bg-[#F4EFE6] text-[#143628] border-[#C5A059] shadow-sm'
        : 'text-white/80 hover:text-white border-transparent hover:bg-white/5'
    }`;

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#143628] flex flex-col font-sans">
      
      {/* Top Staff Navigation Bar */}
      <header className="bg-[#0E261C] text-[#F9F6F0] border-b-2 border-[#C5A059] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#143628] border border-[#C5A059] flex items-center justify-center">
              <Trees className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-base font-bold text-white tracking-wide">
                  Saranda Safari Resort
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C5A059]/20 text-[#DFCA95] border border-[#C5A059]/30">
                  Staff Admin
                </span>
              </div>
              <p className="text-[11px] text-[#DFCA95]">
                Bolani, Keonjhar, Odisha · Estd. 1998 · Max 25 Guests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#143628] border border-[#C5A059]/20 text-[#DFCA95]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>{user?.name || 'Resort Staff'} ({user?.email || 'Admin'})</span>
            </div>

            <button
              type="button"
              onClick={onReturnToSite}
              className="px-3 py-1.5 rounded-lg border border-[#C5A059]/50 text-[#DFCA95] hover:bg-[#143628] flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Site</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-900 text-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 border-t border-white/10 pt-2 pb-1 overflow-x-auto">
          <button type="button" onClick={() => setActiveTab('operations')} className={tabClass('operations')}>
            <LayoutDashboard className="w-4 h-4 text-[#C5A059]" />
            <span>Today's Operations</span>
          </button>

          <button type="button" onClick={() => setActiveTab('bookings')} className={tabClass('bookings')}>
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <span>Reservations Ledger</span>
          </button>

          <button type="button" onClick={() => setActiveTab('inventory')} className={tabClass('inventory')}>
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Inventory & Date Blocks</span>
          </button>

          <button type="button" onClick={() => setActiveTab('enquiries')} className={tabClass('enquiries')}>
            <Mail className="w-4 h-4 text-[#C5A059]" />
            <span>Enquiries & Pickups</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'operations' && <OperationsDashboard user={user} />}
        {activeTab === 'bookings' && <BookingsManager />}
        {activeTab === 'inventory' && <InventoryManager />}
        {activeTab === 'enquiries' && <EnquiriesManager />}
          {activeTab === 'pricing' && <PricingManager />}
      </main>

      {/* Bottom Footer */}
      <footer className="bg-[#0E261C] text-[#DFCA95] py-4 text-center text-xs border-t border-[#C5A059]/30">
        Saranda Safari Resort Management System · Village Nimture, P.O. Bolani, Keonjhar, Odisha 758037
      </footer>

    </div>
  );
}

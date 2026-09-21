import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Phone, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Megaphone
} from 'lucide-react';
import { resortInfo } from '../content/resortInfo';
import { tariffsAndPackages } from '../content/tariffsAndPackages';

export function ContentManager() {
  const [saved, setSaved] = useState(false);

  // 1. Emergency Weather / Advisory Banner
  const [emergencyBanner, setEmergencyBanner] = useState({
    active: false,
    text: 'Monsoon Alert: Karo river trails may have restricted access during sudden heavy showers. Guest safety is prioritized.',
    type: 'warning'
  });

  // 2. Seasonal Announcement / Festival Banner
  const [seasonalNotice, setSeasonalNotice] = useState({
    active: true,
    title: 'Puja & Winter Destination Bookings Open',
    text: 'Advance bookings for autumn retreats, winter bonfires, and destination weddings are now open. Pre-book 6 months in advance for prime dates.',
    ctaText: 'Check Packages'
  });

  // 3. Operational Notice & Contact Info
  const [operationalNotice, setOperationalNotice] = useState({
    maxCapacityWarning: tariffsAndPackages.celebrations?.notice || 'Important: Launch overnight stay capacity is strictly 25 guests. Event groups exceeding 25 guests can celebrate on the lawn and grounds with customized day/evening arrangements.',
    helplinePhone: resortInfo.contact?.phone || '+91 70083 07064',
    whatsappNumber: resortInfo.contact?.whatsappNumber || '+91 70083 07064',
    email: resortInfo.contact?.email || 'info@sarandasafariresort.com'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C5A059]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#C25E3E]" />
            <h2 className="font-serif text-2xl font-bold text-[#143628]">Website Notices & Announcements</h2>
          </div>
          <p className="text-xs text-[#8F6C27] font-serif italic mt-0.5">
            Manage flash alerts, seasonal updates, and public notices across the resort portal.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Notices updated successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Module 1: Emergency / Weather Alert Banner */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628]">
                Emergency & Weather Alert Strip
              </h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={emergencyBanner.active} 
                onChange={(e) => setEmergencyBanner({ ...emergencyBanner, active: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C25E3E]"></div>
              <span className="ml-2 text-xs font-semibold text-[#143628]">
                {emergencyBanner.active ? 'Active on Live Site' : 'Disabled'}
              </span>
            </label>
          </div>

          <p className="text-xs text-[#143628]/75 leading-relaxed">
            When enabled, a prominent alert strip appears at the very top of the website for weather updates, route advisories, or forest department notices.
          </p>

          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
              Alert Message
            </label>
            <textarea
              rows={2}
              value={emergencyBanner.text}
              onChange={(e) => setEmergencyBanner({ ...emergencyBanner, text: e.target.value })}
              className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
              placeholder="Enter advisory text..."
            />
          </div>

          {/* Preview */}
          {emergencyBanner.active && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-950">Live Preview:</span>
                <span>{emergencyBanner.text}</span>
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Seasonal Announcement Notice */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628]">
                Seasonal & Festival Announcement
              </h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={seasonalNotice.active} 
                onChange={(e) => setSeasonalNotice({ ...seasonalNotice, active: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#143628]"></div>
              <span className="ml-2 text-xs font-semibold text-[#143628]">
                {seasonalNotice.active ? 'Visible' : 'Hidden'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
                Notice Title
              </label>
              <input
                type="text"
                value={seasonalNotice.title}
                onChange={(e) => setSeasonalNotice({ ...seasonalNotice, title: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
                Action Button Text
              </label>
              <input
                type="text"
                value={seasonalNotice.ctaText}
                onChange={(e) => setSeasonalNotice({ ...seasonalNotice, ctaText: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
              Notice Description
            </label>
            <textarea
              rows={2}
              value={seasonalNotice.text}
              onChange={(e) => setSeasonalNotice({ ...seasonalNotice, text: e.target.value })}
              className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Module 3: Capacity Notice & Helpline Numbers */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#8F6C27]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628]">
              Helpline & Capacity Rules
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
              Capacity Transparency Notice
            </label>
            <textarea
              rows={2}
              value={operationalNotice.maxCapacityWarning}
              onChange={(e) => setOperationalNotice({ ...operationalNotice, maxCapacityWarning: e.target.value })}
              className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
                Direct Phone
              </label>
              <input
                type="text"
                value={operationalNotice.helplinePhone}
                onChange={(e) => setOperationalNotice({ ...operationalNotice, helplinePhone: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={operationalNotice.whatsappNumber}
                onChange={(e) => setOperationalNotice({ ...operationalNotice, whatsappNumber: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">
                Enquiry Email
              </label>
              <input
                type="text"
                value={operationalNotice.email}
                onChange={(e) => setOperationalNotice({ ...operationalNotice, email: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-[#EADFC9] rounded-xl px-3.5 py-2 text-xs text-[#143628] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#143628] hover:bg-[#0E261C] text-[#DFCA95] font-semibold text-xs transition-all shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Notice Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}

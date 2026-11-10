import React, { useState } from 'react';
import { BAHAWALPUR_BRANCHES, BRAND_HEADLINES, BakeryBranch } from '../data/branchData';
import { ArrowLeft, Phone, MapPin, Clock, Navigation, ExternalLink, Sparkles, CheckCircle2, X } from 'lucide-react';

interface LocationsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ isOpen, onClose }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<number>(1);
  const [serviceFilter, setServiceFilter] = useState<string>('All');

  if (!isOpen) return null;

  const services = ['All', 'Dine-in', 'Takeaway', 'Delivery'];

  const filteredBranches = BAHAWALPUR_BRANCHES.filter(branch => {
    if (serviceFilter === 'All') return true;
    return branch.services.some(s => s.toLowerCase().includes(serviceFilter.toLowerCase()));
  });

  const selectedBranch = BAHAWALPUR_BRANCHES.find(b => b.id === selectedBranchId) || BAHAWALPUR_BRANCHES[0];

  const handleOrderWhatsApp = (branch?: BakeryBranch) => {
    const branchName = branch ? branch.name : 'Bahawalpur Branch';
    const message = encodeURIComponent(`Hello Muffinns Sweets & Bakers! I would like to place an order from ${branchName}.`);
    window.open(`https://wa.me/923202587047?text=${message}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#0b2829] text-white flex flex-col"
      style={{ fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Top sticky brand navigation */}
      <header className="sticky top-0 z-40 bg-[#0e4749]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs sm:text-sm transition cursor-pointer"
              title="Return to Home Page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-base sm:text-xl tracking-tight uppercase" style={{ fontFamily: "'Founders Grotesk', sans-serif" }}>
                MUFFINS <span className="text-[#ffe29a]">SWEETS &amp; BAKERS</span>
              </span>
              <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fe2d48] text-white uppercase tracking-wider">
                7 Locations
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:03026567774"
              className="hidden lg:flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-[#ffe29a]" />
              <span>0302 6567774</span>
            </a>
            <button
              onClick={() => handleOrderWhatsApp(selectedBranch)}
              className="bg-[#fe2d48] hover:bg-[#e0253e] text-white font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition shadow-md active:scale-95 cursor-pointer"
            >
              ORDER NOW
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              aria-label="Close locations page"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        
        {/* Animated Headline with exact same text styling & animation */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#fe2d48]/20 border border-[#fe2d48]/40 text-[#ffe29a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#fe2d48]" />
            <span>Bahawalpur, Punjab — Established 1988</span>
          </div>

          <h1 
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontFamily: "'Founders Grotesk', sans-serif" }}
          >
            <span>VISIT OUR </span>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #fe2d48' }}>
              BAKERY BOUTIQUES
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed mb-3">
            {BRAND_HEADLINES.heritageTagline}
          </p>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            {BRAND_HEADLINES.subHeadline}
          </p>

          {/* Operational Info Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffe29a]" />
              <span>Ovens hot daily: <strong className="text-emerald-400">06:00 AM – 12:00 Midnight</strong></span>
            </div>
            <span className="text-white/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#fe2d48]" />
              <a href="tel:03026567774" className="hover:text-white font-bold">0302 6567774</a>
              <span>/</span>
              <a href="https://wa.me/923202587047" target="_blank" rel="noreferrer" className="hover:text-white font-bold">+92 320 2587047</a>
            </div>
            <span className="text-white/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white/60">Complaints:</span>
              <a href="mailto:Muffinnscomplain@gmail.com" className="text-white hover:underline">Muffinnscomplain@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Editorial Highlight Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="border-l-4 border-[#fe2d48] pl-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ffe29a] block mb-1">
              Daily Heritage Baking
            </span>
            <p className="text-sm text-white/90 leading-relaxed italic">
              &ldquo;{BRAND_HEADLINES.heroEditorialLeft}&rdquo;
            </p>
          </div>
          <div className="border-l-4 border-[#ffe29a] pl-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#fe2d48] block mb-1">
              Generational Mithai &amp; Patisserie
            </span>
            <p className="text-sm text-white/90 leading-relaxed italic">
              &ldquo;{BRAND_HEADLINES.heroEditorialRight}&rdquo;
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Section: Branch Cards (Left) vs Bahawalpur Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Branch Cards & Filters (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Header + Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#fe2d48]" />
                  <span>All 7 Bahawalpur Locations</span>
                </h2>
                <p className="text-xs text-white/60 mt-0.5">Click any branch to view on map &amp; order</p>
              </div>

              {/* Service Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10">
                {services.map(srv => (
                  <button
                    key={srv}
                    onClick={() => setServiceFilter(srv)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      serviceFilter === srv 
                        ? 'bg-[#fe2d48] text-white shadow' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* List of 7 Branches */}
            <div className="flex flex-col gap-4">
              {filteredBranches.map(branch => {
                const isSelected = selectedBranchId === branch.id;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`p-5 rounded-2xl border transition cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#0e4749] border-[#ffe29a] shadow-xl ring-2 ring-[#ffe29a]/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                        <div className="absolute transform rotate-45 bg-[#ffe29a] text-[#0b2829] font-black text-[9px] py-0.5 right-[-32px] top-[14px] w-[110px] text-center uppercase tracking-wider">
                          Selected
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2 pr-6">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ffe29a] block mb-1">
                          {branch.tag}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {branch.name}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Clock className="w-3 h-3" />
                        <span>{branch.openingHours}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 mb-3 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#fe2d48] flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>

                    {/* Services Tags & Plus Code */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {branch.services.map((svc, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white/10 text-white/90 border border-white/5"
                        >
                          {svc}
                        </span>
                      ))}
                      {branch.plusCode && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#ffe29a]/10 text-[#ffe29a] border border-[#ffe29a]/20">
                          {branch.plusCode}
                        </span>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                      <a
                        href={`tel:${branch.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#fe2d48] hover:text-[#ff5269] transition"
                        onClick={e => e.stopPropagation()}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call: {branch.phoneDisplay}</span>
                      </a>
                      <span className="text-white/20">•</span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                      </a>
                      <span className="text-white/20">•</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderWhatsApp(branch);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffe29a] hover:text-white transition ml-auto"
                      >
                        <span>WhatsApp Order</span>
                        <Navigation className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Bahawalpur Map with Cupcake Markers (Sticky 5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ffe29a]">
                    Official City Map
                  </span>
                  <h3 className="text-lg font-bold text-white">Bahawalpur Network</h3>
                </div>
                <span className="bg-[#fe2d48] text-white px-2.5 py-1 rounded-full text-xs font-black">
                  7 Branches
                </span>
              </div>

              {/* Map Image without any box border - just clean transparent float */}
              <div className="relative overflow-hidden rounded-2xl bg-white/95 p-3 flex items-center justify-center">
                <img 
                  src="/assets/aistudio/Bahawalpur_Map_with_Cupcake_Markers_db2f5178.png"
                  alt="Bahawalpur Branch Network Map"
                  className="w-full h-auto max-h-[460px] object-contain drop-shadow-lg"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Selected Branch Highlight Summary */}
              <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ffe29a] uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Currently Focused: {selectedBranch.shortName}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {selectedBranch.name}
                </div>
                <div className="text-xs text-white/70 mb-3">
                  {selectedBranch.address}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOrderWhatsApp(selectedBranch)}
                    className="flex-1 bg-[#fe2d48] hover:bg-[#e0253e] text-white font-bold py-2 px-3 rounded-xl text-xs uppercase tracking-wider transition text-center"
                  >
                    ORDER NOW
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Kitchen Intro Craft Note */}
            <div className="mt-4 p-5 rounded-2xl bg-black/30 border border-white/10">
              <h4 className="text-sm font-bold text-[#ffe29a] uppercase tracking-wide mb-1">
                {BRAND_HEADLINES.kitchenIntroHeading}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed italic">
                &ldquo;{BRAND_HEADLINES.kitchenLeadParagraph}&rdquo;
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Send
} from 'lucide-react';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);


  // Order state
  const [orderStep, setOrderStep] = useState(1);
  const [orderData, setOrderData] = useState({
    item: 'Artisan Signature Muffin Box',
    quantity: '1 Box of 6 ($24)',
    deliveryType: 'Fresh In-Store Pickup',
    pickupTime: 'Tomorrow Morning (8:00 AM - 10:00 AM)',
    name: '',
    email: '',
    phone: '',
    specialNotes: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [sweetPreference, setSweetPreference] = useState('Artisan Muffins');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Global click interception
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Order triggers
      const orderTrigger = target.closest('a[href="#menu"], a[href*="afspraak"], .button-is-white a, .button-is-red a');
      if (orderTrigger) {
        const text = orderTrigger.textContent?.toLowerCase() || '';
        if (text.includes('order') || text.includes('fresh') || text.includes('menu') || text.includes('treats') || text.includes('appointment')) {
          e.preventDefault();
          setOrderModalOpen(true);
          return;
        }
      }

      // Newsletter triggers (only the Sweet Club link)
      const newsletterTrigger = target.closest('[data-formkit-toggle], a[href*="newsletter"]');
      if (newsletterTrigger) {
        e.preventDefault();
        setNewsletterOpen(true);
        return;
      }

      // Smooth scroll navigation
      const navLink = target.closest('a[href^="#"]');
      if (navLink) {
        const hash = (navLink as HTMLAnchorElement).getAttribute('href');
        if (hash && hash !== '#') {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
            if (navMenu) {
              navMenu.classList.remove('is-opened');
              (navMenu as HTMLElement).style.display = '';
            }
          }
        }
      }

      // Mobile hamburger button
      const mobileNavBtn = target.closest('.mobile-nav-button');
      if (mobileNavBtn) {
        const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
        if (navMenu) {
          const isOpened = navMenu.classList.contains('is-opened');
          if (isOpened) {
            navMenu.classList.remove('is-opened');
            (navMenu as HTMLElement).style.display = 'none';
          } else {
            navMenu.classList.add('is-opened');
            (navMenu as HTMLElement).style.display = 'block';
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Ensure all Webflow animation triggers reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
          el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-w-id]').forEach(el => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style.opacity === '0') {
        observer.observe(htmlEl);
      }
    });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      observer.disconnect();
    };
  }, []);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
    }
  };

  return (
    <>
      {/* Floating Bakery Quick Order Pill (Desktop Right) */}
      <aside aria-label="Bakery Quick Actions" className="fixed top-24 right-4 z-40 hidden lg:flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => setOrderModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#fe2d48] text-white rounded-full font-bold text-xs tracking-wide shadow-2xl hover:bg-[#e0243e] hover:scale-105 transition-all duration-200 border border-white/20"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pre-Order Warm Bakes</span>
        </button>
      </aside>

      {/* MODAL 1: Pre-Order Bakery Box & Custom Cake */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-modal-in">
          <div className="relative w-full max-w-xl bg-[#191919] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setOrderModalOpen(false);
                setOrderSuccess(false);
                setOrderStep(1);
              }}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderSuccess ? (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fe2d48]/20 text-[#fe2d48] text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Muffinns Sweets &amp; Bakers Pre-Order</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-serif">
                    Order Fresh Daily Bakes
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Baked fresh to order each morning. Pick up warm in our bakery boutique or have fresh boxes delivered right to your door.
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        step <= orderStep ? 'bg-[#fe2d48]' : 'bg-neutral-800'
                      }`}
                    />
                  ))}
                </div>

                <form onSubmit={handleOrderSubmit}>
                  {orderStep === 1 && (
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-neutral-200">
                        Select Your Bakery Favorite:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { title: 'Artisan Signature Muffin Box', price: 'from $24 (Box of 6)' },
                          { title: '81-Layer French Croissants', price: 'from $22 (Box of 6)' },
                          { title: 'Bespoke Celebration Cake', price: 'from $48 (6-inch)' },
                          { title: 'Parisian Macaron Gift Box', price: 'from $28 (Box of 12)' },
                          { title: 'Weekend Breakfast Pastry Crate', price: '$45 (Assortment of 10)' },
                          { title: 'Catering & Corporate Event Platter', price: 'from $95 (30+ Pieces)' }
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.title}
                            onClick={() => setOrderData({ ...orderData, item: item.title })}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                              orderData.item === item.title
                                ? 'border-[#fe2d48] bg-[#fe2d48]/15 text-white font-semibold shadow-md'
                                : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            <div className="font-bold text-white">{item.title}</div>
                            <div className="text-[11px] text-neutral-400 mt-0.5">{item.price}</div>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-sm font-semibold text-neutral-200 mb-2">
                          Portion / Box Size:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['Box of 6 ($24)', 'Box of 12 ($44)', 'Baker\'s Dozen 13 ($48)', 'Party Platter ($95)'].map((qty) => (
                            <button
                              type="button"
                              key={qty}
                              onClick={() => setOrderData({ ...orderData, quantity: qty })}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                orderData.quantity === qty
                                  ? 'bg-white text-black font-semibold'
                                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                              }`}
                            >
                              {qty}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setOrderStep(2)}
                          className="px-6 py-2.5 bg-[#fe2d48] hover:bg-[#e0243e] text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
                        >
                          <span>Next: Pickup / Delivery</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {orderStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-200 mb-2">
                          Fulfillment Method:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            'Fresh In-Store Pickup (Free)',
                            'Morning Doorstep Delivery ($4.99)'
                          ].map((del) => (
                            <button
                              type="button"
                              key={del}
                              onClick={() => setOrderData({ ...orderData, deliveryType: del })}
                              className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                                orderData.deliveryType === del
                                  ? 'border-[#fe2d48] bg-[#fe2d48]/15 text-white font-semibold'
                                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              {del}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-200 mb-2">
                          Preferred Pickup / Delivery Slot:
                        </label>
                        <div className="space-y-2">
                          {[
                            'Tomorrow Morning (8:00 AM - 10:00 AM)',
                            'Tomorrow Midday (11:30 AM - 1:30 PM)',
                            'Tomorrow Afternoon (3:00 PM - 5:00 PM)',
                            'Custom Date (Weekend Party / Event)'
                          ].map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setOrderData({ ...orderData, pickupTime: slot })}
                              className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                                orderData.pickupTime === slot
                                  ? 'border-[#fe2d48] bg-[#fe2d48]/15 text-white font-semibold'
                                  : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setOrderStep(1)}
                          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm rounded-xl transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderStep(3)}
                          className="px-6 py-2.5 bg-[#fe2d48] hover:bg-[#e0243e] text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
                        >
                          <span>Next: Contact Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {orderStep === 3 && (
                    <div className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">
                            Your Name *
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Sarah Jenkins"
                            value={orderData.name}
                            onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#fe2d48]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="sarah@example.com"
                            value={orderData.email}
                            onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#fe2d48]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Phone Number (for warm pickup text alert) *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (800) 555-0199"
                          value={orderData.phone}
                          onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#fe2d48]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Special Flavor Requests or Dietary Notes:
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Please include 3 Blueberry Streusel and 3 Triple Chocolate. Nut allergy alert."
                          value={orderData.specialNotes}
                          onChange={(e) => setOrderData({ ...orderData, specialNotes: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#fe2d48]"
                        />
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setOrderStep(2)}
                          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm rounded-xl transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#fe2d48] hover:bg-[#e0243e] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-500/25"
                        >
                          <Check className="w-4 h-4" />
                          <span>Confirm Bakery Pre-Order</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">Order Confirmed for the Morning Hearth!</h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-white">{orderData.name || 'valued customer'}</span>! Our master bakers will prepare your <span className="text-[#fe2d48] font-bold">{orderData.item}</span> fresh from the stone ovens. A receipt and pickup notification have been sent to <span className="text-white underline">{orderData.email}</span>.
                </p>
                <div className="bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 text-left text-xs space-y-2 mt-4 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pastry Box:</span>
                    <span className="font-semibold text-white">{orderData.item}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Quantity:</span>
                    <span className="font-semibold text-white">{orderData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Timing:</span>
                    <span className="font-semibold text-white">{orderData.pickupTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Method:</span>
                    <span className="font-semibold text-white">{orderData.deliveryType}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderModalOpen(false);
                    setOrderSuccess(false);
                    setOrderStep(1);
                  }}
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-semibold text-sm transition-all"
                >
                  Close &amp; Return to Bakery
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: The Sweet Club Newsletter */}
      {newsletterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-modal-in">
          <div className="relative w-full max-w-lg bg-[#191919] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10">
            <button
              onClick={() => {
                setNewsletterOpen(false);
                setNewsletterSuccess(false);
              }}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!newsletterSuccess ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Muffinns Sweet Club</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight font-serif">
                  Join The Sweet Club &amp; Get A Free Warm Muffin
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Be the first to know when secret weekend bakes drop, receive seasonal dessert recipe previews, and enjoy a complimentary signature muffin voucher on your first order.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      What is your absolute favorite bakery craving?
                    </label>
                    <div className="space-y-1.5">
                      {[
                        'Artisan Blueberry & Chocolate Streusel Muffins',
                        'Flaky 81-Layer French Croissants & Viennoiserie',
                        'Decadent Celebration Layer Cakes & Gateaux',
                        'Delicate Parisian Macarons & Petit Fours'
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                            sweetPreference === item
                              ? 'border-[#fe2d48] bg-[#fe2d48]/10 text-white'
                              : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="sweetPref"
                            checked={sweetPreference === item}
                            onChange={() => setSweetPreference(item)}
                            className="text-[#fe2d48] focus:ring-0"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="baker@example.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#fe2d48]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#fe2d48] hover:bg-[#e0243e] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Me Sweet Alerts &amp; Free Muffin Voucher</span>
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    Only delicious updates. Never spam. Unsubscribe anytime in 1-click.
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">Welcome to the Sweet Club!</h3>
                <p className="text-sm text-neutral-300">
                  We have sent your complimentary signature muffin voucher to <span className="font-semibold text-white">{newsletterEmail}</span>. Show it at our counter or enter your voucher code online!
                </p>
                <button
                  onClick={() => {
                    setNewsletterOpen(false);
                    setNewsletterSuccess(false);
                  }}
                  className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold"
                >
                  Back to Bakery
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

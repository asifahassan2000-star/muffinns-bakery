import React, { useState, useMemo } from 'react';
import { COMPLETE_MENU_ITEMS, MenuImageItem } from '../data/menuData';
import { Search, ArrowLeft, ShoppingBag, Phone, Sparkles, Filter, X } from 'lucide-react';

interface MenuPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItemForOrder?: (itemName: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  isOpen,
  onClose,
  onSelectItemForOrder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Extract unique categories in natural order
  const categories = useMemo(() => {
    const cats = ['All'];
    COMPLETE_MENU_ITEMS.forEach(item => {
      if (!cats.includes(item.category)) {
        cats.push(item.category);
      }
    });
    return cats;
  }, []);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return COMPLETE_MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: COMPLETE_MENU_ITEMS.length };
    COMPLETE_MENU_ITEMS.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  const fallbackBakeryImage = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80';

  const handleOrderClick = (item: MenuImageItem) => {
    const itemInfo = item.price ? `${item.name} (${item.price})` : `${item.name} (${item.category})`;
    const message = encodeURIComponent(`Hello Muffinns Sweets & Bakers! I would like to order: ${itemInfo}.`);
    window.open(`https://wa.me/923202587047?text=${message}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#0b2829] text-white flex flex-col"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      {/* Top sticky brand & navigation bar */}
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
              <span className="font-extrabold text-lg sm:text-xl tracking-tight uppercase" style={{ fontFamily: "'Founders Grotesk', sans-serif" }}>
                Muffins <span className="text-[#ffe29a]">Menu</span>
              </span>
              <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ef4423] text-white uppercase tracking-wider">
                Full Collection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:+923202587047"
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-white/80 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#ffe29a]" />
              <span>+92 320 2587047</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="relative px-4 sm:px-8 pt-8 pb-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ffe29a]">
            Artisan Patisserie &amp; Traditional Confections • Since 1988
          </span>
          <h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mt-2 mb-3"
            style={{ fontFamily: "'Founders Grotesk', sans-serif" }}
          >
            Signature Bakery <span className="text-[#ef4423]">Catalog</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
            Explore our complete handcrafted repertoire of oven-fresh breads, melt-in-the-mouth sweets, 
            luxurious cream cakes, savory gourmet snacks, and traditional patashay prepared fresh daily in Bahawalpur.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search muffins, cupcakes, sweets, breads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-[#ef4423] outline-none text-white placeholder-white/50 text-sm sm:text-base transition shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#ef4423] text-white shadow-md scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span className={`ml-2 text-[11px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/25 text-white' : 'bg-black/30 text-white/70'
                }`}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-white/60 mt-3 border-t border-white/10 pt-3">
          <span>Showing <strong className="text-white font-semibold">{filteredItems.length}</strong> delicacies</span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[#ffe29a] hover:underline cursor-pointer"
            >
              Show all categories
            </button>
          )}
        </div>
      </section>

      {/* Bakery Items Grid */}
      <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 my-8">
            <Sparkles className="w-12 h-12 text-[#ffe29a] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">No items found</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-5">
              We couldn't find any items matching &ldquo;{searchQuery}&rdquo;. Try browsing our popular categories or resetting your search.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-6 py-2.5 rounded-full bg-[#ef4423] text-white font-semibold text-sm hover:brightness-110 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => {
              const hasError = imageErrors[item.name];
              const imgSrc = hasError ? fallbackBakeryImage : item.image;

              return (
                <div
                  key={`${item.category}-${item.name}-${index}`}
                  className="group flex flex-col bg-[#0e4749]/60 hover:bg-[#0e4749] rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/30">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      loading="lazy"
                      onError={() => {
                        setImageErrors(prev => ({ ...prev, [item.name]: true }));
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                    
                    {/* Category & Badge Tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-[#ffe29a] border border-white/10">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ef4423] text-white shadow uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Price Tag if available */}
                    {item.price && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#0e4749] shadow-lg">
                          {item.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#ffe29a] transition-colors leading-snug">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-[#ffe29a] font-bold text-sm whitespace-nowrap sm:hidden">
                            {item.price}
                          </span>
                        )}
                      </div>
                      
                      {item.description ? (
                        <p className="text-xs text-white/80 mt-1.5 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      ) : (
                        <p className="text-xs text-white/60 mt-1">
                          Freshly prepared daily &bull; 100% Desi Ghee &amp; Pure Butter &bull; Artisan Quality
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOrderClick(item)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#ef4423] hover:bg-[#d83b1d] active:scale-98 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Order Now {item.price ? `(${item.price})` : ''}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="sticky bottom-0 z-30 bg-[#092223]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-3 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="text-white/70 text-center sm:text-left">
            <span>📍 Model Town A, Bahawalpur, Pakistan &bull; Fresh Delivery &amp; Counter Pickup</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923086567774?text=Hello%20Muffinns%20Sweets%20and%20Bakers!%20I%20would%20like%20to%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition shadow"
            >
              <span>WhatsApp: +92 308 6567774</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition cursor-pointer"
            >
              Close Menu
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

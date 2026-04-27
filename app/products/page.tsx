"use client";
import Link from "next/link";
import { useState, useMemo } from "react";

/* ============================================================
   PRODUCTS PAGE — SELF-CONTAINED
   File: app/products/page.tsx
============================================================ */

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "GI Tagged" | "Sale" | "Limited";
  inStock: boolean;
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    { id: 1, name: "Assam Premium Tea", price: 499, oldPrice: 599, category: "Tea", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80", rating: 4.9, reviews: 142, badge: "Bestseller", inStock: true },
    { id: 2, name: "Black Rice (Chak-hao)", price: 699, category: "Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80", rating: 4.8, reviews: 89, badge: "GI Tagged", inStock: true },
    { id: 3, name: "Wild Forest Honey", price: 599, oldPrice: 749, category: "Honey", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80", rating: 4.7, reviews: 67, badge: "Sale", inStock: true },
    { id: 4, name: "Lakadong Turmeric", price: 299, category: "Spices", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80", rating: 4.9, reviews: 203, badge: "GI Tagged", inStock: true },
    { id: 5, name: "Tulsi Herbal Tea", price: 349, category: "Tea", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&q=80", rating: 4.6, reviews: 54, badge: "New", inStock: true },
    { id: 6, name: "Joha Aromatic Rice", price: 549, oldPrice: 649, category: "Rice", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80", rating: 4.7, reviews: 78, inStock: true },
    { id: 7, name: "Raw Wildflower Honey", price: 799, category: "Honey", image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=600&q=80", rating: 4.8, reviews: 91, badge: "Limited", inStock: true },
    { id: 8, name: "Bhut Jolokia (Ghost Pepper)", price: 399, category: "Spices", image: "https://images.unsplash.com/photo-1583286814430-1c2f9af2716b?w=600&q=80", rating: 4.9, reviews: 156, badge: "GI Tagged", inStock: true },
    { id: 9, name: "Green Tea Selection", price: 449, category: "Tea", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80", rating: 4.5, reviews: 38, inStock: false },
    { id: 10, name: "Red Rice 2kg", price: 459, category: "Rice", image: "https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?w=600&q=80", rating: 4.6, reviews: 45, inStock: true },
    { id: 11, name: "Bamboo Honey 250g", price: 899, oldPrice: 999, category: "Honey", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80", rating: 4.9, reviews: 72, badge: "Bestseller", inStock: true },
    { id: 12, name: "Naga King Chilli Powder", price: 449, category: "Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80", rating: 4.7, reviews: 112, inStock: true },
  ];

  const categories = [
    { name: "All", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
    { name: "Tea", icon: "M3 14c.83.42 1.61 1 2.5 1 1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1c.89 0 1.67-.58 2.5-1M3 18c.83.42 1.61 1 2.5 1 1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1c.89 0 1.67-.58 2.5-1" },
    { name: "Rice", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { name: "Honey", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
    { name: "Spices", icon: "M19 14l-7 7m0 0l-7-7m7 7V3" },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") list = [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [activeCategory, search, sort]);

  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const addToCart = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: number) => setCart((c) => {
    const updated = { ...c };
    if (updated[id] > 1) updated[id]--;
    else delete updated[id];
    return updated;
  });
  const toggleWishlist = (id: number) => setWishlist((w) => {
    const next = new Set(w);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ============ HERO ============ */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-400/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-sm text-green-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white font-medium">Products</span>
          </div>

          <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            {products.length} Authentic Products
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Premium Products</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Authentic Assam &amp; North East India produce — sourced directly from verified farmers.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mt-10 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teas, honey, rice, spices..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder:text-gray-400 bg-white/95 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ============ FILTERS BAR ============ */}
      <section className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                  activeCategory === cat.name
                    ? "bg-green-700 text-white shadow-md shadow-green-700/25"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                </svg>
                {cat.name}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.name ? "bg-white/25" : "bg-gray-200 text-gray-600"}`}>
                  {categoryCounts[cat.name] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Sort + Cart */}
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-green-600 cursor-pointer"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest First</option>
            </select>

            <button
              onClick={() => setShowCart(true)}
              className="relative p-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS GRID ============ */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of {products.length} products
              {search && <span> for "<span className="font-semibold text-gray-900">{search}</span>"</span>}
            </p>
            {(search || activeCategory !== "All") && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="text-sm font-medium text-green-700 hover:text-green-800 inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-5">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filtered.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  inWishlist={wishlist.has(item.id)}
                  inCart={cart[item.id] || 0}
                  onAddToCart={() => addToCart(item.id)}
                  onToggleWishlist={() => toggleWishlist(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ WHY BUY ============ */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              The Kopahi Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Why Buy From Kopahi?</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">More than a marketplace — we're a bridge between farmers and conscious consumers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "100% Organic",
                desc: "Pesticide-free, hand-harvested produce traceable back to the farm.",
                icon: "M12 2C8 6 4 11 4 16a8 8 0 0016 0c0-5-4-10-8-14z",
              },
              {
                title: "Fast Pan-India Delivery",
                desc: "Sealed premium packaging, tracked end-to-end, delivered in 3-5 days.",
                icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1",
              },
              {
                title: "GI Tagged & Certified",
                desc: "Verified authentic origin with FSSAI compliance on every product.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
            ].map((f, i) => (
              <div key={i} className="group bg-gradient-to-b from-green-50/50 to-white p-8 rounded-3xl border border-green-100 hover:border-green-300 hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-700 text-white mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CART DRAWER ============ */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Your Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Close cart">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mb-5">Add some authentic produce to get started</p>
                <button onClick={() => setShowCart(false)} className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-medium">
                  Browse products
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {Object.entries(cart).map(([id, qty]) => {
                    const p = products.find((x) => x.id === Number(id));
                    if (!p) return null;
                    return (
                      <div key={id} className="flex gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                        <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                          <p className="text-sm font-bold text-green-700">₹{p.price * qty}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => removeFromCart(p.id)} className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold">−</button>
                            <span className="text-sm font-semibold w-6 text-center">{qty}</span>
                            <button onClick={() => addToCart(p.id)} className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold">+</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-bold text-gray-900">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-gray-500">Shipping &amp; taxes calculated at checkout</p>
                  <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-green-700/20">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

/* ============ PRODUCT CARD ============ */
function ProductCard({
  product,
  inWishlist,
  inCart,
  onAddToCart,
  onToggleWishlist,
}: {
  product: Product;
  inWishlist: boolean;
  inCart: number;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}) {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const badgeStyles: Record<string, string> = {
    Bestseller: "bg-amber-500 text-white",
    New: "bg-blue-500 text-white",
    "GI Tagged": "bg-green-700 text-white",
    Sale: "bg-red-500 text-white",
    Limited: "bg-purple-600 text-white",
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!product.inStock ? "opacity-60" : ""}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeStyles[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className={`w-4 h-4 transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "text-gray-700 fill-none"}`} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>

        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
          {product.oldPrice && (
            <p className="text-sm text-gray-400 line-through">₹{product.oldPrice}</p>
          )}
        </div>

        {/* CTA */}
        {inCart > 0 ? (
          <div className="mt-auto bg-green-50 border-2 border-green-700 rounded-xl py-2.5 text-center">
            <span className="text-sm font-bold text-green-800">✓ {inCart} in cart</span>
          </div>
        ) : (
          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            className="mt-auto w-full bg-gray-900 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors text-sm inline-flex items-center justify-center gap-2"
          >
            {product.inStock ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            ) : (
              "Notify Me"
            )}
          </button>
        )}
      </div>
    </article>
  );
}
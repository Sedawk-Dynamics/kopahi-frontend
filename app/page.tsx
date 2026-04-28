"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const products = [
    { name: "Assam Tea", price: "₹499", oldPrice: "₹599", tag: "Bestseller", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80", rating: 4.9 },
    { name: "Black Rice", price: "₹699", oldPrice: null, tag: "GI Tagged", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80", rating: 4.8 },
    { name: "Organic Watermelon", price: "₹599", oldPrice: null, tag: "Fresh", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80", rating: 4.7 },
    { name: "Broccoli", price: "₹299", oldPrice: "₹349", tag: "Organic", img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80", rating: 4.6 },
  ];

  const reviews = [
    { name: "Rahul Sharma", location: "Bengaluru", text: "Excellent Assam tea. Truly authentic taste — exactly like my grandmother's garden." },
    { name: "Priya Das", location: "Mumbai", text: "Loved the honey packaging and fast delivery. Pure, raw, beautifully sealed." },
    { name: "Ankit Jain", location: "Delhi", text: "Best GI-tagged products I purchased online. Sourcing feels genuinely ethical." },
    { name: "Sneha Roy", location: "Kolkata", text: "Fresh turmeric and black rice quality is amazing. Smell the freshness instantly." },
    { name: "Amit Verma", location: "Pune", text: "A very premium marketplace experience. Curation and service feel thoughtful." },
    { name: "Kavya Iyer", location: "Chennai", text: "The bhut jolokia chillies are unreal — finally a brand that respects regional flavour." },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/b2b", label: "B2B" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <main className="bg-white text-gray-900 antialiased">
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: scroll-x 45s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          animation: fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .float-slow { animation: float 6s ease-in-out infinite; }

        html { scroll-behavior: smooth; }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .reveal, .float-slow { animation: none !important; }
        }
      `}</style>

{/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Kopahi home">
            <Image
              src="/logo1.png"
              alt="Kopahi logo"
              width={120}
              height={120}
              priority
              className="h-14 w-14 lg:h-16 lg:w-16 object-contain transition-transform group-hover:scale-105 drop-shadow-lg"
            />
            <span
              className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-green-700" : "text-white drop-shadow-lg"
              }`}
            >
              Kopahi<span className={scrolled ? "text-green-500" : "text-green-300"}>.</span>
            </span>
          </Link>

          <div className="hidden lg:flex gap-8 font-medium text-sm items-center">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors relative group ${
                  scrolled
                    ? "text-gray-700 hover:text-green-700"
                    : "text-white/95 hover:text-white drop-shadow-md"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                    scrolled ? "bg-green-700" : "bg-white"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-200 drop-shadow-md"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`px-5 py-2.5 rounded-lg transition-all text-sm font-medium shadow-lg ${
                scrolled
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-white text-green-800 hover:bg-green-50"
              }`}
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-gray-700" : "text-white drop-shadow-lg"}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-gray-700 hover:text-green-700"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <Link href="/login" className="flex-1 text-center py-2.5 border border-gray-200 rounded-lg">Login</Link>
                <Link href="/signup" className="flex-1 text-center py-2.5 bg-green-700 text-white rounded-lg">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <video autoPlay muted loop playsInline poster="/hero-poster.jpg" className="absolute inset-0 w-full h-full object-cover">
          <source src="/farmer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl text-white reveal">
            <p className="text-green-300 font-semibold text-sm md:text-base mb-5 uppercase tracking-[0.25em]">
              Farmer Stories of Assam
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              From Assam Farms
              <span className="block text-green-400 mt-2">To Your Home</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Authentic tea, honey, black rice and spices sourced directly from trusted farmers across North East India.
            </p>

            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <Link href="/products" className="group bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 font-medium inline-flex items-center gap-2">
                Shop Now
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/join" className="border-2 border-white/80 backdrop-blur-sm bg-white/5 px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all font-medium">
                Become a Vendor
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap justify-center gap-6 text-xs text-white/80">
              {["FSSAI Certified", "GI Tagged Products", "Direct Farmer Payout"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <div className="float-slow w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 relative z-10">
          {[
            { num: "500+", label: "Verified Farmers", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
            { num: "120+", label: "Premium Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
            { num: "30+", label: "Cities Served", icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
            { num: "10K+", label: "Happy Customers", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{s.num}</h2>
              <p className="text-green-100 mt-1 text-sm md:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SOURCING MAP ================= */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Our Network
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">Ingredient Sourcing Network</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            Premium ingredients sourced directly from Assam and North East India through verified farmers and regional producer collectives.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 md:p-6 rounded-3xl shadow-xl border border-green-100">
            <img src="/map.png" alt="Kopahi sourcing map showing farmer networks across North East India" className="w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Featured
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Handpicked Products</h2>
            </div>
            <Link href="/products" className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-2 group">
              View All Products
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {products.map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
                <div className="relative overflow-hidden aspect-square bg-gray-100">
                  <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-green-700 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                  )}
                  <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">{item.rating}</span>
                  </div>

                  <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-1 line-clamp-1">{item.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-green-700 font-bold text-lg md:text-xl">{item.price}</p>
                    {item.oldPrice && <p className="text-gray-400 line-through text-sm">{item.oldPrice}</p>}
                  </div>

                  <Link href="/products" className="block text-center w-full bg-gray-900 hover:bg-green-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE KOPAHI ================= */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Why Kopahi
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Why Choose <span className="text-green-700">Kopahi?</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              We bridge the gap between North East farmers and conscious consumers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21V8a5 5 0 0110 0v13m-10 0h10m-10 0H1m12 0h10m-10 0V11a4 4 0 014-4h2a4 4 0 014 4v10" /></svg>,
                title: "Direct from Farmers",
                desc: "Transparent sourcing from trusted Assam farmers with zero middlemen and fair payouts.",
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: "GI Tagged Quality",
                desc: "Premium verified products with authenticated North East origin and FSSAI certification.",
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
                title: "Fast & Safe Delivery",
                desc: "Pan-India shipping with premium packaging — your order tracked end to end.",
              },
            ].map((f, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-green-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 text-green-700 mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-green-50/40 relative overflow-hidden">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-green-100/40 rounded-full blur-3xl"></div>

        <div className="text-center mb-16 relative z-10 px-6">
          <span className="inline-block px-4 py-1.5 bg-white text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            Verified Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What Customers Say <span className="text-green-600">💚</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">Real stories from buyers who trust Kopahi for authentic produce.</p>
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-green-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-green-50 to-transparent z-10 pointer-events-none"></div>

          <div className="marquee-track flex gap-6 px-6">
            {[...reviews, ...reviews].map((item, i) => (
              <div key={i} className="w-[340px] md:w-[380px] flex-shrink-0 bg-white p-7 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 relative">
                <div className="absolute top-4 right-5 text-6xl text-green-100 font-serif leading-none select-none pointer-events-none">"</div>

                <div className="flex gap-0.5 mb-4 relative z-10">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-800 leading-relaxed mb-6 whitespace-normal min-h-[80px]">"{item.text}"</p>

                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">{item.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.7 6.3l-4.4 4.4a.8.8 0 01-1.1 0L4 8.5a.8.8 0 011.1-1.1L6.7 9l3.9-3.9a.8.8 0 011.1 1.2z" />
                      </svg>
                      Verified · {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER CTA ================= */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join the Kopahi Family</h2>
            <p className="text-green-100 mb-8 text-lg">
              Get 10% off your first order, exclusive farmer stories, and early access to new harvests.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 bg-white/95 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300" aria-label="Email address" />
              <button type="submit" className="bg-white text-green-800 hover:bg-green-50 px-7 py-3.5 rounded-xl font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-green-200 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0a0f0c] text-gray-300 pt-20 pb-8 px-6 lg:px-8 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo1.png" alt="Kopahi logo" width={80} height={80} className="h-10 w-10 object-contain" />
                <h2 className="text-3xl font-bold text-green-400 tracking-tight">
                  Kopahi<span className="text-green-300">.</span>
                </h2>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-xs">
                Premium agri-marketplace of North East India — connecting growers with conscious buyers across the country.
              </p>

              <div className="flex gap-3">
                {[
                  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { label: "Facebook", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
                  { label: "Twitter", path: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-600 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-green-400 transition-colors">Home</Link></li>
                <li><Link href="/products" className="hover:text-green-400 transition-colors">Products</Link></li>
                <li><Link href="/about" className="hover:text-green-400 transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Business</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/b2b" className="hover:text-green-400 transition-colors">Bulk Orders</Link></li>
                <li><Link href="/join" className="hover:text-green-400 transition-colors">Become Vendor</Link></li>
                <li><Link href="/contact" className="hover:text-green-400 transition-colors">Support</Link></li>
                <li><Link href="/partners" className="hover:text-green-400 transition-colors">Partnerships</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <a href="mailto:info@kopahi.com" className="hover:text-green-400">info@kopahi.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.07 15.07 0 01-6.59-6.59l2.2-2.21a1 1 0 00.25-1.01A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1c0 9.39 7.61 17 17 17a1 1 0 001-1v-3.5a1 1 0 00-1-1z" />
                  </svg>
                  <span>+91 XXXXX XXXXX</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a8 8 0 00-8 8c0 5.4 7 11.5 7.3 11.7a1 1 0 001.4 0C13 21.5 20 15.4 20 10a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                  </svg>
                  <span>Guwahati, Assam, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500">© 2026 Kopahi. All rights reserved.</p>
            <div className="flex gap-6 text-gray-500">
              <Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-green-400 transition-colors">Terms</Link>
              <span className="hidden md:inline">Crafted with <span className="text-green-400">♥</span> in North East India</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
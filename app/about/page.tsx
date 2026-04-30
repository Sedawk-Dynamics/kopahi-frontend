"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";

export default function AboutPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState({ farmers: 0, products: 0, cities: 0, customers: 0 });
  const statsRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/b2b", label: "B2B" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    if (!statsRef.current) return;
    const targets = { farmers: 500, products: 120, cities: 30, customers: 10000 };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setStats({
                farmers: Math.round(targets.farmers * eased),
                products: Math.round(targets.products * eased),
                cities: Math.round(targets.cities * eased),
                customers: Math.round(targets.customers * eased),
              });
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const milestones = [
    { year: "2022", title: "The Idea", desc: "Born out of a simple realization — North East India's finest produce rarely reaches mainstream tables." },
    { year: "2023", title: "First 50 Farmers", desc: "Onboarded the first cohort of growers across Assam tea gardens, paddy fields, and bee farms." },
    { year: "2024", title: "Pan-India Launch", desc: "Launched D2C marketplace and shipped to 30+ cities with FSSAI-certified packaging." },
    { year: "2025", title: "B2B & Exports", desc: "Opened wholesale, HoReCa, and international export channels for GI-tagged catalogues." },
  ];

  return (
    <main className="bg-white text-gray-900 antialiased">
      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal { animation: fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .float-slow { animation: float 7s ease-in-out infinite; }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.05); }
        }
        .pulse-glow { animation: pulseGlow 6s ease-in-out infinite; }

        @keyframes scrollX {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee { animation: scrollX 38s linear infinite; width: max-content; }

        html { scroll-behavior: smooth; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .float-slow, .pulse-glow, .marquee { animation: none !important; }
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <nav className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white text-[13px] tracking-wide">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-10 flex items-center justify-between">
            <p className="hidden md:block font-medium">Open Doors To A World Of Indigenous Food</p>
            <div className="flex items-center gap-5 text-sm">
              <Link href="/track-order" className="hover:text-green-200 transition">Track Order</Link>
              <Link href="/contact" className="hover:text-green-200 transition">Support</Link>
              <Link href="/b2b" className="hover:text-green-200 transition">Bulk Orders</Link>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="h-[96px] flex items-center justify-between">
              <Link href="/" className="group flex items-center gap-4">
                <div className="relative h-[72px] w-[160px]">
                  <Image src="/Logo1.png" alt="Kopahi Logo" fill sizes="160px" priority className="object-contain group-hover:scale-105 transition" />
                </div>
                <div className="hidden xl:block">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-green-700 font-semibold">Truly Indigenous</p>
                  <p className="text-xs text-gray-500 mt-1">Assam Farms To Your Home</p>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[15px] font-semibold transition group ${
                      item.label === "About" ? "text-green-700" : "text-gray-700 hover:text-green-700"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] transition-all duration-300 ${
                        item.label === "About" ? "w-full bg-green-700" : "w-0 bg-green-700 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">Login</Link>
                <Link href="/signup" className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white text-sm font-bold shadow-lg hover:shadow-2xl transition">Sign Up</Link>
              </div>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center">☰</button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl">
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-gray-700 font-semibold py-2 border-b border-gray-100 hover:text-green-700">
                    {item.label}
                  </Link>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Link href="/login" className="text-center py-3 rounded-xl border border-gray-200 font-semibold">Login</Link>
                  <Link href="/signup" className="text-center py-3 rounded-xl bg-green-700 text-white font-semibold">Sign Up</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ================= HERO (VIDEO) ================= */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/farmer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/80"></div>

        {/* Decorative orbs */}
        <div className="absolute top-1/4 -left-16 w-72 h-72 bg-green-500/20 rounded-full blur-3xl pulse-glow"></div>
        <div className="absolute bottom-1/4 -right-16 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "2s" }}></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl text-white reveal">
            <p className="text-green-300 font-semibold text-sm md:text-base mb-5 uppercase tracking-[0.3em]">
              Our Story
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Connecting Assam Farms
              <span className="block text-green-400 mt-2">To Every Home</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Kopahi is a premium agri-commerce platform championing authentic, GI-tagged and natural products from the heart of North East India.
            </p>

            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <a href="#mission" className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all font-medium">
                Discover Our Mission
              </a>
              <Link href="/products" className="border-2 border-white/80 backdrop-blur-sm bg-white/5 px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all font-medium">
                Explore Products
              </Link>
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
      <section ref={statsRef} className="bg-gradient-to-br from-green-700 to-green-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 relative z-10">
          {[
            { val: `${stats.farmers}+`, label: "Verified Farmers", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
            { val: `${stats.products}+`, label: "Premium Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
            { val: `${stats.cities}+`, label: "Cities Served", icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
            { val: `${(stats.customers / 1000).toFixed(stats.customers >= 10000 ? 0 : 1)}K+`, label: "Happy Customers", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums">{s.val}</h2>
              <p className="text-green-100 mt-1 text-sm md:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MISSION / VISION ================= */}
      <section id="mission" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Mission & Vision</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              The why and the where-to of everything we build at Kopahi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=80"
                alt="Tea garden in Assam"
                className="w-full h-full object-cover min-h-[460px] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-green-300 font-semibold text-xs uppercase tracking-[0.3em] mb-2">Live On The Ground</p>
                <p className="text-xl font-semibold leading-relaxed">
                  Hand-picked at sunrise. Packed the same day. Shipped within 48 hours.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="group bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-700 text-white mb-5 group-hover:scale-110 transition">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Connect farmers, vendors and customers through a trusted marketplace — and put North East India's finest produce on every premium table in the country.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-700 text-white mb-5 group-hover:scale-110 transition">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become India's leading agriculture-first multi-vendor platform — and a global doorway to indigenous, GI-tagged Indian produce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY / TIMELINE ================= */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-50/40 relative overflow-hidden">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-green-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">From Idea to Pan-India</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              A short timeline of the milestones that shaped Kopahi.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-300 via-green-500 to-green-700 md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-700 ring-4 ring-white shadow-lg z-10 mt-2"></div>

                  <div className="md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-1">
                      <p className="text-green-700 font-bold text-sm tracking-[0.25em] uppercase mb-2">{m.year}</p>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">{m.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY STARTED (PARALLAX) ================= */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/80 to-green-950/90"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-green-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 border border-white/20">
            Why We Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Empowering Hidden Farmers <br className="hidden md:block" />
            <span className="text-green-400">& Regional Products</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Many of North East India's most authentic products never reach mainstream shelves. Kopahi was built to fix that — through technology, branding, transparent sourcing and direct farmer access.
          </p>

          <blockquote className="mt-12 max-w-2xl mx-auto border-l-4 border-green-400 pl-6 text-left">
            <p className="text-xl italic text-gray-100 leading-relaxed">
              "Every jar of honey, every leaf of tea, every grain of rice we ship carries a story — and a fair payout to the family who grew it."
            </p>
            <footer className="mt-4 text-green-300 font-semibold text-sm">— The Kopahi Team</footer>
          </blockquote>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What Makes Kopahi Different</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Five values we use as a daily filter when making decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Authenticity",
                desc: "Real products from trusted regional farmers — every batch traceable to its origin garden, paddy field, or apiary.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
              },
              {
                title: "Fair Trade",
                desc: "Better payouts and transparent sourcing — farmers see exactly what they earn, with zero middlemen and weekly settlements.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              },
              {
                title: "Premium Quality",
                desc: "FSSAI-certified, GI-tagged where applicable, and packaged for modern retail with end-to-end cold-chain support.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.075 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z" /></svg>,
              },
              {
                title: "Sustainable Sourcing",
                desc: "Organic-first, low-impact farming partners. Plastic-minimised packaging and carbon-conscious logistics.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
              },
              {
                title: "Customer Trust",
                desc: "Honest reviews, accurate ETAs, easy returns. We earn loyalty by treating every order like the first one.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
              },
              {
                title: "Indigenous Pride",
                desc: "We celebrate North East India's culture in every label, story, and shipment we send across the country.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl border border-gray-100 hover:border-green-200 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-700 mb-5 group-hover:bg-green-700 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY MARQUEE ================= */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50/30 overflow-hidden">
        <div className="text-center mb-12 px-6">
          <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Behind The Scenes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Glimpses From The Field</h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="marquee flex gap-6 px-6">
            {[
              "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&q=80",
              "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=900&q=80",
              "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
              "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80",
              "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=900&q=80",
              "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
            ]
              .concat([
                "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&q=80",
                "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=900&q=80",
                "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
                "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80",
                "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=900&q=80",
                "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
              ])
              .map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 w-72 h-48 md:w-80 md:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] relative"
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to taste the North East?</h2>
            <p className="text-green-100 mb-8 text-lg">
              Join 10,000+ households already buying authentic, GI-tagged produce directly from Assam farmers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products" className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-xl font-bold transition shadow-lg">
                Shop Products
              </Link>
              <Link href="/join" className="border-2 border-white/80 backdrop-blur-sm bg-white/10 px-8 py-4 rounded-xl hover:bg-white hover:text-green-800 transition font-bold">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

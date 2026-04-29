"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/b2b", label: "B2B" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <main className="bg-white text-gray-900">

      {/* ================= PREMIUM HEADER ================= */}
      <nav className="sticky top-0 left-0 right-0 z-50">

        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white text-[13px] tracking-wide">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-10 flex items-center justify-between">
            <p className="hidden md:block font-medium">
              Open Doors To A World Of Indigenous Food
            </p>

            <div className="flex items-center gap-5 text-sm">
              <Link href="/" className="hover:text-green-200 transition">
                Home
              </Link>

              <Link href="/contact" className="hover:text-green-200 transition">
                Support
              </Link>

              <Link href="/b2b" className="hover:text-green-200 transition">
                Bulk Orders
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="h-[96px] flex items-center justify-between">

              {/* LOGO */}
              <Link href="/" className="group flex items-center gap-4">
                <div className="relative h-[72px] w-[160px]">
                  <Image
                    src="/logo1.png"
                    alt="Kopahi Logo"
                    fill
                    priority
                    className="object-contain group-hover:scale-105 transition"
                  />
                </div>

                <div className="hidden xl:block">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-green-700 font-semibold">
                    Truly Indigenous
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Assam Farms To Your Home
                  </p>
                </div>
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[15px] font-semibold transition group ${
                      item.label === "About"
                        ? "text-green-700"
                        : "text-gray-700 hover:text-green-700"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] transition-all duration-300 ${
                        item.label === "About"
                          ? "w-full bg-green-700"
                          : "w-0 bg-green-700 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ))}
              </div>

              {/* RIGHT */}
              <div className="hidden lg:flex items-center gap-3">

                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white text-sm font-bold shadow-lg hover:shadow-2xl transition"
                >
                  Sign Up
                </Link>
              </div>

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center"
              >
                ☰
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl">
              <div className="px-6 py-6 flex flex-col gap-4">

                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-700 font-semibold py-2 border-b border-gray-100 hover:text-green-700"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Link
                    href="/login"
                    className="text-center py-3 rounded-xl border border-gray-200 font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="text-center py-3 rounded-xl bg-green-700 text-white font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>

              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-24 px-8 text-center">
        <p className="uppercase tracking-[0.35em] text-green-700 font-semibold mb-4 text-sm">
          About Kopahi
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Connecting Assam Farms <br />
          <span className="text-green-700">To Every Home</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-8">
          Kopahi is a premium agri-commerce platform focused on authentic,
          GI tagged and natural products from North East India.
        </p>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80"
          className="rounded-3xl shadow-2xl h-[460px] object-cover w-full"
        />

        <div>
          <p className="uppercase tracking-[0.35em] text-green-700 font-semibold mb-4 text-sm">
            Our Story
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-8 text-lg">
            To connect farmers, vendors and customers through a trusted
            marketplace while promoting regional products globally.
          </p>

          <h2 className="text-4xl font-bold mt-12 mb-6">
            Our Vision
          </h2>

          <p className="text-gray-600 leading-8 text-lg">
            To become India’s leading agriculture-first multi vendor platform.
          </p>
        </div>

      </section>

      {/* ================= WHY STARTED ================= */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">

          <p className="uppercase tracking-[0.35em] text-green-700 font-semibold mb-4 text-sm">
            Why We Started
          </p>

          <h2 className="text-4xl font-bold mb-10">
            Empowering Hidden Farmers & Regional Products
          </h2>

          <p className="text-gray-600 leading-8 text-lg">
            Many authentic North East products never reach wider markets.
            Kopahi was created to solve this through technology, branding,
            trust and direct farmer access.
          </p>

        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.35em] text-green-700 font-semibold mb-4 text-sm">
              Our Values
            </p>

            <h2 className="text-4xl font-bold">
              What Makes Kopahi Different
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Authenticity",
                desc: "Real products from trusted regional farmers."
              },
              {
                title: "Fair Trade",
                desc: "Better payouts and transparent sourcing."
              },
              {
                title: "Premium Quality",
                desc: "Clean packaging and top-grade products."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white text-center py-10">
        <p className="text-lg font-semibold">© 2026 Kopahi</p>
        <p className="text-sm text-gray-400 mt-2">
          Truly Indigenous • Assam To India
        </p>
      </footer>

    </main>
  );
}
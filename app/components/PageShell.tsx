"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/b2b", label: "B2B" },
  { href: "/contact", label: "Contact" },
];

export default function PageShell({
  active,
  children,
}: {
  active?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
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
                      item.label === active ? "text-green-700" : "text-gray-700 hover:text-green-700"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] transition-all duration-300 ${
                        item.label === active ? "w-full bg-green-700" : "w-0 bg-green-700 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">Login</Link>
                <Link href="/signup" className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white text-sm font-bold shadow-lg hover:shadow-2xl transition">Sign Up</Link>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Open menu"
                className="lg:hidden w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

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
                  <Link href="/login" className="text-center py-3 rounded-xl border border-gray-200 font-semibold">Login</Link>
                  <Link href="/signup" className="text-center py-3 rounded-xl bg-green-700 text-white font-semibold">Sign Up</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {children}
    </>
  );
}

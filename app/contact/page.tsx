"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/b2b", label: "B2B" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <main className="bg-white text-gray-900 min-h-screen">

      {/* ================= PROFESSIONAL STICKY HEADER ================= */}
      <header className="sticky top-0 z-50">

        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white text-sm">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">

            <p className="hidden md:block font-medium">
              Customer Support • Partnerships • Vendor Registration
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="/"
                className="hover:text-green-200 transition"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="hover:text-green-200 transition"
              >
                Products
              </Link>
            </div>

          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div className="bg-white shadow-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-24 flex items-center justify-between">

              {/* LOGO */}
              <Link
                href="/"
                className="flex items-center gap-4"
              >
                <div className="relative h-16 w-36">
                  <Image
                    src="/logo1.png"
                    alt="Kopahi Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="hidden xl:block">
                  <p className="text-xs tracking-[0.35em] font-bold text-green-700 uppercase">
                    Truly Indigenous
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Assam Farms To Your Home
                  </p>
                </div>
              </Link>

              {/* DESKTOP MENU */}
              <nav className="hidden lg:flex items-center gap-10">

                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative font-semibold transition ${
                      item.label === "Contact"
                        ? "text-green-700"
                        : "text-gray-700 hover:text-green-700"
                    }`}
                  >
                    {item.label}

                    {item.label === "Contact" && (
                      <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-green-700"></span>
                    )}
                  </Link>
                ))}

              </nav>

              {/* RIGHT SIDE */}
              <div className="hidden lg:flex items-center gap-4">

                <Link
                  href="/login"
                  className="font-semibold text-gray-700 hover:text-green-700 transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white font-bold shadow-lg hover:shadow-2xl transition"
                >
                  Sign Up
                </Link>

              </div>

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-3xl"
              >
                ☰
              </button>

            </div>
          </div>

          {/* MOBILE MENU */}
          {mobileOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6">

              <div className="flex flex-col gap-4">

                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-semibold text-gray-700 hover:text-green-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <hr />

                <Link href="/login" className="font-semibold">
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-green-700 text-white text-center py-3 rounded-xl font-semibold"
                >
                  Sign Up
                </Link>

              </div>

            </div>
          )}

        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">

          <p className="uppercase tracking-[0.35em] text-green-200 font-semibold text-sm mb-4">
            Contact Kopahi
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Let’s Connect
          </h1>

          <p className="text-lg text-green-100 max-w-2xl mx-auto leading-8">
            We’d love to hear from you. Reach out for bulk orders,
            partnerships, vendor registration or customer support.
          </p>

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-14">

        {/* LEFT SIDE */}
        <div>

          <p className="uppercase tracking-[0.35em] text-green-700 font-semibold text-sm mb-4">
            Get In Touch
          </p>

          <h2 className="text-4xl font-bold mb-8">
            We’re Here To Help
          </h2>

          <div className="space-y-6 text-lg text-gray-700">

            <p><strong>Email:</strong> info@kopahi.com</p>

            <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>

            <p><strong>Address:</strong> Assam, India</p>

            <p><strong>Business Hours:</strong> Mon - Sat, 9 AM - 6 PM</p>

          </div>

          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80"
            alt="Office"
            className="mt-10 rounded-3xl shadow-xl h-80 w-full object-cover"
          />

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-gray-50 p-10 rounded-3xl shadow-xl">

          <p className="uppercase tracking-[0.35em] text-green-700 font-semibold text-sm mb-4">
            Send Message
          </p>

          <h3 className="text-3xl font-bold mb-8">
            Contact Form
          </h3>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-700"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-700"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-700"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-700"
            ></textarea>

            <button className="w-full bg-green-700 text-white py-4 rounded-xl font-semibold hover:bg-green-800 transition">
              Submit Inquiry
            </button>

          </div>

        </div>

      </section>

      {/* ================= EXTRA SECTION ================= */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <p className="uppercase tracking-[0.35em] text-green-700 font-semibold text-sm mb-4">
              Why Reach Us
            </p>

            <h2 className="text-4xl font-bold">
              Trusted Support For Every Need
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Fast Response",
                desc: "Our team replies quickly to your inquiries.",
              },
              {
                title: "Business Assistance",
                desc: "Dedicated support for wholesale & partnerships.",
              },
              {
                title: "Customer Care",
                desc: "Friendly help for orders, delivery and products.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
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

        <p className="text-lg font-semibold">
          © 2026 Kopahi
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Truly Indigenous • Assam To India
        </p>

      </footer>

    </main>
  );
}
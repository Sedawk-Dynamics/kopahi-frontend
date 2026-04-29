"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
};

export default function ProductsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/b2b", label: "B2B" },
    { href: "/contact", label: "Contact" },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Assam Premium Tea",
      price: 499,
      oldPrice: 599,
      category: "Tea",
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80",
      rating: 4.9,
      reviews: 142,
      badge: "Bestseller",
      inStock: true,
    },
    {
      id: 2,
      name: "Wild Forest Honey",
      price: 599,
      oldPrice: 749,
      category: "Honey",
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
      rating: 4.8,
      reviews: 97,
      badge: "Sale",
      inStock: true,
    },
    {
      id: 3,
      name: "Lakadong Turmeric",
      price: 299,
      category: "Spices",
      image:
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
      rating: 4.9,
      reviews: 203,
      badge: "GI Tagged",
      inStock: true,
    },
    {
      id: 4,
      name: "Black Rice",
      price: 699,
      category: "Rice",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
      rating: 4.7,
      reviews: 88,
      badge: "New",
      inStock: true,
    },
  ];

  const filtered = useMemo(() => {
    let data =
      activeCategory === "All"
        ? products
        : products.filter((item) => item.category === activeCategory);

    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [activeCategory, search]);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ================= PROFESSIONAL HEADER ================= */}
      <header className="sticky top-0 z-50">

        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white text-sm">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">

            <p className="hidden md:block font-medium">
              Premium Products Direct From Assam Farmers
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="/contact"
                className="hover:text-green-200 transition"
              >
                Support
              </Link>

              <Link
                href="/track-order"
                className="hover:text-green-200 transition"
              >
                Track Order
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
                      item.label === "Products"
                        ? "text-green-700"
                        : "text-gray-700 hover:text-green-700"
                    }`}
                  >
                    {item.label}

                    {item.label === "Products" && (
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

                <Link
                  href="/login"
                  className="font-semibold"
                >
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
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <p className="uppercase tracking-[0.35em] text-green-200 font-semibold text-sm mb-4">
            Premium Collection
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Our Authentic Products
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-green-100 leading-8">
            Carefully sourced tea, honey, rice and spices directly from trusted
            farmers of North East India.
          </p>

          {/* SEARCH */}
          <div className="max-w-xl mx-auto mt-10">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl text-gray-900 focus:outline-none"
            />
          </div>

        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="bg-white py-5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 justify-center">

          {["All", "Tea", "Honey", "Rice", "Spices"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveCategory(item)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeCategory === item
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-7">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <p className="text-sm text-green-700 font-semibold mb-2">
                  {item.category}
                </p>

                <h3 className="text-xl font-bold mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  ⭐ {item.rating} ({item.reviews} reviews)
                </p>

                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl font-bold text-green-700">
                    ₹{item.price}
                  </span>

                  {item.oldPrice && (
                    <span className="text-gray-400 line-through">
                      ₹{item.oldPrice}
                    </span>
                  )}
                </div>

                <button className="w-full bg-gray-900 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
                  Add To Cart
                </button>

              </div>
            </div>
          ))}

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
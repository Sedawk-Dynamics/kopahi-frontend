"use client";
import Link from "next/link";
import { useState } from "react";
import DashboardShell, { StatusBadge } from "../components/DashboardShell";

/* ============================================================
   CUSTOMER DASHBOARD — MAIN
   File: app/dashboard/page.tsx
============================================================ */

export default function CustomerDashboard() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Assam Single Estate Tea", price: 1899, img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&q=80" },
    { id: 2, name: "Lakadong Turmeric 250g", price: 649, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&q=80" },
    { id: 3, name: "Raw Wildflower Honey", price: 1199, img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80" },
  ]);

  const stats = [
    { label: "Total Orders", value: "12", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", href: "/dashboard/orders" },
    { label: "In Wishlist", value: "8", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", href: "/dashboard/wishlist" },
    { label: "Loyalty Points", value: "1,245", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", href: "/dashboard/account" },
  ];

  const orders = [
    { id: "KP-2847", date: "26 Apr, 2026", product: "Assam Tea Premium 250g", amount: "₹1,499", status: "Shipped" },
    { id: "KP-2812", date: "18 Apr, 2026", product: "Wild Forest Honey 500g", amount: "₹899", status: "Delivered" },
    { id: "KP-2789", date: "10 Apr, 2026", product: "Black Rice 5kg + Turmeric", amount: "₹3,495", status: "Delivered" },
    { id: "KP-2734", date: "28 Mar, 2026", product: "Bhut Jolokia Spice Pack", amount: "₹1,299", status: "Delivered" },
  ];

  const moveToCart = (id: number) => {
    setWishlistItems((items) => items.filter((i) => i.id !== id));
  };

  return (
    <DashboardShell role="Customer" userName="Rahul Sharma" userEmail="rahul@example.com">
      {/* Welcome banner */}
      <div className="mb-6 md:mb-8 bg-gradient-to-br from-green-700 to-green-900 text-white p-5 md:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Hello, Rahul 👋</h1>
          <p className="text-sm md:text-base text-green-100 max-w-md">
            You have <span className="font-semibold text-white">1 order arriving soon</span> and <span className="font-semibold text-white">1,245 loyalty points</span> ready to redeem.
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Link href="/products" className="bg-white text-green-800 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Continue Shopping
            </Link>
            <Link href="/dashboard/account" className="bg-white/15 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Redeem Points
            </Link>
          </div>
        </div>
      </div>

      {/* Stats — clickable */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-3 group-hover:bg-green-700 group-hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
              </svg>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{s.value}</p>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Your Orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-medium text-green-700 hover:text-green-800 inline-flex items-center gap-1 group">
              View all
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.map((o) => (
              <Link
                key={o.id}
                href={`/dashboard/orders/${o.id}`}
                className="block p-4 md:p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-sm font-bold text-gray-900">#{o.id}</p>
                      <StatusBadge status={o.status} />
                    </div>
                    <p className="text-sm text-gray-700 truncate">{o.product}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Ordered on {o.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">{o.amount}</p>
                    <span className="text-xs text-green-700 hover:text-green-800 font-medium mt-1 inline-flex items-center gap-1">
                      Track
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Wishlist */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Wishlist</h2>
            <Link href="/dashboard/wishlist" className="text-sm font-medium text-green-700 hover:text-green-800">View all</Link>
          </div>
          <div className="p-3">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500">Your wishlist is empty</p>
                <Link href="/products" className="inline-block mt-3 text-sm font-medium text-green-700 hover:text-green-800">Browse products →</Link>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id} className="p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm font-bold text-green-700">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => moveToCart(item.id)}
                      className="w-8 h-8 rounded-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center transition-colors flex-shrink-0"
                      aria-label="Add to cart"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
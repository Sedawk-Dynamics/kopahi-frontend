"use client";
import Link from "next/link";
import { useState } from "react";
import DashboardShell from "../../components/DashboardShell";

/* ============================================================
   CUSTOMER WISHLIST
   File: app/dashboard/wishlist/page.tsx
============================================================ */

type WishItem = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishItem[]>([
    { id: 1, name: "Assam Single Estate Tea", price: 1899, oldPrice: 2299, category: "Tea", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80", inStock: true },
    { id: 2, name: "Lakadong Turmeric 250g", price: 649, category: "Spices", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80", inStock: true },
    { id: 3, name: "Raw Wildflower Honey", price: 1199, category: "Honey", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80", inStock: true },
    { id: 4, name: "Black Rice (Chak-hao)", price: 699, category: "Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", inStock: true },
    { id: 5, name: "Bhut Jolokia Pack", price: 399, oldPrice: 499, category: "Spices", image: "https://images.unsplash.com/photo-1583286814430-1c2f9af2716b?w=400&q=80", inStock: false },
    { id: 6, name: "Bamboo Honey 250g", price: 899, category: "Honey", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80", inStock: true },
    { id: 7, name: "Tulsi Herbal Tea", price: 349, category: "Tea", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80", inStock: true },
    { id: 8, name: "Joha Aromatic Rice", price: 549, category: "Rice", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80", inStock: true },
  ]);

  const removeItem = (id: number) => setItems((items) => items.filter((i) => i.id !== id));
  const moveAllToCart = () => {
    const inStock = items.filter((i) => i.inStock);
    setItems((items) => items.filter((i) => !i.inStock));
    // TODO: actually add to cart
  };

  return (
    <DashboardShell role="Customer" userName="Rahul Sharma" userEmail="rahul@example.com">
      <div className="mb-6 md:mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-green-700">Dashboard</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">{items.length} items saved · {items.filter(i => i.inStock).length} ready to order</p>
        </div>
        {items.filter(i => i.inStock).length > 0 && (
          <button onClick={moveAllToCart} className="bg-green-700 hover:bg-green-800 text-white px-4 md:px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 text-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Move all to cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mb-6">Save items you love so you can find them easily later.</p>
          <Link href="/products" className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">Start shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((item) => {
            const discount = item.oldPrice ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) : 0;
            return (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} loading="lazy" className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!item.inStock ? "opacity-60" : ""}`} />

                  {discount > 0 && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-red-500 text-white">-{discount}%</span>
                  )}

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-red-50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>

                  {!item.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-3 md:p-4">
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">{item.category}</p>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="text-base md:text-lg font-bold text-gray-900">₹{item.price}</p>
                    {item.oldPrice && <p className="text-xs text-gray-400 line-through">₹{item.oldPrice}</p>}
                  </div>
                  <button
                    disabled={!item.inStock}
                    className="w-full bg-gray-900 hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-500 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors"
                  >
                    {item.inStock ? "Add to cart" : "Notify me"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
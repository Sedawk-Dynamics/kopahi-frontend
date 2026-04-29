"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/* ============================================================
   ADMIN-STYLE DASHBOARD (FULLY WIRED)
   File: app/dashboard/page.tsx
============================================================ */

type OrderStatus = "Completed" | "Pending" | "Shipped" | "Cancelled";
type Order = {
  id: string;
  product: string;
  amount: number;
  status: OrderStatus;
  customer: string;
  date: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "info" | "error"; message: string } | null>(null);
  const [orderFilter, setOrderFilter] = useState<"All" | OrderStatus>("All");
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD1023", product: "Assam Tea", amount: 499, status: "Completed", customer: "Rahul Sharma", date: "27 Apr 2026" },
    { id: "ORD1024", product: "Wild Honey", amount: 799, status: "Pending", customer: "Priya Das", date: "27 Apr 2026" },
    { id: "ORD1025", product: "Black Rice 5kg", amount: 1495, status: "Shipped", customer: "Ankit Jain", date: "26 Apr 2026" },
    { id: "ORD1026", product: "Lakadong Turmeric", amount: 649, status: "Completed", customer: "Sneha Roy", date: "25 Apr 2026" },
    { id: "ORD1027", product: "Bhut Jolokia Pack", amount: 299, status: "Pending", customer: "Amit Verma", date: "25 Apr 2026" },
  ]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const stats = [
    { label: "Total Orders", value: "1,245", icon: "📦", change: "+12.5%", href: "/admin/orders" },
    { label: "Products", value: "120", icon: "🛍️", change: "+3", href: "/admin/products" },
    { label: "Vendors", value: "35", icon: "🤝", change: "+5", href: "/admin/vendors" },
    { label: "Revenue", value: "₹4.2L", icon: "💰", change: "+18.2%", href: "/admin/revenue" },
  ];

  const monthlyData = [
    { month: "Jan", percent: 60 },
    { month: "Feb", percent: 75 },
    { month: "Mar", percent: 90 },
    { month: "Apr", percent: 70 },
  ];

  const filteredOrders = orderFilter === "All" ? orders : orders.filter((o) => o.status === orderFilter);

  const navItems = [
    { label: "Dashboard", icon: "📊", href: "/dashboard", current: true },
    { label: "Products", icon: "🛍️", href: "/admin/products" },
    { label: "Orders", icon: "📦", href: "/admin/orders" },
    { label: "Vendors", icon: "🤝", href: "/admin/vendors" },
    { label: "Farmers", icon: "🌾", href: "/admin/vendors" },
    { label: "Customers", icon: "👥", href: "/admin/customers" },
    { label: "Analytics", icon: "📈", href: "/admin/analytics" },
    { label: "Settings", icon: "⚙️", href: "/settings" },
  ];

  const handleAddProduct = () => router.push("/vendor/products/new");
  const handleViewOrders = () => router.push("/admin/orders");
  const handleVendorRequests = () => router.push("/admin/vendor-requests");
  const handleSignOut = () => {
    if (confirm("Sign out of your account?")) router.push("/login");
  };
  const handleOrderClick = (orderId: string) => router.push(`/admin/orders/${orderId}`);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    setToast({ type: "success", message: `Order ${orderId} marked as ${newStatus}` });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-green-700 to-green-800 text-white flex flex-col transition-transform duration-300 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 pb-5">
          <Link href="/" className="text-3xl font-bold tracking-tight inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
            Kopahi<span className="text-green-300">.</span>
          </Link>
          <p className="text-xs text-green-200 mt-1 font-medium uppercase tracking-wider">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-all ${
                item.current ? "bg-white text-green-700 shadow-md" : "text-green-50 hover:bg-white/10"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
              {item.current && <span className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
            <p className="text-xs text-green-200 uppercase tracking-wider font-semibold mb-1">Today Revenue</p>
            <p className="text-2xl font-bold">₹52,400</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-200">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              +12% vs yesterday
            </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-green-100 hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {mobileNavOpen && (
        <div onClick={() => setMobileNavOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden"></div>
      )}

      {/* MAIN */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="sticky top-0 z-20 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight flex-1">Admin Dashboard</h1>
          <button className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors inline-flex items-center gap-2 shadow-sm">
            <span className="hidden sm:inline">Welcome Admin</span>
            <span>👋</span>
          </button>
        </div>

        <div className="p-4 lg:p-8 space-y-6">
          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-200 border border-gray-100 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{s.icon}</div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">{s.change}</span>
                </div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <p className="text-3xl font-bold text-green-700 tracking-tight">{s.value}</p>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-green-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* REVENUE + QUICK ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
                  <p className="text-xs text-gray-500 mt-0.5">% of monthly target hit</p>
                </div>
                <Link href="/admin/analytics" className="text-sm font-medium text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                  Full report
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="space-y-4">
                {monthlyData.map((m) => (
                  <div key={m.month}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-gray-700">{m.month}</span>
                      <span className="font-semibold text-gray-900">{m.percent}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                        style={{ width: `${m.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleAddProduct}
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </button>
                <button
                  onClick={handleViewOrders}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-medium transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  View Orders
                </button>
                <button
                  onClick={handleVendorRequests}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-medium transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Vendor Requests
                </button>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-amber-600">{orders.filter(o => o.status === "Pending").length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Shipped</p>
                  <p className="text-xl font-bold text-blue-600">{orders.filter(o => o.status === "Shipped").length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <Link href="/admin/orders" className="text-sm font-medium text-green-700 hover:text-green-800 inline-flex items-center gap-1 group">
                  View all
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="flex gap-2 flex-wrap">
                {(["All", "Pending", "Shipped", "Completed", "Cancelled"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      orderFilter === f ? "bg-green-700 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <p className="text-center py-12 text-sm text-gray-500">No {orderFilter.toLowerCase()} orders.</p>
              ) : (
                filteredOrders.map((o) => (
                  <div key={o.id} className="p-4 md:p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <button
                        onClick={() => handleOrderClick(o.id)}
                        className="flex-1 min-w-0 text-left group"
                      >
                        <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{o.id}</p>
                        <p className="text-sm text-gray-700 truncate">{o.product} · ₹{o.amount}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{o.customer} · {o.date}</p>
                      </button>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusBadge status={o.status} />
                        <OrderActionMenu
                          order={o}
                          onUpdateStatus={updateOrderStatus}
                          onView={() => handleOrderClick(o.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border bg-white ${
            toast.type === "success" ? "border-green-200" : toast.type === "error" ? "border-red-200" : "border-blue-200"
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === "success" ? "bg-green-100 text-green-700" :
              toast.type === "error" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={toast.type === "success" ? "M5 13l4 4L19 7" : "M13 16h-1v-4h-1m1-4h.01"} />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900 pr-2">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Completed: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Shipped: "bg-blue-50 text-blue-700 border-blue-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
}

function OrderActionMenu({
  order,
  onUpdateStatus,
  onView,
}: {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onView: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) {
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
        aria-label="More options"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-30 overflow-hidden">
          <button onClick={() => { onView(); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            View details
          </button>
          {order.status !== "Shipped" && (
            <button onClick={() => { onUpdateStatus(order.id, "Shipped"); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Mark as Shipped
            </button>
          )}
          {order.status !== "Completed" && (
            <button onClick={() => { onUpdateStatus(order.id, "Completed"); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Mark as Completed
            </button>
          )}
          {order.status !== "Cancelled" && (
            <button onClick={() => { onUpdateStatus(order.id, "Cancelled"); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100">
              Cancel order
            </button>
          )}
        </div>
      )}
    </div>
  );
}
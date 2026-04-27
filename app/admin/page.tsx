"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef, ReactNode } from "react";

/* ============================================================
   ADMIN DASHBOARD — FULLY WIRED
   File: app/admin/page.tsx
============================================================ */

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Delivered" | "Shipped" | "Processing" | "Pending";
};

type Vendor = {
  id: number;
  name: string;
  location: string;
  products: number;
};

export default function AdminPage() {
  const router = useRouter();

  const stats = [
    { label: "Total Revenue", value: "₹12.4L", change: "+18.2%", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", href: "/admin/revenue" },
    { label: "Total Orders", value: "2,847", change: "+12.5%", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", href: "/admin/orders" },
    { label: "Active Vendors", value: "184", change: "+5", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", href: "/admin/vendors" },
    { label: "New Customers", value: "+312", change: "+24.1%", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", href: "/admin/customers" },
  ];

  const [orders] = useState<Order[]>([
    { id: "#KP-2847", customer: "Rahul Sharma", product: "Assam Tea Premium", amount: "₹1,499", status: "Delivered" },
    { id: "#KP-2846", customer: "Priya Das", product: "Wild Forest Honey", amount: "₹899", status: "Shipped" },
    { id: "#KP-2845", customer: "Ankit Jain", product: "Black Rice 5kg", amount: "₹3,495", status: "Processing" },
    { id: "#KP-2844", customer: "Sneha Roy", product: "Lakadong Turmeric", amount: "₹649", status: "Delivered" },
    { id: "#KP-2843", customer: "Amit Verma", product: "Bhut Jolokia Pack", amount: "₹1,299", status: "Pending" },
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 1, name: "Hills Organic Farm", location: "Shillong", products: 12 },
    { id: 2, name: "Brahmaputra Spices", location: "Guwahati", products: 28 },
    { id: 3, name: "Naga Honey Co.", location: "Kohima", products: 6 },
  ]);

  const [orderSearch, setOrderSearch] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "info" | "error"; message: string } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: "approve" | "reject"; vendor: Vendor } | null>(null);
  const [loadingVendor, setLoadingVendor] = useState<number | null>(null);

  // Filter orders by search
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.product.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleVendorAction = async (vendor: Vendor, action: "approve" | "reject") => {
    setLoadingVendor(vendor.id);
    setConfirmAction(null);

    // Simulate API call — replace with real fetch
    await new Promise((r) => setTimeout(r, 700));

    setVendors((vs) => vs.filter((v) => v.id !== vendor.id));
    setLoadingVendor(null);
    setToast({
      type: action === "approve" ? "success" : "info",
      message: action === "approve" ? `${vendor.name} approved successfully` : `${vendor.name} rejected`,
    });
  };

  const handleReviewVendor = (vendor: Vendor) => {
    router.push(`/admin/vendors/${vendor.id}`);
  };

  return (
    <DashboardShell role="Admin" pageTitle="Dashboard">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back. Here's what's happening across Kopahi today.</p>
      </div>

      {/* Stat cards — now clickable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                </svg>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{s.value}</p>
            <div className="flex items-center justify-between mt-0.5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders with working search */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-sm font-medium text-green-700 hover:text-green-800 inline-flex items-center gap-1 group">
                View all
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by order ID, customer, or product..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500">
                No orders match "{orderSearch}"
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Order</th>
                    <th className="text-left px-6 py-3 font-medium">Customer</th>
                    <th className="text-left px-6 py-3 font-medium">Amount</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-right px-6 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => router.push(`/admin/orders/${o.id.replace("#", "")}`)}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{o.id}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{o.product}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{o.customer}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{o.amount}</td>
                      <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                      <td className="px-6 py-4 text-right">
                        <svg className="w-4 h-4 text-gray-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pending Approvals — fully working */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
              <p className="text-xs text-gray-500 mt-1">{vendors.length} vendor{vendors.length !== 1 ? "s" : ""} awaiting review</p>
            </div>
            {vendors.length > 0 && (
              <Link href="/admin/vendor-requests" className="text-xs font-medium text-green-700 hover:text-green-800">
                View all
              </Link>
            )}
          </div>
          <div className="p-3">
            {vendors.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-900">All caught up!</p>
                <p className="text-xs text-gray-500 mt-1">No vendors waiting for review.</p>
              </div>
            ) : (
              vendors.map((v) => {
                const isLoading = loadingVendor === v.id;
                return (
                  <div key={v.id} className={`p-3 hover:bg-gray-50 rounded-xl transition-colors ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {v.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{v.name}</p>
                        <p className="text-xs text-gray-500">{v.location} · {v.products} products</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setConfirmAction({ type: "approve", vendor: v })}
                            disabled={isLoading}
                            className="text-xs font-medium px-3 py-1 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors disabled:opacity-50"
                          >
                            {isLoading ? "..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleReviewVendor(v)}
                            disabled={isLoading}
                            className="text-xs font-medium px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors disabled:opacity-50"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => setConfirmAction({ type: "reject", vendor: v })}
                            disabled={isLoading}
                            className="text-xs font-medium px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmAction && (
        <ConfirmModal
          title={confirmAction.type === "approve" ? "Approve vendor?" : "Reject vendor?"}
          message={
            confirmAction.type === "approve"
              ? `${confirmAction.vendor.name} will be able to start listing products immediately.`
              : `${confirmAction.vendor.name}'s application will be permanently rejected.`
          }
          confirmLabel={confirmAction.type === "approve" ? "Yes, approve" : "Yes, reject"}
          danger={confirmAction.type === "reject"}
          onConfirm={() => handleVendorAction(confirmAction.vendor, confirmAction.type)}
          onCancel={() => setConfirmAction(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </DashboardShell>
  );
}

/* ============ CONFIRMATION MODAL ============ */
function ConfirmModal({
  title,
  message,
  confirmLabel,
  danger,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className={`w-12 h-12 rounded-full ${danger ? "bg-red-100" : "bg-green-100"} flex items-center justify-center mb-4`}>
          <svg className={`w-6 h-6 ${danger ? "text-red-600" : "text-green-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={danger ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"} />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${danger ? "bg-red-600 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ TOAST ============ */
function Toast({ type, message }: { type: "success" | "info" | "error"; message: string }) {
  const styles = {
    success: { bg: "bg-green-100 text-green-700", icon: "M5 13l4 4L19 7" },
    info: { bg: "bg-blue-100 text-blue-700", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    error: { bg: "bg-red-100 text-red-700", icon: "M6 18L18 6M6 6l12 12" },
  };
  const s = styles[type];
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border border-gray-100 bg-white">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.bg}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={s.icon} />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900 pr-2">{message}</p>
      </div>
    </div>
  );
}

/* ============ STATUS BADGE ============ */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-green-50 text-green-700",
    Shipped: "bg-blue-50 text-blue-700",
    Processing: "bg-amber-50 text-amber-700",
    Pending: "bg-gray-100 text-gray-700",
  };
  return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>;
}

/* ============================================================
   FULLY WIRED DASHBOARD SHELL
============================================================ */

type Role = "Admin" | "Vendor" | "Customer";

const navByRole: Record<Role, { label: string; icon: string; href: string }[]> = {
  Admin: [
    { label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "/admin" },
    { label: "Orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", href: "/admin/orders" },
    { label: "Vendors", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", href: "/admin/vendors" },
    { label: "Customers", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z", href: "/admin/customers" },
    { label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", href: "/admin/products" },
    { label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", href: "/admin/analytics" },
    { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", href: "/settings" },
  ],
  Vendor: [
    { label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "/vendor" },
    { label: "My Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", href: "/vendor/products" },
    { label: "Orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", href: "/vendor/orders" },
    { label: "Earnings", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", href: "/vendor/earnings" },
    { label: "Reviews", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", href: "/vendor/reviews" },
    { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", href: "/settings" },
  ],
  Customer: [
    { label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "/dashboard" },
    { label: "My Orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", href: "/dashboard/orders" },
    { label: "Wishlist", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", href: "/dashboard/wishlist" },
    { label: "Addresses", icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", href: "/dashboard/addresses" },
    { label: "Account", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", href: "/dashboard/account" },
  ],
};

const roleColors: Record<Role, string> = {
  Admin: "bg-purple-600",
  Vendor: "bg-amber-600",
  Customer: "bg-green-700",
};

function DashboardShell({ role, userName, userEmail, pageTitle, children }: { role: Role; userName?: string; userEmail?: string; pageTitle?: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const nav = navByRole[role];
  const displayName = userName || `${role} User`;
  const displayEmail = userEmail || `${role.toLowerCase()}@kopahi.com`;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const notifications = [
    { id: 1, icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", title: "New order #KP-2848", desc: "₹2,499 from Anjali Roy", time: "2m ago", color: "text-blue-600 bg-blue-50" },
    { id: 2, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857", title: "Vendor application", desc: "Naga Honey Co. submitted", time: "1h ago", color: "text-purple-600 bg-purple-50" },
    { id: 3, icon: "M13 16h-1v-4h-1m1-4h.01", title: "Low stock alert", desc: "Black Rice 5kg – 3 left", time: "3h ago", color: "text-amber-600 bg-amber-50" },
  ];

  const handleSignOut = () => {
    setProfileOpen(false);
    router.push("/login");
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(globalSearch)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 z-50 transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="text-2xl font-bold text-green-700 tracking-tight">
            Kopahi<span className="text-green-500">.</span>
          </Link>
          <span className={`inline-block mt-2 text-[10px] uppercase tracking-wider font-bold text-white px-2 py-0.5 rounded ${roleColors[role]}`}>
            {role} Panel
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-700" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Working global search */}
          <form onSubmit={handleGlobalSearch} className="hidden md:flex flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search orders, vendors, customers..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded">⌘K</kbd>
            </div>
          </form>

          <div className="flex items-center gap-2">
            {/* Notifications dropdown */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{notifications.length}</span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button className="text-xs text-green-700 hover:text-green-800 font-medium">Mark all read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <button key={n.id} className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 flex gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${n.color}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={n.icon} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{n.title}</p>
                          <p className="text-xs text-gray-500 truncate">{n.desc}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Link href="/admin/notifications" className="block p-3 text-center text-sm font-medium text-green-700 hover:bg-gray-50 border-t border-gray-100">
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                className="flex items-center gap-2 pl-3 pr-2 py-1 border-l border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${roleColors[role]}`}>
                  {role.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{displayName}</p>
                  <p className="text-xs text-gray-500">{displayEmail}</p>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500">{displayEmail}</p>
                  </div>
                  <div className="p-1">
                    <Link href="/admin/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <Link href="/help" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 p-1">
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
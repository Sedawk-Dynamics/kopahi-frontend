"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [error, setError] = useState("");

  const demoRoles = [
    {
      label: "Admin",
      email: "admin@kopahi.com",
      redirect: "/admin",
      color: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
    },
    {
      label: "Vendor",
      email: "vendor@kopahi.com",
      redirect: "/vendor",
      color: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
    },
    {
      label: "Customer",
      email: "customer@kopahi.com",
      redirect: "/dashboard",
      color: "bg-green-50 text-green-700 hover:bg-green-100 border-green-200",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // TODO: replace with your real auth call
    // e.g. const res = await signIn("credentials", { email, password, redirect: false });
    setTimeout(() => {
      const matched = demoRoles.find((r) => r.email === email.toLowerCase());
      router.push(matched?.redirect || "/dashboard");
    }, 800);
  };

  const handleDemoLogin = (role: typeof demoRoles[0]) => {
    setEmail(role.email);
    setPassword("demo1234");
    setError("");
    setLoadingRole(role.label);

    setTimeout(() => {
      router.push(role.redirect);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/40 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-green-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <Link
        href="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition-colors z-10 group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to home
      </Link>

      <div className="bg-white shadow-2xl shadow-green-900/10 rounded-3xl grid md:grid-cols-2 max-w-5xl w-full overflow-hidden border border-gray-100 relative z-10">

        {/* LEFT — FORM */}
        <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
          <Link href="/" className="inline-block mb-8 md:mb-10">
            <h2 className="text-2xl font-bold text-green-700 tracking-tight">
              Kopahi<span className="text-green-500">.</span>
            </h2>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Welcome back
          </h1>

          <p className="text-gray-600 mb-8">
            Sign in to access your customer, vendor or admin dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2" role="alert">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-green-700 hover:text-green-800 font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Keep me signed in for 30 days</span>
            </label>

            <button
              type="submit"
              disabled={loading || !!loadingRole}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-700/70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-white px-3 text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium text-gray-700 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Demo role chips — ONE-CLICK LOGIN with redirect */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">
              Try a demo account · One click
            </p>
            <div className="flex gap-2 flex-wrap">
              {demoRoles.map((role) => {
                const isLoading = loadingRole === role.label;
                return (
                  <button
                    key={role.label}
                    type="button"
                    onClick={() => handleDemoLogin(role)}
                    disabled={loading || !!loadingRole}
                    className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 ${role.color}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {role.label}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-600 text-center md:text-left">
            New to Kopahi?{" "}
            <Link href="/signup" className="text-green-700 hover:text-green-800 font-semibold">
              Create an account
            </Link>
          </p>
        </div>

        {/* RIGHT — BRANDED PANEL */}
        <div className="hidden md:block relative bg-gradient-to-br from-green-700 via-green-800 to-green-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&q=80"
            alt="Tea plantation"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-700/90 via-green-800/85 to-green-900/95"></div>

          <div className="absolute top-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-green-300/10 rounded-full blur-3xl"></div>

          <div className="relative h-full flex flex-col justify-between p-12 text-white z-10">
            <div>
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Kopahi Marketplace
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                Authentic produce from North East India.
              </h2>
              <p className="text-green-100 leading-relaxed text-base">
                Join 10,000+ buyers who trust Kopahi for GI-tagged teas, raw honey, black rice and rare regional spices — sourced directly from farmers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 mt-10">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                "Best GI-tagged products I've purchased online. Sourcing feels genuinely ethical and quality is unmatched."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">A</div>
                <div>
                  <p className="text-sm font-semibold">Ankit Jain</p>
                  <p className="text-xs text-green-200">Verified Buyer · Delhi</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/15">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs text-green-200">Farmers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-xs text-green-200">Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">30+</p>
                <p className="text-xs text-green-200">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
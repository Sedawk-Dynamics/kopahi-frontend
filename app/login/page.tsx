export default function LoginPage() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-8">

      <div className="bg-white shadow-xl rounded-2xl grid md:grid-cols-2 max-w-5xl w-full overflow-hidden">

        {/* Left */}
        <div className="p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back
          </h1>

          <p className="text-gray-600 mb-8">
            Login to access customer, vendor or admin dashboard.
          </p>

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-4 rounded-lg"
            />

            <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
              Login
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Demo roles: Admin / Vendor / Customer
          </p>
        </div>

        {/* Right */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            className="h-full w-full object-cover"
          />
        </div>

      </div>

    </main>
  );
}
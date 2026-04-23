export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white p-8 hidden md:block">
        <h1 className="text-3xl font-bold mb-10">Kopahi</h1>

        <div className="space-y-5 text-lg">
          <p>Dashboard</p>
          <p>Products</p>
          <p>Orders</p>
          <p>Vendors</p>
          <p>Farmers</p>
          <p>Customers</p>
          <p>Analytics</p>
          <p>Settings</p>
        </div>
      </aside>

      {/* Main */}
      <section className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            ["Total Orders", "1,245"],
            ["Products", "120"],
            ["Vendors", "35"],
            ["Revenue", "₹4.2L"],
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-6"
            >
              <p className="text-gray-500">{item[0]}</p>
              <h2 className="text-3xl font-bold mt-2">{item[1]}</h2>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="space-y-4">
            {[
              "ORD1023 - Assam Tea - ₹499",
              "ORD1024 - Honey - ₹799",
              "ORD1025 - Black Rice - ₹699",
              "ORD1026 - Turmeric - ₹299",
            ].map((item, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex justify-between"
              >
                <span>{item}</span>
                <span className="text-green-700 font-semibold">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

    </main>
  );
}
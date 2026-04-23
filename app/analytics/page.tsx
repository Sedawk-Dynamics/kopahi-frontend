export default function AnalyticsPage() {
  const stats = [
    ["Total Revenue", "₹8.4L"],
    ["Monthly Orders", "342"],
    ["Active Vendors", "35"],
    ["Customers", "1,280"],
  ];

  const topProducts = [
    ["Assam Tea", "128 Sales"],
    ["Black Rice", "97 Sales"],
    ["Organic Honey", "84 Sales"],
    ["Turmeric", "61 Sales"],
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-8 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Business performance overview.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-6"
            >
              <p className="text-gray-500">{item[0]}</p>
              <h2 className="text-3xl font-bold mt-2">{item[1]}</h2>
            </div>
          ))}
        </div>

        {/* Revenue Graph Placeholder */}
        <div className="bg-white rounded-2xl shadow p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Monthly Revenue Trend
          </h2>

          <div className="h-72 bg-gradient-to-r from-green-100 to-green-50 rounded-xl flex items-center justify-center text-gray-500 text-lg">
            Revenue Chart Area
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6">
            Top Selling Products
          </h2>

          <div className="space-y-4">
            {topProducts.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border rounded-lg p-4"
              >
                <span>{item[0]}</span>
                <span className="font-semibold text-green-700">
                  {item[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
}
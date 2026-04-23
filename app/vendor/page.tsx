export default function VendorPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-black text-white p-8 hidden md:block">
        <h1 className="text-3xl font-bold text-green-500 mb-10">
          Vendor Panel
        </h1>

        <div className="space-y-5 text-lg">
          <p>Dashboard</p>
          <p>My Products</p>
          <p>Add Product</p>
          <p>Orders</p>
          <p>Earnings</p>
          <p>Profile</p>
          <p>Support</p>
        </div>
      </aside>

      {/* Main */}
      <section className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-10">
          Vendor Dashboard
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            ["Products", "24"],
            ["Orders", "180"],
            ["Revenue", "₹58K"],
            ["Pending", "8"],
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

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6">
            My Products
          </h2>

          <div className="space-y-4">
            {[
              "Assam Tea - ₹499",
              "Black Rice - ₹699",
              "Organic Honey - ₹799",
              "Turmeric - ₹299",
            ].map((item, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex justify-between"
              >
                <span>{item}</span>

                <button className="bg-green-700 text-white px-4 py-1 rounded-lg">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>

    </main>
  );
}
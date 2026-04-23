export default function B2BPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="bg-green-50 py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Bulk Orders & B2B Partnerships
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          Source premium agricultural products directly from trusted vendors,
          farmers and regional producers across North East India.
        </p>
      </section>

      {/* Content */}
      <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Left */}
        <div>
          <h2 className="text-4xl font-bold mb-8">
            Why Partner With Kopahi?
          </h2>

          <div className="space-y-5 text-lg text-gray-700">
            <p>✅ Direct sourcing from verified farmers</p>
            <p>✅ GI Tagged & premium regional products</p>
            <p>✅ Custom bulk pricing</p>
            <p>✅ Reliable logistics support</p>
            <p>✅ Export & wholesale opportunities</p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
            className="mt-10 rounded-2xl shadow-lg h-72 w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-2xl shadow p-8">

          <h3 className="text-3xl font-bold mb-6">
            Request Quote
          </h3>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Contact Person"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="email"
              placeholder="Business Email"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Required Products"
              className="w-full border p-4 rounded-lg"
            />

            <textarea
              rows={5}
              placeholder="Order Quantity / Requirements"
              className="w-full border p-4 rounded-lg"
            ></textarea>

            <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
              Submit Inquiry
            </button>
          </div>

        </div>

      </section>

    </main>
  );
}